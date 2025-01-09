export const debounce = (callback, timeout = 100) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { callback(...args) }, timeout);
  };
}          