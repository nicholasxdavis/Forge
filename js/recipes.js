document.addEventListener('DOMContentLoaded', () => {
    const regenerateBtn = document.getElementById('regenerate-btn');
    const recipeCountInput = document.getElementById('recipe-count');
    const recipeCategorySelect = document.getElementById('recipe-category');
    const recipeContainer = document.getElementById('recipe-container');

    regenerateBtn.addEventListener('click', () => {
        const recipeCount = parseInt(recipeCountInput.value);
        const recipeCategory = recipeCategorySelect.value;
        generateRecipes(recipeCount, recipeCategory);
    });

    async function generateRecipes(count, category) {
        recipeContainer.innerHTML = ''; // Clear existing recipes
        for (let i = 0; i < count; i++) {
            try {
                const recipe = await fetchRecipe(category);
                displayRecipe(recipe);
            } catch (error) {
                console.error("Failed to fetch recipe:", error);
            }
        }
    }

    async function fetchRecipe(category) {
        const url = category === 'all'
            ? 'https://www.themealdb.com/api/json/v1/1/random.php'
            : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const meals = category === 'all' ? data.meals : data.meals[Math.floor(Math.random() * data.meals.length)];

        if (category !== 'all') {
            const mealDetailsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meals.idMeal}`);
            if (!mealDetailsResponse.ok) {
                throw new Error(`HTTP error! status: ${mealDetailsResponse.status}`);
            }
            const mealDetailsData = await mealDetailsResponse.json();
            return mealDetailsData.meals[0];
        }
        
        return meals[0];
    }

    function displayRecipe(recipe) {
        const recipeDiv = document.createElement('div');
        recipeDiv.className = 'recipe';

        const recipeTitle = document.createElement('h3');
        recipeTitle.textContent = recipe.strMeal;
        recipeDiv.appendChild(recipeTitle);

        if (recipe.strMealThumb) {
            const recipeImage = document.createElement('img');
            recipeImage.src = recipe.strMealThumb;
            recipeImage.alt = recipe.strMeal;
            recipeImage.className = 'recipe-image';
            recipeDiv.appendChild(recipeImage);
        }

        const recipeInstructions = document.createElement('p');
        recipeInstructions.innerHTML = recipe.strInstructions || "Instructions not available.";
        recipeDiv.appendChild(recipeInstructions);

        recipeContainer.appendChild(recipeDiv);
    }

    // Initial load
    const initialRecipeCount = parseInt(recipeCountInput.value);
    const initialRecipeCategory = recipeCategorySelect.value;
    generateRecipes(initialRecipeCount, initialRecipeCategory);
});
