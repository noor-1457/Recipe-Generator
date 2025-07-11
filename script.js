const btn = document.querySelector("button");
const api_1 = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";
const api_2 = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const recipeGrid = document.querySelector(".recipe-grid");

// Fetch meals based on input
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  const input = document.querySelector("textarea").value.trim();
  if (!input) {
    alert("Please enter some ingredients.");
    return;
  }

  recipeGrid.innerHTML = ""; // Clear previous results

  try {
    // First try name-based search
    const responseName = await fetch(`${api_2}${input}`);
    const dataName = await responseName.json();

    if (dataName.meals) {
      dataName.meals.forEach((meal) => {
        const card = createRecipeCard(meal);
        recipeGrid.appendChild(card);
      });
    } else {
      // If no results, try ingredient-based search
      const responseIng = await fetch(`${api_1}${input}`);
      const dataIng = await responseIng.json();

      if (dataIng.meals) {
        dataIng.meals.forEach((meal) => {
          const card = createRecipeCard(meal);
          recipeGrid.appendChild(card);
        });
      } else {
        recipeGrid.innerHTML = "<p>No recipes found.</p>";
      }
    }
  } catch (error) {
    console.error("Error fetching meals:", error);
    recipeGrid.innerHTML = "<p>Error fetching recipes.</p>";
  }
});

// Create and return a recipe card element
function createRecipeCard(meal) {
  const card = document.createElement("div");
  card.className = "recipe-card";
  card.innerHTML = `
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <h3>${meal.strMeal}</h3>
    <a href="recipe.html?id=${meal.idMeal}">
      <button>View Recipe</button>
    </a>
  `;
  return card;
}
