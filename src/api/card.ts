import { APIGatewayProxyHandler } from 'aws-lambda';
import { response, validToken } from '../utils/validators';
import AWS from 'aws-sdk';
import { CreditCard } from '../interfaces/creditCard';

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
  const card = result.Items[0];

  return {
    expiration_year: card.expiration_year,
    expiration_month: card.expiration_month,
    card_number: card.card_number
  };
};

export const getCard: APIGatewayProxyHandler = async(event) => {
  try {
    const tokenParams: string | undefined = event.pathParameters?.token;
    const token: string = validToken(tokenParams);
    const card: CreditCard = await searchCardOnDB(token);
    return response(200, `Credit Card: ${JSON.stringify(card)}`);
  } catch (error: any) {
    return response(402, error.message);
  }
};
