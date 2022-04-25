import React, { useState, useEffect } from 'react'

export default function Home() {
  const localApiKey = "apiKey";
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const jsonValue = localStorage.getItem(localApiKey);
    const savedApiKey = JSON.parse(jsonValue);
    setApiKey(savedApiKey);
  }, [])

  useEffect(() => {
    localStorage.setItem(localApiKey, JSON.stringify(apiKey));
  }, [apiKey]);

  return (
    <div className="content">
      <div>Home</div>
      <label>Api Key (saved into local storage)<input type="text" name={localApiKey} value={apiKey} onChange={(e) => setApiKey(e.target.value)}/></label>
    </div>
  )
}
