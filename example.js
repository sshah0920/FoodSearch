const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('fruit');
const mealDetailsContent = document.querySelector('.details-content');
const recipeCloseBtn = document.getElementById('details-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showDetails');
});

// get meal list that matches with the ingredients
function getMealList(){
    let searchInputText = document.getElementById('search-input').value.trim();
    console.log(searchInputText);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "fruit-item" data-id = "${meal.idMeal}">
                        <div class = "fruit-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "fruit-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "details-btn">Details</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}


function getMealRecipe(e){
  e.preventDefault();
  if(e.target.classList.contains('details-btn')){
      let mealItem = e.target.parentElement.parentElement;
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
      .then(response => response.json())
      .then(data => mealRecipeModal(data.meals));
  }
}

// create a modal
function mealRecipeModal(meal){
  console.log(meal);
  meal = meal[0];
  let html = `
      <h2 class = "fruit-title">${meal.strMeal}</h2>
      <p class = "details-category">${meal.strCategory}</p>
      <div class = "details-instruct">
          <h3>Instructions:</h3>
          <p>${meal.strInstructions}</p>
      </div>
      <div class = "details-fruit-img">
          <img src = "${meal.strMealThumb}" alt = "">
      </div>
  `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add('showDetails');
}