// Select elements
const form = document.getElementById('converter-form');
const fileInput = document.getElementById('file-upload');
const progressBar = document.getElementById('upload-progress');
const dropArea = document.getElementById('drop-area'); // New: Select the drop area

// Function to convert video file to blob (MP4 to MOV conversion example)
async function convertVideoFile(file) {
    return new Promise((resolve, reject) => {
        // Simulate conversion (replace with actual conversion logic)
        setTimeout(() => {
            const convertedBlob = new Blob([file], { type: 'video/mov' });
            resolve(convertedBlob);
        }, 2000); // Simulate conversion delay of 2 seconds
    });
}

// Function to handle batch conversion and zip creation
async function handleBatchConversion(files) {
    const convertedBlobs = [];
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

    // Convert each file to blob asynchronously
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
            const convertedBlob = await convertVideoFile(file);
            convertedBlobs.push(convertedBlob);

            // Update progress bar after each file is processed
            filesProcessed++;
            updateProgressBar({ loaded: filesProcessed, total: totalFiles });
        } catch (error) {
            console.error('Error converting file:', error);
            throw new Error('Conversion failed for one or more files.');
        }
    }

    // If multiple files, create a zip file with converted blobs
    if (convertedBlobs.length > 1) {
        const zip = new JSZip();
        convertedBlobs.forEach((blob, index) => {
            zip.file(`converted_video_${index + 1}.mov`, blob);
        });
        return zip.generateAsync({ type: 'blob' }, updateProgressBar);
    } else {
        // If only one file, return the single blob directly
        return convertedBlobs[0];
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
        const filename = files.length === 1 ? files[0].name.replace(/\.[^/.]+$/, ".mov") : `converted_videos.zip`;
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
