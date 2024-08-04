document.addEventListener('DOMContentLoaded', () => {
    const regenerateBtn = document.getElementById('regenerate-btn');
    const quoteCountInput = document.getElementById('quote-count');
    const quoteContainer = document.getElementById('quote-container');

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

        // Add click event to copy quote
        quoteDiv.addEventListener('click', () => {
            copyToClipboard(`"${quote}" - ${author}`);
            alert(`Copied: "${quote}" - ${author}`);
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

    // Initial load
    const initialQuoteCount = parseInt(quoteCountInput.value);
    generateQuotes(initialQuoteCount);
});
