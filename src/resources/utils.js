function chopProperties(obj, properties) {
  const replacer = (key, value) => {
    if (properties.includes(key)) {
      return undefined;
    }
    return value;
  };

  return JSON.parse(JSON.stringify(obj, replacer));
}

module.exports = {
  chopProperties
};
