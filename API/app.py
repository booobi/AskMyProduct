from flask import Flask, jsonify, request
from dotenv import load_dotenv
import os
from flask import after_this_request

from API.product_manager import ProductManager
from API.prompt_manager import PromptManager

load_dotenv()

CHAT = os.getenv("LLAMA_API") + "/chat"

app = Flask(__name__)


@app.after_request
def add_cors_headers(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


# Home route
@app.route('/')
def home():
    return jsonify(message="Flask API works!")


# Example GET route
@app.route('/api/question', methods=['GET'])
def get_prompt():
    prompt = request.args.get('prompt')
    company_info = request.args.get('company_info', 'Cargo123 is a logistics company that specializes in providing '
                                                    'efficient and reliable transportation solutions. With a focus on '
                                                    'streamlining supply chains, Cargo123 offers a range of services '
                                                    'including freight management, warehousing, and timely delivery '
                                                    'across various regions.')
    if not prompt:
        return jsonify(response="Missing prompt"), 500

    db_info = {
        'user': 'postgres.bzmdhzwunqyeedwtnlvj',
        'password': 'Bobitestva123',
        'host': 'aws-0-eu-central-1.pooler.supabase.com',
        'database': 'postgres',
        'port': '6543'  # Optional
    }

    # Phase 1: Getting db info.
    product_manager = ProductManager(title='Sample Product', info=company_info, db_info=db_info)
    db_table_information_schema = product_manager.execute_query()

    # Phase 2: Generate and execute custom SQL query.
    prompt_manager = PromptManager("http://localhost:11434/api/chat",
                                   prompt,
                                   db_text_info=db_table_information_schema)
    for _ in range(3):
        sql = None
        try:
            sql = prompt_manager.get_custom_sql()
            table_data = product_manager.execute_custom_query(sql)
            break
        except Exception as ex:
            print("Error when executing SQL query.", sql, ex)
            continue
    else:
        return jsonify(message="Sorry, I cannot give an answer. Please try rephrase the question.")
    print(sql)
    print(table_data)
    # Phase 3: Get answer to user question, provided analytical context
    answer = prompt_manager.get_answer(table_data, customer_info=product_manager.get_info(), query=sql)

    return jsonify(message=answer)


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5152)
