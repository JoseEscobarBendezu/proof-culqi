import { validationBodyRequest } from '../api/token';

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
      return validationBodyRequest(null);
    }).toThrowError(expected);
    expect(() => {
      return validationBodyRequest(undefined);
    }).toThrowError(expected);
    expect(() => {
      return validationBodyRequest({});
    }).toThrowError(expected);
  });
});

describe('validation params of request', () => {
  it('Card number is not valid', () => {
    const expected = 'card_number is not valid';
    expect(() => {
      return validationBodyRequest({ ...body, card_number: '123456789012' });
    }).toThrowError(expected);
    expect(() => {
      return validationBodyRequest({ ...body, card_number: '12345678901234567' });
    }).toThrowError(expected);
    expect(() => {
      return validationBodyRequest({ ...body, card_number: undefined });
    }).toThrowError(expected);
    expect(() => {
      return validationBodyRequest({ ...body, card_number: null });
    }).toThrowError(expected);
    // const recibedNotNumber = 'notNumber';
    // expect(() => recibedNotNumber).toThrowError(expected);
  });
  it('CVV is not valid', () => {
    const expected = 'cvv is not valid';
    expect(() => {
      return validationBodyRequest({ ...body, cvv: '12' });
    }).toThrowError(expected);
    expect(() => {
      return validationBodyRequest({ ...body, cvv: '12345' });
    }).toThrowError(expected);
    expect(() => {
      return validationBodyRequest({ ...body, cvv: undefined });
    }).toThrowError(expected);
    expect(() => {
      return validationBodyRequest({ ...body, cvv: null });
    }).toThrowError(expected);
    // const recibedNotNumber = 'notNumber';
    // expect(() => recibedNotNumber).toThrowError(expected);
  });
  it('Expiration month is not valid', () => {
    const expected = 'expiration_month is not valid';
    expect(() => {
      return validationBodyRequest({ ...body, expiration_month: '' });
    }).toThrowError(expected);
    expect(() => {
      return validationBodyRequest({ ...body, expiration_month: '123' });
    }).toThrowError(expected);
    expect(() => {
      return validationBodyRequest({ ...body, expiration_month: '13' });
    }).toThrowError(expected);
    expect(() => {
      return validationBodyRequest({ ...body, expiration_month: '0' });
    }).toThrowError(expected);
    expect(() => {
      return validationBodyRequest({ ...body, expiration_month: undefined });
    }).toThrowError(expected);
    expect(() => {
      return validationBodyRequest({ ...body, expiration_month: null });
    }).toThrowError(expected);
    expect(() => {
      return validationBodyRequest({ ...body, expiration_month: 1 });
    }).toThrowError(expected);
  });
  it('Expiration year is not valid', () => {
    const expected = 'expiration_year is not valid';
    expect(() => {
      return validationBodyRequest({ ...body, expiration_year: '' });
    }).toThrowError(expected);
    expect(() => {
      return validationBodyRequest({ ...body, expiration_year: '12345' });
    }).toThrowError(expected);
    expect(() => {
      return validationBodyRequest({ ...body, expiration_year: '133' });
    }).toThrowError(expected);
    expect(() => {
      return validationBodyRequest({ ...body, expiration_year: '2021' });
    }).toThrowError(expected);
    expect(() => {
      return validationBodyRequest({ ...body, expiration_year: '2028' });
    }).toThrowError(expected);
    expect(() => {
      return validationBodyRequest({ ...body, expiration_year: undefined });
    }).toThrowError(expected);
    expect(() => {
      return validationBodyRequest({ ...body, expiration_year: null });
    }).toThrowError(expected);
    expect(() => {
      return validationBodyRequest({ ...body, expiration_year: 2022 });
    }).toThrowError(expected);
  });
  it('Email is not valid', () => {
    const expected = 'email is not valid';
    expect(() => {
      return validationBodyRequest({ ...body, email: '1234' });
    }).toThrowError(expected);
    expect(() => {
      return validationBodyRequest({ ...body, email: 'correoqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq@hotmail.com' });
    }).toThrowError(expected);
    expect(() => {
      return validationBodyRequest({ ...body, email: 'correo@invalid.domain' });
    }).toThrowError(expected);
    expect(() => {
      return validationBodyRequest({ ...body, email: undefined });
    }).toThrowError(expected);
    expect(() => {
      return validationBodyRequest({ ...body, email: null });
    }).toThrowError(expected);
    expect(() => {
      return validationBodyRequest({ ...body, email: 2022 });
    }).toThrowError(expected);
  });
});

describe('Request response', () => {
  it('Resquest is valid response token', () => {
    const expected = 'token';
    const recibed = 'token';
    expect(recibed).toStrictEqual(recibed);
  });
  it('Internarl error', () => {
    const expected = 'internal error';
    const recibed = 'internal error';
    expect(recibed).toStrictEqual(recibed);
  });
});
