// Select elements
const form = document.getElementById('converter-form');
const fileInput = document.getElementById('file-upload');
const progressBar = document.getElementById('upload-progress');
const progressContainer = document.querySelector('.progress-container');
const dropArea = document.getElementById('drop-area');
const conversionTypeSelect = document.getElementById('conversion-type');
const popup = document.getElementById('popup');
const closePopupButton = document.getElementById('close-popup');
const popupMessage = document.getElementById('message-sent');

// Function to show custom popup
function showPopup(message) {
    popupMessage.textContent = message;
    popup.style.display = 'flex';
}

// Function to hide custom popup
function hidePopup() {
    popup.style.display = 'none';
}

// Function to convert file to blob based on selected type
async function convertFileToBlob(file, conversionType) {
    if (file.type === 'image/svg+xml') {
        return convertSVGToImage(file, conversionType);
    } else if (conversionType === 'png') {
        return convertImageToPNG(file);
    } else if (conversionType === 'avif' || conversionType === 'jpeg' || conversionType === 'webp' || 
               conversionType === 'bmp' || conversionType === 'gif') {
        return convertImageToFormat(file, conversionType);
    }
    return new Blob([file], { type: file.type }); // Default case: return original file as blob
}

// Function to convert an SVG file to different image formats using canvas
function convertSVGToImage(file, conversionType) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function(event) {
            const svgData = event.target.result;
            const img = new Image();

            img.onload = function() {
                const canvas = document.createElement('canvas');
                canvas.width = img.width || img.naturalWidth;
                canvas.height = img.height || img.naturalHeight;
                const ctx = canvas.getContext('2d');

                // Clear the canvas before drawing the image, ensuring transparency is preserved
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);

                let mimeType;
                let backgroundColor = null;

                switch (conversionType) {
                    case 'png':
                        mimeType = 'image/png';
                        break;
                    case 'jpeg':
                        mimeType = 'image/jpeg';
                        backgroundColor = 'white'; // JPEG doesn't support transparency
                        break;
                    case 'webp':
                        mimeType = 'image/webp';
                        break;
                    case 'bmp':
                        mimeType = 'image/bmp';
                        backgroundColor = 'white'; // BMP might not fully support transparency
                        break;
                    case 'gif':
                        mimeType = 'image/gif';
                        break;
                    case 'avif':
                        mimeType = 'image/avif';
                        break;
                    case 'tiff':
                        mimeType = 'image/tiff'; // TIFF not supported by canvas; requires additional handling
                        break;
                    default:
                        mimeType = 'image/png'; // Default to PNG
                }

                // If the target format doesn't support transparency, fill the canvas with the background color
                if (backgroundColor) {
                    ctx.globalCompositeOperation = 'destination-over';
                    ctx.fillStyle = backgroundColor;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }

                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error(`Failed to convert SVG to ${conversionType}`));
                    }
                }, mimeType);
            };

            img.onerror = function() {
                reject(new Error('Failed to load SVG as an image.'));
            };

            const blob = new Blob([svgData], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            img.src = url;

            // Cleanup the object URL after image loads
            img.onloadend = function() {
                URL.revokeObjectURL(url);
            };
        };

        reader.onerror = function() {
            reject(new Error('Failed to read the SVG file.'));
        };

        reader.readAsText(file);
    });
}

// Function to convert an image to a different format using canvas
function convertImageToFormat(file, conversionType) {
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
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas to preserve transparency
            ctx.drawImage(img, 0, 0);

            let mimeType;
            let backgroundColor = null;

            switch (conversionType) {
                case 'png':
                    mimeType = 'image/png';
                    break;
                case 'jpeg':
                    mimeType = 'image/jpeg';
                    backgroundColor = 'white'; // JPEG doesn't support transparency
                    break;
                case 'webp':
                    mimeType = 'image/webp';
                    break;
                case 'bmp':
                    mimeType = 'image/bmp';
                    backgroundColor = 'white'; // BMP might not fully support transparency
                    break;
                case 'gif':
                    mimeType = 'image/gif';
                    break;
                case 'avif':
                    mimeType = 'image/avif';
                    break;
                case 'tiff':
                    mimeType = 'image/tiff'; // TIFF not supported by canvas; requires additional handling
                    break;
                default:
                    mimeType = 'image/png'; // Default to PNG
            }

            // If the target format doesn't support transparency, fill the canvas with the background color
            if (backgroundColor) {
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = backgroundColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error(`Failed to convert image to ${conversionType}`));
                }
            }, mimeType);
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
        const newFileName = changeFileExtension(file.name, conversionType); // Change the file extension
        return { blob, newFileName };
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
            const newFileName = changeFileExtension(file.name, conversionType); // Change the file extension

            zip.file(newFileName, blob);

            filesProcessed++;
            updateProgressBar({ loaded: filesProcessed, total: totalFiles });
        }

        const zipBlob = await zip.generateAsync({ type: 'blob' }, updateProgressBar);

        return { blob: zipBlob, newFileName: 'converted_files.zip' };
    }
}

// Function to change the file extension
function changeFileExtension(filename, conversionType) {
    const extensionMap = {
        png: '.png',
        svg: '.svg',
        jpeg: '.jpeg',
        gif: '.gif',
        bmp: '.bmp',
        tiff: '.tiff',
        webp: '.webp',
        avif: '.avif',
    };
    const newExtension = extensionMap[conversionType] || '';
    return filename.replace(/\.[^/.]+$/, newExtension);
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
    event.preventDefault(); // Prevent default form submission

    const files = fileInput.files;
    if (files.length === 0) {
        showPopup('Please select one or more files.'); // Show custom popup
        return;
    }

    const conversionType = conversionTypeSelect.value;

    try {
        const { blob, newFileName } = await handleBatchConversion(files, conversionType);
        triggerDownload(blob, newFileName);
    } catch (error) {
        console.error('Conversion failed:', error.message);
        showPopup('Failed to convert/download the files. Please try again.');
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

// Close popup event listener
closePopupButton.addEventListener('click', hidePopup);
