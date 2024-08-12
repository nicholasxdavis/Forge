// Function to generate random numbers 
function generateNumbers(count, digits) {
    let generatedNumbers = '';
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1; 

    for (let i = 0; i < count; i++) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        generatedNumbers += `<span class="number-overlay"><span class="number">${randomNumber}</span><div class="copy-overlay">Copy</div></span><br>`;
    }

    return generatedNumbers;
}

// Function to display generated numbers
function displayNumbers() {
    const numberCount = parseInt(document.getElementById('number-count').value, 10);
    const digitsCount = parseInt(document.getElementById('digits-count').value, 10);
    const genSection = document.getElementById('gen');

    genSection.innerHTML = generateNumbers(numberCount, digitsCount);
    attachCopyEventListeners(); // Attach event listeners after numbers are generated
    attachNumberEventListeners(); // Attach number overlay event listeners
}

// Function to handle regenerate button click
function regenerateNumbers() {
    displayNumbers();
}

// Function to handle save button click
function saveNumbers() {
    const genSection = document.getElementById('gen');
    const generatedNumbers = genSection.innerText;
    const blob = new Blob([generatedNumbers], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated_numbers.txt';
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
    showPopup(); // Show the simplified popup message
}

// Attach event listeners to copy overlays
function attachCopyEventListeners() {
    const overlays = document.querySelectorAll('.copy-overlay');
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            const number = overlay.previousElementSibling.textContent.trim(); // Get only the number
            copyToClipboard(number);
        });
    });
}

// Attach event listeners to number overlays
function attachNumberEventListeners() {
    const numberOverlays = document.querySelectorAll('.number-overlay');
    numberOverlays.forEach(numberOverlay => {
        numberOverlay.addEventListener('mouseover', showCopyOverlay);
        numberOverlay.addEventListener('mouseout', hideCopyOverlay);
    });
}

// Function to show the copy overlay
function showCopyOverlay(event) {
    const overlay = event.currentTarget.querySelector('.copy-overlay');
    overlay.style.display = 'flex'; // Show the overlay
}

// Function to hide the copy overlay
function hideCopyOverlay(event) {
    const overlay = event.currentTarget.querySelector('.copy-overlay');
    overlay.style.display = 'none'; // Hide the overlay
}

// Function to show the popup
function showPopup() {
    const messageSent = document.getElementById('message-sent');
    const popup = document.getElementById('popup');
    
    if (messageSent) {
        messageSent.textContent = "Number copied!"; // Simplified message
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
document.getElementById('regenerate-btn').addEventListener('click', regenerateNumbers);

// Event listener for the save button
document.getElementById('save-btn').addEventListener('click', saveNumbers);

// Show the gen section and display numbers when the page loads
window.addEventListener('load', () => {
    displayNumbers();
    document.getElementById('gen').style.display = 'block';
});

// Adding the click event listener to the number overlay
document.querySelectorAll('.number-overlay').forEach((numberOverlay) => {
    numberOverlay.addEventListener('click', () => {
        const number = numberOverlay.querySelector('.number').textContent.trim(); // Get only the number
        copyToClipboard(number);
    });
});

// Adding the click event listener to close the popup
const closePopupButton = document.getElementById('close-popup');
closePopupButton.addEventListener('click', () => {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = 'none'; // Hide popup
    }
});
