import { v4 } from 'uuid';

export const createId = () => {
  return v4();
};

export const calculateTimePerMin = (minutes: number) => {
  const createdAt = new Date();
  return createdAt.getTime() + minutes * 60 * 1000;
};

export const generateToken = (length: number) => {
  return v4().replaceAll('-', '').slice(0, length);
};

const isType = (value: any, type: string): boolean => {
  if (typeof value !== 'string') {
    return false;
  }
  if (type === 'number') {
    return !isNaN(parseInt(value)) && !isNaN(parseFloat(value));
  }
  return true;
};

const lengthValid = (value: string, [ min, max ]: [number, number]): boolean => {
  if (value.length < min || value.length > max) {
    return false;
  }
  return true;
};

const rangeValid = (value: string, [ min, max ]: [number, number]): boolean => {
  if (!isType(value, 'number')) {
    return false;
  }
  const valueNumber = parseInt(value);
  if (valueNumber < min || valueNumber > max) {
    return false;
  }
  return true;
};

export const requestToken = {
  card_number: (attribute: string): number | boolean => {
    const isNumber = isType(attribute, 'number');
    const isLengthValid = lengthValid(attribute, [ 13, 16 ]);
    if (!isNumber || !isLengthValid) {
      return false;
    }
    return parseInt(attribute);
  },
  cvv: (attribute: string): number | boolean => {
    const isNumber = isType(attribute, 'number');
    const isLengthValid = lengthValid(attribute, [ 3, 4 ]);
    if (!isNumber || !isLengthValid) {
      return false;
    }
    return parseInt(attribute);
  },
  expiration_month: (attribute: string): string | boolean => {
    const isLengthValid = lengthValid(attribute, [ 1, 2 ]);
    const isRangeValid = rangeValid(attribute, [ 1, 12 ]);
    if (!isRangeValid || !isLengthValid) {
      return false;
    }
    return attribute;
  },
  expiration_year: (attribute: string): string | boolean => {
    const isLengthValid = attribute.length === 4;
    const actualYear = new Date().getFullYear();
    const isRangeValid = rangeValid(attribute, [ actualYear, actualYear + 5 ]);
    if (!isRangeValid || !isLengthValid) {
      return false;
    }
    return attribute;
  },
  email: (attribute: string): string | boolean => {
    const isLengthValid = lengthValid(attribute, [ 5, 100 ]);
    const regex = /(aol|gmail\.com|yahoo\.es|hotmail\.com)$/;
    const isRegexValid = regex.test(attribute);
    if (!isRegexValid || !isLengthValid) {
      return false;
    }
    return attribute;
  },
};

export const validationRequestBody = (body: any, validator: any) => {
  try {
    if (body === null || body === undefined || Object.keys(body).length === 0) {
      throw new Error('request is not valid');
    }
    const structure: any = {};
    for (const element in validator) {
      if (body[element] === null || body[element] === undefined) {
        throw new Error(`${element} is not valid`);
      }
      const attribute: string = body[element];
      const elementValidated = validator[element](attribute);
      if (elementValidated === false) {
        throw new Error(`${element} is not valid`);
      }
      structure[element] = elementValidated;
    }
    return structure;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const validToken = (token: string | undefined): string => {
  if (token === undefined) {
    throw new Error('Not provide token');
  }
  if (token.length !== 16) {
    throw new Error('token is not valid');
  }
  return token;
};

export const response = (status: number, message: string) => {
  return {
    statusCode: status,
    body: JSON.stringify({
      value: {
        message: message,
        input: 'serverless response'
      },
      replacer: null,
      space: 2
    })

  };
};
