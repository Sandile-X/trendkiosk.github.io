// Basic admin credentials (this should be more secure in a real app)
const adminUsername = "admin";
const adminPassword = "password123";

let whitelist = []; // Array to store whitelisted apps

function adminLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === adminUsername && password === adminPassword) {
        navigateTo('admin-settings');
    } else {
        document.getElementById('login-error').textContent = "Invalid username or password.";
    }
}

function closeApp() {
    alert("This action would close the app and return to the home screen on an Android device.");
    // Implement close functionality when converting to an APK
}

function addApp() {
    const appInput = document.getElementById('app-input').value.trim();
    
    if (appInput && !whitelist.includes(appInput)) {
        whitelist.push(appInput);
        updateWhitelistDisplay();
        document.getElementById('app-input').value = ''; // Clear input field
    } else {
        alert("App name is either empty or already in the whitelist.");
    }
}

function removeApp() {
    const appInput = document.getElementById('app-input').value.trim();
    
    if (appInput && whitelist.includes(appInput)) {
        whitelist = whitelist.filter(app => app !== appInput);
        updateWhitelistDisplay();
        document.getElementById('app-input').value = ''; // Clear input field
    } else {
        alert("App name is either empty or not found in the whitelist.");
    }
}

function updateWhitelistDisplay() {
    const whitelistElement = document.getElementById('whitelist');
    whitelistElement.innerHTML = ''; // Clear current list

    whitelist.forEach(app => {
        const li = document.createElement('li');
        li.textContent = app;
        whitelistElement.appendChild(li);
    });
}

// Initial display update
updateWhitelistDisplay();

function navigateTo(sectionId) {
    // Hide all sections
    document.querySelectorAll('main section').forEach(section => {
        section.classList.remove('active');
    });

    // Show the selected section
    document.getElementById(sectionId).classList.add('active');
}

// Automatically start the app in full-screen mode
function startApp() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }
}

// Start the app when any navigation button is clicked
document.querySelectorAll('nav button').forEach(button => {
    button.addEventListener('click', startApp);
});
