//this function is attached to a button click event in app maker
function getMailChimp(){
  google.script.run
   .withFailureHandler(function(error) {
      // An error occurred, so display an error message.
      alert(error.message);
    })
  .withSuccessHandler(function(result) {
      if (result === "No new raffle entries. Can't pick a winner!") {
        alert("No new raffle entries. Can't pick a winner!");
      } else {
        app.pages.RaffleHome.children.Winner.text = result;
        app.pages.RaffleHome.children.Table1Panel.datasource.load();
      }
   })
 .getMailChimpMembers();
}
