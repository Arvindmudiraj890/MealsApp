// Get references to the necessary DOM elements
const mealInput = document.getElementById('mealInput');
const addMealBtn = document.getElementById('addMealBtn');
const mealList = document.getElementById('mealList');
const searchInput = document.getElementById('searchInput');

// Retrieve meals from local storage or set an empty array
let meals = JSON.parse(localStorage.getItem('meals')) || [];

// Function to render the meal list
function renderMealList() {
  // Clear the existing list
  mealList.innerHTML = '';

  // Create and append a new list item for each meal
  meals.forEach(meal => {
    const li = document.createElement('li');
    li.innerText = meal;
    mealList.appendChild(li);
  });
}

// Function to handle adding a new meal
function addMeal() {
  const newMeal = mealInput.value.trim();

  // Check if the meal input is empty
  if (newMeal === '') {
    return;
  }

  // Add the meal to the meals array
  meals.push(newMeal);

  // Clear the meal input
  mealInput.value = '';

  // Render the updated meal list
  renderMealList();

  // Store the meals in local storage
  localStorage.setItem('meals', JSON.stringify(meals));
}

// Function to handle searching for meals
function searchMeals() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  // Filter meals based on the search term
  const filteredMeals = meals.filter(meal =>
    meal.toLowerCase().includes(searchTerm)
  );

  // Render the filtered meal list
  renderFilteredMealList(filteredMeals);
}

// Function to render the filtered meal list
function renderFilteredMealList(filteredMeals) {
  // Clear the existing list
  mealList.innerHTML = '';

  // Create and append a new list item for each filtered meal
  filteredMeals.forEach(meal => {
    const li = document.createElement('li');
    li.innerText = meal;
    mealList.appendChild(li);
  });
}

// Event listener for the "Add Meal" button
addMealBtn.addEventListener('click', addMeal);

// Event listener for the search input
searchInput.addEventListener('input', searchMeals);

// Render the initial meal list
renderMealList();




