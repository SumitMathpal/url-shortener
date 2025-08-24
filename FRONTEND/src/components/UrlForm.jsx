import React, { useState } from "react";
import axios from "axios";
const UrlForm = () => {
  const [url, setValue] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handlerSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!validateUrl(url)) {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setCopied(false);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await axios.post(`${apiUrl}/api/create`, {
        url,
      });

      console.log("Short URL created:", response.data);
      setShortUrl(response.data);
      setError("");
    } catch (error) {
      console.error("Error:", error);
      setError(error.response?.data?.message || "Failed to create short URL");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const testRedirect = () => {
    window.open(shortUrl, "_blank");
  };
  return (
    <>
      <form
        className="flex flex-col gap-4 justify-center"
        onSubmit={handlerSubmit}
      >
        <input
          className="bg-white border-2 border-gray-300 rounded-lg p-2 w-100 w:sm-65 w:md-75"
          type="url"
          placeholder="https://www.example.com"
          value={url}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          required
        />
        {error && (
          <div className="text-red-500 text-sm mt-2 p-2 bg-red-50 rounded">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-blue-500 to-blue-200 hover:from-blue-700
               text-white font-bold py-2 px-4 rounded-lg
               w-[339px] sm:w-[375px] md:w-[395px] h-10
               transition-all duration-300 ease-in-out transform
               hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          {loading ? "Creating..." : "ShortnerUrl"}
        </button>
      </form>

      {shortUrl && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Short URL Created:</h3>
          <div className="flex items-center gap-2 mb-3">
            <input
              type="text"
              value={shortUrl}
              readOnly
              className="flex-1 p-2 border rounded bg-white w-[339px] w:sm-65 w:md-75 pr-10"
            />
            <button
              onClick={copyToClipboard}
              className={`px-4 py-2 text-white rounded transition-colors ${
                copied
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <button
            onClick={testRedirect}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Test Redirect
          </button>
        </div>
      )}
    </>
  );
};

export default UrlForm;
