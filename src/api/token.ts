import { APIGatewayProxyHandler } from 'aws-lambda';
import querystring from 'querystring';
import AWS from 'aws-sdk';
import { v4 } from 'uuid';

export const validationBodyRequest = (body : any) => {
  if (typeof body === 'undefined' || body === null || Object.keys(body).length === 0) {
    throw new Error('request is not valid');
  }

  const keys = [ 'card_number', 'cvv', 'expiration_month', 'expiration_year', 'email' ];

  for (const key of keys) {
    if (body[key] === null || !body[key]) {
      throw new Error(`${key} is not valid`);
    }
  }
  if (body.card_number.length > 16 || body.card_number.length < 13) {
    throw new Error('card_number is not valid');
  }
  if (body.cvv.length > 4 || body.cvv.length < 3) {
    throw new Error('cvv is not valid');
  }
  if (typeof body.expiration_month !== 'string' || body.expiration_month.length > 2 || body.expiration_month.length < 1 || parseInt(body.expiration_month) < 1 || parseInt(body.expiration_month) > 12) {
    throw new Error('expiration_month is not valid');
  }
  if (typeof body.expiration_year !== 'string' || body.expiration_year.length !== 4 || parseInt(body.expiration_year) < 2022 || parseInt(body.expiration_year) > 2027) {
    throw new Error('expiration_year is not valid');
  }

  if (typeof body.email !== 'string' || body.email.length < 5 || body.email.length > 100) {
    throw new Error('email is not valid');
  }
  if (body.email.split('@')[1] !== 'hotmail.com' && body.email.split('@')[1] !== 'gmail.com' && body.email.split('@')[1] !== 'yahoo.es') {
    throw new Error('email is not valid');
  }
  return body;
};

export const saveOnBD = async(request: any) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const createdAt = new Date();
  const id = v4();
  const token = v4().replaceAll('-', '').slice(0, 16);

  const timeToLive = createdAt.getTime() + 15 * 60 * 1000;

  const card = {
    ...request,
    id: id,
    createdAt: createdAt,
    token: token,
    timeToLive: timeToLive
  };

  await dynamodb.put({
    TableName: 'CreditCard',
    Item: card
  }).promise();

  return token;
};

export const createToken: APIGatewayProxyHandler = async(event) => {
  try {
    const bodyParse: any = querystring.parse(event.body || '{}');
    const body = validationBodyRequest(bodyParse);
    const token = await saveOnBD(body);
    return {
      statusCode: 200,
      body: JSON.stringify({
        value: {
          message: 'create token !!!',
          input: `token: ${token}`
        },
        replacer: null,
        space: 2
      })
    };
  } catch (error: any) {
    return {
      statusCode: 402,
      body: JSON.stringify({
        value: {
          message: error.message,
          input: 'response'
        },
        replacer: null,
        space: 2
      })
    };
  }
};
