// Select elements 
const form = document.getElementById('converter-form');
const fileInput = document.getElementById('file-upload');
const progressBar = document.getElementById('upload-progress');
const dropArea = document.getElementById('drop-area'); // Select the drop area
const conversionTypeSelect = document.getElementById('conversion-type'); // Select the conversion type
const popup = document.getElementById('popup'); // Select the popup element
const closePopupButton = document.getElementById('close-popup'); // Select the close button in the popup

// Function to convert video file to the desired format based on the selected conversion type
async function convertVideoFile(file, conversionType) {
    return new Promise((resolve, reject) => {
        // Simulate conversion (replace with actual conversion logic)
        setTimeout(() => {
            let mimeType;
            switch (conversionType) {
                case 'mp4':
                    mimeType = 'video/mp4';
                    break;
                case 'avi':
                    mimeType = 'video/x-msvideo';
                    break;
                case 'mov':
                    mimeType = 'video/quicktime';
                    break;
                case 'mkv':
                    mimeType = 'video/x-matroska';
                    break;
                case 'webm':
                    mimeType = 'video/webm';
                    break;
                default:
                    mimeType = file.type; // Default to the original file type if unrecognized
            }
            const convertedBlob = new Blob([file], { type: mimeType });
            resolve(convertedBlob);
        }, 2000); // Simulate conversion delay of 2 seconds
    });
}

// Function to handle batch conversion and zip creation
async function handleBatchConversion(files, conversionType) {
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
        }
    }

    // Convert each file to blob asynchronously
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
            const convertedBlob = await convertVideoFile(file, conversionType);
            convertedBlobs.push({
                blob: convertedBlob,
                name: file.name.replace(/\.[^/.]+$/, `.${conversionType}`) // Change extension to selected type
            });

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
        convertedBlobs.forEach((fileData, index) => {
            zip.file(fileData.name, fileData.blob);
        });
        return zip.generateAsync({ type: 'blob' }, updateProgressBar);
    } else {
        // If only one file, return the single blob directly
        return convertedBlobs[0].blob;
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
        const blob = await handleBatchConversion(files, conversionType);
        const filename = files.length === 1 ? files[0].name.replace(/\.[^/.]+$/, `.${conversionType}`) : `converted_videos.zip`;
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
    dropArea.classList.add('dragging');
}

// Function to handle drag leave event
function handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    dropArea.classList.remove('dragging');
}

// Function to handle drop event
function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    dropArea.classList.remove('dragging');

    const files = event.dataTransfer.files;
    if (files.length > 0) {
        fileInput.files = files; // Update the file input with the dropped files
    }
}

// Event listener to close the popup
closePopupButton.addEventListener('click', function() {
    popup.style.display = 'none';
});
