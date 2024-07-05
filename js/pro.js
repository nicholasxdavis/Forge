document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card3'); // Updated selector for .card3
    const freeCard = document.querySelector('.card3:nth-child(1)'); // Assuming the Free Plan is the first card
    const button = document.querySelector('.planbutton-container button');
    
    // Disable the Free Plan card
    freeCard.classList.add('disabled');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Check if the card is disabled
            if (this.classList.contains('disabled')) return;
            
            // Remove 'active' class from all cards
            cards.forEach(c => c.classList.remove('active'));
            
            // Add 'active' class to the clicked card
            this.classList.add('active');
            
            // Show the button
            button.style.display = 'block';
        });
    });

    // Optional: Hide the button if no card is active
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.card3') && !event.target.closest('.planbutton-container button')) {
            cards.forEach(card => card.classList.remove('active'));
            button.style.display = 'none';
        }
    });
});
