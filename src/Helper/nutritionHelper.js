import _ from 'lodash';
import {id} from 'rn-emoji-keyboard';
import util from '../util';
import {object} from 'prop-types';

//Food Manipulator
export function nutritionAllFoodManipulator(list = []) {
  try {
    if (_.isEmpty(list)) return [];
const items =
      list?.foods;
    const result = [];

    for (let item of items) {
     const payload = {
        id: item?.fdcId ?? null,
        name: item?.brandName,
        description: item?.description,
        image: {
          id: item?.image?.id,
          url: item?.image?.url,
        },
        date: new Date(item?.createdAt),
        foodNutrients: item?.foodNutrients,
        fdcId: item?.fdcId,
        addFromUSDA: true,
        ingredients: item?.ingredients,
        servingSize: item?.servingSize,
        servingSizeUnit: item?.servingSizeUnit,
        packageWeight: item?.packageWeight,
        labelNutrients: item?.labelNutrients || [],
        foodCategory: item?.foodCategory,
        Kcal: item?.Kcal || item?.calories || '',
      };

      result.push(payload);
    }

    return result;
  } catch (error) {
    console.error('nutritionAllFoodManipulator error ==>>>', error);

    return [];
  }
}

export function nutritionCreateFoodManipulator(item = []) {
  try {
    const payload = {
      id: item?.id,
      name: item?.attributes?.name || '',
      description: item?.attributes?.description || '',
      image:
        {
          id: item?.attributes?.image?.data?.id,
          url: item?.attributes?.image?.data?.attributes?.url,
        } || {},
      date: new Date(item?.attributes?.createdAt),
      foodNutrients: item?.attributes?.foodNutrients || [],

      ingredients: item?.attributes?.ingredients || '',
      servingSize: item?.attributes?.servingSize || 0,
      servingSizeUnit: item?.attributes?.servingSizeUnit || '',
      packageWeight: item?.attributes?.packageWeight || '',
      labelNutrients: item?.attributes?.labelNutrients || [],
      Kcal: item?.attributes?.Kcal || '',
      isQuickAdded: item?.attributes?.isQuickAdded || '',
      addFromUSDA: item.attributes.addFromUSDA || false,
    };

    return payload;
  } catch (error) {
    console.error('nutritionCreateFoodManipulator error ==>>>', error);

    return [];
  }
}

export function nutritionGetMyFoodManipulator(list = []) {
  try {
    if (_.isEmpty(list)) return [];

    const result = [];

    for (let item of list) {
      const payload = {
        id: item?.id,
        name: item?.attributes?.name || '',
        description: item?.attributes?.description || '',

        image:
          {
            id: item?.attributes?.image?.data?.id,
            url: item?.attributes?.image?.data?.attributes?.url,
          } || {},
        date: new Date(item?.attributes?.createdAt),
        foodNutrients: item?.attributes?.foodNutrients || [],
        ingredients: item?.attributes?.ingredients || '',
        servingSize: item?.attributes?.servingSize || 0,
        servingSizeUnit: item?.attributes?.servingSizeUnit || '',
        packageWeight: item?.attributes?.packageWeight || 0,
        labelNutrients: item?.attributes?.labelNutrients || [],
        Kcal: item?.attributes?.Kcal || '',
        isQuickAdded: item?.attributes?.isQuickAdded || '',
        addFromUSDA: item?.attributes?.addFromUSDA || false,
      };
      result.push(payload);
    }

    return result;
  } catch (error) {
    console.error('nutritionGetMyFoodManipulator error ==>>>', error);

    return [];
  }
}

//Meal Manipulator
export function nutritionCreatetMyMealManipulator(item = []) {
  try {
    const payload = {
      id: item?.id,
      name: item?.attributes?.name || '',
      directions: item?.attributes?.directions || '',
      isCopyMeal: item?.attributes?.isCopyMeal || false,
      image:
        {
          id: item?.attributes?.image?.data?.id,
          url: item?.attributes?.image?.data?.attributes?.url,
        } || {},
      date: new Date(item?.attributes?.createdAt),
      share: item?.attributes?.share || [],
      labelNutrients: item?.attributes?.labelNutrients || [],
    };
    return payload;
  } catch (error) {
    console.error('nutritionCreatetMyMealManipulator error ==>>>', error);

    return [];
  }
}

