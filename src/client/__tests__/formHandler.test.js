import 'regenerator-runtime/runtime';
import { requestAnalyseURL } from '../js/formHandler';

global.fetch = jest.fn();

const mockedResponse = {
  confidence: 'conf',
  subjectivity: 'subj',
  agreement: 'agre',
  irony: 'iron',
};

describe('formHandler tests', () => {
  describe('requestAnalyseURL function', () => {
    it('requestAnalyseURL should successfully return mockedResponse', async () => {
      expect.assertions(2);
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockedResponse),
        })
      );
      const result = await requestAnalyseURL();
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockedResponse);
    });

    it('requestAnalyseURL should fail', async () => {
      expect.assertions(1);
      const apiError = {
        error: 'API is down',
      };

      fetch.mockImplementationOnce(() => Promise.reject(apiError));
      try {
        await requestAnalyseURL();
      } catch (error) {
        expect(error).toEqual(apiError);
      }
    });
  });
});
