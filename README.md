# Mail-Chimp-Raffle-App
This application uses the MailChimp API to pull email contacts from a list and randomly chooses the winner for a raffle.

This application accomplishes the following:
-Connects to a SQL database holding the email address of previous winners
-Pulls email addresses from a list using the Mail Chimp API.  An API KEY and LIST ID are required
-Parses the JSON data from Mail Chimp to extract the email addresses of all members in the list
-Adds emails to an array
-Splices any address of previous winners from the array using the address from the database
-Randomly chooses a winner from the remain email in the array
-Adds the winner to the previous winners database
-Displays the winner to the user and refreshes the datasouce

This was built using google App Make to allow for fast dev and deployment.  Also this allowed for pubic hosting and access while using google authentication to protect access to our Mail Chimp List.
