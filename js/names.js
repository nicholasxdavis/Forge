// Function to fetch names from API
async function fetchNames(count, gender) {
    let url = `https://randomuser.me/api/?results=${count}&nat=us`; // Added 'nat=us' for English names

    if (gender !== 'all') {
        url += `&gender=${gender}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data.results.map(person => person.name.first);
}

// Function to generate random names
async function generateNames(count, gender) {
    const names = await fetchNames(count, gender);
    return names.join('\n');
}

// Function to display generated names
async function displayNames() {
    const nameCount = document.getElementById('name-count').value;
    const gender = document.getElementById('gender-select').value;
    const genSection = document.getElementById('gen');

    const generatedNames = await generateNames(nameCount, gender);
    const namesArray = generatedNames.split('\n');
    
    genSection.innerHTML = namesArray.map(name => 
        `<div class="name-overlay">
            <span class="name-text">${name}</span>
            <div class="copy-overlay">Copy</div>
        </div>`
    ).join('');

    // Add click events for copying names and showing the popup
    const nameOverlays = document.querySelectorAll('.name-overlay');
    nameOverlays.forEach(nameOverlay => {
        nameOverlay.addEventListener('click', () => {
            const name = nameOverlay.querySelector('.name-text').textContent;
            copyToClipboard(name);
            showPopup(); // Display popup message
        });
    });
}

// Function to handle regenerate button click
function regenerateNames() {
    displayNames();
}

// Function to handle save button click
function saveNames() {
    const genSection = document.getElementById('gen');
    const generatedNames = genSection.innerText;
    const blob = new Blob([generatedNames], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated_names.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Function to copy text to clipboard
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// Function to show the popup
function showPopup() {
    const popup = document.getElementById('popup');
    const messageSent = document.getElementById('message-sent');

    if (messageSent) {
        messageSent.textContent = "Copied name"; // Simplified message
        messageSent.style.display = 'block'; // Ensure the element is visible
    } else {
        console.error('Element with id "message-sent" not found.');
    }
    if (popup) {
        popup.style.display = 'flex'; // Show popup
    } else {
        console.error('Element with id "popup" not found.');
    }
}

// Event listener for the regenerate button
document.getElementById('regenerate-btn').addEventListener('click', regenerateNames);

// Event listener for the save button
document.getElementById('save-btn').addEventListener('click', saveNames);

// Event listener to close the popup
document.getElementById('close-popup').addEventListener('click', () => {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = 'none'; // Hide popup
    }
});

// Show the gen section and display names when the page loads
window.addEventListener('load', () => {
    displayNames();
    document.getElementById('gen').style.display = 'block';
});
