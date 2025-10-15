import React from "react";
import "./NewsModel.css";

const NewsModal = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {article.image_url && (
          <img
            src={article.image_url}
            alt={article.title}
            className="modal-image"
            referrerpolicy="no-referrer"
          />
        )}
        <h2 className="modal-title">{article.title}</h2>
        <p className="modal-summary">{article.summary}</p>
        <a
          href={article.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="modal-read-more"
        >
          Read Full Story
        </a>
      </div>
    </div>
  );
};

export default NewsModal;
