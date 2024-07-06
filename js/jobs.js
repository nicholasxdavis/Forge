// js/script.js

// Function to fetch random job titles from API
async function fetchRandomJobTitles(count) {
    const apiKey = 'UkcqoZxfLnEJM0Lp+o/TrQ==nM6MfOXQ3XT0f8SX'; // Replace with your API key from API Ninjas
    const response = await fetch(`https://api.api-ninjas.com/v1/job_titles?limit=${count}`, {
        headers: { 'X-Api-Key': apiKey }
    });
    const data = await response.json();
    return data.map(job => job.title).join('\n');
}

// Function to display generated job titles
async function displayJobTitles() {
    const nameCount = document.getElementById('name-count').value;
    const genSection = document.getElementById('gen');
    const jobTitles = await fetchRandomJobTitles(nameCount);

    genSection.innerHTML = jobTitles.replace(/\n/g, '<br>');
}

// Function to handle regenerate button click
function regenerateJobTitles() {
    displayJobTitles();
}

// Function to handle save button click
function saveJobTitles() {
    const genSection = document.getElementById('gen');
    const generatedJobTitles = genSection.innerText;
    const blob = new Blob([generatedJobTitles], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated_job_titles.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Event listener for the regenerate button
document.getElementById('regenerate-btn').addEventListener('click', regenerateJobTitles);

// Event listener for the save button
document.getElementById('save-btn').addEventListener('click', saveJobTitles);

// Show the gen section and display job titles when the page loads
window.addEventListener('load', () => {
    displayJobTitles();
    document.getElementById('gen').style.display = 'block';
});
