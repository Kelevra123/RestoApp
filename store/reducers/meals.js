import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals';

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: []
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(
        meal => meal.id === action.mealId
      );
      if (existingIndex >= 0) {
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return { ...state, favoriteMeals: updatedFavMeals };
      } else {
        const meal = state.meals.find(meal => meal.id === action.mealId);
        return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
      }
      case SET_FILTERS: 
      const {glutenFree, lactoseFree, vegan, Vegetarian} = action.filters
      const updatedFilteredMeals = state.meals.filter(meal => {
        if (glutenFree && !meal.isGlutenFree) {
          return false
        }
        if (lactoseFree && !meal.isLactoseFree) {
          return false
        }
        if (vegan && !meal.isVegan) {
          return false
        }
        if (Vegetarian && meal.isVegetarian) {
          return false
        }
        return true
      })
      return { ...state, filteredMeals: updatedFilteredMeals }
    default:
      return state;
  }
};

export default mealsReducer;
