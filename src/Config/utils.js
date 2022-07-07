export function getValueOrDefault(key, defaultValue) {
  const value = localStorage.getItem(key);
  if (value) {
    return value;
  } else {
    return defaultValue;
  }
}