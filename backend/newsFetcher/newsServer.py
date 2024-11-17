from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def get_news_from_newsapi(query, num_results=10):
    api_key = '45ad16b5f9d8477180e394d2477e0296'  # Replace with your API key
    url = f'https://newsapi.org/v2/everything?q={query}&pageSize={num_results}&apiKey={api_key}'

    response = requests.get(url)
    if response.status_code == 200:
        news_data = response.json()

        if news_data.get("status") == "ok":
            articles = news_data.get("articles", [])
            news_list = [{
                'title': article['title'],
                'url': article['url'],
                'source': article['source']['name'],
                'content': article['description']
            } for article in articles if 'removed' not in article['title'].lower()]

            
            return news_list
        else:
            print("Error in news data response")
            return []
    else:
        print("Error fetching news")
        return []

@app.route('/getNews', methods=['GET'])
def get_news():
    search_term = request.args.get('search')
    if not search_term:
        return jsonify({"message": "Search term is required"}), 400
    
    news_articles = get_news_from_newsapi(search_term)
    return jsonify({"articles": news_articles}), 200

@app.route('/')
def home():
    return "Welcome to the news server!"


if __name__ == '__main__':
    app.run(debug=True, port=5001)
