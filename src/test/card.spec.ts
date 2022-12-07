import { validToken, searchCardOnDB } from '../api/card';

describe('api card lambda functions', () => {
  test('token param is not 16 length', () => {
    const expected = 'token is not valid';
    expect(() => {
      return validToken('');
    }).toThrowError(expected);
    expect(() => {
      return validToken('12345678901234567');
    }).toThrowError(expected);
  });
});
