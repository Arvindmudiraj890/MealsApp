// Sample meal data
const meals = [
    { name: "Spaghetti Bolognese", type: "Italian", ingredients: ["spaghetti", "tomato sauce", "ground beef", "onion", "garlic"] },
    { name: "Chicken Tikka Masala", type: "Indian", ingredients: ["chicken", "yogurt", "tomato sauce", "spices"] },
    { name: "Caesar Salad", type: "American", ingredients: ["lettuce", "croutons", "parmesan cheese", "Caesar dressing"] },
    { name: "Sushi", type: "Japanese", ingredients: ["rice", "nori", "fish", "vegetables"] },
    { name: "Taco", type: "Mexican", ingredients: ["tortilla", "ground beef", "lettuce", "tomato", "cheese"] }
];

// Function to display meals
function displayMeals() {
    const mealsList = document.getElementById("mealsList");
    mealsList.innerHTML = "";

    for (let i = 0; i < meals.length; i++) {
        const meal = meals[i];

        const mealCard = document.createElement("div");
        mealCard.className = "mealCard";

        const mealName = document.createElement("h2");
        mealName.textContent = meal.name;

        const mealType = document.createElement("p");
        mealType.textContent = meal.type;

        const mealIngredients = document.createElement("p");
        mealIngredients.textContent = "Ingredients: " + meal.ingredients.join(", ");

        mealCard.appendChild(mealName);
        mealCard.appendChild(mealType);
        mealCard.appendChild(mealIngredients);

        mealsList.appendChild(mealCard);
    }
}

// Function to filter meals based on search input
function filterMeals() {
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.toLowerCase();

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


