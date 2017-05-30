const safeJsonParse = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return typeof str === 'object' ? str : {};
  }
};

module.exports = safeJsonParse;
