// import React from "react";

// const NewsSummary = ({ article, onClose }) => {
//   return (
//     <div className="popup-overlay">
//       <div className="popup-content">
//         <h2>{article.title}</h2>
//         <p>
//           <strong>Source:</strong> {article.source}
//         </p>
//         <p>
//           <strong>Website:</strong>{" "}
//           <a href={article.url} target="_blank" rel="noopener noreferrer">
//             {article.url}
//           </a>
//         </p>
//         <p>{article.content}</p>
//         <button onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// };

// export default NewsSummary;

import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsSummary = ({ article, onClose }) => {
  const [processedContent, setProcessedContent] = useState(""); // State to hold processed content

  useEffect(() => {
    const fetchProcessedContent = async () => {
      try {
        const response = await axios.post("http://localhost:5002/process", {
          website: article.url, // Send the article URL to the backend
        });
        setProcessedContent(response.data.paraphrased_content); // Update state with the returned content
      } catch (error) {
        console.error("Error fetching processed content:", error);
      }
    };

    fetchProcessedContent(); // Call the function to fetch processed content
    // }, [article.url]); // Dependency array includes article.url to trigger the effect when it changes
  }, []); // Dependency array includes article.url to trigger the effect when it changes

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{article.title}</h2>
        <p>{processedContent}</p> {/* Display the processed content */}
        <p>
          <strong>Source:</strong> {article.source}
        </p>
        <p>
          <strong>Website:</strong>{" "}
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {article.url}
          </a>
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default NewsSummary;
