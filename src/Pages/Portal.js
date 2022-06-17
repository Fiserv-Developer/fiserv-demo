import React, { useState } from 'react'
import Dashboard from '../Components/Dashboard/Dashboard';

export default function Portal() {
  const localApiKey = "apiKey";
  const [apiKey, setApiKey] = useState(() => {
    const apiKey = localStorage.getItem(localApiKey);
    if (apiKey) {
      return apiKey;
    } else {
      return "";
    }
  });

  return (
    <Dashboard apiKey={apiKey} />
  );
}
