import {call, fork, put, take, takeLatest, takeEvery} from 'redux-saga/effects';
import {
  CREATE_DAILY_NUTRITION,
  CREATE_INGRETIENTS,
  CREATE_MEAL,
  CREATE_RECIPE,
  CRREATE_ALL_FOODS,
  CRREATE_MY_FOODS,
  NINJA_BASE_URL,
  DELETE_DAILY_NUTRITION,
  DELETE_MY_FOOD_BY_ID,
  DELETE_MY_MEAL_BY_ID,
  DELETE_MY_RECIPE_BY_ID,
  ERROR_SOMETHING_WENT_WRONG,
  GET_ALL_FOODS,
  GET_NINJA_FOODS_LIST,
  GET_ALL_FOOD_BY_ID,
  GET_DAILY_NUTRITION,
  GET_DISCOVERY_FOOD,
  GET_INGRETIENTS_LIST,
  GET_MY_FOODS,
  GET_MY_FOOD_BY_ID,
  GET_MY_MEAL,
  GET_MY_MEAL_BY_ID,
  GET_MY_RECIPE,
  GET_MY_RECIPE_BY_ID,
  GET_NOTIFICATIONS,
  SEARCH_MY_FOODS,
  SEARCH_MY_MEAL,
  SEARCH_MY_RECIPE,
  UPDATE_DAILY_NUTRITION,
  UPDATE_MY_FOOD_BY_ID,
  UPDATE_MY_MEAL_BY_ID,
  UPDATE_MY_RECIPE_BY_ID,
  callRequest,
} from '../../config/WebService';
import {SAGA_ALERT_TIMEOUT} from '../../constants';
import ApiSauce from '../../services/ApiSauce';
import {default as Util} from '../../util';
import {
  CreateIngredientRequest,
  CreateIngredientSuccess,
  createDailyNutritionRequest,
  createDailyNutritionSuccess,
  createMyFoodRequest,
  createMyFoodSuccess,
  createMyMealRequest,
  createMyMealSuccess,
  createMyRecipeRequest,
  createMyRecipeSuccess,
  deleteMealItemByIdRequest,
  deleteMealItemByIdSuccess,
  deleteMyDailyNutritionRequest,
  deleteMyDailyNutritionSuccess,
  deleteMyFoodItemByIdRequest,
  deleteMyFoodItemByIdSuccess,
  deleteMyRecipeRequest,
  deleteMyRecipeSuccess,
  getAllFoodItemByIdRequest,
  getAllFoodSearchRequest,
  getAllFoodSearchSuccess,
  getAllFoodsRequest,
  getAllFoodsSuccess,
  getDailyNutritionRequest,
  getDailyNutritionSuccess,
  getDiscoveryCategoryRequest,
  getIngredientsListRequest,
  getIngredientsListSuccess,
  getMealDetailsByIdRequest,
  getMealDetailsByIdSuccess,
  getMyFoodItemByIdRequest,
  getMyFoodRequest,
  getMyFoodSuccess,
  getMyMealDataRequest,
  getMyMealDataSuccess,
  getMyMealSearchRequest,
  getMyMealSearchSuccess,
  getMyRecipeSearchRequest,
  getMyRecipeSearchSuccess,
  getRecipeDetailsByIdRequest,
  getRecipeDetailsByIdSuccess,
  getRecipesListRequest,
  getRecipesListSuccess,
  getSearchMyFoodRequest,
  getSearchMyFoodSuccess,
  updateDailyNutritionRequest,
  updateDailyNutritionSuccess,
  updateMealItemByIdRequest,
  updateMealItemByIdSuccess,
  updateMyFoodItemByIdRequest,
  updateMyFoodItemByIdSuccess,
  updateMyRecipeRequest,
  updateMyRecipeSuccess,
} from '../slicers/nutritions';
import {
  nutritionAllFoodManipulator,
  nutritionCreateDailyNutritionManipulator,
  nutritionCreateFoodManipulator,
  nutritionCreateIngredientistManipulator,
  nutritionCreateRecipeManipulator,
  nutritionCreatetMyMealManipulator,
  nutritionGetDailyNutritionManipulator,
  nutritionGetIngredientsListManipulator,
  nutritionGetMealDetailsByIdManipulator,
  nutritionGetMyFoodManipulator,
  nutritionGetMyMealManipulator,
  nutritionGetRecipeListManipulator,
  nutritionGetSearchMyMealManipulator,
  nutritionGetSearchRecipeListManipulator,
} from '../../Helper/nutritionHelper';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getfoodData() {
  while (true) {
    const {payload} = yield take(getAllFoodsRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        GET_ALL_FOODS,
        {},
        '',
        {},
        payloadData.query,
        ApiSauce,
      );

      if (response) {
        yield put(
          getAllFoodsSuccess(nutritionAllFoodManipulator(response.data)),
        );

        responseCallback && responseCallback(true, response.data);
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('getfoodData error ===>>> ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* getFoodSearchLatest() {
  yield takeLatest(getAllFoodSearchRequest?.type, getfoodSearchData);
}

function* getfoodSearchData({payload}) {
  const {payloadData, responseCallback} = payload;

  try {
    let usdaQuery = '';
    if (payloadData && payloadData.query) {
      usdaQuery = payloadData.query
        .replace(/search=/g, 'query=')
        .replace(/limit=/g, 'pageSize=');
    }
    const response = yield call(
      callRequest,
      GET_NINJA_FOODS_LIST,
      {},
      '',
      {},
      usdaQuery,
      ApiSauce,
      NINJA_BASE_URL,
    );
    console.log({response});
    if (response) {
      yield put(
        getAllFoodSearchSuccess(nutritionAllFoodManipulator(response)),
      );
      responseCallback && responseCallback(true, response);
    } else {
      alert(ERROR_SOMETHING_WENT_WRONG.error);
      responseCallback && responseCallback(false, response);
    }
  } catch (err) {
    console.error('getfoodData error ===>>> ', err);
    responseCallback &&
      responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
  }
}

function* createMyFood() {
  while (true) {
    const {payload} = yield take(createMyFoodRequest.type);
    const {payloadData, responseCallback} = payload;
    console.log('createMyFood payloadData', payloadData);
    const formattedPayload = {
      data: payloadData,
    };
    try {
      const response = yield call(
        callRequest,
        CRREATE_MY_FOODS,
        formattedPayload,
        '',
        {},
        '',
        ApiSauce,
      );
      console.log({createRes: response});
      if (response) {
        yield put(
          createMyFoodSuccess(nutritionCreateFoodManipulator(response.data)),
        );
        responseCallback && responseCallback(true, response.data);
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('myFoodData error ===>>> ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* getMyFood() {
  while (true) {
    const {payload} = yield take(getMyFoodRequest.type);
    const {payloadData, responseCallback} = payload;

    const url = {
      ...GET_MY_FOODS,
      route: GET_MY_FOODS?.route?.replace(':userId', payloadData?.userId),
    };

    try {
      const response = yield call(callRequest, url, {}, '', {}, '', ApiSauce);
      console.log('getMyFOodres', response);
      if (response) {
        yield put(
          getMyFoodSuccess(nutritionGetMyFoodManipulator(response.data)),
        );
        responseCallback && responseCallback(true, response.data);
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('myFoodData error ===>>> ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* getMyFoodSearchLatest() {
  yield takeLatest(getSearchMyFoodRequest?.type, getMyfoodSearchData);
}

function* getMyfoodSearchData({payload}) {
  const {payloadData, responseCallback} = payload;
  const url = {
    ...SEARCH_MY_FOODS,
    route: SEARCH_MY_FOODS?.route?.replace(':userId', payloadData?.userId),
  };
  try {
    const response = yield call(
      callRequest,
      url,
      {},
      '',
      {},
      payloadData.query,
      ApiSauce,
    );
    console.log({response});
    if (response) {
      yield put(
        getSearchMyFoodSuccess(nutritionAllFoodManipulator(response.data)),
      );
      responseCallback && responseCallback(true, response.data);
    } else {
      alert(ERROR_SOMETHING_WENT_WRONG.error);
      responseCallback && responseCallback(false, response);
    }
  } catch (err) {
    console.error('getfoodData error ===>>> ', err);
    responseCallback &&
      responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
  }
}

function* deleteMyFoodById() {
  while (true) {
    const {payload} = yield take(deleteMyFoodItemByIdRequest.type);
    const {payloadData, responseCallback} = payload;
    const url = {
      ...DELETE_MY_FOOD_BY_ID,
      route: DELETE_MY_FOOD_BY_ID?.route?.replace(':Id', payloadData?.Id),
    };
    try {
      const response = yield call(
        callRequest,
        url,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );
      if (response) {
        console.log('delete Food', response.data);
        responseCallback && responseCallback(true, response.data);
        yield put(deleteMyFoodItemByIdSuccess(response.data));
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('delete Food error ===>>> ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* getMyFoodItemById({payload}) {
  const {payloadData, responseCallback} = payload;
  const url = {
    ...GET_MY_FOOD_BY_ID,
    route: GET_MY_FOOD_BY_ID?.route?.replace(':Id', payloadData?.Id),
  };
  try {
    const response = yield call(callRequest, url, {}, '', {}, '', ApiSauce);
    if (response) {
      // yield put(
      //   getMyMealDataSuccess(nutritionCreateFoodManipulator(response.data)),
      // );
      responseCallback &&
        responseCallback(true, nutritionCreateFoodManipulator(response.data));
    } else {
      alert(ERROR_SOMETHING_WENT_WRONG.error);
      responseCallback && responseCallback(false, response);
    }
  } catch (err) {
    console.error('myFoodDataId error ===>>> ', err);
    responseCallback &&
      responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
  }
}

function* getALFoodItemById({payload}) {
  // const {payload} = yield take(getAllFoodItemByIdRequest.type);
  const {payloadData, responseCallback} = payload;
  const url = {
    ...GET_ALL_FOOD_BY_ID,
    route: GET_ALL_FOOD_BY_ID?.route?.replace(':Id', payloadData?.Id),
  };
  try {
    const response = yield call(callRequest, url, {}, '', {}, '', ApiSauce);
    console.log('getAllFoodById', response.data);
    if (response) {
      responseCallback &&
        responseCallback(true, nutritionCreateFoodManipulator(response.data));
    } else {
      alert(ERROR_SOMETHING_WENT_WRONG.error);
      responseCallback && responseCallback(false, response);
    }
  } catch (err) {
    console.error('myFoodDataId error ===>>> ', err);
    responseCallback &&
      responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
  }
}

function* updateMyFoodItemById() {
  while (true) {
    const {payload} = yield take(updateMyFoodItemByIdRequest.type);
    const {payloadData, responseCallback} = payload;
    const url = {
      ...UPDATE_MY_FOOD_BY_ID,
      route: UPDATE_MY_FOOD_BY_ID?.route?.replace(':Id', payloadData?.Id),
    };
    try {
      const response = yield call(
        callRequest,
        url,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );
      console.log('updateFoodItemId', response.data);
      if (response) {
        yield put(
          updateMyFoodItemByIdSuccess(
            nutritionCreateFoodManipulator(response.data),
          ),
        );
        responseCallback &&
          responseCallback(true, nutritionCreateFoodManipulator(response.data));
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('myFoodDataId error ===>>> ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

//Meal API's
function* createMyMeal() {
  while (true) {
    const {payload} = yield take(createMyMealRequest.type);
    const {payloadData, responseCallback} = payload;
    console.log('createMeal', payloadData);
    try {
      const response = yield call(
        callRequest,
        CREATE_MEAL,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );
      console.log('createMealRes', response.data);
      if (response) {
        yield put(
          createMyMealSuccess(nutritionCreatetMyMealManipulator(response.data)),
        );
        responseCallback && responseCallback(true, response.data);
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('myFoodData error ===>>> ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}
function* getMyMeal() {
  while (true) {
    const {payload} = yield take(getMyMealDataRequest.type);
    const {payloadData, responseCallback} = payload;
    const url = {
      ...GET_MY_MEAL,
      route: GET_MY_MEAL?.route?.replace(':userId', payloadData?.userId),
    };
    try {
      const response = yield call(
        callRequest,
        url,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );
      console.log('getMyMealRes', response.data);
      if (response) {
        yield put(
          getMyMealDataSuccess(nutritionGetMyMealManipulator(response.data)),
        );
        responseCallback && responseCallback(true, response.data);
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('myFoodData error ===>>> ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* getMyMealById() {
  while (true) {
    const {payload} = yield take(getMealDetailsByIdRequest.type);
    const {payloadData, responseCallback} = payload;
    const url = {
      ...GET_MY_MEAL_BY_ID,
      route: GET_MY_MEAL_BY_ID?.route?.replace(':Id', payloadData?.Id),
    };
    try {
      const response = yield call(
        callRequest,
        url,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );
      console.log('getMealById', response.data);
      if (response) {
        yield put(
          getMealDetailsByIdSuccess(
            nutritionGetMealDetailsByIdManipulator(response.data),
          ),
        );
        responseCallback &&
          responseCallback(
            true,
            nutritionGetMealDetailsByIdManipulator(response.data),
          );
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('myFoodData error ===>>> ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* deleteMyMealById() {
  while (true) {
    const {payload} = yield take(deleteMealItemByIdRequest.type);
    const {payloadData, responseCallback} = payload;
    const url = {
      ...DELETE_MY_MEAL_BY_ID,
      route: DELETE_MY_MEAL_BY_ID?.route?.replace(':Id', payloadData?.Id),
    };
    try {
      const response = yield call(
        callRequest,
        url,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );
      console.log('deleteMeal', response.data);
      if (response) {
        yield put(deleteMealItemByIdSuccess(response.data));
        responseCallback && responseCallback(true, response.data);
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('deleteMeal error ===>>> ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* updateeMyMealById() {
  while (true) {
    const {payload} = yield take(updateMealItemByIdRequest.type);
    const {payloadData, responseCallback} = payload;
    const url = {
      ...UPDATE_MY_MEAL_BY_ID,
      route: UPDATE_MY_MEAL_BY_ID?.route?.replace(':Id', payloadData?.Id),
    };
    try {
      const response = yield call(
        callRequest,
        url,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );
      console.log('update', response.data);
      if (response) {
        yield put(
          updateMealItemByIdSuccess(
            nutritionCreatetMyMealManipulator(response.data),
          ),
        );
        responseCallback && responseCallback(true, response.data);
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('update error ===>>> ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* getMyMealSearchLatest() {
  yield takeLatest(getMyMealSearchRequest?.type, getMyMealSearchData);
}

function* getMyMealSearchData({payload}) {
  const {payloadData, responseCallback} = payload;
  const url = {
    ...SEARCH_MY_MEAL,
    route: SEARCH_MY_MEAL?.route?.replace(':userId', payloadData?.userId),
  };
  try {
    const response = yield call(
      callRequest,
      url,
      {},
      '',
      {},
      payloadData.query,
      ApiSauce,
    );
    console.log({response});
    if (response) {
      yield put(
        getMyMealSearchSuccess(
          nutritionGetSearchMyMealManipulator(response.data),
        ),
      );
      responseCallback && responseCallback(true, response.data);
    } else {
      alert(ERROR_SOMETHING_WENT_WRONG.error);
      responseCallback && responseCallback(false, response);
    }
  } catch (err) {
    console.error('getfoodData error ===>>> ', err);
    responseCallback &&
      responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
  }
}

//Recipe API's

function* createMyRecipe() {
  while (true) {
    const {payload} = yield take(createMyRecipeRequest.type);
    const {payloadData, responseCallback} = payload;
    try {
      const response = yield call(
        callRequest,
        CREATE_RECIPE,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );
      console.log('response', response);
      if (response) {
        yield put(
          createMyRecipeSuccess(
            nutritionCreateRecipeManipulator(response.data),
          ),
        );
        responseCallback && responseCallback(true, response.data);
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('myFoodData error ===>>> ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* getMyRecipe() {
  while (true) {
    const {payload} = yield take(getRecipesListRequest.type);
    const {payloadData, responseCallback} = payload;
    const url = {
      ...GET_MY_RECIPE,
      route: GET_MY_RECIPE?.route?.replace(':userId', payloadData?.userId),
    };
    try {
      const response = yield call(
        callRequest,
        url,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );
      console.log('getMyMealRes', response.data);
      if (response) {
        yield put(
          getRecipesListSuccess(
            nutritionGetRecipeListManipulator(response.data),
          ),
        );
        responseCallback && responseCallback(true, response.data);
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('myFoodData error ===>>> ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* getMyRecipeById() {
  while (true) {
    const {payload} = yield take(getRecipeDetailsByIdRequest.type);
    const {payloadData, responseCallback} = payload;
    const url = {
      ...GET_MY_RECIPE_BY_ID,
      route: GET_MY_RECIPE_BY_ID?.route?.replace(':Id', payloadData?.Id),
    };
    try {
      const response = yield call(
        callRequest,
        url,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );
      console.log('====================================');
      console.log('getMyRecipeById', response.data);
      console.log('====================================');
      if (response) {
        yield put(
          getRecipeDetailsByIdSuccess(
            nutritionCreateRecipeManipulator(response.data),
          ),
        );
        responseCallback &&
          responseCallback(
            true,
            nutritionCreateRecipeManipulator(response.data),
          );
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('getMyRecipeById error ===>>> ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* deleteMyRecipeById() {
  while (true) {
    const {payload} = yield take(deleteMyRecipeRequest.type);
    const {payloadData, responseCallback} = payload;
    const url = {
      ...DELETE_MY_RECIPE_BY_ID,
      route: DELETE_MY_RECIPE_BY_ID?.route?.replace(':Id', payloadData?.Id),
    };
    try {
      const response = yield call(callRequest, url, {}, '', {}, '', ApiSauce);
      console.log('deleteMeal', response.data);
      if (response) {
        yield put(deleteMyRecipeSuccess(response.data));
        responseCallback && responseCallback(true, response.data);
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('deleteMeal error ===>>> ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* updateeMyRecipeById() {
  while (true) {
    const {payload} = yield take(updateMyRecipeRequest.type);
    const {payloadData, responseCallback} = payload;
    const url = {
      ...UPDATE_MY_RECIPE_BY_ID,
      route: UPDATE_MY_RECIPE_BY_ID?.route?.replace(':Id', payloadData?.Id),
    };
    try {
      const response = yield call(
        callRequest,
        url,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );
      if (response) {
        yield put(
          updateMyRecipeSuccess(
            nutritionCreateRecipeManipulator(response.data),
          ),
        );
        responseCallback && responseCallback(true, response.data);
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('update error ===>>> ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* getMyRecipeSearchLatest() {
  yield takeLatest(getMyRecipeSearchRequest?.type, getMyRecipeSearchData);
}

function* getMyRecipeSearchData({payload}) {
  const {payloadData, responseCallback} = payload;
  const url = {
    ...SEARCH_MY_RECIPE,
    route: SEARCH_MY_RECIPE?.route?.replace(':userId', payloadData?.userId),
  };
  try {
    const response = yield call(
      callRequest,
      url,
      {},
      '',
      {},
      payloadData.query,
      ApiSauce,
    );
    console.log({response});
    if (response) {
      yield put(
        getMyRecipeSearchSuccess(
          nutritionGetSearchRecipeListManipulator(response.data),
        ),
      );
      responseCallback && responseCallback(true, response.data);
    } else {
      alert(ERROR_SOMETHING_WENT_WRONG.error);
      responseCallback && responseCallback(false, response);
    }
  } catch (err) {
    console.error('getfoodData error ===>>> ', err);
    responseCallback &&
      responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
  }
}

//ingredient API's

function* getIngredientList() {
  while (true) {
    const {payload} = yield take(getIngredientsListRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        GET_INGRETIENTS_LIST,
        {},
        '',
        {},
        '',
        ApiSauce,
      );

      if (response) {
        yield put(
          getIngredientsListSuccess(
            nutritionGetIngredientsListManipulator(response.data),
          ),
        );
        responseCallback && responseCallback(true, response.data);
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('update error ===>>> ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* createIngredient() {
  while (true) {
    const {payload} = yield take(CreateIngredientRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        CREATE_INGRETIENTS,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response) {
        yield put(
          CreateIngredientSuccess(
            nutritionCreateIngredientistManipulator(response.data),
          ),
        );
        responseCallback && responseCallback(true, response.data);
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('CreateIngredient error ===>>> ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

// Daily Nutrition Api's

function* getDailyNutrition() {
  while (true) {
    const {payload} = yield take(getDailyNutritionRequest.type);
    const {payloadData, responseCallback} = payload;
    const url = {
      ...GET_DAILY_NUTRITION,
      route: GET_DAILY_NUTRITION?.route
        ?.replace(':userId', payloadData?.userId)
        .replace(':date', payloadData?.date),
    };
    try {
      const response = yield call(callRequest, url, {}, '', {}, '', ApiSauce);

      if (response) {
        yield put(
          getDailyNutritionSuccess(
            nutritionGetDailyNutritionManipulator(response.data),
          ),
        );
        responseCallback &&
          responseCallback(
            true,
            nutritionGetDailyNutritionManipulator(response.data),
          );
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('update error ===>>> ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* createDailyNutrition({payload}) {
  const {payloadData, responseCallback} = payload;

  try {
    const response = yield call(
      callRequest,
      CREATE_DAILY_NUTRITION,
      payloadData,
      '',
      {},
      '',
      ApiSauce,
    );
    if (response) {
      yield put(
        createDailyNutritionSuccess(
          nutritionCreateDailyNutritionManipulator(response.data),
        ),
      );
      responseCallback &&
        responseCallback(
          true,
          nutritionCreateDailyNutritionManipulator(response.data),
        );
    } else {
      alert(ERROR_SOMETHING_WENT_WRONG.error);
      responseCallback && responseCallback(false, response);
    }
  } catch (err) {
    console.error('update error ===>>> ', err);
    responseCallback &&
      responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
  }
}

function* updateDailyNutrition() {
  while (true) {
    const {payload} = yield take(updateDailyNutritionRequest.type);
    const {payloadData, responseCallback} = payload;
    console.log('updateeeeeeeeeeee', payloadData);

    const url = {
      ...UPDATE_DAILY_NUTRITION,
      route: UPDATE_DAILY_NUTRITION?.route?.replace(':Id', payloadData?.Id),
    };
    try {
      const response = yield call(
        callRequest,
        url,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response) {
        yield put(
          updateDailyNutritionSuccess(
            nutritionCreateDailyNutritionManipulator(response.data),
          ),
        );
        responseCallback &&
          responseCallback(
            true,
            nutritionCreateDailyNutritionManipulator(response.data),
          );
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('update error ===>>> ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* deleteeDailyNutrition() {
  while (true) {
    const {payload} = yield take(deleteMyDailyNutritionRequest.type);
    const {payloadData, responseCallback} = payload;
    const url = {
      ...DELETE_DAILY_NUTRITION,
      route: DELETE_DAILY_NUTRITION?.route?.replace(':Id', payloadData?.Id),
    };
    try {
      const response = yield call(callRequest, url, {}, '', {}, '', ApiSauce);

      if (response) {
        yield put(
          deleteMyDailyNutritionSuccess(
            nutritionCreateDailyNutritionManipulator(response.data),
          ),
        );
        responseCallback &&
          responseCallback(
            true,
            nutritionCreateDailyNutritionManipulator(response.data),
          );
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('update error ===>>> ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

//Discovery Catorgory Api's
function* getDiscoveryFoodList() {
  while (true) {
    const {payload} = yield take(getDiscoveryCategoryRequest.type);
    const {payloadData, responseCallback} = payload;
    const url = {
      ...GET_DISCOVERY_FOOD,
      route: GET_DISCOVERY_FOOD?.route?.replace(
        ':category',
        payloadData?.category,
      ),
    };
    try {
      const response = yield call(
        callRequest,
        url,
        {},
        '',
        {},
        payloadData.query,
        ApiSauce,
      );

      if (response) {
        responseCallback &&
          responseCallback(true, nutritionAllFoodManipulator(response.data));
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('update error ===>>> ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

export default function* root() {
  yield fork(getfoodData);
  yield fork(getFoodSearchLatest);
  yield fork(createMyFood);
  yield fork(getMyFood);
  yield fork(getMyFoodSearchLatest);
  yield fork(deleteMyFoodById);
  yield fork(updateMyFoodItemById);
  yield takeEvery(getMyFoodItemByIdRequest.type, getMyFoodItemById);
  yield takeEvery(getAllFoodItemByIdRequest.type, getALFoodItemById);
  //Meal Api's
  yield fork(createMyMeal);
  yield fork(getMyMeal);
  yield fork(getMyMealById);
  yield fork(deleteMyMealById);
  yield fork(updateeMyMealById);
  yield fork(getMyMealSearchLatest);

  //Recipe Api's
  yield fork(createMyRecipe);
  yield fork(getMyRecipe);
  yield fork(getMyRecipeById);
  yield fork(deleteMyRecipeById);
  yield fork(updateeMyRecipeById);
  yield fork(getMyRecipeSearchLatest);
  //Ingredient Api's
  yield fork(getIngredientList);
  yield fork(createIngredient);

  //Daily Nutrition Api's
  yield fork(getDailyNutrition);
  // yield fork(createDailyNutrition);
  yield fork(updateDailyNutrition);
  yield fork(deleteeDailyNutrition);
  yield takeEvery(createDailyNutritionRequest.type, createDailyNutrition);

  //Discovery Catorgory Api's
  yield fork(getDiscoveryFoodList);
}