export function nutritionGetMyMealManipulator(list = []) {
  try {
    if (_.isEmpty(list)) return [];

    const result = [];

    for (let item of list) {
      const payload = {
        id: item?.id,
        name: item?.attributes?.name || '',
        directions: item?.attributes?.directions || '',
        isCopyMeal: item?.attributes?.isCopyMeal || false,
        image:
          {
            id: item?.attributes?.image?.data?.id,
            url: item?.attributes?.image?.data?.attributes?.url,
          } || {},
        date: new Date(item?.attributes?.updatedAt),
        share: item?.attributes?.share || '',
        labelNutrients: item?.attributes?.labelNutrients || [],
      };
      result.push(payload);
    }
    return result;
  } catch (error) {
    console.error('nutritionGetMyMealManipulator error ==>>>', error);

    return [];
  }
}

export function nutritionGetSearchMyMealManipulator(list = []) {
  try {
    if (_.isEmpty(list)) return [];

    const result = [];

    for (let item of list) {
      const payload = {
        id: item?.id,
        name: item?.name || '',
        directions: item?.directions || '',
        isCopyMeal: item?.attributes?.isCopyMeal || false,
        image:
          {
            id: item?.image?.id,
            url: item?.image?.url,
          } || {},
        date: new Date(item?.createdAt),
        share: item?.share || '',
        labelNutrients: item?.labelNutrients || [],
      };
      result.push(payload);
    }
    return result;
  } catch (error) {
    console.error('nutritionGetMyMealManipulator error ==>>>', error);

    return [];
  }
}

export function nutritionGetMealDetailsByIdManipulator(item = {}) {
  let dataAllMeal = mealsFoodsdManipulato(item?.attributes?.mealsFoods);
  try {
    const payload = {
      id: item?.id,
      name: item?.attributes?.name || '',
      directions: item?.attributes?.directions || '',
      image:
        {
          id: item?.attributes?.image?.data?.id,
          url: item?.attributes?.image?.data?.attributes?.url,
        } || {},
      date: new Date(item?.attributes?.createdAt),
      share: item?.attributes?.share || '',
      isCopyMeal: item?.attributes?.isCopyMeal || false,
      labelNutrients: item?.attributes?.labelNutrients || [],
      foodNutrients: item?.attributes?.foodNutrients || [],
      allFoods: nutritionGetMyFoodManipulator(
        [
          ...item?.attributes?.all_foods?.data,
          ...item?.attributes?.my_foods?.data,
        ] || [],
      ),
      mealsFoods: nutritionGetMyFoodManipulator(dataAllMeal),
    };

    return payload;
  } catch (error) {
    console.error('nutritionGetMealDetailsByIdManipulator error ==>>>', error);

    return [];
  }
}

function mealsFoodsdManipulato(data = []) {
  const combinedArray = data
    .map((item) => {
      let combined = {};

      if (item.my_food && item.my_food.data) {
        combined = item.my_food.data;
      }

      if (item.all_food && item.all_food.data) {
        combined = item.all_food.data;
      }

      return combined;
    })
    .filter((item) => Object.keys(item).length > 0);

  return combinedArray;
}

//Recipe Manipulator

export function nutritionGetRecipeListManipulator(list = []) {
  try {
    if (_.isEmpty(list)) return [];

    const result = [];

    for (let item of list) {
      const payload = {
        id: item?.id,
        name: item?.attributes?.name || '',
        servingSize: item?.attributes?.servingSize || '',
        Kcal: item?.attributes?.Kcal || '',
        ingredients:
          nutritionGetMyFoodManipulator([
            ...item?.attributes?.all_foods?.data,
            ...item?.attributes?.my_foods?.data,
          ]) || [],
        image:
          {
            id: item?.attributes?.image?.data?.id,
            url: item?.attributes?.image?.data?.attributes?.url,
          } || {},
        date: new Date(item?.attributes?.createdAt),
        foodNutrients: item?.attributes?.foodNutrients || [],
        labelNutrients: item?.attributes?.labelNutrients || [],
      };
      result.push(payload);
    }

    return result;
  } catch (error) {
    console.error('nutritionGetRecipeListManipulator error ==>>>', error);

    return [];
  }
}

