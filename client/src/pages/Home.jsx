import React, { useState, useEffect } from "react";
import { fetchAllNews } from "../api";
import NewsCard from "../components/NewsCard";
import NewsModal from "../components/NewsModel"; // Import the modal
import "./Home.css";

const Home = () => {
  const [news, setNews] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null); // State for the selected article

  useEffect(() => {
    fetchAllNews()
      .then((response) => setNews(response.data))
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  return (
    <>
      <section className="news-section">
        <h2 className="section-title">Latest News</h2>
        <div className="news-grid">
          {news.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              onCardClick={setSelectedArticle} // Pass the click handler
            />
          ))}
        </div>
      </section>

      {/* Conditionally render the modal */}
      {selectedArticle && (
        <NewsModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </>
  );
};

export default Home;
