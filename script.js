// Define an array to store meals
let meals = [];

// Get form elements
const form = document.querySelector("form");
const nameInput = document.querySelector("#meal-name");
const descriptionInput = document.querySelector("#meal-description");

// Get search input and meal list
const searchInput = document.querySelector("#search-input");
const mealList = document.querySelector("#meal-list");

// Add event listener to form
form.addEventListener("submit", (event) => {
  // Prevent default form submission
  event.preventDefault();

  // Get values from form
  const name = nameInput.value.trim();
  const description = descriptionInput.value.trim();

  // If name and description are not empty, add meal to the list and reset the form
  if (name !== "" && description !== "") {
    const meal = {
      id: Date.now().toString(),
      name,
      description,
    };

    meals.push(meal);
    saveMealsToLocalStorage();
    renderMeals();
    form.reset();
  }
});

// Add event listener to search input
searchInput.addEventListener("input", () => {
  renderMeals();
});

// Add event listener to meal list
mealList.addEventListener("click", (event) => {
  const target = event.target;

  // If a meal item is clicked, show its details
  if (target.matches(".list-group-item")) {
    const mealId = target.dataset.id;
    const meal = meals.find((meal) => meal.id === mealId);
    showMealDetails(meal);
  }

  // If the delete button is clicked, delete the meal
  if (target.matches(".delete-button")) {
    const mealId = target.dataset.id;
    deleteMealById(mealId);
    renderMeals();
  }

  // If the edit button is clicked, show the edit form
  if (target.matches(".edit-button")) {
    const mealId = target.dataset.id;
    showEditForm(mealId);
  }
});

// Render the list of meals
function renderMeals() {
  // Clear the current list of meals
  mealList.innerHTML = "";

  // Get the search query and filter the meals array
  const query = searchInput.value.trim().toLowerCase();
  const filteredMeals = meals.filter((meal) =>
    meal.name.toLowerCase().includes(query)
  );

  // Render the filtered meals
  filteredMeals.forEach((meal) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.innerText = meal.name;
    listItem.dataset.id = meal.id;

    if (mealList.firstChild) {
      mealList.insertBefore(listItem, mealList.firstChild);
    } else {
      mealList.appendChild(listItem);
    }
  });
}

// Show the details of a meal
function showMealDetails(meal) {
  const mealDetails = document.createElement("div");
  mealDetails.classList.add("meal-details");
  mealDetails.innerHTML = `
    <h2>${meal.name}</h2>
    <p>${meal.description}</p>
    <button class="btn btn-danger delete-button" data-id="${meal.id}">Delete</button>
    <button class="btn btn-primary edit-button" data-id="${meal.id}">Edit</button>
  `;

  // Remove any existing meal details
  const existingMealDetails = document.querySelector(".meal-details");
  if (existingMealDetails) {
    existingMealDetails.remove();
  }

  // Add the meal details to the page
  mealList.insertAdjacentElement("afterend", mealDetails);
}

// Delete a meal by ID
function deleteMealById(mealId) {
  meals = meals.filter((meal) => meal.id !== mealId);
  saveMealsToLocalStorage();
}

// Show the edit form for a meal
function showEditForm(mealId) {
  const meal = meals.find((meal) => meal.id === mealId);

  // Create form elements
  const form = document.createElement("form");
  const nameInput = document.createElement("input");
  const descriptionInput = document.createElement("textarea");
  const saveButton = document.createElement("button");
  const cancelButton = document.createElement("button");

  // Set form element attributes
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("id", "edit-meal-name");
  nameInput.setAttribute("placeholder", "Enter meal name");
  nameInput.setAttribute("value", meal.name);
  descriptionInput.setAttribute("id", "edit-meal-description");
  descriptionInput.setAttribute("placeholder", "Enter meal description");
  descriptionInput.textContent = meal.description;
  saveButton.setAttribute("type", "submit");
  saveButton.classList.add("btn", "btn-primary");
  saveButton.innerText = "Save";
  cancelButton.setAttribute("type", "button");
  cancelButton.classList.add("btn", "btn-secondary");
  cancelButton.innerText = "Cancel";

  // Add event listeners to form elements
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const description = descriptionInput.value.trim();

    if (name !== "" && description !== "") {
      meal.name = name;
      meal.description = description;
      saveMealsToLocalStorage();
      renderMeals();
      form.remove();
    }
  });

  cancelButton.addEventListener("click", () => {
    form.remove();
  });

  // Add form elements to the form and add the form to the page
  form.appendChild(nameInput);
  form.appendChild(descriptionInput);
  form.appendChild(saveButton);
  form.appendChild(cancelButton);
  mealList.insertAdjacentElement("afterend", form);
}

