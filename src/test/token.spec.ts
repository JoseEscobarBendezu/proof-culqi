import { saveOnBD } from '../api/token';
import AWS from 'aws-sdk';
import { PutItemInput } from 'aws-sdk/clients/dynamodb';
import { CreditCard } from '../interfaces/creditCard';
import { calculateTimePerMin, createId, generateToken } from '../utils/validators';

jest.mock('../utils/validators');

const mockGenerateToken = generateToken as jest.Mock;
const mockCreateId = createId as jest.Mock;
const mockCalculateTimePerMin = calculateTimePerMin as jest.Mock;

AWS.config.update({ region: 'us-east-1' });


const mockDynamoDbPut = jest.fn().mockImplementation(() => {
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
            put: mockDynamoDbPut
          };
        })
      };
    })
  };
});


const card: CreditCard = {
  card_number: 12345678901234,
  cvv: 123,
  expiration_month: '12',
  expiration_year: '2023',
  email: 'correo@hotmail.com'
};

const mDynamoDb = new AWS.DynamoDB.DocumentClient();

describe('Request response', () => {
  it('Resquest is valid response token', async() => {
    const expected = 'fdc16320512f420c';
    mockCreateId.mockReturnValue('13989-1923890-asdjl');
    mockGenerateToken.mockReturnValue(expected);
    mockCalculateTimePerMin.mockReturnValue('90000');
    const response = await saveOnBD(card);
    expect(response).toEqual(expected);
  });

  it('Internal error', async() => {
    const expected = 'internal error on save credit card';
    mockCreateId.mockReturnValue(undefined);
    mockGenerateToken.mockReturnValue(undefined);
    mockCalculateTimePerMin.mockReturnValue(undefined);
    try {
      const response = await saveOnBD(card);
    } catch (error: any) {
      expect(error.message).toStrictEqual(expected);
    }
  });
});