export function nutritionGetSearchRecipeListManipulator(list = []) {
  try {
    if (_.isEmpty(list)) return [];

    const result = [];

    for (let item of list) {
      const payload = {
        id: item?.id,
        name: item?.name || '',
        servingSize: item?.servingSize || '',
        Kcal: item?.Kcal || '',

        image:
          {
            id: item?.image?.id,
            url: item?.image?.url,
          } || {},
        date: new Date(item?.createdAt),
        foodNutrients: item?.foodNutrients || [],
        labelNutrients: item?.labelNutrients || [],
      };
      result.push(payload);
    }

    return result;
  } catch (error) {
    console.error('nutritionGetSearchRecipeListManipulator error ==>>>', error);

    return [];
  }
}

export function nutritionCreateRecipeManipulator(item = []) {
  let dataAllingredients = mealsFoodsdManipulato(
    item?.attributes?.recipesFoods,
  );

  try {
    const payload = {
      id: item?.id,
      name: item?.attributes?.name || '',
      servingSize: item?.attributes?.servingSize || '',
      Kcal: item?.attributes?.Kcal || '',
      image:
        {
          id: item?.attributes?.image?.data?.id,
          url: item?.attributes?.image?.data?.attributes?.url,
        } || {},
      date: new Date(item?.attributes?.createdAt),
      // ingredients:
      //   nutritionGetMyFoodManipulator([
      //     ...item?.attributes?.all_foods?.data,
      //     ...item?.attributes?.my_foods?.data,
      //   ]) || [],

      ingredients: nutritionGetMyFoodManipulator(dataAllingredients) || [],

      foodNutrients: item?.attributes?.foodNutrients || [],
      labelNutrients: item?.attributes?.labelNutrients || [],
    };

    return payload;
  } catch (error) {
    console.error('nutritionCreateRecipeManipulator error ==>>>', error);

    return [];
  }
}

//Intriedent Manipulator

export function nutritionGetIngredientsListManipulator(list = []) {
  try {
    if (_.isEmpty(list)) return [];

    const result = [];

    for (let item of list) {
      const payload = {
        id: item?.id,
        name: item?.attributes?.name || '',
        servingSize: item?.attributes?.servingSize || '',
        Kcal: item?.attributes?.Kcal || '',
      };
      result.push(payload);
    }
    return result;
  } catch (error) {
    console.error('nutritionGetIngredientsListManipulator error ==>>>', error);

    return [];
  }
}
export function nutritionCreateIngredientistManipulator(item = []) {
  try {
    const payload = {
      id: item?.id,
      name: item?.attributes?.name || '',
      servingSize: item?.attributes?.servingSize || '',
      Kcal: item?.attributes?.Kcal || '',
    };

    return payload;
  } catch (error) {
    console.error('nutritionCreateIngredientistManipulator error ==>>>', error);

    return [];
  }
}

// daily Nutrition Manipulator

export function nutritionGetDailyNutritionManipulator(list = []) {
  try {
    if (_.isEmpty(list)) return [];

    const result = [];

    for (let item of list) {
      const payload = {
        id: item?.id,
        mealName: item?.attributes?.mealName || '',
        totalCalories: item?.attributes?.totalCalories || 0,
        date: new Date(item?.attributes?.updatedAt) || null,
        allData:
          nutritionGetMyFoodManipulator([
            ...item?.attributes?.all_foods?.data,
            ...item?.attributes?.my_foods?.data,
          ]) || [],
      };
      result.push(payload);
    }
    return result;
  } catch (error) {
    console.error('nutritionGetDailyNutritionManipulator error ==>>>', error);

    return [];
  }
}

export function nutritionCreateDailyNutritionManipulator(item = []) {
  try {
    const payload = {
      id: item?.id,
      mealName: item?.attributes?.mealName || '',
      totalCalories: item?.attributes?.totalCalories || 0,
      date: item?.attributes?.date || null,
      allData:
        nutritionGetMyFoodManipulator([
          ...item?.attributes?.all_foods?.data,
          ...item?.attributes?.my_foods?.data,
        ]) || [],
    };
    console.log('nutritionCreateDailyNutritionManipulator', payload);
    return payload;
  } catch (error) {
    console.error(
      'nutritionCreateDailyNutritionManipulator error ==>>>',
      error,
    );
    return [];
  }
}
