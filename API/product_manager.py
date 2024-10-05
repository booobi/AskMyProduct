from dataclasses import dataclass
from sqlalchemy import create_engine


@dataclass
class ProductManager:
    title: str
    info: int
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

