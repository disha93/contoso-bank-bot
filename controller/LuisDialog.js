var builder = require('botbuilder');
var account = require("./AccountDetails");
var exchange = require("./ExchangeRate");

exports.startDialog = function (bot) {
    
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/467670cf-0d7c-4d93-ac98-5720a46b828d?subscription-key=3788f73073d141a0a51568b244b34c54&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);
 
    //Welcome by bot
    bot.dialog('WelcomeIntent', function (session, args){
        // Insert logic here later
        session.send("Hi, I'm ContosoBot. If you need assistance, you can ask me a question, however if you would like to speak to one of our representatives over the phone, please press the botton TALK TO HUMAN below.");
        //please enter your contact number and a Contoso Bank representaive will contact you shortly. 
     }).triggerAction({
         matches: 'WelcomeIntent'
     });

     bot.dialog('getAccount', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["fullName"]) {
                builder.Prompts.text(session, "Enter your full name to retrieve your account:");                
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
            //if (!isAttachment(session)) {
                if (results.response) {
                    session.conversationData["fullName"] = results.response;
                }
                session.send("Retrieving your account details...");
                account.displayAccountDetails(session, session.conversationData["fullName"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
           // }
        }
    ]).triggerAction({
        matches: 'getAccount'
    });


    bot.dialog('getContact', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["fullName"]) {
                builder.Prompts.text(session, "Enter your full name to retrieve your account:");                
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
            //if (!isAttachment(session)) {

                if (results.response) {
                    session.conversationData["fullName"] = results.response;
                }

                session.send("Retrieving your contact details...");
                displayAccountDetails.displayContactDetails(session, session.conversationData["fullName"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
            //}
        }
    ]).triggerAction({
        matches: 'getContact'
    });


    bot.dialog('addContact', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["fullName"]) {
                builder.Prompts.text(session, "Enter your full name to retrieve your account:");                
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
            //if (!isAttachment(session)) {

                if (results.response) {
                    session.conversationData["fullName"] = results.response;
                }
                // Pulls out the food entity from the session if it exists
                var contactEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'contact');
    
                // Checks if the food entity was found
                if (contactEntity) {
                    session.send('Thanks for adding \'%s\' as your contact number', contactEntity.entity);
                    account.sendContactDetails(session, session.conversationData["fullName"], contactEntity.entity); // <-- LINE WE WANT
    
                } else {
                    session.send("This is not a valid contact number");
                }
           // }
        }
    ]).triggerAction({
        matches: 'addContact'
    });


    bot.dialog('DeleteContact', [
        function (session, args, next) {
            session.dialogData.args = args || {};
            if (!session.conversationData["fullName"]) {
                builder.Prompts.text(session, "Enter your full name to retrieve your account:");
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results,next) {
        //if (!isAttachment(session)) {

            session.send("You want to delete one of your contact numbers.");

            // Pulls out the food entity from the session if it exists
            var contactEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'contact');

            // Checks if the for entity was found
            if (contactEntity) {
                session.send('Deleting \'%s\'...', contactEntity.entity);
                account.deleteContactDetails(session,session.conversationData['fullName'],contactEntity.entity); //<--- CALLL WE WANT
            } else {
                session.send("No contact number identified! Please try again");
            }
        //}
    }
    ]).triggerAction({
    matches: 'DeleteContact'
    });


    bot.dialog('getExchangeRates', [function (session, args) {
        var currencyEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'currency');
        //console.log(currencyEntity + "+++++++++++++++++++++++++++++++++++=");
        if (currencyEntity) {
            session.send('Calculating exchange rate for %s...' , currencyEntity.entity);
            exchange.displayExchange(session, currencyEntity.entity );
        } else {
            session.send("Currency could not be identified! Please try again");
        }
    }

    ]).triggerAction({
        matches: 'getExchangeRates'
    }); 


}
