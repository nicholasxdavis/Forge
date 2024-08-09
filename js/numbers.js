// Function to generate random numbers 
function generateNumbers(count, digits) {
    let generatedNumbers = '';
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1; 

    for (let i = 0; i < count; i++) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        generatedNumbers += `<span class="number-overlay">${randomNumber}<div class="copy-overlay">Copy</div></span><br>`;
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
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Attach event listeners to copy overlays
function attachCopyEventListeners() {
    const overlays = document.querySelectorAll('.copy-overlay');
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            const number = overlay.previousElementSibling.textContent;
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

// Event listener for the regenerate button
document.getElementById('regenerate-btn').addEventListener('click', regenerateNumbers);

// Event listener for the save button
document.getElementById('save-btn').addEventListener('click', saveNumbers);

// Show the gen section and display numbers when the page loads
window.addEventListener('load', () => {
    displayNumbers();
    document.getElementById('gen').style.display = 'block';
});
