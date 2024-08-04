function toggleIcon() {
    const icon = document.getElementById('note-panel-icon');
    const noteList = document.getElementById('note-list');

    if (icon.src.includes('up.svg')) {
        icon.src = 'img/down.svg';
        noteList.style.display = 'none'; // Hide notes
    } else {
        icon.src = 'img/up.svg';
        noteList.style.display = 'block'; // Show notes
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const notepad = document.getElementById('notepad');
    const noteList = document.getElementById('note-list');
    const saveButton = document.getElementById('save-button');
    const counter = document.getElementById('counter');

    // Function to update word and character count
    const updateCounter = () => {
        const text = notepad.value.trim();
        const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
        const charCount = text.length;
        counter.textContent = `Words: ${wordCount} | Characters: ${charCount}`;
    };

    // Update counter whenever text in the notepad changes
    notepad.addEventListener('input', updateCounter);

    // Save note to localStorage
    const saveNote = () => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const noteText = notepad.value.trim();
        const selectedNoteIndex = parseInt(localStorage.getItem('selectedNoteIndex'), 10);

        if (noteText) {
            if (!isNaN(selectedNoteIndex) && selectedNoteIndex >= 0 && selectedNoteIndex < notes.length) {
                // Update the content of the selected note
                notes[selectedNoteIndex].content = noteText;
                localStorage.removeItem('selectedNoteIndex');
            } else {
                // Check if content already exists
                const existingNote = notes.find(note => note.content === noteText);
                if (existingNote) {
                    alert("A note with the same content already exists.");
                    return; // Prevent saving duplicate content
                }

                // Determine the highest note number and increment
                const highestNumber = notes.reduce((acc, note) => {
                    const number = parseInt(note.title.replace('Note ', '')) || 0;
                    return Math.max(acc, number);
                }, 0);

                // Save new note with incremented title
                notes.push({ title: `Note ${highestNumber + 1}`, content: noteText });
            }
            localStorage.setItem('notes', JSON.stringify(notes));
            notepad.value = ''; // Clear the notepad
            updateCounter(); // Reset the counter
            renderNotes();
        }
    };

    // Render notes from localStorage
    const renderNotes = () => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        noteList.innerHTML = ''; // Clear existing notes

        notes.forEach((note, index) => {
            const li = document.createElement('li');
            li.classList.add('note-item');
            li.innerHTML = `
                <span class="note-name">${note.title}</span>
                <input type="text" class="note-name-input" style="display:none;">
                <button class="edit-icon" data-index="${index}" title="Edit">
                    <img src="img/edit.svg" alt="Edit Icon">
                </button>
                <button class="delete-icon" data-index="${index}" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            `;

            // Delete note
            li.querySelector('.delete-icon').addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent click from triggering select
                deleteNote(index);
            });

            // Edit note name
            li.querySelector('.edit-icon').addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent click from triggering select
                const listItem = e.currentTarget.closest('li');
                const input = listItem.querySelector('.note-name-input');
                const span = listItem.querySelector('.note-name');
                span.style.display = 'none';
                input.style.display = 'inline-block';
                input.value = span.textContent;
                input.focus();

                // Blur event listener to save changes
                input.addEventListener('blur', function() {
                    span.textContent = this.value;
                    span.style.display = 'inline';
                    input.style.display = 'none';
                    saveUpdatedNoteName(index, this.value);
                });

                // Keydown event listener for Enter key
                input.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        this.blur();
                    }
                });
            });

            // Toggle selected note
            li.addEventListener('click', () => {
                loadNote(index);
                const selectedNote = document.querySelector('#note-list li.selected');
                if (selectedNote) {
                    selectedNote.classList.remove('selected');
                }
                li.classList.add('selected');
            });

            noteList.appendChild(li);
        });
    };

    // Load a note into the notepad
    const loadNote = (index) => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        if (index >= 0 && index < notes.length) {
            notepad.value = notes[index].content;
            localStorage.setItem('selectedNoteIndex', index);
            updateCounter(); // Update the counter with the loaded note's content
        }
    };

    // Delete a note
    const deleteNote = (index) => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
    };

    // Save updated note name
    const saveUpdatedNoteName = (index, newName) => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        if (index >= 0 && index < notes.length) {
            notes[index].title = newName;
            localStorage.setItem('notes', JSON.stringify(notes));
            renderNotes();
        }
    };

    // Initialize notes
    renderNotes();

    // Save note when clicking the save button
    saveButton.addEventListener('click', saveNote);

    // Initial counter update on page load
    updateCounter();
});
