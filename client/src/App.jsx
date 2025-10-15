import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import NewsTicker from "./components/NewsTicker";
import Home from "./pages/Home";
import Category from "./pages/Category";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <NewsTicker />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryName" element={<Category />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
