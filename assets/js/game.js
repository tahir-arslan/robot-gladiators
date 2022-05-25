var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto","Amy Anddroid","Robo Trumble"];
var enemyHealth = 60;
var enemyAttack = 12;

//random number generator
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) +min);
    return value;
}

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
                playerMoney = Math.max(0, playerMoney - 10);
                console.log("playerMoney", playerMoney);
                break;
            }
        } //end of if skip

        // random hit generation
        var damage = randomNumber(playerAttack - 3, playerAttack);

        // Subtract enemyHealth from playerAttack
        enemyHealth = Math.max(0, enemyHealth - damage);
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

        //random hit gen
        var damage = randomNumber(enemyAttack - 3, enemyAttack);

        //Subtract playerHealth from enemyAttack
        playerHealth = Math.max(0, playerHealth - damage);
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

// start new game
var startGame = function() {
    //reset player health
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i+1));
            // pick new enemy based on array
            var pickedEnemyName = enemyNames[i];
            // reset enemy health for new round
            enemyHealth = randomNumber(40,60);
            // passing new enemy name into fight function
            fight(pickedEnemyName);
            // call for shop if there are still enemies present
            if (playerHealth > 0 && i < enemyNames.length - 1) {
                var storeConfirm = window.confirm("The fight is over. Do you want to visit the store before beginning the next round?");
                if (storeConfirm) {
                    shop();
                }
            }
        } else {
            window.alert ("You have lost your robot in battle! Game over!");
            break;
        }
    }
    endGame();
}

// fxn to end game
var endGame = function() {
    // win condition: player still alive
    if (playerHealth > 0) {
        window.alert("Great job, you survived the game! You now have a score of " + playerMoney + ".");
    } else {
        window.alert("You lost your robot in battle.");
    }
    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}

var shop = function() {
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one of the following: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");
    switch (shopOptionPrompt) {
        // case "REFILL": followed immediately by case "refill": works because there is no
        // break inbetween, so the code continues and are 'connected.' Therefore if 
        // case "REFILL" condition is met, it will automatically meet the condition for
        // case "refill" and continue to execute it's code.
        case "REFILL":
        case "refill":
            if (playerMoney >=7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You don't have enough money!");
            }
            break;
        case "UPGRADE":
        case "upgrade":
            if (playerMoney >=7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You don't have enough money!");
            }
            break;
        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
}

startGame();