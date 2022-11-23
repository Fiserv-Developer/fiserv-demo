export function getValueOrDefault(key, defaultValue) {
  const value = localStorage.getItem(key);
  if (value) {
    return value;
  } else {
    return defaultValue;
  }
}

export async function fetchWithRetry(url, options = {}, attempts = 1) {
  const maxAttempts = 3;
  var wait = 500; // milliseconds

  return fetch(url, options).then(response => {
    if (response.ok) {
      return response.json();
    } else if (attempts <= maxAttempts) {
      if (attempts > 1) {
        wait = wait * 2; // double the wait between each attempt for backoff
      }
      return new Promise(res => { 
        setTimeout(res, wait); 
      }).then(() => { 
        return fetchWithRetry(url, options, attempts + 1);
      }); 
    } else {
      return Promise.reject(response.json());
    }
  });
}