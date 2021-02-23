function checkForURL(inputText) {
  console.log('::: Running checkForURL :::', inputText);

  const urlRegex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  return urlRegex.test(inputText);
}

export { checkForURL };
