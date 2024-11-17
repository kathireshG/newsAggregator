// // import React from "react";
// import "./App.css";
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function Home() {
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearch = (e) => {
//     e.preventDefault(); // Prevents the default form submission behavior

//     // Send a GET request to the backend with the search term
//     axios
//       .get(`/getNews?search=${searchTerm}`)
//       .then((response) => {
//         console.log(response.data);
//         // Handle the response with news articles
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the news:", error);
//       });
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         {/* <h1>News Aggregator</h1> */}
//         <form onSubmit={handleSearch} className="search-bar">
//           <input
//             type="text"
//             placeholder="Search for news..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button type="submit">Search</button>
//         </form>
//       </header>
//     </div>
//   );
// }

// export default Home;

import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import NewsSummary from "./NewsSummary";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [newsArticles, setNewsArticles] = useState([]); // State to store news articles

  const handleSearch = (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:5001/getNews?search=${searchTerm}`)
      .then((response) => {
        // console.log(response.data);
        // Assuming response.data contains an array of news articles
        setNewsArticles(response.data.articles); // Update state with articles
      })
      .catch((error) => {
        console.error("There was an error fetching the news:", error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Search for news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {/* Displaying news articles */}
        <div className="news-container">
          {newsArticles.map((article, index) => (
            <div key={index} className="news-card">
              <h2>{article.title}</h2>
              <p>
                <strong>Website:</strong> {article.url}
              </p>
              <p>{article.content}</p>
              <p>
                <strong>Source:</strong> {article.source}
              </p>
              <button className="read-news-button">Read News</button>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
