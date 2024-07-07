// Select elements
const form = document.getElementById('converter-form');
const fileInput = document.getElementById('file-upload');
const progressBar = document.getElementById('upload-progress');
const dropArea = document.getElementById('drop-area'); // New: Select the drop area

// Function to convert file to blob
function convertFileToBlob(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function(event) {
            const blob = new Blob([event.target.result], { type: file.type });
            resolve(blob);
        };

        reader.onerror = function() {
            reject(new Error('Failed to read the file.'));
        };

        reader.readAsArrayBuffer(file);
    });
}

// Function to handle batch conversion and zip creation
async function handleBatchConversion(files) {
    if (files.length === 1) {
        // If only one file, convert and download directly
        const file = files[0];
        const blob = await convertFileToBlob(file);
        return blob;
    } else {
        // If multiple files, proceed with zip creation
        const zip = new JSZip();
        const totalFiles = files.length;
        let filesProcessed = 0;

        // Function to update progress bar
        function updateProgressBar(progress) {
    const loaded = progress.loaded || 0;
    const total = progress.total || 100; // Set a default total if not provided

    if (total <= 0) {
        console.error('Invalid total value:', total);
        return;
    }

    const percent = Math.round((loaded / total) * 100);

    if (!isNaN(percent) && percent >= 0 && percent <= 100) {
        progressBar.value = percent;
    } else {
        console.error('Invalid progress value:', percent);
        // Optionally handle or log the error
    }
}

        // Convert each file to blob and add to zip
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const blob = await convertFileToBlob(file);
            
            // Add file to zip
            zip.file(`${file.name}`, blob);

            // Update progress bar after each file is processed
            filesProcessed++;
            updateProgressBar({ loaded: filesProcessed, total: totalFiles });
        }

        // Generate the zip file asynchronously
        const zipBlob = await zip.generateAsync({ type: 'blob' }, updateProgressBar);

        return zipBlob;
    }
}

// Function to trigger download
function triggerDownload(blob, filename) {
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(downloadLink.href);
}

// Event listener for form submission
form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const files = fileInput.files;
    if (files.length === 0) {
        alert('Please select one or more files.');
        return;
    }

    try {
        const blob = await handleBatchConversion(files);
        const filename = files.length === 1 ? files[0].name : `converted_files.zip`;
        triggerDownload(blob, filename);
    } catch (error) {
        console.error('Conversion failed:', error.message);
        alert('Failed to convert/download the files. Please try again.');
    } finally {
        // Reset progress bar after completion
        progressBar.value = 0;
    }
});

// Update file input change event listener to show/hide clear button
fileInput.addEventListener('change', function() {
    if (fileInput.files.length > 0) {
        document.getElementById('clear-button-container').classList.remove('hidden');
    } else {
        document.getElementById('clear-button-container').classList.add('hidden');
    }
});

// Clear files button click event
document.getElementById('clear-files-btn').addEventListener('click', function() {
    fileInput.value = ''; // Clear the file input
    document.getElementById('clear-button-container').classList.add('hidden'); // Hide clear button
});

// Function to handle drag over event
function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Function to handle drag enter event
function handleDragEnter(event) {
    event.preventDefault();
    event.stopPropagation();
    // Add a class or other visual indicator to show the drop area is active
    dropArea.classList.add('drag-over');
}

// Function to handle drag leave event
function handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    // Remove the class or visual indicator when dragging leaves the drop area
    dropArea.classList.remove('drag-over');
}

// Function to handle drop event
function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    dropArea.classList.remove('drag-over'); // Remove drag-over class

    const files = event.dataTransfer.files;
    fileInput.files = files; // Assign dropped files to the file input element

    // Update file input change event listener to show clear button
    if (files.length > 0) {
        document.getElementById('clear-button-container').classList.remove('hidden');
    } else {
        document.getElementById('clear-button-container').classList.add('hidden');
    }
}

// Attach drag and drop event listeners to drop area
dropArea.addEventListener('dragover', handleDragOver);
dropArea.addEventListener('dragenter', handleDragEnter);
dropArea.addEventListener('dragleave', handleDragLeave);
dropArea.addEventListener('drop', handleDrop);
