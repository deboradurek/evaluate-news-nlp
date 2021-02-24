import { checkForURL } from '../js/urlChecker';

describe('urlChecker tests', () => {
  describe('checkForURL function', () => {
    it('should return true if inputText is http', () => {
      expect(checkForURL('http://www.google.com/')).toBeTruthy();
    });

    it('should return true if inputText is https', () => {
      expect(checkForURL('https://www.google.com/')).toBeTruthy();
    });

    it('should return false if inputText is not a valid URL', () => {
      expect(checkForURL('htt://www.google.com/')).toBeFalsy();
    });
  });
});
