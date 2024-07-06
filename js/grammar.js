document.addEventListener('DOMContentLoaded', () => {
    const notepad = document.getElementById('notepad');
    const errorList = document.getElementById('error-list');
    
    notepad.addEventListener('input', () => {
        checkGrammar(notepad.value);
    });
    
    async function checkGrammar(text) {
        if (text.length === 0) {
            errorList.innerHTML = ''; // Clear errors if text is empty
            return;
        }
        
        try {
            const response = await fetch('https://api.languagetool.org/v2/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    text: text,
                    language: 'en-US',
                }),
            });
            
            const data = await response.json();
            displayErrors(data.matches);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    function displayErrors(matches) {
        errorList.innerHTML = ''; // Clear previous errors
        
        matches.forEach(match => {
            const listItem = document.createElement('li');
            listItem.textContent = match.message + ' (at position ' + match.offset + ')';
            errorList.appendChild(listItem);
        });
    }
});