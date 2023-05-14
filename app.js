// Meal Data
const meals = [];

// DOM Elements
const addMealForm = document.getElementById('add-meal-form');
const searchMealForm = document.getElementById('search-meal-form');
const mealList = document.getElementById('meal-list');

// Add Meal
addMealForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get Form Values
  const name = addMealForm.name.value.trim();
  const description = addMealForm.description.value.trim();

  // Validate Form Values
  if (name === '' || description === '') {
    showAlert('Please fill in all fields', 'error');
  } else {
    // Add Meal to List
    const meal = {
      id: Date.now(),
      name,
      description,
    };

    meals.push(meal);
    addMealToDOM(meal);
    showAlert('Meal added successfully', 'success');

    // Clear Form
    addMealForm.reset();
  }
});

// Search Meals
searchMealForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get Search Term
  const searchTerm = searchMealForm.search.value.trim().toLowerCase();

  // Clear List
  mealList.innerHTML = '';

  // Filter Meals
  const filteredMeals = meals.filter((meal) =>
    meal.name.toLowerCase().includes(searchTerm)
  );

  // Add Filtered Meals to DOM
  if (filteredMeals.length > 0) {
    filteredMeals.forEach((meal) => addMealToDOM(meal));
  } else {
    showAlert('No meals found', 'error');
  }

  // Clear Form
  searchMealForm.reset();
});

// Add Meal to DOM
function addMealToDOM(meal) {
  const card = document.createElement('div');
  card.classList.add('card');

  const heading = document.createElement('h2');
  heading.innerText = meal.name;

  const description = document.createElement('p');
  description.innerText = meal.description;

  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Delete';
  deleteBtn.addEventListener('click', () => deleteMeal(meal.id));

  card.appendChild(heading);
  card.appendChild(description);
  card.appendChild(deleteBtn);

  mealList.appendChild(card);
}

// Delete Meal
function deleteMeal(id) {
  const index = meals.findIndex((meal) => meal.id === id);

  if (index !== -1) {
    meals.splice(index, 1);
    showAlert('Meal deleted successfully', 'success');
    mealList.innerHTML = '';
    meals.forEach((meal) => addMealToDOM(meal));
  }
}

// Show Alert
function showAlert(message, type) {
  const alert = document.createElement('div');
  alert.classList.add('alert', type);
  alert.innerText = message;

  const container = document.querySelector('.container');
  const form = document.querySelector('#add-meal-form');
  container.insertBefore(alert, form);

  setTimeout(() => alert.remove(), 3000);
}
