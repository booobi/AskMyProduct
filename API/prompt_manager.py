import requests as requests
import json

class PromptManager:
    def __init__(self, url):
        self.url = url

    def send_response(self):
        payload = json.dumps({
            "model": "llama3.1",
            "messages": [
                {
                    "role": "system",
                    "content": "I have an SQL in MySQL and I want you to create SQL scripts given my instructions. The table, called \"hist\", has columns \"date\" which is varchar, \"ticker\" which is varchar and \"close\" which is float. When you build the SQL code please specify the database (\"prices\") in the FROM statement. For example prices.hist. I want you to output only the SQL code in plain text! Do not include anything else in your answer! Please output only the SQL code in plain text!"
                },
                {
                    "role": "user",
                    "content": "Give me average montly price for each stock with month"
                }
            ]
        })
        headers = {
            'Content-Type': 'application/json'
        }

        response = requests.request("POST", url, headers=headers, data=payload)