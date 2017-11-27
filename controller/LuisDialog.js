var builder = require('botbuilder');


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

    


}
