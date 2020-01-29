'use strict';
const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB.DocumentClient()

function addUser(connectionId) {
    return ddb.put({
        TableName: 'User',
        Item: {
            id: connectionId
        },
    }).promise();
}

function onConnect(event, context, callback) {
    const connectionId = event.requestContext.connectionId;
    addUser(connectionId).then(() => {
        callback(null, {
            statusCode: 200,
        })
    });
}

module.exports = {
    onConnect
}