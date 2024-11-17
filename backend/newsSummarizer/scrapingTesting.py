import requests
from bs4 import BeautifulSoup

def scrape(url):
    # Placeholder function to scrape website content
    try:
        response = requests.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            # Find the main content of the article
            # This might need to be adjusted based on the website's structure
            main_content = soup.find('article')  # For many news websites, the main content is in an <article> tag
            
            if main_content:
                # Extract text from the main content
                paragraphs = main_content.find_all('p')  # Get all <p> tags within the main content
                content = ' '.join([para.get_text() for para in paragraphs])  # Join paragraphs into a single string
                return content.strip()  # Return cleaned up content
            else:
                return "No main content found"
        else:
            return ""
    except Exception as e:
        print(f"Error fetching the URL: {e}")
        return ""

# Example usage
url1 = "https://www.wired.com/story/the-best-tech-support-services-for-seniors/"
url2 = "https://www.wired.com/story/pig-butchering-scams-go-high-tech/"

print(scrape(url2))
