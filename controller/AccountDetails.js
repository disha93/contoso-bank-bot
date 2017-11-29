var rest = require('../API/RestClient');

exports.displayAccountDetails = function getAccountDetails(session, username){
    var url = 'http://contosobankmsa2017app.azurewebsites.net/tables/BankBot';
    rest.getAccountDetails(url, session, username, handleAccountDetailsResponse)
};


function handleAccountDetailsResponse(message, session, fullName) {
    var accountDetailResponse = JSON.parse(message);
    var allDetails = [];
    for (var index in accountDetailResponse) {
        var fullnameReceived = accountDetailResponse[index].fullName;
        var customerNumber = accountDetailResponse[index].customerNumber;
        var accountType = accountDetailResponse[index].accountType;
        var accountNumber = accountDetailResponse[index].accountNumber;
        //session.send(customerNumber);
        if (fullName.toLowerCase() === fullnameReceived.toLowerCase()) {
            if(accountDetailResponse.length - 1) {
                allDetails.push('Customer Name: '+ customerNumber + '\n\nAccount Number: ' + accountNumber);
            }
            else {
                allDetails.push('Customer Name: '+ customerNumber + '\n\nAccount Number: ' + accountNumber + '\n\n');
            }
        }        
    }
    
    session.send("%s, your account details are: \n\n  %s \r\n", fullName, allDetails);                
    
}


exports.displayContactDetails = function getContactDetails(session, fullName){
    var url = 'http://contosobankmsa2017app.azurewebsites.net/tables/BankBot';
    rest.getContactDetails(url, session, fullName, handleContactDetailsResponse)
};


function handleContactDetailsResponse(message, session, fullName) {
    var contactDetailsResponse = JSON.parse(message);
    var allDetails = [];
    for (var index in contactDetailsResponse) {
        var fullNameReceived = contactDetailsResponse[index].fullName;
        var contactNumber = contactDetailsResponse[index].contactNumber;

        if (fullName.toLowerCase() === fullNameReceived.toLowerCase()) {
            if(contactDetailsResponse.length - 1) {
                allDetails.push(contactNumber);
            }
            else {
                allDetails.push(contactNumber + '\n\n');
            }
        }        
    }
    
    session.send("%s, your contact details are: %s", fullName, allDetails);                
    
}


exports.sendContactDetails = function postContactDetails(session, fullName, contactNumber){
    var url = 'http://contosobankmsa2017app.azurewebsites.net/tables/BankBot';
    rest.postContactDetails(url, fullName, contactNumber);
};


exports.deleteContactDetails = function deleteContactDetails(session,fullName,contactNumber){
    var url  = 'http://contosobankmsa2017app.azurewebsites.net/tables/BankBot';

    rest.getContactDetails(url,session, fullName,function(message,session,fullName){
     var   allDetails = JSON.parse(message);

        for(var i in allDetails) {

            if (allDetails[i].contactNumber === contactNumber && allDetails[i].fullName === fullName) {

                console.log(allDetails[i]);

                rest.deleteContactDetails(url,session,fullName,contactNumber, allDetails[i].id ,handleDeletedContactResponse)

            }
        }


    });


};


function handleDeletedContactResponse (message, session, fullName, contactNumber) {
    //var deletedContactResponse = JSON.parse(message);
    //var allDetails = contactNumber;
   /*  for (var index in deletedContactResponse) {
        //var fullNameReceived = deletedContactResponse[index].fullName;
        //var contactNumber = deletedContactResponse[index].contactNumber;
        allDetails.push(contactNumber);
        console.log(contactNumber + "jkffffffffffffffffffffffffffff");
        /* if (fullName.toLowerCase() === fullNameReceived.toLowerCase()) {
            if(deletedContactResponse.length - 1) {
                allDetails.push(contactNumber);
            }
            else {
                allDetails.push(contactNumber + '\n\n');
            }
        } */        
   // } 
    
    session.send("%s, The contact number %s has been successfully deleted from your account", fullName, contactNumber); 
            console.log('Done');
    
    }