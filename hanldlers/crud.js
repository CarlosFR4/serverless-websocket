'use strict';
const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB.DocumentClient()

let send = undefined;

function init(event) {
    console.log(event)
  	const apigwManagementApi = new AWS.ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint: event.requestContext.domainName + '/' + event.requestContext.stage
    });
    send = async (connectionId, data) => {
        await apigwManagementApi.postToConnection({
            ConnectionId: connectionId,
            Data: data
        }).promise();
    }
}

function getConnections() {
    return ddb.scan({
        TableName: 'User',
    }).promise();
}

function onCrud (event) {
    init(event);
    let message = JSON.parse(event.body).message
    getConnections().then((data) => {
        console.log(data.Items);
        data.Items.forEach(function(connection) {
            if (connection.id != event.requestContext.connectionId)
                send(connection.id, JSON.stringify(message));
        });
    });
    return {}
};

module.exports = {
    onCrud
}