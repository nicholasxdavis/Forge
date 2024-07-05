// Function to generate random locations
function generateLocations(count, continent) {
    const locations = {
        "africa": [
            "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", 
            "Cabo Verde", "Cameroon", "Central African Republic", "Chad", "Comoros", 
            "Congo, Democratic Republic of the", "Congo, Republic of the", "Djibouti", 
            "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia", "Gabon", 
            "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Ivory Coast", "Kenya", 
            "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi", "Mali", 
            "Mauritania", "Mauritius", "Morocco", "Mozambique", "Namibia", "Niger", 
            "Nigeria", "Rwanda", "Sao Tome and Principe", "Senegal", "Seychelles", 
            "Sierra Leone", "Somalia", "South Africa", "South Sudan", "Sudan", 
            "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe"
        ],
        "asia": [
            "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan", 
            "Brunei", "Cambodia", "China", "Cyprus", "Georgia", "India", "Indonesia", 
            "Iran", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan", "Kuwait", 
            "Kyrgyzstan", "Laos", "Lebanon", "Malaysia", "Maldives", "Mongolia", 
            "Myanmar", "Nepal", "North Korea", "Oman", "Pakistan", "Palestine", 
            "Philippines", "Qatar", "Saudi Arabia", "Singapore", "South Korea", 
            "Sri Lanka", "Syria", "Tajikistan", "Thailand", "Timor-Leste", "Turkey", 
            "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"
        ],
        "europe": [
            "Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", 
            "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", 
            "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Georgia", 
            "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", 
            "Kazakhstan", "Kosovo", "Latvia", "Liechtenstein", "Lithuania", 
            "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", 
            "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "Russia", 
            "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", 
            "Switzerland", "Turkey", "Ukraine", "United Kingdom", "Vatican City"
        ],
        "north-america": [
            "Antigua and Barbuda", "Bahamas", "Barbados", "Belize", "Canada", 
            "Costa Rica", "Cuba", "Dominica", "Dominican Republic", "El Salvador", 
            "Grenada", "Guatemala", "Haiti", "Honduras", "Jamaica", "Mexico", 
            "Nicaragua", "Panama", "Saint Kitts and Nevis", "Saint Lucia", 
            "Saint Vincent and the Grenadines", "Trinidad and Tobago", "United States"
        ],
        "south-america": [
            "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador", 
            "Guyana", "Paraguay", "Peru", "Suriname", "Uruguay", "Venezuela"
        ],
        "oceania": [
            "Australia", "Fiji", "Kiribati", "Marshall Islands", "Micronesia", 
            "Nauru", "New Zealand", "Palau", "Papua New Guinea", "Samoa", 
            "Solomon Islands", "Tonga", "Tuvalu", "Vanuatu"
        ],
        "antarctica": [
            // No countries, only research stations
        ],
        "all": [
            // Combine all countries from every continent
            ...[
                "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", 
                "Cabo Verde", "Cameroon", "Central African Republic", "Chad", "Comoros", 
                "Congo, Democratic Republic of the", "Congo, Republic of the", "Djibouti", 
                "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia", "Gabon", 
                "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Ivory Coast", "Kenya", 
                "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi", "Mali", 
                "Mauritania", "Mauritius", "Morocco", "Mozambique", "Namibia", "Niger", 
                "Nigeria", "Rwanda", "Sao Tome and Principe", "Senegal", "Seychelles", 
                "Sierra Leone", "Somalia", "South Africa", "South Sudan", "Sudan", 
                "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe",
                "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan", 
                "Brunei", "Cambodia", "China", "Cyprus", "Georgia", "India", "Indonesia", 
                "Iran", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan", "Kuwait", 
                "Kyrgyzstan", "Laos", "Lebanon", "Malaysia", "Maldives", "Mongolia", 
                "Myanmar", "Nepal", "North Korea", "Oman", "Pakistan", "Palestine", 
                "Philippines", "Qatar", "Saudi Arabia", "Singapore", "South Korea", 
                "Sri Lanka", "Syria", "Tajikistan", "Thailand", "Timor-Leste", "Turkey", 
                "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen",
                "Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", 
                "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", 
                "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Georgia", 
                "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", 
                "Kazakhstan", "Kosovo", "Latvia", "Liechtenstein", "Lithuania", 
                "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", 
                "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "Russia", 
                "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", 
                "Switzerland", "Turkey", "Ukraine", "United Kingdom", "Vatican City",
                "Antigua and Barbuda", "Bahamas", "Barbados", "Belize", "Canada", 
                "Costa Rica", "Cuba", "Dominica", "Dominican Republic", "El Salvador", 
                "Grenada", "Guatemala", "Haiti", "Honduras", "Jamaica", "Mexico", 
                "Nicaragua", "Panama", "Saint Kitts and Nevis", "Saint Lucia", 
                "Saint Vincent and the Grenadines", "Trinidad and Tobago", "United States",
                "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador", 
                "Guyana", "Paraguay", "Peru", "Suriname", "Uruguay", "Venezuela",
                "Australia", "Fiji", "Kiribati", "Marshall Islands", "Micronesia", 
                "Nauru", "New Zealand", "Palau", "Papua New Guinea", "Samoa", 
                "Solomon Islands", "Tonga", "Tuvalu", "Vanuatu"
            ]
        ]
    };

    let selectedLocations = [];
    let usedLocations = new Set();

    if (count > locations[continent].length) {
        count = locations[continent].length;
    }

    while (usedLocations.size < count) {
        const randomIndex = Math.floor(Math.random() * locations[continent].length);
        const selectedLocation = locations[continent][randomIndex];

        if (!usedLocations.has(selectedLocation)) {
            usedLocations.add(selectedLocation);
            selectedLocations.push(selectedLocation);
        }
    }

    return selectedLocations;
}

function displayLocations() {
    const nameCount = document.getElementById('name-count').value;
    const continent = document.getElementById('continent-select').value;
    const genSection = document.getElementById('gen');
    const mapSection = document.getElementById('map');

    const locations = generateLocations(nameCount, continent);
    genSection.innerHTML = locations.join('<br>');

    if (locations.length === 1) {
        const location = locations[0];

        // Fetch coordinates and display map
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const lat = data[0].lat;
                    const lon = data[0].lon;

                    mapSection.style.display = 'block';
                    const map = L.map('map').setView([lat, lon], 13);

                    // Clear previous markers if any
                    map.eachLayer(layer => {
                        if (layer instanceof L.Marker) {
                            map.removeLayer(layer);
                        }
                    });

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(map);

                    L.marker([lat, lon]).addTo(map)
                        .bindPopup(location)
                        .openPopup();
                }
            });
    } else {
        mapSection.style.display = 'none'; // Hide map if no or multiple locations
    }
}

function regenerateLocations() {
    displayLocations();
}

function saveLocations() {
    const genSection = document.getElementById('gen');
    const generatedLocations = genSection.innerText;
    const blob = new Blob([generatedLocations], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated_locations.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

document.getElementById('regenerate-btn').addEventListener('click', regenerateLocations);
document.getElementById('save-btn').addEventListener('click', saveLocations);

window.addEventListener('load', () => {
    displayLocations();
    document.getElementById('gen').style.display = 'block';
});