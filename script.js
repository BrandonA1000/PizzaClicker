// Game values
let pizzas = 0;
let pizzasPerClick = 1;
let pps = 0;

// Auto-upgrade counts
let chefs = 0;
let ovens = 0;
let restaurants = 0;
let managers = 0;

// Click upgrade counts
let upgrade1Owned = 0;
let upgrade2Owned = 0;
let upgrade3Owned = 0;
let upgrade4Owned = 0;

// Achievements
let achievements = [
    { name: "First Slice", goal: "Make 1 pizza", unlocked: false, check: () => pizzas >= 1 },
    { name: "Minimum Wage", goal: "Make 100 pizzas", unlocked: false, check: () => pizzas >= 100 },
    { name: "Beginner", goal: "Make 1000 pizzas", unlocked: false, check: () => pizzas >= 1000 },

    { name: "Boss", goal: "Hire 10 Chefs", unlocked: false, check: () => chefs >= 10 },
    { name: "Oven Starter", goal: "Buy 5 Ovens", unlocked: false, check: () => ovens >= 5 },
    { name: "Pizza Machine", goal: "Reach 10 PPS", unlocked: false, check: () => pps >= 10 },
    { name: "Restaurant Tycoon", goal: "Own 3 Restaurants", unlocked: false, check: () => restaurants >= 3 },
    { name: "Robotic Workers", goal: "Reach 50 PPS", unlocked: false, check: () => pps >= 50 },
    { name: "Automation Master", goal: "Reach 200 PPS", unlocked: false, check: () => pps >= 200 },

    { name: "Upgrade Collector", goal: "Buy 10 of each click upgrade", unlocked: false, check: () => upgrade1Owned >= 10 && upgrade2Owned >= 10 && upgrade3Owned >= 10 && upgrade4Owned >= 10 },
   
    { name: "Michallin Chef", goal: "Make 500,000 pizzas", unlocked: false, check: () => pizzas >= 500000 },
    { name: "Corporation", goal: "Make 1,000,000 pizzas", unlocked: false, check: () => pizzas >= 1000000 },

    { name: "All Achiever", goal: "Unlock all other achievements", unlocked: false,
      check: () => achievements.slice(0, achievements.length - 1).every(a => a.unlocked) }
];


// Update screen
function updateDisplay() {
    document.getElementById("scoreLabel").innerHTML =
        "Pizzas: " + pizzas.toFixed(1) + " (+" + pps.toFixed(1) + "/sec)";

    document.getElementById("chefLabel").innerText = "Owned: " + chefs;
    document.getElementById("ovenLabel").innerText = "Owned: " + ovens;
    document.getElementById("restaurantLabel").innerText = "Owned: " + restaurants;
    document.getElementById("managerLabel").innerText = "Owned: " + managers;

    document.getElementById("upgrade1Label").innerText = "Owned: " + upgrade1Owned;
    document.getElementById("upgrade2Label").innerText = "Owned: " + upgrade2Owned;
    document.getElementById("upgrade3Label").innerText = "Owned: " + upgrade3Owned;
    document.getElementById("upgrade4Label").innerText = "Owned: " + upgrade4Owned;
}

// Achievement popup
function showPopup(text) {
    const popup = document.createElement("div");
    popup.className = "achievement-popup";
    popup.innerText = text;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.style.opacity = "0";
        setTimeout(() => popup.remove(), 500);
    }, 2500);
}

// Check achievements
function checkAchievements() {
    achievements.forEach(a => {
        if (!a.unlocked && a.check()) {
            a.unlocked = true;
            showPopup("🏆 " + a.name);
        }
    });
}

// Clicking pizza
function pizzaClicked() {
    pizzas += pizzasPerClick;
    updateDisplay();
    checkAchievements();
}

// Click upgrades
function buyupgrade1() {
    if (pizzas >= 10) {
        pizzas -= 10;
        pizzasPerClick += 0.1;
        upgrade1Owned++;
        updateDisplay();
    }
}

