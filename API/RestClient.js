var request = require('request');


exports.getAccountDetails = function getData(url, session, fullName, callback){
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body, session, fullName);
        }
    });
};


exports.getContactDetails = function getData(url, session, fullName, callback){
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body, session, fullName);
        }
    });
};


exports.postContactDetails = function getData(url, fullName, contactNumber){
    var options = {
        url: url,
        method: 'POST',
        headers: {
            'ZUMO-API-VERSION': '2.0.0',
            'Content-Type':'application/json'
        },
        json: {
            "fullName" : fullName,
            "contactNumber" : contactNumber
        }
      };
      
      request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
        }
        else{
            console.log(error);
        }
      });
};


exports.deleteContactDetails = function deleteData(url,session, fullName ,contactNumber, id, callback){
    var options = {
        url: url + "\\" + id,
        method: 'DELETE',
        headers: {
            'ZUMO-API-VERSION': '2.0.0',
            'Content-Type':'application/json'
        }
    };

    request(options,function (err, res, body){
        if( !err && res.statusCode === 200){
            console.log(body);
            callback(body,session,fullName, contactNumber);
        }else {
            console.log(err);
            console.log(res);
        }
    })

};


exports.getExchangeRateData = function getData(url, session, currency, callback){
    request.get(url, function(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body, session, currency);
        }
    });
};


exports.postQnAResults = function getData(url, session, question, callback){
    var options = {
        url: url,
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': '062f67ee61b742579346c6b925156390',
            'Content-Type':'application/json'
        },
        json: {
            "question" : question
        }
      };
  
      request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            callback(body, session, question);
        }
        else{
            console.log(error);
        }
      });
  };