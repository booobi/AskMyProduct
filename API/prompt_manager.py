import requests as requests
import json


class PromptManager:
    def __init__(self, url, prompt=None, db_text_info=None):
        self.db_text_info = db_text_info
        self.prompt = prompt
        self.url = url

    def set_prompt(self, prompt):
        self.prompt = prompt

    def get_custom_sql(self, db_text_info=None):
        if not self.prompt:
            raise Exception("Missing prompt!")

        if not db_text_info:
            db_text_info = self.db_text_info

        if not db_text_info:
            raise Exception("Please provide db info!")

        payload = json.dumps({
            "model": "llama3.1",
            "messages": [
                {
                    "role": "system",
                    "content": f"I have an SQL in PostgreSQL with the following structure \n{db_text_info}\n and I "
                               f"want you to create SQL scripts given my instructions. When you build the SQL code "
                               f"please specify the database in the FROM statement. I want you to output only the SQL "
                               f"code in plain text! Do not include"
                               f"anything else in your answer! Please output only the SQL code in plain text!"
                },
                {
                    "role": "user",
                    "content": self.prompt
                }
            ]
        })
        headers = {
            'Content-Type': 'application/json'
        }

        response = requests.request("POST", self.url, headers=headers, data=payload)
        json_strings = response.text.strip().split('\n')

        # Parse each JSON string into a dictionary
        dict_list = [json.loads(json_str) for json_str in json_strings]
        return "".join([_dict['message']['content'] for _dict in dict_list]).replace("\n", " ")

    def get_answer(self, table_data, query, prompt=None, customer_info=None, db_text_info=None):
        if not prompt:
            prompt = self.prompt

        if not db_text_info:
            db_text_info = self.db_text_info
        customer_info_string = f"{customer_info}" if customer_info else ""

        payload = json.dumps({
            "model": "llama3.1",
            "messages": [
                {
                    "role": "user",
                    "content": f"Given company information {customer_info_string} and the data {table_data} resulted "
                               f"from running the query {query} against the db {db_text_info}, please answer the following"
                               f"question in very simple terms, plain english.:\n{prompt}"
                }
            ]
        })
        headers = {
            'Content-Type': 'application/json'
        }

        response = requests.request("POST", self.url, headers=headers, data=payload)
        json_strings = response.text.strip().split('\n')

        # Parse each JSON string into a dictionary
        dict_list = [json.loads(json_str) for json_str in json_strings]
        return "".join([_dict['message']['content'] for _dict in dict_list]).replace("\n", " ")
