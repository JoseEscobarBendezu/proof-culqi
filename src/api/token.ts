import { APIGatewayProxyHandler } from 'aws-lambda';
import querystring from 'querystring';
import AWS from 'aws-sdk';
import {
  validationRequestBody,
  requestToken,
  createId,
  generateToken,
  calculateTimePerMin,
  response
} from '../utils/validators';
import { CreditCard } from '../interfaces/creditCard';

export const saveOnBD = async(request: CreditCard): Promise<any> => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const id = createId();
    const token = generateToken(16);
    const timeToLive = calculateTimePerMin(15);

    const card = {
      ...request,
      id: id,
      token: token,
      timeToLive: timeToLive
    };

    await dynamodb.put({
      TableName: 'CreditCard',
      Item: card
    }).promise();

    return token;
  } catch (error: any) {
    throw new Error('internal error on save credit card');
  }
};

export const createToken: APIGatewayProxyHandler = async(event) => {
  try {
    const bodyParse: any = querystring.parse(event.body || '{}');
    const body: CreditCard = validationRequestBody(bodyParse, requestToken);
    const token: string = await saveOnBD(body);
    return response(200, `token: ${token}`);
  } catch (error: any) {
    return response(402, error.message);
  }
};
