var cookies = 0;
var cookiesperclick = 1;
var cps = 0;
var grandmas = 0;
var farms = 0;
var factories = 0;

// Achievements
var achievements = {
    first_click: { name: "First Click", goal: "Earn 1 cookie", unlocked: false },
    hundred_cookies: { name: "Decent Baker", goal: "Earn 100 cookies", unlocked: false },
    thousand_cookies: { name: "Apprentice", goal: "Earn 1000 cookies", unlocked: false },
    ten_grandmas: { name: "Grandma Gang", goal: "Buy 10 Grandmas", unlocked: false },
    five_farms: { name: "Farmer", goal: "Buy 5 Farms", unlocked: false },
    autoclicker: { name: "Autoclicker", goal: "Get 10 CPS", unlocked: false },
    factory_builder: {name: "Factory Builder", goal: "Buy 3 factories", unlocked: false},
    master_autoclicker:{name: "Master Autoclicker", goal: "Get 50 CPS", unlocked: false}
};

function showPopup(text) {
    let popup = document.createElement("div");
    popup.innerHTML = text;
    popup.style.cssText =
        "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: gold; padding: 20px; border-radius: 10px; font-size: 24px; z-index: 9999;";
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 3000);
}

function unlock(key) {
    if (!achievements[key].unlocked) {
        achievements[key].unlocked = true;
        showPopup("🏆 " + achievements[key].name);
    }
}

function checkAchievements() {
    if (cookies >= 1) unlock("first_click");
    if (cookies >= 100) unlock("hundred_cookies");
    if (cookies >= 1000) unlock("thousand_cookies");
    if (grandmas >= 10) unlock("ten_grandmas");
    if (farms >= 5) unlock("five_farms");
    if (cps >= 10) unlock("autoclicker");
    if(factories >= 3) unlock("factory_builder");
    if (cps>= 50) unlock("master_autoclicker");
}

function updateDisplay() {
    document.getElementById("scoreLabel").innerHTML =
        "Cookies: " + cookies.toFixed(1) +
        " (+" + cps.toFixed(1) + "/sec) | Grandmas: " + grandmas +
        " | Farms: " + farms + " | Factories: " + factories;
}

function cookieClicked() {
    cookies = Number((cookies + cookiesperclick).toFixed(1));
    updateDisplay();
    checkAchievements();
}

function buyupgrade1() {
    if (cookies >= 10) {
        cookies -= 10;
        cookiesperclick = Number((cookiesperclick + 0.1).toFixed(1));
        updateDisplay();
        checkAchievements();
    }
}

function buyupgrade2() {
    if (cookies >= 100) {
        cookies -= 100;
        cookiesperclick = Number((cookiesperclick + 1.2).toFixed(1));
        updateDisplay();
        checkAchievements();
    }
}

function buyupgrade3() {
    if (cookies >= 250) {
        cookies -= 250;
        cookiesperclick = Number((cookiesperclick + 3).toFixed(1));
        updateDisplay();
        checkAchievements();
    }
}

function buyGrandma() {
    if (cookies >= 50) {
        cookies -= 50;
        grandmas++;
        cps = Number((cps + 0.1).toFixed(1));
        updateDisplay();
        checkAchievements();
    }
}

function buyFarm() {
    if (cookies >= 500) {
        cookies -= 500;
        farms++;
        cps = Number((cps + 1.5).toFixed(1));
        updateDisplay();
        checkAchievements();
    }
}

function buyFactory() {
    if (cookies >= 2000) {
        cookies -= 2000;
        factories++;
        cps = Number((cps + 5).toFixed(1));
        updateDisplay();
        checkAchievements();
    }
}

// Auto cookie generation
setInterval(() => {
    cookies = Number((cookies + cps).toFixed(1));
    updateDisplay();
    checkAchievements();
}, 1000);

function showAchievements() {
    let modal = document.getElementById("achievementModal");
    let content =
        "<div style='background: white; padding: 30px; border-radius: 10px; max-width: 400px; text-align: center;'>";
    content += "<h2>🏆 Achievements</h2>";

    for (let key in achievements) {
        let ach = achievements[key];
        let icon = ach.unlocked ? "✅" : "🔒";
        content += `<p><strong>${icon} ${ach.name}</strong><br><small>${ach.goal}</small></p>`;
    }

    content +=
        "<button onclick='closeAchievements()' style='padding: 10px 20px; cursor: pointer;'>Close</button></div>";

    if (!modal) {
        modal = document.createElement("div");
        modal.id = "achievementModal";
        modal.style.cssText =
            "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 9998;";
        document.body.appendChild(modal);
    }

    modal.innerHTML = content;
    modal.style.display = "flex";
}

function closeAchievements() {
    document.getElementById("achievementModal").style.display = "none";
}