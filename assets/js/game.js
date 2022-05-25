//random number generator
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) +min);
    return value;
};

var fightOrSkip = function () {
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    promptFight = promptFight.toLowerCase();
    if (promptFight === "skip") {
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            playerInfo.playerMoney = Math.max(0, playerInfo.money - 10);
            return true;
        }
    } if (!promptFight) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }
    return false;
};

var fight = function(enemy) {
    //who attacks first
    var isPlayerTurn = true;
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    // this will repeat as long as enemy is alive
    while(playerInfo.health>0 && enemy.health>0) {
        // fight is set to default. therefore, if only activates when SKIP is chosen. Otherwise code continues.
        if (isPlayerTurn) {
            if (fightOrSkip()) {
                break;
            }

            // random hit generation
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            // Subtract enemy.health from playerInfo.attack
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.');

            //Check enemy health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " is defeated!");
                // player money reward
                playerInfo.money = playerInfo.money + 20;
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
        } else {
            //random hit gen
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            //Subtract playerInfo.health from enemy.attack
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            //Log result to confirm
            console.log(enemy.name + " attacked " + playerInfo.name + "! " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");
            //Check player health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " is defeated!");
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + "health left.");
            }
        }
        // switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
    } // end of while loop
}; // end of fight function

// start new game
var startGame = function() {
    //reset player stats
    playerInfo.reset;

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i+1));
            // pick new enemy based on array
            var pickedEnemyObj = enemyInfo[i];
            // reset enemy health for new round
            pickedEnemyObj.health = randomNumber(40,60);
            // passing new enemy name into fight function
            fight(pickedEnemyObj);
            // call for shop if there are still enemies present
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
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
    if (playerInfo.health > 0) {
        window.alert("Great job, you survived the game! You now have a score of " + playerInfo.money + ".");
    } else {
        window.alert("You lost your robot in battle.");
    }
    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function() {
    var shopOptionPrompt = window.prompt("Would you like to refill your health, upgrade your attack, or leave the store? Please enter 1 to refill, 2 to upgrade, or 3 to leave the shop.");
    shopOptionPrompt = parseInt(shopOptionPrompt);
    switch (shopOptionPrompt) {
        // case "REFILL": followed immediately by case "refill": works because there is no
        // break inbetween, so the code continues and are 'connected.' Therefore if 
        // case "REFILL" condition is met, it will automatically meet the condition for
        // case "refill" and continue to execute it's code.
        case 1:
            playerInfo.refilHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
}

var getPlayerName = function() {
    var name = "";
    //loop condition until acceptable name is inputted
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
};

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refilHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }

    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack +=  6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [ 
    {name: "Roberto", attack: randomNumber(10,14)},
    {name: "Amy Android", attack: randomNumber(10,14)},
    {name: "Robo Trumble", attack: randomNumber(10,14)}
];

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
console.log(enemyInfo[0]['attack']);

startGame();