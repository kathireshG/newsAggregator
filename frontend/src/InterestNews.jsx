// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./App.css";
// import NewsSummary from "./NewsSummary";

// function InterestNews() {
//   const [interests, setInterests] = useState([]);
//   const [newsArticles, setNewsArticles] = useState([]);
//   const [selectedArticle, setSelectedArticle] = useState(null);

//   // Retrieve interests from local storage and split by comma
//   useEffect(() => {
//     const storedInterests = localStorage.getItem("interests");
//     if (storedInterests) {
//       setInterests(storedInterests.split(","));
//     }
//   }, []);

//   // Fetch news articles based on interests
//   useEffect(() => {
//     if (interests.length > 0) {
//       const fetchNews = async () => {
//         try {
//           const promises = interests.map((interest) =>
//             axios.get(`http://localhost:5001/getNews?search=${interest.trim()}`)
//           );
//           const responses = await Promise.all(promises);
//           const articles = responses.flatMap(
//             (response) => response.data.articles
//           );
//           setNewsArticles(articles);
//         } catch (error) {
//           console.error("Error fetching news based on interests:", error);
//         }
//       };
//       fetchNews();
//     }
//   });

//   const handleOpenPopup = (article) => {
//     setSelectedArticle(article); // Set the selected article for popup
//   };

//   const handleClosePopup = () => {
//     setSelectedArticle(null); // Close the popup
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         {/* Displaying news articles based on interests */}
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

// export default InterestNews;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import NewsSummary from "./NewsSummary";
import { ThreeDots } from "react-loader-spinner"; // Import ThreeDots spinner

function InterestNews() {
  const [interests, setInterests] = useState([]);
  const [newsArticles, setNewsArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(false); // State to manage loading animation

  // Retrieve interests from local storage and split by comma
  useEffect(() => {
    const storedInterests = localStorage.getItem("interests");
    if (storedInterests) {
      setInterests(storedInterests.split(","));
    }
  }, []);

  // Fetch news articles based on interests
  useEffect(() => {
    if (interests.length > 0) {
      const fetchNews = async () => {
        setLoading(true); // Show the loading spinner before starting the request
        try {
          const promises = interests.map((interest) =>
            axios.get(`http://localhost:5001/getNews?search=${interest.trim()}`)
          );
          const responses = await Promise.all(promises);
          const articles = responses.flatMap(
            (response) => response.data.articles
          );
          setNewsArticles(articles);
        } catch (error) {
          console.error("Error fetching news based on interests:", error);
        } finally {
          setLoading(false); // Hide the loading spinner after the request is done
        }
      };
      fetchNews();
    }
  }, [interests]); // Dependency array includes interests to refetch when interests change

  const handleOpenPopup = (article) => {
    setSelectedArticle(article); // Set the selected article for popup
  };

  const handleClosePopup = () => {
    setSelectedArticle(null); // Close the popup
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Show the ThreeDots loader when the app is fetching data */}
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
            {/* Displaying news articles based on interests */}
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

export default InterestNews;
