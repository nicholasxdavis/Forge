// Select elements
const form = document.getElementById('converter-form');
const fileInput = document.getElementById('file-upload');
const progressBar = document.getElementById('upload-progress');
const dropArea = document.getElementById('drop-area');
const conversionTypeSelect = document.getElementById('conversion-type'); // Select the conversion type
const popup = document.getElementById('popup'); // Select the popup element
const closePopupButton = document.getElementById('close-popup'); // Select the close button in the popup

// Function to convert file to blob based on the selected audio type
async function convertFileToBlob(file, conversionType) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function(event) {
            let mimeType;
            switch (conversionType) {
                case 'mp3':
                    mimeType = 'audio/mpeg';
                    break;
                case 'wav':
                    mimeType = 'audio/wav';
                    break;
                case 'ogg':
                    mimeType = 'audio/ogg';
                    break;
                case 'aac':
                    mimeType = 'audio/aac';
                    break;
                case 'flac':
                    mimeType = 'audio/flac';
                    break;
                default:
                    mimeType = file.type; // Default to the original file type if unrecognized
            }
            const blob = new Blob([event.target.result], { type: mimeType });
            resolve(blob);
        };

        reader.onerror = function() {
            reject(new Error('Failed to read the file.'));
        };

        reader.readAsArrayBuffer(file);
    });
}

// Function to handle batch conversion and zip creation
async function handleBatchConversion(files, conversionType) {
    if (files.length === 1) {
        // If only one file, convert and download directly
        const file = files[0];
        const blob = await convertFileToBlob(file, conversionType);
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
            }
        }

        // Convert each file to blob and add to zip
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const blob = await convertFileToBlob(file, conversionType);
            
            // Add file to zip with the correct extension
            zip.file(`${file.name.replace(/\.[^/.]+$/, `.${conversionType}`)}`, blob);

            // Update progress bar after each file is processed
            filesProcessed++;
            updateProgressBar({ loaded: filesProcessed, total: totalFiles });
        }

        // Generate the zip file asynchronously
        const zipBlob = await zip.generateAsync({ type: 'blob' }, updateProgressBar);

        return zipBlob;
    }
}

// Function to handle audio conversion
async function handleAudioConversion(files, conversionType) {
    const file = files[0]; // For simplicity, assume only one file for audio conversion
    const blob = await convertFileToBlob(file, conversionType);
    return blob;
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
        // Show popup if no files are selected
        popup.style.display = 'flex';
        return;
    }

    const conversionType = conversionTypeSelect.value;
    if (!conversionType) {
        alert('Please select a conversion type.');
        return;
    }

    try {
        let blob;
        if (files[0].type.startsWith('audio/')) {
            blob = await handleAudioConversion(files, conversionType);
        } else {
            blob = await handleBatchConversion(files, conversionType);
        }

        const filename = files.length === 1 ? files[0].name.replace(/\.[^/.]+$/, `.${conversionType}`) : `converted_files.zip`;
        triggerDownload(blob, filename);
    } catch (error) {
        console.error('Conversion failed:', error.message);
        alert('Failed to convert/download the files. Please try again.');
    } finally {
        progressBar.value = 0; // Reset progress bar after completion
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

// Drag and drop functionality
function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

function handleDragEnter(event) {
    event.preventDefault();
    event.stopPropagation();
    dropArea.classList.add('drag-over');
}

function handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    dropArea.classList.remove('drag-over');
}

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

// Event listener to close the popup
closePopupButton.addEventListener('click', function() {
    popup.style.display = 'none';
});
