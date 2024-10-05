from dataclasses import dataclass
from sqlalchemy import create_engine, text
from prompt_manager import PromptManager


@dataclass
class ProductManager:
    title: str
    info: str
    db_info: dict  # Contains the database connection parameters like username, password, host, etc.

    def __post_init__(self):
        # Create a connection string using the db_info dictionary
        user = self.db_info['user']
        password = self.db_info['password']
        host = self.db_info['host']
        port = self.db_info.get('port', '5432')  # Default PostgreSQL port is 5432
        database = self.db_info['database']

        # Create the connection string for PostgreSQL
        connection_string = f'postgresql://{user}:{password}@{host}:{port}/{database}'

        # Set the engine as an instance attribute
        self.engine = create_engine(connection_string)

        # Optionally, test the connection on initialization
        self.test_connection()

    def test_connection(self):
        try:
            with self.engine.connect() as connection:
                print(f"Connected to the database: {self.db_info['database']}")
        except Exception as e:
            print(f"Failed to connect to the database: {e}")

    def get_info(self):
        return self.info

    def convert_to_prompt(self, table_info_list):
        prompt_parts = []

        for table_info in table_info_list:
            part = (
                f"Table Schema: {table_info['table_schema']}\n"
                f"Table Name: {table_info['table_name']}\n"
                f"Table Type: {table_info['table_type']}\n"
                f"Description: {table_info['table_description']}\n"
                f"Columns: {table_info['column_names']}\n"
            )
            prompt_parts.append(part)

        # Join all parts into a single string
        return "\n".join(prompt_parts)

    def convert_to_prompt_custom(self, table_info_list):
        prompt_parts = []

        for table_info in table_info_list:
            part = []

            # Dynamically include each key-value pair in the table_info dictionary
            for key, value in table_info.items():
                # Format key for display, if needed (optional)
                formatted_key = key.replace('_', ' ').capitalize()  # Convert underscores to spaces and capitalize
                part.append(f"{formatted_key}: {value}")

            # Join the parts for the current table and add to prompt_parts
            prompt_parts.append("\n".join(part))

        # Join all parts into a single string, separating tables with a blank line
        return "\n\n".join(prompt_parts)

    def execute_custom_query(self, query):
        try:
            with self.engine.connect() as connection:
                result = connection.execute(text(query))
                return self.convert_to_prompt_custom(result.mappings().all())
        except Exception as e:
            print(f"Error executing query: {e}")
            return []

    def execute_query(self):
        query = """
                WITH table_info AS (
            SELECT 
                table_schema,
                table_name,
                table_type,
                obj_description(rel.oid, 'pg_class') AS table_description,
                pg_size_pretty(pg_total_relation_size(rel.oid)) AS total_size,
                reltuples::BIGINT AS estimated_rows,
                pg_stat_user_tables.last_analyze AS last_analyze_time
            FROM 
                information_schema.tables
            JOIN 
                pg_class rel ON rel.relname = table_name
            LEFT JOIN 
                pg_stat_user_tables ON rel.oid = pg_stat_user_tables.relid
            WHERE 
                table_schema = 'public'
                AND table_type = 'BASE TABLE'
        )
        SELECT 
            t.table_schema,
            t.table_name,
            t.table_type,
            t.table_description,
            t.total_size,
            t.estimated_rows,
            t.last_analyze_time,
            string_agg(c.column_name, ', ') AS column_names
        FROM 
            table_info t
        LEFT JOIN 
            information_schema.columns c ON t.table_name = c.table_name AND t.table_schema = c.table_schema
        GROUP BY 
            t.table_schema, t.table_name, t.table_type, t.table_description, t.total_size, t.estimated_rows, t.last_analyze_time
        ORDER BY 
            t.table_name

        """
        try:
            with self.engine.connect() as connection:
                result = connection.execute(text(query))
                return self.convert_to_prompt(result.mappings().all())  # Convert result to a list of dictionaries
        except Exception as e:
            print(f"Error executing query: {e}")
            return []


if __name__ == "__main__":
    db_info = {
        'user': 'postgres.bzmdhzwunqyeedwtnlvj',
        'password': 'Bobitestva123',
        'host': 'aws-0-eu-central-1.pooler.supabase.com',
        'database': 'postgres',
        'port': '6543'  # Optional
    }

    product_manager = ProductManager(title='Sample Product', info='Truck company', db_info=db_info)
    results = product_manager.execute_query()


    prompt_manager = PromptManager("http://localhost:11434/api/chat",
                       "How many runs did each truck had? I need to know truck names.", db_text_info=results)
    sql = prompt_manager.get_custom_sql()
    table_data = product_manager.execute_custom_query(sql)

    answer = prompt_manager.get_answer(table_data, customer_info='''Cargo123 is a logistics company that specializes 
    in providing efficient and reliable transportation solutions. With a focus on streamlining supply chains, 
    Cargo123 offers a range of services including freight management, warehousing, and timely delivery across various 
    regions.''')
    print(answer)