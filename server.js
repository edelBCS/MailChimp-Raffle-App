//this is the service side code that executes the MailChimp API call and data manipulation
//MailChimp API and List IDs
var apiKey = "xxxxxxxxxxxxxxxxxxxxxxxxx-us11";
var listId = "xxxxxxxxx";
var entries = [];

function getMailChimpMembers() {
  //Sets mailchimp URL
  var mailChimpURL = "https://us11.api.mailchimp.com/3.0";
  var endpoint = "/lists/" + listId + "/members";
  
  //Sets parameters for API request
  var params = {
    "method": "GET",
    "muteHttpExceptions": true,
    "headers": {
        "Authorization": "apikey " + apiKey,
    }
  };
  
  
  //excutes API request and saves output to json
  var response = UrlFetchApp.fetch(mailChimpURL+endpoint, params);
  var data = response.getContentText();
  var json = JSON.parse(data);
  
  //extracts member entries from json
  var members = json["members"];
  
  console.log("Number of Entries: " + members.length);
  
  
  
  //extracts email address and creates array
  members.forEach(function(member) {
    entries.push(member["email_address"]);
  });

  //gets list from pastWinners table
  var query = app.models.pastWinners.newQuery();
  var pastWins = query.run();


  //Removes anyone from the entries list that has already won  
  pastWins.forEach(function(winner){
    entries.splice(entries.indexOf(winner.pastWinner.toString()), 1);
  });
  
  if (entries.length < 1){
    return "No new raffle entries. Can't pick a winner!";
  }else{

    //Pick a winnner
    var newWinner = entries[Math.floor(Math.random() * entries.length)];
    var record = app.models.pastWinners.newRecord();
    record.pastWinner = newWinner;
    app.saveRecords([record]);

    console.log(newWinner);
    return newWinner;
  }
  
 
}
