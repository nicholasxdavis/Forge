document.addEventListener('DOMContentLoaded', function() {
    const dataCollectionPopup = document.getElementById('data-collection-popup');
    const optInButton = document.getElementById('popup-opt-in-btn');
    const optOutButton = document.getElementById('popup-opt-out-btn');
    const cookiePopup = document.getElementById('cookie-popup');
    const cookiePopupBtn = document.getElementById('cookie-popup-btn');

    // Show cookie popup if not already accepted
    if (!localStorage.getItem('cookieAccepted')) {
        if (cookiePopup) {
            cookiePopup.style.display = 'block';
        }
    }

    // Handle cookie popup button click
    if (cookiePopupBtn) {
        cookiePopupBtn.addEventListener('click', function() {
            if (cookiePopup) {
                cookiePopup.style.display = 'none';
            }
            localStorage.setItem('cookieAccepted', 'true');
        });
    }

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
        if (dataCollectionPopup) {
            dataCollectionPopup.style.display = 'flex';
        }
        toggleScroll(true);
    } else {
        // Hide popup and enable scrolling
        if (dataCollectionPopup) {
            dataCollectionPopup.style.display = 'none';
        }
        toggleScroll(false);
    }

    // Handle the Opt In button click
    if (optInButton) {
        optInButton.addEventListener('click', function() {
            localStorage.setItem('dataCollectionPreference', 'opt-in');
            if (dataCollectionPopup) {
                dataCollectionPopup.style.display = 'none';
            }
            toggleScroll(false);
        });
    }

    // Handle the Opt Out button click
    if (optOutButton) {
        optOutButton.addEventListener('click', function() {
            localStorage.setItem('dataCollectionPreference', 'opt-out');
            if (dataCollectionPopup) {
                dataCollectionPopup.style.display = 'none';
            }
            toggleScroll(false);
        });
    }
});
