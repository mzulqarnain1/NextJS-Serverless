import * as AWS from 'aws-sdk';

const docClient = new AWS.DynamoDB.DocumentClient()
const swagTable = process.env.SWAG_REQUESTS_TABLE

export async function saveSwagRequest(newSwagRequest: object){
  await docClient.put({
    TableName: swagTable,
    Item: newSwagRequest
  }).promise()
}
