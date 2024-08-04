
        // Get the theme toggle button and theme icon
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');

        // Function to toggle between light mode and dark mode
        function toggleTheme() {
            // Toggle body class for light mode and dark mode
            document.body.classList.toggle('light-mode');
            document.body.classList.toggle('dark-mode');

            // Toggle theme icon between light and dark mode icons
            if (document.body.classList.contains('dark-mode')) {
                themeIcon.src = 'img/dark.svg'; // Path to dark mode icon
                localStorage.setItem('theme', 'dark'); // Save preference to localStorage
            } else {
                themeIcon.src = 'img/light.svg'; // Path to light mode icon
                localStorage.setItem('theme', 'light'); // Save preference to localStorage
            }
        }

        // Load the saved theme preference on page load
        function loadThemePreference() {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-mode');
                document.body.classList.remove('light-mode');
                themeIcon.src = 'img/dark.svg'; // Set the icon to dark mode
            } else {
                document.body.classList.add('light-mode');
                document.body.classList.remove('dark-mode');
                themeIcon.src = 'img/light.svg'; // Set the icon to light mode
            }
        }

        // Event listener for theme toggle button
        themeToggle.addEventListener('click', toggleTheme);

        // Load theme preference when the page loads
        document.addEventListener('DOMContentLoaded', loadThemePreference);