document.addEventListener('DOMContentLoaded', () => {
    const regenerateBtn = document.getElementById('regenerate-btn');
    const paletteCountInput = document.getElementById('palette-count');
    const colorSelect = document.getElementById('color-select');
    const paletteContainer = document.getElementById('palette-container');
    const popup = document.getElementById('popup');
    const closePopupButton = document.getElementById('close-popup');
    const messageSent = document.getElementById('message-sent');

    regenerateBtn.addEventListener('click', () => {
        const paletteCount = parseInt(paletteCountInput.value);
        const theme = colorSelect.value;
        generatePalettes(paletteCount, theme);
    });

    function generateRandomHexColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    async function generatePalettes(count, theme) {
        paletteContainer.innerHTML = ''; // Clear existing palettes
        for (let i = 0; i < count; i++) {
            const seedColor = generateRandomHexColor(); // Generate random seed color for each palette
            try {
                console.log(`Fetching palette ${i+1} with theme: ${theme} and seed color: ${seedColor}`);
                const palette = await fetchPalette(theme, seedColor);
                console.log(`Palette ${i+1} fetched:`, palette);
                displayPalette(palette);
            } catch (error) {
                console.error("Failed to fetch palette:", error);
            }
        }
    }

    async function fetchPalette(theme, seedColor) {
        const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor.replace('#', '')}&mode=${theme}&count=5&format=json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data received from API:', data);
        return data.colors.map(color => color.hex.value);
    }

    function displayPalette(colors) {
        const paletteDiv = document.createElement('div');
        paletteDiv.className = 'palette';

        colors.forEach(color => {
            const colorDiv = document.createElement('div');
            colorDiv.className = 'color';
            colorDiv.style.backgroundColor = color;

            // Add color code text inside the color div
            const colorCode = document.createElement('span');
            colorCode.className = 'color-code';
            colorCode.textContent = color;
            colorDiv.appendChild(colorCode);

            // Add tooltip for hover message
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = 'Copy'; // Tooltip message
            colorDiv.appendChild(tooltip);

            // Add click event to copy color code
            colorDiv.addEventListener('click', () => {
                copyToClipboard(color);
                showPopup(`Copied ${color} to clipboard`);
            });

            paletteDiv.appendChild(colorDiv);
        });

        paletteContainer.appendChild(paletteDiv);
        console.log('Palette displayed:', colors);
    }

    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    function showPopup(message) {
        if (messageSent) {
            messageSent.textContent = message;
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

    closePopupButton.addEventListener('click', () => {
        if (popup) {
            popup.style.display = 'none'; // Hide popup
        }
    });

    // Initial load
    const initialPaletteCount = parseInt(paletteCountInput.value);
    const initialTheme = colorSelect.value;
    generatePalettes(initialPaletteCount, initialTheme); // Generate palettes with random seed colors
});