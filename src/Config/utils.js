export function getValueOrDefault(key, defaultValue) {
  const value = localStorage.getItem(key);
  if (value) {
    return value;
  } else {
    return defaultValue;
  }
}

export function fetchWithRetry(url, options = {}, attempts = 3) {
  return fetch(url, options).then(response => {
    if (response.ok) {
      return response.json();
    } else if (attempts > 1) {
      // todo add backoff
      return fetchWithRetry(url, options, attempts - 1); 
    } else {
      return Promise.reject(response.json());
    }
  });
}