// Selecting DOM elements
const nameInput = document.getElementById('name');
const ingredientsInput = document.getElementById('ingredients');
const instructionsInput = document.getElementById('instructions');
const addBtn = document.getElementById('add-btn');
const mealsContainer = document.getElementById('meals-container');

// Storing meals in local storage
let meals = JSON.parse(localStorage.getItem('meals')) || [];

// Rendering meals from local storage
const renderMeals = () => {
  mealsContainer.innerHTML = '';
  meals.forEach(meal => {
    const mealElem = document.createElement('div');
    mealElem.className = 'meal';
    mealElem.innerHTML = `
      <h3 class="meal-title">${meal.name}</h3>
      <p class="meal-ingredients"><strong>Ingredients:</strong> ${meal.ingredients}</p>
      <p class="meal-instructions"><strong>Instructions:</strong> ${meal.instructions}</p>
      <button class="btn btn-danger delete-btn" data-id="${meal.id}">Delete</button>
    `;
    mealsContainer.appendChild(mealElem);
  });
};

// Adding a meal
const addMeal = (event) => {
  event.preventDefault();
  const name = nameInput.value;
  const ingredients = ingredientsInput.value;
  const instructions = instructionsInput.value;
  const id = Date.now().toString();
  const meal = { name, ingredients, instructions, id };
  meals.push(meal);
  localStorage.setItem('meals', JSON.stringify(meals));
  nameInput.value = '';
  ingredientsInput.value = '';
  instructionsInput.value = '';
  renderMeals();
};

// Deleting a meal
const deleteMeal = (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const id = event.target.getAttribute('data-id');
    meals = meals.filter(meal => meal.id !== id);
    localStorage.setItem('meals', JSON.stringify(meals));
    renderMeals();
  }
};

// Event listeners
addBtn.addEventListener('click', addMeal);
mealsContainer.addEventListener('click', deleteMeal);

// Initial render
renderMeals();
