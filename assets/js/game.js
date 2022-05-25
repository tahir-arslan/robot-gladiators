// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto","Amy Anddroid","Robo Trumble"];
for(var i=0; i<enemyNames.length; i++) {
    console.log(enemyNames[i]);
    console.log(i);
    console.log(enemyNames[i] + " is at " + i + " index");
}

var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {
    // this will repeat as long as enemy is alive
    while(playerHealth>0 && enemyHealth>0) {
        // fight is set to default. therefore, if only activates when SKIP is chosen. Otherwise code continues.
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        
        if (promptFight === "skip" || promptFight === "SKIP") {
            //Confirm player skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            if (confirmSkip) {
                //If yes, leave fight at cost
                window.alert(playerName + " had decided to skip this fight. Goodbye!");
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        } //end of if skip

        // Subtract enemyHealth from playerAttack
        enemyHealth = enemyHealth - playerAttack;
        console.log(enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.');

        //Check enemy health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " is defeated!");
            // player money reward
            playerMoney = playerMoney + 20;
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        //Subtract playerHealth from enemyAttack
        playerHealth = playerHealth - enemyAttack;
        //Log result to confirm
        console.log(enemyName + " attacked " + playerName + "! " + playerName + " now has " + playerHealth + " health remaining.");
        //Check player health
        if (playerHealth <= 0) {
            window.alert(playerName + " is defeated!");
            break;
        } else {
            window.alert(playerName + " still has " + playerHealth + "health left.");
        }
    } // end of while loop
} // end of fight function

for (var i=0; i<enemyNames.length; i++) {
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    debugger;
    fight(pickedEnemyName);
}