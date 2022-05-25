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

var fight = function() {
    // Alert for round start
    window.alert("Welcome to Robot Gladiators!");
    // Choice
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    if (promptFight === "fight" || promptFight === "FIGHT") {
        // Subtract enemyHealth from playerAttack
        enemyHealth = enemyHealth - playerAttack;
        //Log result to confirm
        console.log(playerName + " attacked " + enemyName + "! " + enemyName + " now has " + enemyHealth + "health remaining.");
        //Check enemy health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " is defeated!");
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
        } else {
            window.alert(playerName + " still has " + playerHealth + "health left.");
        }
    } else if (promptFight === "skip" || promptFight === "SKIP") {
        //Confirm player skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
        if (confirmSkip) {
            //If yes, leave fight at cost
            window.alert(playerName + " had decided to skip this fight. Goodbye!");
            //Take away money for skipping
            playerMoney = playerMoney - 2;
        } else {
            fight();
        }
        window.alert(playerName + " has chosen to skip the fight!");
    } else {
        window.alert("You need to choose a valid option. Please try again!");
    }


}

for (var i=0; i<enemyNames.length; i++) {
    fight(enemyNames[i]);
}