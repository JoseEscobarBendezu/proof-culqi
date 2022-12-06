describe('validation request body', () => {
  test('request is null, undefined or empty', () => {
    const expected = 'request is not valid';
    const recibedNull = null;
    expect(recibedNull).toStrictEqual(expected);
    const recibedUndefined = undefined;
    expect(recibedUndefined).toStrictEqual(expected);
    const recibedEmpty = {};
    expect(recibedEmpty).toStrictEqual(expected);
  });
  test('request with one param empty', () => {
    const expected = 'request is not valid';
    const recibed = {
      card_number: 'card_number',
      expiration_month: 'expiration_month',
      expiration_year: 'expiration_year',
      email: 'email'
    };
    expect(recibed).toStrictEqual(expected);
  });
});

describe('validation params of request', () => {
  test('Card number is not valid', () => {
    const expected = 'card_number is not valid';
    const recibedLess13 = 'card<13';
    expect(recibedLess13).toStrictEqual(expected);
    const recibedMore16 = 'card>26';
    expect(recibedMore16).toStrictEqual(expected);
    const recibedUndefined = undefined;
    expect(recibedUndefined).toStrictEqual(expected);
    const recibedNotNumber = 'notNumber';
    expect(recibedNotNumber).toStrictEqual(expected);
  });
  test('CVV is not valid', () => {
    const expected = 'cvv is not valid';
    const recibedLess3 = 'cvv<3';
    expect(recibedLess3).toStrictEqual(expected);
    const recibedMore4 = 'cvv>4';
    expect(recibedMore4).toStrictEqual(expected);
    const recibedUndefined = undefined;
    expect(recibedUndefined).toStrictEqual(expected);
    const recibedNotNumber = 'notNumber';
    expect(recibedNotNumber).toStrictEqual(expected);
  });
  test('Expiration month is not valid', () => {
    const expected = 'expiration_month is not valid';
    const recibedLenghtLess1 = 'expiration_month<1';
    expect(recibedLenghtLess1).toStrictEqual(expected);
    const recibedLengthMore2 = 'expiration_month>2';
    expect(recibedLengthMore2).toStrictEqual(expected);
    const recibedLess1 = 'expiration_month<1';
    expect(recibedLess1).toStrictEqual(expected);
    const recibedMore12 = 'expiration_month>2';
    expect(recibedMore12).toStrictEqual(expected);
    const recibedEmpty = '';
    expect(recibedEmpty).toStrictEqual(expected);
    const recibedUndefined = undefined;
    expect(recibedUndefined).toStrictEqual(expected);
    const recibedNotString = 'notString';
    expect(recibedNotString).toStrictEqual(expected);
  });
  test('Expiration year is not valid', () => {
    const expected = 'expiration_year is not valid';
    const recibedLenghtLess4 = 'expiration_year<4';
    expect(recibedLenghtLess4).toStrictEqual(expected);
    const recibedLengthMore4 = 'expiration_year>4';
    expect(recibedLengthMore4).toStrictEqual(expected);
    const recibedLessActualYear = 'expiration_year<2022';
    expect(recibedLessActualYear).toStrictEqual(expected);
    const recibedMoreActualYear5 = 'expiration_year>2027';
    expect(recibedMoreActualYear5).toStrictEqual(expected);
    const recibedEmpty = '';
    expect(recibedEmpty).toStrictEqual(expected);
    const recibedUndefined = undefined;
    expect(recibedUndefined).toStrictEqual(expected);
    const recibedNotString = 'notString';
    expect(recibedNotString).toStrictEqual(expected);
  });
  test('Email is not valid', () => {
    const expected = 'email is not valid';
    const recibedLenghtLess5 = 'email<5';
    expect(recibedLenghtLess5).toStrictEqual(expected);
    const recibedLengthMore100 = 'email>100';
    expect(recibedLengthMore100).toStrictEqual(expected);
    const recibedNotValidDomain = 'email@notvaliddomanin';
    expect(recibedNotValidDomain).toStrictEqual(expected);
    const recibedEmpty = '';
    expect(recibedEmpty).toStrictEqual(expected);
    const recibedUndefined = undefined;
    expect(recibedUndefined).toStrictEqual(expected);
    const recibedNotString = 'notString';
    expect(recibedNotString).toStrictEqual(expected);
  });
});

describe('Request response', () => {
  test('Resquest is valid response token', () => {
    const expected = 'token';
    const recibed = 'token';
    expect(recibed).toStrictEqual(recibed);
  });
  test('Internarl error', () => {
    const expected = 'internal error';
    const recibed = 'internal error';
    expect(recibed).toStrictEqual(recibed);
  });
});
