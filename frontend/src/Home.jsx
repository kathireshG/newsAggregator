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

// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";
// import { Progress } from "@/components/ui/progress";

// import NewsSummary from "./NewsSummary";

// function App() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [newsArticles, setNewsArticles] = useState([]); // State to store news articles
//   const [selectedArticle, setSelectedArticle] = useState(null); // State to manage selected article for popup

//   const handleSearch = (e) => {
//     e.preventDefault();

//     axios
//       .get(`http://localhost:5001/getNews?search=${searchTerm}`)
//       .then((response) => {
//         setNewsArticles(response.data.articles); // Update state with articles
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the news:", error);
//       });
//   };

//   const handleOpenPopup = (article) => {
//     setSelectedArticle(article); // Set the selected article for popup
//   };

//   const handleClosePopup = () => {
//     setSelectedArticle(null); // Close the popup
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <Progress value={33} />

//         <form onSubmit={handleSearch} className="search-bar">
//           <input
//             type="text"
//             placeholder="Search for news..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button type="submit">Search</button>
//         </form>

//         {/* Displaying news articles */}
//         <div className="news-container">
//           {newsArticles.map((article, index) => (
//             <div key={index} className="news-card">
//               <h2>{article.title}</h2>
//               <p>
//                 <strong>Website:</strong>{" "}
//                 <a href={article.url} target="_blank" rel="noopener noreferrer">
//                   {article.url}
//                 </a>
//               </p>
//               {/* <p>{article.content}</p> */}
//               <p>
//                 <strong>Source:</strong> {article.source}
//               </p>
//               <button
//                 className="read-news-button"
//                 onClick={() => handleOpenPopup(article)}
//               >
//                 Read News
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Render the NewsSummary popup if an article is selected */}
//         {selectedArticle && (
//           <NewsSummary article={selectedArticle} onClose={handleClosePopup} />
//         )}
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import NewsSummary from "./NewsSummary";
import { ThreeDots } from "react-loader-spinner"; // Import InfinitySpin

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [newsArticles, setNewsArticles] = useState([]); // State to store news articles
  const [selectedArticle, setSelectedArticle] = useState(null); // State to manage selected article for popup
  const [loading, setLoading] = useState(false); // State to manage loading animation

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true); // Show the loading animation when search starts

    axios
      .get(`http://localhost:5001/getNews?search=${searchTerm}`)
      .then((response) => {
        setNewsArticles(response.data.articles); // Update state with articles
        setLoading(false); // Hide the loading animation once results are fetched
      })
      .catch((error) => {
        console.error("There was an error fetching the news:", error);
        setLoading(false); // Hide the loading animation even if there's an error
      });
  };

  const handleOpenPopup = (article) => {
    setSelectedArticle(article); // Set the selected article for popup
  };

  const handleClosePopup = () => {
    setSelectedArticle(null); // Close the popup
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

        {/* Show the InfinitySpin loader when the app is fetching data */}
        {loading ? (
          <div className="loader">
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          <div className="news-container">
            {/* Displaying news articles */}
            {newsArticles.map((article, index) => (
              <div key={index} className="news-card">
                <h2>{article.title}</h2>
                <p>
                  <strong>Website:</strong>{" "}
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.url}
                  </a>
                </p>
                <p>
                  <strong>Source:</strong> {article.source}
                </p>
                <button
                  className="read-news-button"
                  onClick={() => handleOpenPopup(article)}
                >
                  Read News
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Render the NewsSummary popup if an article is selected */}
        {selectedArticle && (
          <NewsSummary article={selectedArticle} onClose={handleClosePopup} />
        )}
      </header>
    </div>
  );
}

export default App;
