var rest = require('../API/RestClient');
var builder = require('botbuilder');


exports.displayExchange = function getExchangeData(session, currency){
    currency = currency.toUpperCase();
    //console.log(currency + " currency")
    var url = " https://api.fixer.io/latest?symbols="+ currency;
    console.log(currency + "This is the currency")
    rest.getExchangeRateData(url, session, currency, handleExchangeDataResponse)
};


function handleExchangeDataResponse(message, session, currency) {
    var exchangeDataResponse = JSON.parse(message);

    var rate = exchangeDataResponse.rates[currency];
    console.log(exchangeDataResponse.rates[currency]+ "glbbbbbbbbbbbbbbbbb");
    for (var index in exchangeDataResponse.rates) {
        console.log(index + "ghfgjkjkkgk")
        console.log(exchangeDataResponse.rates[index]);
        var exchangeRate = exchangeDataResponse.rates[index];
        if(exchangeDataResponse.length - 1){
            rate.push(exchangeRate.toString());
        }
    }
    
    session.send("The exchange rate for %s is: %s", currency, rate);                
    
}