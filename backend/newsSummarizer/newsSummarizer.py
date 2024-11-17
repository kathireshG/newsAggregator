from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer, WordNetLemmatizer
from parrot import Parrot
import warnings
import math
from collections import Counter
from bs4 import BeautifulSoup

# Suppress warnings
warnings.filterwarnings("ignore")
# Initialize Parrot model for paraphrasing
parrot = Parrot(model_tag="prithivida/parrot_paraphraser_on_T5")
print('model Intialized')

# Download NLTK resources if not already installed
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

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

def preprocess_text(text, use_stemming=False, use_lemmatization=True):
    # 1. Lowercase the text
    text = text.lower()

    # 2. Remove punctuation and special characters
    text = re.sub(r'[^\w\s]', '', text)

    # 3. Tokenize the text
    tokens = word_tokenize(text)

    # 4. Remove stopwords
    stop_words = set(stopwords.words('english'))
    tokens = [word for word in tokens if word not in stop_words]

    # 5. Stemming or Lemmatization
    if use_stemming:
        stemmer = PorterStemmer()
        tokens = [stemmer.stem(word) for word in tokens]
    elif use_lemmatization:
        lemmatizer = WordNetLemmatizer()
        tokens = [lemmatizer.lemmatize(word) for word in tokens]

    # Join tokens back into a string
    preprocessed_text = ' '.join(tokens)

    return preprocessed_text

def compute_tf(sentence):
    words = sentence.split()
    word_count = len(words)
    tf_values = Counter(words)
    for word in tf_values:
        tf_values[word] = tf_values[word] / word_count
    return tf_values

def compute_idf(sentences):
    num_sentences = len(sentences)
    idf_values = {}
    all_words = set(word for sentence in sentences for word in sentence.split())

    for word in all_words:
        containing_sentence_count = sum(1 for sentence in sentences if word in sentence.split())
        idf_values[word] = math.log(num_sentences / (1 + containing_sentence_count))  # Adding 1 to avoid division by zero

    return idf_values

def compute_tfidf(sentences):
    tf_list = [compute_tf(sentence) for sentence in sentences]
    idf_values = compute_idf(sentences)

    tfidf_list = []
    for tf_values in tf_list:
        tfidf = {}
        for word, tf_value in tf_values.items():
            tfidf[word] = tf_value * idf_values.get(word, 0)
        tfidf_list.append(tfidf)

    return tfidf_list

def score_sentences(sentences, tfidf_list):
    sentence_scores = []
    for i, tfidf in enumerate(tfidf_list):
        score = sum(tfidf.values())  # Sum up the TF-IDF values of all words in the sentence
        sentence_scores.append((sentences[i], score))

    sentence_scores.sort(key=lambda x: x[1], reverse=True)

    return sentence_scores

@app.route('/')
def home():
    return "Welcome to the news server!"

@app.route('/process', methods=['POST'])
def process_content():
    data = request.json
    url = data.get('website')

    # Scrape the content from the provided URL
    raw_content = scrape(url)

    # Preprocess the text
    raw_content = re.sub(r'\n+', ' ', raw_content)  # Remove newlines
    documentspreprocessedData = raw_content.split(".")
    preprocessedData = [preprocess_text(sentence) for sentence in documentspreprocessedData]

    # Compute TF-IDF and rank sentences
    tfidf_list = compute_tfidf(preprocessedData)
    ranked_sentences = score_sentences(preprocessedData, tfidf_list)

    # Prepare phrases for paraphrasing
    phrases = [text[0] for text in ranked_sentences]
    phrases = phrases[0:6]
    # Paraphrase each phrase
    content = []
    try:
        for phrase in phrases:
            para_phrases = parrot.augment(input_phrase=phrase, use_gpu=True)
            for para_phrase in para_phrases:
                content.append(para_phrase[0])
    except:
        pass

    # Combine paraphrased content
    paraphrased_text = ". ".join(content)
    return jsonify({"paraphrased_content": paraphrased_text})

if __name__ == '__main__':
    app.run(port=5002, debug=True)