function buyupgrade2() {
    if (pizzas >= 100) {
        pizzas -= 100;
        pizzasPerClick += 1.2;
        upgrade2Owned++;
        updateDisplay();
    }
}

function buyupgrade3() {
    if (pizzas >= 250) {
        pizzas -= 250;
        pizzasPerClick += 3.2;
        upgrade3Owned++;
        updateDisplay();
    }
}

function buyupgrade4() {
    if (pizzas >= 1000) {
        pizzas -= 1000;
        pizzasPerClick += 13;
        upgrade4Owned++;
        updateDisplay();
    }
}

// Auto upgrades
function buyChef() {
    if (pizzas >= 50) {
        pizzas -= 50;
        chefs++;
        pps += 0.1;
        updateDisplay();
    }
}

function buyOven() {
    if (pizzas >= 500) {
        pizzas -= 500;
        ovens++;
        pps += 1.5;
        updateDisplay();
    }
}

function buyRestaurant() {
    if (pizzas >= 2000) {
        pizzas -= 2000;
        restaurants++;
        pps += 6.5;
        updateDisplay();
    }
}

function buyManager() {
    if (pizzas >= 5000) {
        pizzas -= 5000;
        managers++;
        pps += 17.5;
        updateDisplay();
    }
}

// Passive income
setInterval(() => {
    pizzas += pps;
    updateDisplay();
    checkAchievements();
}, 1000);

// Achievements modal
function showAchievements() {
    const modal = document.getElementById("achievementModal");
    const box = document.getElementById("achievementContent");

    let html = "<h2>🏆 Achievements</h2>";

    achievements.forEach(a => {
        html += `<p><strong>${a.unlocked ? "✅" : "🔒"} ${a.name}</strong><br><small>${a.goal}</small></p>`;
    });

    html += "<button onclick='closeAchievements()'>Close</button>";

    box.innerHTML = html;
    modal.style.display = "flex";
}

function closeAchievements() {
    document.getElementById("achievementModal").style.display = "none";
}

// Save game
function saveGame() {
    const saveData = {
        pizzas, pizzasPerClick, pps,
        chefs, ovens, restaurants, managers,
        upgrade1Owned, upgrade2Owned, upgrade3Owned, upgrade4Owned,
        achievements
    };

    localStorage.setItem("pizzaSave", JSON.stringify(saveData));
    alert("Game Saved!");
}

// Load game
function loadGame() {
    const data = JSON.parse(localStorage.getItem("pizzaSave"));
    if (!data) return; // No save found

    // Load basic values
    pizzas = data.pizzas;
    pizzasPerClick = data.pizzasPerClick;
    pps = data.pps;

    chefs = data.chefs;
    ovens = data.ovens;
    restaurants = data.restaurants;
    managers = data.managers;

    upgrade1Owned = data.upgrade1Owned;
    upgrade2Owned = data.upgrade2Owned;
    upgrade3Owned = data.upgrade3Owned;
    upgrade4Owned = data.upgrade4Owned;

    // -------------------------------
    // MERGE ACHIEVEMENTS SAFELY
    // -------------------------------
    // This keeps your new achievements
    // while restoring unlocked ones from the save.
    // No more resets needed when adding new achievements!
    // -------------------------------
    if (data.achievements) {
        achievements.forEach((achievement, index) => {
            // If the saved file has this achievement index,
            // copy its unlocked status.
            if (data.achievements[index]) {
                achievement.unlocked = data.achievements[index].unlocked;
            }
        });
    }

    updateDisplay();
}


// Reset game
function resetGame() {
    if (confirm("Are you sure you want to reset your game?")) {
        localStorage.removeItem("pizzaSave");
        location.reload();
    }
}

// Load on start
loadGame();

// Updates modal
function openUpdates() {
    document.getElementById("updatesModal").style.display = "flex";
}

function closeUpdates() {
    document.getElementById("updatesModal").style.display = "none";
}
