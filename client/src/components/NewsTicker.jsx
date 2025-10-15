import React, { useState, useEffect } from "react";
import { fetchTopNews } from "../api";
import "./NewsTicker.css";

const NewsTicker = () => {
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    fetchTopNews()
      .then((response) => setHeadlines(response.data))
      .catch((error) => console.error("Error fetching top news:", error));
  }, []);

  return (
    // The structure is now a flex container
    <div className="ticker-wrap">
      {/* The label is now its own element */}
      <div className="ticker-label">BREAKING NEWS</div>

      {/* The scrolling content has its own container */}
      <div className="ticker-content">
        <div className="ticker">
          {headlines.map((headline) => (
            <div className="ticker-item" key={headline.id}>
              {headline.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
