import { searchCardOnDB } from '../api/card';
import { validToken } from '../utils/validators';
import AWS from 'aws-sdk';

AWS.config.update({ region: 'us-east-1' });

const mockDynamoDbScan = jest.fn().mockImplementation(() => {
  return {
    promise: () => {
      return Promise.resolve({});
    }
  };
});

jest.doMock('aws-sdk', () => {
  return {
    DynamoDB: jest.fn(() => {
      return {
        DocumentClient: jest.fn(() => {
          return {
            scan: mockDynamoDbScan
          };
        })
      };
    })
  };
});


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

  test('token is valid and dont exist in database', async() => {
    const expected = 'token is not found';
    try {
      const response = await searchCardOnDB('1234567890123456');
    } catch (error:any) {
      expect(error.message).toStrictEqual(expected);
    }
  });
});
