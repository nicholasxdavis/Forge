document.addEventListener('DOMContentLoaded', () => {
    const regenerateBtn = document.getElementById('regenerate-btn');
    const quoteCountInput = document.getElementById('quote-count');
    const quoteContainer = document.getElementById('quote-container');
    const popup = document.getElementById('popup');
    const closePopupButton = document.getElementById('close-popup');
    const messageSent = document.getElementById('message-sent');

    regenerateBtn.addEventListener('click', () => {
        const quoteCount = parseInt(quoteCountInput.value);
        generateQuotes(quoteCount);
    });

    async function generateQuotes(count) {
        quoteContainer.innerHTML = ''; // Clear existing quotes
        for (let i = 0; i < count; i++) {
            try {
                const { content, author } = await fetchQuote();
                displayQuote(content, author);
            } catch (error) {
                console.error("Failed to fetch quote:", error);
            }
        }
    }

    async function fetchQuote() {
        const response = await fetch('https://api.quotable.io/random');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return { content: data.content, author: data.author };
    }

function displayQuote(quote, author) {
    const quoteDiv = document.createElement('div');
    quoteDiv.className = 'quote';
    quoteDiv.innerHTML = `"${quote}"<br><em>- ${author}</em>`;

    const overlayText = document.createElement('div');
    overlayText.className = 'overlay-text';
    overlayText.textContent = "Copy";

    quoteDiv.appendChild(overlayText);

    // Add click event to copy quote
    quoteDiv.addEventListener('click', () => {
        copyToClipboard(`"${quote}" - ${author}`);
        showPopup(); // Display simplified popup message
    });

    quoteContainer.appendChild(quoteDiv);
}

    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    function showPopup() {
        if (messageSent) {
            messageSent.textContent = "Copied quote"; // Simplified message
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
    const initialQuoteCount = parseInt(quoteCountInput.value);
    generateQuotes(initialQuoteCount);
});
