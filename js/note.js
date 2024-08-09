document.addEventListener('DOMContentLoaded', () => {
    const notepad = document.getElementById('notepad');
    const noteList = document.getElementById('note-list');
    const saveButton = document.getElementById('save-button');
    const addNoteButton = document.getElementById('add-note-button');
    const counter = document.getElementById('counter');

    // Function to update word and character count
    const updateCounter = () => {
        const text = notepad.innerHTML.trim();
        const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
        const charCount = text.length;
        counter.textContent = `Words: ${wordCount} | Characters: ${charCount}`;
    };

    // Update counter whenever text in the notepad changes
    notepad.addEventListener('input', updateCounter);

    // Save note to localStorage
    const saveNote = () => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const noteText = notepad.innerHTML.trim();
        const selectedNoteIndex = parseInt(localStorage.getItem('selectedNoteIndex'), 10);

        if (noteText) {
            if (!isNaN(selectedNoteIndex) && selectedNoteIndex >= 0 && selectedNoteIndex < notes.length) {
                notes[selectedNoteIndex].content = noteText;
                localStorage.removeItem('selectedNoteIndex');
            } else {
                const existingNote = notes.find(note => note.content === noteText);
                if (existingNote) {
                    alert("A note with the same content already exists.");
                    return;
                }

                const highestNumber = notes.reduce((acc, note) => {
                    const number = parseInt(note.title.replace('Note ', '')) || 0;
                    return Math.max(acc, number);
                }, 0);

                notes.push({ title: `Note ${highestNumber + 1}`, content: noteText });
            }
            localStorage.setItem('notes', JSON.stringify(notes));
            notepad.innerHTML = '';
            updateCounter();
            renderNotes();
        }
    };

    // Render notes from localStorage
    const renderNotes = () => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        noteList.innerHTML = '';

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

            li.querySelector('.delete-icon').addEventListener('click', (e) => {
                e.stopPropagation();
                deleteNote(index);
            });

            li.querySelector('.edit-icon').addEventListener('click', (e) => {
                e.stopPropagation();
                const listItem = e.currentTarget.closest('li');
                const input = listItem.querySelector('.note-name-input');
                const span = listItem.querySelector('.note-name');
                span.style.display = 'none';
                input.style.display = 'inline-block';
                input.value = span.textContent;
                input.focus();

                input.addEventListener('blur', function() {
                    span.textContent = this.value;
                    span.style.display = 'inline';
                    input.style.display = 'none';
                    saveUpdatedNoteName(index, this.value);
                });

                input.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        this.blur();
                    }
                });
            });

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
            notepad.innerHTML = notes[index].content;
            localStorage.setItem('selectedNoteIndex', index);
            updateCounter();
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

    // Add a new note
    const addNote = () => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const newNote = { title: `Note ${notes.length + 1}`, content: '' };
        notes.push(newNote);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
    };

    // Font Family
    document.getElementById('font-family-select').addEventListener('change', (event) => {
        notepad.style.fontFamily = event.target.value;
    });

    // Font Size
    const fontSizeSlider = document.getElementById('font-size-slider');
    const fontSizeInput = document.getElementById('font-size-input');

    fontSizeSlider.addEventListener('input', (event) => {
        const size = event.target.value;
        notepad.style.fontSize = `${size}px`;
        fontSizeInput.value = size;
    });

    fontSizeInput.addEventListener('input', (event) => {
        const size = event.target.value;
        notepad.style.fontSize = `${size}px`;
        fontSizeSlider.value = size;
    });

    // Font Style
    const fontStyleSelect = document.getElementById('font-style-select');
    fontStyleSelect.addEventListener('change', (event) => {
        const selectedStyle = event.target.value;
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);

        // Apply the style to selected text
        if (selection.toString().length > 0) {
            if (selectedStyle === 'italic') {
                document.execCommand('italic');
            } else if (selectedStyle === 'bold') {
                document.execCommand('bold');
            } else {
                document.execCommand('removeFormat');
            }
        } else {
            // Apply the style to the whole notepad if no text is selected
            notepad.style.fontStyle = selectedStyle === 'italic' ? 'italic' : 'normal';
            notepad.style.fontWeight = selectedStyle === 'bold' ? 'bold' : 'normal';
        }
    });

    // Text Color
    textColorPicker.on('save', (color) => {
        notepad.style.color = color.toRGBA().toString();
    });

    // Background Color
    backgroundColorPicker.on('save', (color) => {
        notepad.style.backgroundColor = color.toRGBA().toString();
    });

    // Text Alignment
    document.getElementById('text-align-select').addEventListener('change', (event) => {
        notepad.style.textAlign = event.target.value;
    });

    // Initialize notes and formatting options
    renderNotes();
    updateCounter();

    // Save note when clicking the save button
    saveButton.addEventListener('click', saveNote);

    // Add note when clicking the add note button
    addNoteButton.addEventListener('click', addNote);
});
