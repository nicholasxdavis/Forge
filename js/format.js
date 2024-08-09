document.addEventListener('DOMContentLoaded', () => {
    const notepad = document.getElementById('notepad');
    const downloadButton = document.getElementById('download-button');
    const printButton = document.getElementById('print-button');
    const downloadPopup = document.getElementById('popup2');
    const printPopup = document.getElementById('popup3');
    const cancelDownloadPopup = document.getElementById('cancel-popup2');
    const cancelPrintPopup = document.getElementById('cancel-popup3');
    const downloadSelectedButton = document.getElementById('download');
    const downloadAllButton = document.getElementById('download-all');
    const printSelectedButton = document.getElementById('print');
    const printAllButton = document.getElementById('print-all');

    // Function to download content
    const downloadContent = (filename, content) => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Download Selected
    downloadSelectedButton.addEventListener('click', () => {
        downloadContent('note.txt', notepad.value);
    });

    // Download All (Assuming there are multiple notes, implement logic to fetch and download all notes)
    downloadAllButton.addEventListener('click', () => {
        // Example: Iterate over notes and download them (mockup)
        const notes = Array.from(document.querySelectorAll('#note-list li'));
        notes.forEach((note, index) => {
            const noteContent = note.querySelector('.note-name').textContent;
            downloadContent(`note-${index + 1}.txt`, noteContent);
        });
    });

    // Function to print content
    const printContent = (content) => {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Print Note</title>');
        printWindow.document.write('</head><body >');
        printWindow.document.write(content.replace(/\n/g, '<br>'));
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    // Print Selected
    printSelectedButton.addEventListener('click', () => {
        printContent(notepad.value);
    });

    // Print All (Assuming there are multiple notes, implement logic to print all notes)
    printAllButton.addEventListener('click', () => {
        // Example: Iterate over notes and print them (mockup)
        const notes = Array.from(document.querySelectorAll('#note-list li'));
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Print Notes</title>');
        printWindow.document.write('</head><body >');
        notes.forEach((note) => {
            const noteContent = note.querySelector('.note-name').textContent;
            printWindow.document.write(`<div>${noteContent.replace(/\n/g, '<br>')}</div><hr>`);
        });
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    });

    // Show and Hide Popups
    downloadButton.addEventListener('click', () => {
        downloadPopup.style.display = 'flex';
    });

    printButton.addEventListener('click', () => {
        printPopup.style.display = 'flex';
    });

    cancelDownloadPopup.addEventListener('click', () => {
        downloadPopup.style.display = 'none';
    });

    cancelPrintPopup.addEventListener('click', () => {
        printPopup.style.display = 'none';
    });
});
