// js/script.js

// Function to generate random names
function generateNames(count) {
    const names = ['Doctor', 'Programmer', 'Artist'];
    let generatedNames = '';
    let usedNames = new Set();

    if (count > names.length) {
        count = names.length;
    }

    while (usedNames.size < count) {
        const randomIndex = Math.floor(Math.random() * names.length);
        const selectedName = names[randomIndex];

        if (!usedNames.has(selectedName)) {
            usedNames.add(selectedName);
            generatedNames += selectedName + '\n';
        }
    }

    return generatedNames;
}

// Function to display generated names
function displayNames() {
    const nameCount = document.getElementById('name-count').value;
    const genSection = document.getElementById('gen');

    genSection.innerHTML = generateNames(nameCount).replace(/\n/g, '<br>');
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

// Event listener for the regenerate button
document.getElementById('regenerate-btn').addEventListener('click', regenerateNames);

// Event listener for the save button
document.getElementById('save-btn').addEventListener('click', saveNames);

// Show the gen section and display names when the page loads
window.addEventListener('load', () => {
    displayNames();
    document.getElementById('gen').style.display = 'block';
});
