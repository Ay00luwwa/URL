"use client";

import React, { useState } from "react";

export default function URLShortener() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setShortenedUrl("");

    try {
      const response = await fetch("http://localhost:9000/api/shorten/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ original_url: originalUrl }), // Use correct field name
      });

      if (!response.ok) {
        const errorData = await response.json(); // Get error details if available
        throw new Error(errorData.error || "Failed to shorten URL");
      }

      const data = await response.json();
      console.log('Response Data:', data); // Log the response data for debugging
      setShortenedUrl(data.short_url); // Ensure this matches your serializer's output
    } catch (err) {
      setError("Failed to shorten URL. Please try again.");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex flex-col justify-center items-center px-4">
      <main className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          URL Shortener
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Enter a long URL to get a shortened version
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="https://example.com/very/long/url"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 bg-purple-600 text-white rounded-md transition duration-300 ease-in-out ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
            }`}
          >
            {isLoading ? "Shortening..." : "Shorten URL"}
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        {shortenedUrl && (
          <div className="mt-8 p-4 bg-gray-100 rounded-md">
            <p className="text-gray-700 mb-2">Shortened URL:</p>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={shortenedUrl}
                readOnly
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none"
              />
              <button
                onClick={copyToClipboard}
                className={`px-4 py-2 rounded-md transition duration-300 ease-in-out ${
                  copied ? "bg-green-500 text-white" : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
