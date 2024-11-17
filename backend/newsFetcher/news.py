import requests
import pandas as pd

def get_news_from_newsapi(query, num_results=10):
    api_key = '45ad16b5f9d8477180e394d2477e0296'  # Replace with your API key
    url = f'https://newsapi.org/v2/everything?q={query}&pageSize={num_results}&apiKey={api_key}'

    response = requests.get(url)
    if response.status_code == 200:
        news_data = response.json()

        if news_data.get("status") == "ok":
            articles = news_data.get("articles", [])

            news_df = pd.DataFrame([{
                'Title': article['title'],
                'Link': article['url'],
                'Source': article['source']['name'],
                'Snippet': article['description']
            } for article in articles])
            
            return news_df
        else:
            print("Error in news data response")
            return pd.DataFrame()
    else:
        print("Error fetching news")
        return pd.DataFrame()

# Example usage
keyword = input("Enter the keyword or topic: ")
news_df = get_news_from_newsapi(keyword, num_results=10)

# Display the DataFrame
# print(news_df)