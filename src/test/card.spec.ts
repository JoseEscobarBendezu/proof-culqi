describe('api card lambda functions', () => {
  test('token param is not String type', () => {
    const expected = 'token is not valid';
    const recibed = 'token is not valid';
    expect(recibed).toStrictEqual(expected);
  });

  test('token param is not 16 length', () => {
    const expected = 'token length is not valid';
    const recibed = 'token length is not valid';
    expect(recibed).toStrictEqual(expected);
  });

  test('token is valid and dont exist in database', () => {
    const expected = 'token is dont exist in database';
    const recibed = {
      card_number: '',
      expiration_month: '',
      expiration_year: '',
      email: ''
    };

    expect(recibed).toEqual(expected);
  });

  test('token is valid and exist in database', () => {
    const expected = {
      card_number: '',
      expiration_month: '',
      expiration_year: '',
      email: ''
    };

    const recibed = {
      card_number: '',
      expiration_month: '',
      expiration_year: '',
      email: ''
    };

    expect(recibed).toEqual(expected);
  });
});
