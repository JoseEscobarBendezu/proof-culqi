import { APIGatewayProxyHandler } from 'aws-lambda';
import AWS from 'aws-sdk';

export const validToken = (token: string) => {
  if (token.length !== 16) {
    throw new Error('token is not valid');
  }
  return token;
};

export const searchCardOnDB = async(token: string) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const time = new Date().getTime();

  const result = await dynamodb.scan({
    TableName: 'CreditCard',
    FilterExpression : '#timeToLive >= :timeToLive AND #token = :token ',
    ExpressionAttributeNames: { '#timeToLive': 'timeToLive', '#token':'token' },
    ExpressionAttributeValues: {
      ':token': token,
      ':timeToLive': time
    }
  }).promise();

  if (!result.Items || result.Items.length === 0) {
    throw new Error('token is not found');
  }
  const {
    expiration_year,
    expiration_month,
    card_number,
  } = result.Items[0];
  return {
    expiration_year: expiration_year,
    expiration_month: expiration_month,
    card_number: card_number
  };
};

export const getCard: APIGatewayProxyHandler = async(event) => {
  try {
    if (!event.pathParameters || !event.pathParameters.token) {
      throw new Error('Not provide token');
    }
    const token = validToken(event.pathParameters.token);
    const card = await searchCardOnDB(token);
    return {
      statusCode: 200,
      body: JSON.stringify({
        value: {
          message: 'card finded !!!',
          input: `Credit Card: ${JSON.stringify(card)}`
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
