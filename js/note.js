document.addEventListener('DOMContentLoaded', () => {
    const notepad = document.getElementById('notepad');
    const noteList = document.getElementById('note-list');
    const saveButton = document.getElementById('save-button');

    // Save note to localStorage
    const saveNote = () => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const noteText = notepad.value.trim();

        if (noteText) {
            const selectedNoteIndex = localStorage.getItem('selectedNoteIndex');
            if (selectedNoteIndex !== null) {
                notes[selectedNoteIndex] = noteText;
                localStorage.removeItem('selectedNoteIndex');
            } else {
                notes.push(noteText);
            }
            localStorage.setItem('notes', JSON.stringify(notes));
            notepad.value = ''; // Clear the notepad
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
                <span class="note-text">${note}</span>
                <button class="delete-icon" data-index="${index}" title="Delete">
                    <i class="fas fa-times"></i> <!-- Font Awesome X icon -->
                </button>
            `;
            li.querySelector('.delete-icon').addEventListener('click', (e) => {
                const noteIndex = e.currentTarget.getAttribute('data-index');
                deleteNote(noteIndex);
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
            notepad.value = notes[index];
            localStorage.setItem('selectedNoteIndex', index);
        }
    };

    // Delete a note
    const deleteNote = (index) => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
    };

    // Initialize notes
    renderNotes();

    // Save note when clicking the save button
    saveButton.addEventListener('click', saveNote);
});
