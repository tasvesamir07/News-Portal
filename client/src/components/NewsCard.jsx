import React from "react";
import "./NewsCard.css";

const NewsCard = ({ article, onCardClick }) => {
  // Truncate summary for card view
  const shortSummary =
    article.summary.length > 100
      ? article.summary.substring(0, 100) + "..."
      : article.summary;

  return (
    // The entire card is now clickable
    <div className="news-card" onClick={() => onCardClick(article)}>
      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.title}
          className="news-image"
          referrerpolicy="no-referrer"
        />
      )}
      <div className="news-content">
        <h3 className="news-title">{article.title}</h3>
        {/* The summary is now displayed on the card */}
        <p className="news-summary">{shortSummary}</p>
        <div className="read-more-btn">Read More</div>
      </div>
    </div>
  );
};

export default NewsCard;
