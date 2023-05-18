// Sample meal data
const meals = [
    { name: "Spaghetti Bolognese", type: "Italian", ingredients: ["spaghetti", "tomato sauce", "ground beef", "onion", "garlic"] },
    { name: "Chicken Tikka Masala", type: "Indian", ingredients: ["chicken", "yogurt", "tomato sauce", "spices"] },
    { name: "Caesar Salad", type: "American", ingredients: ["lettuce", "croutons", "parmesan cheese", "caesar dressing"] },
    // Add more sample meals here
];

// Function to display meals
function displayMeals() {
    const mealsList = document.getElementById("mealsList");
    mealsList.innerHTML = "";

    meals.forEach(meal => {
        const mealCard = document.createElement("div");
        mealCard.classList.add("mealCard");

        const mealTitle = document.createElement("h2");
        mealTitle.textContent = meal.name;

        const mealType = document.createElement("p");
        mealType.textContent = `Type: ${meal.type}`;

        const mealIngredients = document.createElement("p");
        mealIngredients.textContent = `Ingredients: ${meal.ingredients.join(", ")}`;

        mealCard.appendChild(mealTitle);
        mealCard.appendChild(mealType);
        mealCard.appendChild(mealIngredients);
        mealsList.appendChild(mealCard);
    });
}

// Function to filter meals based on search input
function filterMeals() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();

    const filteredMeals = meals.filter(meal => meal.name.toLowerCase().includes(searchTerm) || meal.type.toLowerCase().includes(searchTerm));

    if (filteredMeals.length > 0) {
        meals = filteredMeals;
    } else {
        meals = [];
    }

    displayMeals();
}

// Event listener for search input
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", filterMeals);

// Display initial list of meals
displayMeals();



