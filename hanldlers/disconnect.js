'use strict';
const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB.DocumentClient()

function deleteUser(connectionId) {
    return ddb.delete({
        TableName: 'User',
        Key: {
            id: connectionId,
        },
    }).promise();
}

function onDisconnect(event, context, callback) {
    const connectionId = event.requestContext.connectionId;
    deleteUser(connectionId).then(() => {
        callback(null, {
            statusCode: 200,
        })
    });
}

module.exports = {
    onDisconnect
}