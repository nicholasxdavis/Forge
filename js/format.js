document.addEventListener('DOMContentLoaded', () => {
    const notepad = document.getElementById('notepad');
    const fontFamilySelect = document.getElementById('font-family');
    const fontSizeSelect = document.getElementById('font-size');
    const fontStyleSelect = document.getElementById('font-style');
    const textColorInput = document.getElementById('text-color');
    const backgroundColorInput = document.getElementById('background-color');
    const textAlignSelect = document.getElementById('text-align');
    const popup = document.getElementById('popup');
    const closePopupButton = document.getElementById('close-popup');
    const infoIcon = document.getElementById('info-icon');

    // Apply formatting to the notepad
    const applyFormatting = () => {
        notepad.style.fontFamily = fontFamilySelect.value;
        notepad.style.fontSize = fontSizeSelect.value;
        notepad.style.fontWeight = fontStyleSelect.value.includes('bold') ? 'bold' : 'normal';
        notepad.style.fontStyle = fontStyleSelect.value.includes('italic') ? 'italic' : 'normal';
        notepad.style.textDecoration = fontStyleSelect.value.includes('underline') ? 'underline' : 'none';
        notepad.style.color = textColorInput.value;
        notepad.style.backgroundColor = backgroundColorInput.value;
        notepad.style.textAlign = textAlignSelect.value;
    };

    // Show the popup with formatting controls
    infoIcon.addEventListener('click', () => {
        popup.style.display = 'flex';
    });

    // Close the popup
    closePopupButton.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Add event listeners to formatting controls
    fontFamilySelect.addEventListener('change', applyFormatting);
    fontSizeSelect.addEventListener('change', applyFormatting);
    fontStyleSelect.addEventListener('change', applyFormatting);
    textColorInput.addEventListener('input', applyFormatting);
    backgroundColorInput.addEventListener('input', applyFormatting);
    textAlignSelect.addEventListener('change', applyFormatting);

    // Initial formatting application
    applyFormatting();
});
