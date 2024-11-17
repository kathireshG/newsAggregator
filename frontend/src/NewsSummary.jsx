import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsSummary = ({ article, onClose }) => {
  const [processedContent, setProcessedContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProcessedContent = async () => {
      try {
        const response = await axios.post("http://localhost:5002/process", {
          website: article.url,
        });
        setProcessedContent(response.data.paraphrased_content);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching processed content:");

        setLoading(false);
      }
    };

    fetchProcessedContent();
  }, [article.url]);

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2 style={{ marginBottom: "10px" }}>{article.title}</h2>
        {loading ? (
          <img src="/loading.gif" alt="Loading..." />
        ) : (
          <p>{processedContent}</p>
        )}
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
