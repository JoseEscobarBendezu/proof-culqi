import { validationRequestBody, requestToken } from '../utils/validators';

const body = {
  card_number: '12345678901234',
  cvv: '123',
  expiration_month: '12',
  expiration_year: '2023',
  email: 'correo@hotmail.com'
};

describe('validation request body', () => {
  it('request is null, undefined or empty', () => {
    const expected = 'request is not valid';
    expect(() => {
      return validationRequestBody(null, requestToken);
    }).toThrowError(expected);
    expect(() => {
      return validationRequestBody(undefined, requestToken);
    }).toThrowError(expected);
    expect(() => {
      return validationRequestBody({}, requestToken);
    }).toThrowError(expected);
  });
});

describe('validation params of request', () => {
  it('Card number is not valid', () => {
    const expected = 'card_number is not valid';
    expect(() => {
      return validationRequestBody({ ...body, card_number: '123456789012' }, requestToken);
    }).toThrowError(expected);
    expect(() => {
      return validationRequestBody({ ...body, card_number: '12345678901234567' }, requestToken);
    }).toThrowError(expected);
    expect(() => {
      return validationRequestBody({ ...body, card_number: undefined }, requestToken);
    }).toThrowError(expected);
    expect(() => {
      return validationRequestBody({ ...body, card_number: null }, requestToken);
    }).toThrowError(expected);
  });
  it('CVV is not valid', () => {
    const expected = 'cvv is not valid';
    expect(() => {
      return validationRequestBody({ ...body, cvv: '12' }, requestToken);
    }).toThrowError(expected);
    expect(() => {
      return validationRequestBody({ ...body, cvv: '12345' }, requestToken);
    }).toThrowError(expected);
    expect(() => {
      return validationRequestBody({ ...body, cvv: undefined }, requestToken);
    }).toThrowError(expected);
    expect(() => {
      return validationRequestBody({ ...body, cvv: null }, requestToken);
    }).toThrowError(expected);
  });
  it('Expiration month is not valid', () => {
    const expected = 'expiration_month is not valid';
    expect(() => {
      return validationRequestBody({ ...body, expiration_month: '' }, requestToken);
    }).toThrowError(expected);
    expect(() => {
      return validationRequestBody({ ...body, expiration_month: '123' }, requestToken);
    }).toThrowError(expected);
    expect(() => {
      return validationRequestBody({ ...body, expiration_month: '13' }, requestToken);
    }).toThrowError(expected);
    expect(() => {
      return validationRequestBody({ ...body, expiration_month: '0' }, requestToken);
    }).toThrowError(expected);
    expect(() => {
      return validationRequestBody({ ...body, expiration_month: undefined }, requestToken);
    }).toThrowError(expected);
    expect(() => {
      return validationRequestBody({ ...body, expiration_month: null }, requestToken);
    }).toThrowError(expected);
    expect(() => {
      return validationRequestBody({ ...body, expiration_month: 1 }, requestToken);
    }).toThrowError(expected);
  });
  it('Expiration year is not valid', () => {
    const expected = 'expiration_year is not valid';
    expect(() => {
      return validationRequestBody({ ...body, expiration_year: '' }, requestToken);
    }).toThrowError(expected);
    expect(() => {
      return validationRequestBody({ ...body, expiration_year: '12345' }, requestToken);
    }).toThrowError(expected);
    expect(() => {
      return validationRequestBody({ ...body, expiration_year: '133' }, requestToken);
    }).toThrowError(expected);
    expect(() => {
      return validationRequestBody({ ...body, expiration_year: '2021' }, requestToken);
    }).toThrowError(expected);
    expect(() => {
      return validationRequestBody({ ...body, expiration_year: '2028' }, requestToken);
    }).toThrowError(expected);
    expect(() => {
      return validationRequestBody({ ...body, expiration_year: undefined }, requestToken);
    }).toThrowError(expected);
    expect(() => {
      return validationRequestBody({ ...body, expiration_year: null }, requestToken);
    }).toThrowError(expected);
    expect(() => {
      return validationRequestBody({ ...body, expiration_year: 2022 }, requestToken);
    }).toThrowError(expected);
  });
  it('Email is not valid', () => {
    const expected = 'email is not valid';
    expect(() => {
      return validationRequestBody({ ...body, email: '1234' }, requestToken);
    }).toThrowError(expected);
    expect(() => {
      return validationRequestBody({ ...body, email: 'correoqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq@hotmail.com' }, requestToken);
    }).toThrowError(expected);
    expect(() => {
      return validationRequestBody({ ...body, email: 'correo@invalid.domain' }, requestToken);
    }).toThrowError(expected);
    expect(() => {
      return validationRequestBody({ ...body, email: undefined }, requestToken);
    }).toThrowError(expected);
    expect(() => {
      return validationRequestBody({ ...body, email: null }, requestToken);
    }).toThrowError(expected);
    expect(() => {
      return validationRequestBody({ ...body, email: 2022 }, requestToken);
    }).toThrowError(expected);
  });
});
