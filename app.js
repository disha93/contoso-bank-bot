// Author: Shomal Dass

var restify = require('restify');
var botBuilder = require('botbuilder');
var luis = require('./controller/LuisDialog');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Creates a chat connector for communicating with the Bot Framework Service
var connector = new botBuilder.ChatConnector({
    //Add MS credentials
    appId: "a33f8de1-db61-4ab3-a945-4153063294f0",
    appPassword: "VSW9900{(xvmbiuhNTSS1:]"
    //appId: process.env.MICROSOFT_APP_ID,
    //appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond to each message appropriately.
var bot = new botBuilder.UniversalBot(connector, function (session) {
    session.send('Sorry, I did not understand \'%s\'. Type \'help\' if you need assistance.', session.message.text);
});
luis.startDialog(bot);