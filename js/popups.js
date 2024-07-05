document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('data-collection-popup');
    const optInButton = document.getElementById('popup-opt-in-btn');
    const optOutButton = document.getElementById('popup-opt-out-btn');

    // Function to toggle scroll behavior
    function toggleScroll(disable) {
        if (disable) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }

    // Check if the user has already made a choice
    const userChoice = localStorage.getItem('dataCollectionPreference');

    if (!userChoice) {
        // Show popup and disable scrolling
        popup.style.display = 'flex';
        toggleScroll(true);
    } else {
        // Hide popup and enable scrolling
        popup.style.display = 'none';
        toggleScroll(false);
    }

    // Handle the Opt In button click
    optInButton.addEventListener('click', function() {
        localStorage.setItem('dataCollectionPreference', 'opt-in');
        popup.style.display = 'none';
        toggleScroll(false);
    });

    // Handle the Opt Out button click
    optOutButton.addEventListener('click', function() {
        localStorage.setItem('dataCollectionPreference', 'opt-out');
        popup.style.display = 'none';
        toggleScroll(false);
    });
});
