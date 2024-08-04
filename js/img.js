// Select elements
const form = document.getElementById('converter-form');
const fileInput = document.getElementById('file-upload');
const progressBar = document.getElementById('upload-progress');
const progressContainer = document.querySelector('.progress-container');
const dropArea = document.getElementById('drop-area');
const conversionTypeSelect = document.getElementById('conversion-type'); // Select the conversion type

// Function to convert file to blob based on selected type
async function convertFileToBlob(file, conversionType) {
    if (conversionType === 'png') {
        return convertImageToPNG(file);
    }
    // Add more conversion types as needed
    return new Blob([file], { type: file.type }); // Default case: return original file as blob
}

// Function to convert an image file to PNG using canvas
function convertImageToPNG(file) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = function(event) {
            img.src = event.target.result;
        };

        reader.onerror = function() {
            reject(new Error('Failed to read the file.'));
        };

        img.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/png');
        };

        reader.readAsDataURL(file);
    });
}

// Function to handle batch conversion and zip creation
async function handleBatchConversion(files, conversionType) {
    progressContainer.style.display = 'flex';
    if (files.length === 1) {
        const file = files[0];
        const blob = await convertFileToBlob(file, conversionType);
        return blob;
    } else {
        const zip = new JSZip();
        const totalFiles = files.length;
        let filesProcessed = 0;

        // Function to update progress bar
        function updateProgressBar(progress) {
            const loaded = progress.loaded || 0;
            const total = progress.total || 100;

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

            zip.file(`${file.name}`, blob);

            filesProcessed++;
            updateProgressBar({ loaded: filesProcessed, total: totalFiles });
        }

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

    const conversionType = conversionTypeSelect.value;

    try {
        const blob = await handleBatchConversion(files, conversionType);
        const filename = files.length === 1 ? files[0].name : `converted_files.zip`;
        triggerDownload(blob, filename);
    } catch (error) {
        console.error('Conversion failed:', error.message);
        alert('Failed to convert/download the files. Please try again.');
    } finally {
        progressBar.value = 0;
        progressContainer.style.display = 'none';
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
    fileInput.value = '';
    document.getElementById('clear-button-container').classList.add('hidden');
});

// Function to handle drag over event
function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'copy';
}

// Function to handle drag enter event
function handleDragEnter(event) {
    event.preventDefault();
    event.stopPropagation();
    dropArea.classList.add('drag-over');
}

// Function to handle drag leave event
function handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    dropArea.classList.remove('drag-over');
}

// Function to handle drop event
function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    dropArea.classList.remove('drag-over');

    const files = event.dataTransfer.files;
    fileInput.files = files;

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
