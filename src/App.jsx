import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    if (!longUrl) {
      setError("Please enter a valid URL");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.shrtco.de/v2/shorten?url=${longUrl}`
      );
      setShortUrl(res.data.result.full_short_link);
    } catch (err) {
      setError("Failed to shorten URL. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ Top-right Navigation bar */}
      <nav className="navbar">
        <ul>
          <li>My URLs</li>
          <li>Plans</li>
          <li>Blog</li>
          <li>Features ▼</li>
          <li>Sign Up</li>
          <li>Sign In</li>
        </ul>
      </nav>

      {/* ✅ Centered URL Shortener */}
      <div className="container">
        <h1 className="title">URL Shortener</h1>
        <form onSubmit={handleSubmit} className="form-box">
          <input
            type="url"
            placeholder="Enter long URL here"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {shortUrl && (
          <div className="result">
            <p>✅ Shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
