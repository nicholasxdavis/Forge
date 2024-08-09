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
