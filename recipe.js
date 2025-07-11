window.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const mealId = params.get("id");

  if (!mealId) {
    document.getElementById("full-recipe").innerHTML =
      "<p>No recipe ID provided.</p>";
    return;
  }

  const recipeURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  try {
    const res = await fetch(recipeURL);
    const data = await res.json();
    const meal = data.meals[0];

    document.getElementById("full-recipe").classList.remove("hidden");
    document.getElementById("full-recipe").innerHTML = `
      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" style="max-width: 300px;">
      <p><strong>Category:</strong> ${meal.strCategory}</p>
      <p><strong>Area:</strong> ${meal.strArea}</p>
      <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
      <a  class="yt-Link" href="${meal.strYoutube}" target="_blank">Watch on YouTube</a>
    `;
  } catch (err) {
    document.getElementById("full-recipe").innerHTML =
      "<p>Error loading recipe.</p>";
    console.error(err);
  }
});
