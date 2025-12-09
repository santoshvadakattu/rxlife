import {createSlice} from '@reduxjs/toolkit';
import util from '../../util';
import {MealDetails} from '../../containers';
import {nutritionGetMealDetailsByIdManipulator} from '../../Helper/nutritionHelper';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import {create} from 'apisauce';

const NutritionsReducer = createSlice({
  name: 'nutritions',
  initialState: {
    AllFoodsData: [],
    AllFoodsDataSearch: [],
    MyFoodsDataSearch: [],
    MyFoodData: [],
    // Meal API's
    MyMealData: [],
    AllFoodListForMeal: [],
    MyFoodListForMeal: [],
    MealDetails: {},
    MyMealSearchData: [],
    //Recipe API's
    MyRecipeList: [],
    MyRecipeDetails: {},
    MyRecipeSearchData: [],
    //Ingredient API's
    IngredientList: [],
    DailyNutritionData: [],
  },
  reducers: {
    getAllFoodsRequest() {},
    getAllFoodsSuccess(state, action) {
      let stateAllFoodsData = util.cloneDeepArray(state.AllFoodsData);
      let merge = util.unionBy(stateAllFoodsData, action.payload);
      state.AllFoodsData = merge;
    },

    getAllFoodSearchRequest() {},
    getAllFoodSearchSuccess(state, action) {
      // state.AllFoodsDataSearch = action.payload;
      let stateAllFoodsData = util.cloneDeepArray(state.AllFoodsDataSearch);
      let merge = util.unionBy(stateAllFoodsData, action.payload);
      state.AllFoodsDataSearch = merge;
    },

    createMyFoodRequest() {},
    createMyFoodSuccess(state, action) {
      let stateMyFoodsData = util.cloneDeepArray(state.MyFoodData);
      stateMyFoodsData.unshift(action.payload);
      state.MyFoodData = stateMyFoodsData;
    },

    getMyFoodRequest() {},
    getMyFoodSuccess(state, action) {
      state.MyFoodData = action.payload.sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );
    },

    //Meal API's
    getSearchMyFoodRequest() {},
    getSearchMyFoodSuccess(state, action) {
      state.MyFoodsDataSearch = action.payload;
    },

    setAllFoodListForMealReducer(state, action) {
      let stateMyMealData = util.cloneDeepArray(state.AllFoodListForMeal);
      stateMyMealData.unshift(action.payload);
      state.AllFoodListForMeal = stateMyMealData;
    },

    setMyFoodListForMealReducer(state, action) {
      let stateMyMealData = util.cloneDeepArray(state.MyFoodListForMeal);
      stateMyMealData.unshift(action.payload);
      state.MyFoodListForMeal = stateMyMealData;
    },

    removeFoodListForMealReducer(state, action) {
      let stateMyMealData = util.cloneDeepArray(state.AllFoodListForMeal);
      stateMyMealData = stateMyMealData.filter(
        (item) => item.id !== action?.payload?.id,
      );
      let stateMyMealMyFood = util.cloneDeepArray(state.MyFoodListForMeal);
      stateMyMealData = stateMyMealData.filter(
        (item) => item.id !== action?.payload?.id,
      );
      state.AllFoodListForMeal = stateMyMealData;
      state.MyFoodListForMeal = stateMyMealMyFood;
    },

    deleteMyFoodRequest(state, action) {
      state.AllFoodListForMeal = [];
      state.MyFoodListForMeal = [];
    },

    deleteMyFoodItemByIdRequest() {},
    deleteMyFoodItemByIdSuccess(state, action) {
      const {id} = action.payload;
      const getMyFoodData = util.cloneDeepArray(state.MyFoodData);
      const index = getMyFoodData.findIndex((item) => item.id === id);
      if (index !== -1) {
        getMyFoodData.splice(index, 1);
      }
      state.MyFoodData = getMyFoodData;
    },

    updateMyFoodItemByIdRequest() {},
    updateMyFoodItemByIdSuccess(state, action) {
      const item = action.payload;
      const {id} = item || {};

      const getMyFoodData = util.cloneDeepArray(state.MyFoodData);
      const index = getMyFoodData.findIndex((item) => item.id === id);
      if (index !== -1) {
        getMyFoodData[index] = item;
      }
      state.MyFoodData = getMyFoodData;
    },

    //Meal API's

    createMyMealRequest() {},
    createMyMealSuccess(state, action) {
      let stateMyMealData = util.cloneDeepArray(state.MyMealData);

      stateMyMealData?.unshift(action.payload);

      state.MyMealData = stateMyMealData;
    },

    getMyMealDataRequest() {},
    getMyMealDataSuccess(state, action) {
      state.MyMealData = action.payload.sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );
    },

    getMealDetailsByIdRequest() {},
    getMealDetailsByIdSuccess(state, action) {
      state.MealDetails = action.payload;
    },

    deleteMealItemByIdRequest() {},
    deleteMealItemByIdSuccess(state, action) {
      const {id} = action.payload;
      const getMyMealData = util.cloneDeepArray(state.MyMealData);
      const index = getMyMealData.findIndex((item) => item.id === id);
      if (index !== -1) {
        getMyMealData.splice(index, 1);
      }
      state.MyMealData = getMyMealData;
    },

    updateMealItemByIdRequest() {},
    updateMealItemByIdSuccess(state, action) {
      const item = action.payload;
      const {id} = item || {};

      const getMyMealData = util.cloneDeepArray(state.MyMealData);
      const index = getMyMealData.findIndex((item) => item.id === id);
      if (index !== -1) {
        getMyMealData[index] = item;
      }
      state.MyMealData = getMyMealData;
    },

    getMyFoodItemByIdRequest() {},
    getAllFoodItemByIdRequest() {},
    getMyFoodItemByIdSuccess(state, action) {},

    getMyMealSearchRequest() {},
    getMyMealSearchSuccess(state, action) {
      state.MyMealSearchData = action.payload;
    },

    //Recipe API's

    getRecipesListRequest() {},
    getRecipesListSuccess(state, action) {
      state.MyRecipeList = action.payload.sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );
    },

    getRecipeDetailsByIdRequest() {},
    getRecipeDetailsByIdSuccess(state, action) {
      // state.MyRecipeDetails = action.payload;
    },

    createMyRecipeRequest() {},
    createMyRecipeSuccess(state, action) {
      let stateMyRecipeData = util.cloneDeepArray(state.MyRecipeList);
      stateMyRecipeData.unshift(action.payload);
      state.MyRecipeList = stateMyRecipeData;
    },

    updateMyRecipeRequest() {},
    updateMyRecipeSuccess(state, action) {
      const item = action.payload;
      const {id} = item || {};

      const getMyRecipeData = util.cloneDeepArray(state.MyRecipeList);
      const index = getMyRecipeData.findIndex((item) => item.id === id);
      if (index !== -1) {
        getMyRecipeData[index] = item;
      }
      state.MyRecipeList = getMyRecipeData;
    },

    deleteMyRecipeRequest() {},
    deleteMyRecipeSuccess(state, action) {
      const {id} = action.payload;
      const getMyRecipeData = util.cloneDeepArray(state.MyRecipeList);
      const index = getMyRecipeData.findIndex((item) => item.id === id);
      if (index !== -1) {
        getMyRecipeData.splice(index, 1);
      }
      state.MyRecipeList = getMyRecipeData;
    },

    getMyRecipeSearchRequest() {},
    getMyRecipeSearchSuccess(state, action) {
      state.MyRecipeSearchData = action.payload;
    },

    //Ingredient API's
    getIngredientsListRequest() {},
    getIngredientsListSuccess(state, action) {
      state.IngredientList = action.payload;
    },

    CreateIngredientRequest() {},
    CreateIngredientSuccess(state, action) {
      let stateMyIngredientData = util.cloneDeepArray(state.IngredientList);
      stateMyIngredientData.unshift(action.payload);
      state.IngredientList = stateMyIngredientData;
    },
    // daily Nutrition API's
    getDailyNutritionRequest() {},
    getDailyNutritionSuccess(state, action) {
      state.DailyNutritionData = action.payload.sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );
    },

    createDailyNutritionRequest() {},
    createDailyNutritionSuccess(state, action) {
      let stateMyDailyNutritionData = util.cloneDeepArray(
        state.DailyNutritionData,
      );
      stateMyDailyNutritionData.unshift(action.payload);
      state.DailyNutritionData = stateMyDailyNutritionData;
    },

    updateDailyNutritionRequest() {},
    updateDailyNutritionSuccess(state, action) {
      const item = action.payload;
      const {id} = item || {};

      const getMyDailyNutritionData = util.cloneDeepArray(
        state.DailyNutritionData,
      );
      const index = getMyDailyNutritionData.findIndex((item) => item.id === id);
      if (index !== -1) {
        getMyDailyNutritionData[index] = item;
      }
      state.DailyNutritionData = getMyDailyNutritionData;
    },
    deleteMyDailyNutritionRequest() {},
    deleteMyDailyNutritionSuccess(state, action) {
      const {id} = action.payload;
      const getMyDailyNutritionData = util.cloneDeepArray(
        state.DailyNutritionData,
      );
      const index = getMyDailyNutritionData.findIndex((item) => item.id === id);
      if (index !== -1) {
        getMyDailyNutritionData.splice(index, 1);
      }
      state.DailyNutritionData = getMyDailyNutritionData;
    },

    //Discovery category API's
    getDiscoveryCategoryRequest() {},
  },
});

