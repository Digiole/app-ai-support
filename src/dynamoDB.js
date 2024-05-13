import { DynamoDBDocumentClient, GetCommand, UpdateCommand, QueryCommand, PutCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

//import { v4 as uuidv4 } from 'uuid';

const marshallOptions = {
  // Whether to automatically convert empty strings, blobs, and sets to `null`.
  convertEmptyValues: false, // false, by default.
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: false, // false, by default.
  // Whether to convert typeof object to map attribute.
  convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  // * This allows for the safe round-trip transport of numbers of arbitrary size.
  wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };



const credentials = {
  credentials: {
    accessKeyId: process.env.MY_ACCESS_KEY,
    secretAccessKey: process.env.MY_SECRET_KEY

  },
  region: process.env.MY_REGION,
};

console.log("CREDS ", credentials);

const dbclient = new DynamoDBClient(credentials);
// Create the DynamoDB Document client.
const ddbDocClient = DynamoDBDocumentClient.from(dbclient, translateConfig);



export const getUserKnowledgebase = (knowledgebaseId) => {
  try {
    const params = {
      TableName: process.env.AI_SUPPORT_USERS_TABLE,
      IndexName: "knowledgebaseId-index", // Your Global Secondary Index name
      KeyConditionExpression: "knowledgebaseId = :indexId",
      ExpressionAttributeValues: {
        ":indexId": knowledgebaseId
      },

    };

    console.log("GET USER KNOWLEDGEBASE ", params);
    const command = new QueryCommand(params);
    return ddbDocClient.send(command);

  } catch (error) {
    console.error("Error querying DynamoDB", JSON.stringify(error, true, 2));
    throw error; // Rethrow or handle error as needed
  }
}
export const getUser = (userId) => {
  try {

    const params = {
      TableName: process.env.AI_SUPPORT_USERS_TABLE,
      Key: {
        userId
      },
    };

    console.log("GET USER ", params);
    const command = new GetCommand(params);

    return ddbDocClient.send(command);
  } catch (err) {
    console.error("Error", err);

    // Rethrow the error to ensure it is captured...
    throw err;
  }
}


export const updateSpeakToUser = (userId, data) => {

  try {
    const currentTime = new Date().toISOString();
    const params = {
      TableName: process.env.AI_SUPPORT_USERS_TABLE,
      Key: {
        userId
      },
      UpdateExpression: 'set #modifiedAt = :modifiedAt',
      ExpressionAttributeValues: {
        ':modifiedAt': currentTime
      },
      ExpressionAttributeNames: {
        '#modifiedAt': "modified_at"
      },
      ReturnValues: "ALL_NEW",
    };

    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach(key => {
        params.UpdateExpression += `, #${key} = :${key}`;
        params.ExpressionAttributeNames[`#${key}`] = key;
        params.ExpressionAttributeValues[`:${key}`] = data[key];
      });
    }

    console.log("UPDATE SPEAKER USER ", params);

    const command = new UpdateCommand(params);
    //return Promise.resolve(true);
    return ddbDocClient.send(command);
  } catch (err) {
    console.error("Error", err);
    // Rethrow the error to ensure it is captured...
    throw err;
  }
}