export const {
  //Food API's
  getAllFoodsRequest,
  getAllFoodsSuccess,
  getAllFoodSearchSuccess,
  getAllFoodSearchRequest,
  createMyFoodRequest,
  createMyFoodSuccess,
  getMyFoodRequest,
  getMyFoodSuccess,
  getSearchMyFoodRequest,
  getSearchMyFoodSuccess,
  deleteMyFoodItemByIdRequest,
  deleteMyFoodItemByIdSuccess,
  updateMyFoodItemByIdRequest,
  updateMyFoodItemByIdSuccess,
  getMyFoodItemByIdRequest,
  getMyFoodItemByIdSuccess,
  getAllFoodItemByIdRequest,

  //Meail API's
  createMyMealRequest,
  createMyMealSuccess,
  getMyMealDataRequest,
  getMyMealDataSuccess,
  setAllFoodListForMealReducer,
  setMyFoodListForMealReducer,
  removeFoodListForMealReducer,
  deleteMyFoodRequest,
  getMealDetailsByIdRequest,
  getMealDetailsByIdSuccess,
  deleteMealItemByIdRequest,
  deleteMealItemByIdSuccess,
  updateMealItemByIdRequest,
  updateMealItemByIdSuccess,
  getMyMealSearchRequest,
  getMyMealSearchSuccess,

  //Recipe API's
  getRecipesListRequest,
  getRecipesListSuccess,
  getRecipeDetailsByIdRequest,
  getRecipeDetailsByIdSuccess,
  createMyRecipeRequest,
  createMyRecipeSuccess,
  updateMyRecipeRequest,
  updateMyRecipeSuccess,
  deleteMyRecipeRequest,
  deleteMyRecipeSuccess,
  getMyRecipeSearchRequest,
  getMyRecipeSearchSuccess,
  //Ingredient API's
  getIngredientsListRequest,
  getIngredientsListSuccess,
  CreateIngredientRequest,
  CreateIngredientSuccess,

  //Daily Nutrition API's
  getDailyNutritionRequest,
  getDailyNutritionSuccess,
  createDailyNutritionRequest,
  createDailyNutritionSuccess,
  updateDailyNutritionRequest,
  updateDailyNutritionSuccess,
  deleteMyDailyNutritionRequest,
  deleteMyDailyNutritionSuccess,
  // Discovery category API's
  getDiscoveryCategoryRequest,
} = NutritionsReducer.actions;

export default NutritionsReducer.reducer;
