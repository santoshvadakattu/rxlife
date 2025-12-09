import _ from 'lodash';
import Util from '../util';
import {tr} from 'rn-emoji-keyboard';

// export const BASE_URL = 'https://77a0-39-51-64-151.ngrok-free.app/api';

// DEVELOPMENT

// export const BASE_URL_WITHOUT_API = 'http://localhost:1337';

// export const CHAT_APP_BASE_URL = 'http://localhost:1339';

// STAGING URLS

  // USDA (FoodData Central) API
export const NiNJA_BASE_URL = 'https://api.api-ninjas.com/v1/nutrition?';
export const NINJA_API_KEY = 'cCmYN5pwoDwuQyDKJRH98w==bw8PED6utKjfvPyp';

export const CHAT_APP_BASE_URL =
  'https://stage-rxlifechallenge-chatserver.devrims.co';

export const BASE_URL_WITHOUT_API =
  'https://stage-rxlifechallenge-strapi.devrims.co';

// PRODUCTION URLS

// export const CHAT_APP_BASE_URL =
//   'https://rxlifechallenge-chatserver.devrims.co';

// export const BASE_URL_WITHOUT_API = 'https://rxlifechallenge-strapi.devrims.co';

export const BASE_URL = `${BASE_URL_WITHOUT_API}/api`;

// export const BASE_URL = 'https://13a7-180-178-138-114.ngrok-free.app/api';

export const GARMIN_ROOT = 'https://connectapi.garmin.com/';
export const OAUTH_ROOT = 'https://connect.garmin.com/';

export const GARMIN_BASE_URL = 'https://apis.garmin.com/wellness-api';

export const GARMIN = {
  REQUEST_TOKEN: 'oauth-service/oauth/request_token',
  OAUTH_CONFIRM: 'oauthConfirm?oauth_token=',
  ACCESS_TOKEN: 'oauth-service/oauth/access_token',
};

export const API_TIMEOUT = 30000;

// API USER ROUTES
export const API_LOG = true;

export const ERROR_SOMETHING_WENT_WRONG = {
  message: 'Something went wrong, Please try again later',
  error: 'Something went wrong, Please try again later',
};
export const ERROR_NETWORK_NOT_AVAILABLE = {
  message: 'Please connect to the working Internet',
  error: 'Please connect to the working Internet',
};

export const ERROR_TOKEN_EXPIRE = {
  message: 'Session Expired, Please login again!',
  error: 'Session Expired, Please login again!',
};

export const REQUEST_TYPE = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
};

// GARMIN APIS
export const GET_GARMIN_USER_INFO = {
  url: `${GARMIN_BASE_URL}/rest/user/id`,
  method: REQUEST_TYPE.GET,
  data: {},
  type: REQUEST_TYPE.GET,
  route: '/rest/user/id',
};

export const GET_GARMIN_USER_PERMISSIONS = {
  url: `${GARMIN_BASE_URL}/rest/user/permissions`,
  method: REQUEST_TYPE.GET,
  data: {},
  type: REQUEST_TYPE.GET,
  route: '/rest/user/permissions',
};

export const GET_GARMIN_DAILY_DATA = {
  url: `${GARMIN_BASE_URL}/rest/dailies`,
  method: REQUEST_TYPE.GET,
  data: {},
  type: REQUEST_TYPE.GET,
  route: '/rest/dailies',
  access_token_required: false,
};

export const GET_GARMIN_SLEEP_DATA = {
  url: `${GARMIN_BASE_URL}/rest/sleeps`,
  method: REQUEST_TYPE.GET,
  data: {},
  type: REQUEST_TYPE.GET,
  route: '/rest/sleeps',
  access_token_required: false,
};

export const GET_GARMIN_HRV_DATA = {
  url: `${GARMIN_BASE_URL}/rest/hrv`,
  method: REQUEST_TYPE.GET,
  data: {},
  type: REQUEST_TYPE.GET,
  route: '/rest/hrv',
  access_token_required: false,
};

export const GET_GARMIN_VO2MAX_DATA = {
  url: `${GARMIN_BASE_URL}/rest/userMetrics`,
  method: REQUEST_TYPE.GET,
  data: {},
  type: REQUEST_TYPE.GET,
  route: '/rest/userMetrics',
  access_token_required: false,
};

export const CREATE_GARMIN_USER = {
  route: '/garmins',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const DELETE_GARMIN_USER = {
  route: '/garmins',
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

// API USER ROUTES

export const APPLE_LOGIN = {
  route: '/auth/login-apple?token=:authorizationCode',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const USER_SIGNIN = {
  route: '/auth/local',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const USER_SIGNUP = {
  route: '/auth/local/register',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const GET_OTP_TOKEN = {
  route: '/getOtp',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const CONFIRM_OTP = {
  route: '/confirm-otp',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const UPDATE_USER = {
  route: '/users',
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

export const UPDATE_TOKEN = {
  route: '/update-token',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const DELETE_TOKEN = {
  route: '/delete-token',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_USER_INFO = {
  route:
    '/users/me?populate=user_profile&populate=user_profile.image&populate=goals&populate=requests&populate=garmin&populate=payment_methods',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_USER = {
  route: '/api/users/1?populate=*',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const RESET_PASSWORD = {
  route: '/reset-password',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const CHANGE_PASSWORD = {
  route: 'auth/change-password',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const UPDATE_PASSWORD = {
  route: '/update-password',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const UPLOAD_MEDIA = {
  route: '/upload/',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const PROFILE_SETUP = {
  route: '/user-profiles?populate=*',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const UPDATE_PROFILE_SETUP = {
  route: '/user-profiles/:userProfileId?populate=*',
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};
export const GET_ALL_GOALS = {
  route: '/goals?pagination[page]=1&pagination[pageSize]=500000',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_USER_GOALS = {
  route:
    '/goals?filters[users][id][$eq]=:userId&pagination[page]=1&pagination[pageSize]=5000000',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const ADD_GOALS = {
  route: '/users/:userId?populate=*',
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};
export const SEND_FRIENDS_REQUEST = {
  route: '/users/:senderId',
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};
export const GET_FRIENDS_REQUEST = {
  route: '/users/requests',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_FRIENDS = {
  route: '/users/:userId?populate=friends.user_profile.image&fields[0]=id',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const ACCEPTS_FRIENDS_REQUEST = {
  route: '/accept-request/:userId',
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};
export const REJECTS_FRIENDS_REQUEST = {
  route: '/users/:userId',
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};
export const VIEW_OTHER_PERSON_PROFILE = {
  route: '/profileInfo/:userId',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const SEARCH_USER = {
  route: '/random-users/:userId?search=[search]',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const UNFRIEND_REQUEST = {
  route: '/unfriend-user/:userId',
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};
export const REMOVE_REQUEST = {
  route: '/users/:userId',
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

// CHALLENGES
export const GET_ALL_CHALLENGES = {
  route: '/challenges',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const JOIN_CHALLENGE = {
  route: '/payment/purchase',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_ONGOING_CHALLENGES = {
  route: '/ongoing-challenges',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const CREATE_COMPLETE_CHALLENGE = {
  route: '/create-complete-challenge',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_COMPLETE_CHALLENGE = {
  route: '/completed-challenges',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const UPDATE_COMPLETE_CHALLENGE = {
  route: '/completed-challenges',
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

export const COMPLETED_CHALLENGES = {
  route: '/completedChallenges',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const GET_ONE_CHALLENGE = {
  route: '/challenges/:id',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

// payment methods
export const CREATE_PAYMENT_METHOD = {
  route: '/payment/attach-payment-method',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const REMOVE_PAYMENT_METHOD = {
  route: '/payment/detach-payment-method',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_ALL_TRANSACTIONS = {
  route: '/transactions',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

// leaderboard

export const GET_INDIVIUAL_LEADERBOARD = {
  route: '/leaderBoardIndiviual',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const GET_ONGOING_CHALLENGES_LEADERBOARD = {
  route: '/leaderBoardsOngoing',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const GET_CHALLENGES_TASK_DASHBOARD = {
  route: '/get-tasks-dashboard',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const DASHBOARD_COMPLETED_TASKS = {
  route: '/complete-tasks-dashboard',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

// CHATS

export const LOAD_ROOM = {
  route: 'v1/room/chat/load',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const UNREAD_CHATS = {
  route: 'v1/check-is-unread',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const GET_ALL_ROOMS = {
  route: 'v1/room/list',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const GET_ROOM_ALL_MESSAGES = {
  route: 'v1/room/chat/messages',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const GET_ROOM_PARENT_ALL_MESSAGES = {
  route: 'v1/room/load/parent/message',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const SEND_MESSAGE_WITH_ATTACHMENTS = {
  route: 'v1/room/message/send-attachment',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_ROOM_INFO = {
  route: 'v1/room/message/list-attachment',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const CREATE_GROUP = {
  route: 'v1/create/group',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const UPDATE_GROUP = {
  route: 'v1/update/group',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const REMOVE_PARTICIPANT = {
  route: 'v1/remove/group/participants',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const LEAVE_GROUP = {
  route: 'v1/leave/group/participants',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const ADD_PARTICIPANTS = {
  route: 'v1/add/group/participants',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const DELETE_CHAT = {
  route: 'v1/room/delete',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const SEND_REACTION = {
  route: 'v1/send/message/react',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const REMOVE_REACTION = {
  route: 'v1/send/message/unsend-react',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

// POINTS

export const GET_DAILY_POINTS = {
  route: '/dashboard-today-points',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const GET_WEEKLY_POINTS = {
  route: '/dashboard-weekly-points',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

// STATS
export const GET_STATISTICS = {
  route: '/getStatistics',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const ADD_ACTIVE_DAY = {
  route: '/stat',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const STATS_GRAPH_VIEW = {
  route: '/graph-points',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const SEND_WATCH_DATA = {
  route: '/complete-tasks',
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

export const GET_USERS_BY_ADMIN = {
  route: '/get-all-users-by-admin',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const GET_USERS_FOR_ROOM = {
  route: '/get-users-for-add',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const ADD_PARTICIPANT_ON_CHALLENGE_JOIN = {
  route: '/add-participant-to-challenge-group',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

// NOTIFICATIONS

export const GET_NOTIFICATIONS = {
  route: '/notifications',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const UPDATE_NOTIFICATION = {
  route: '/notifications/:id',
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

export const GET_QUOTES = {
  route: '/quotes?populate=*&pagination[page]=1&pagination[pageSize]=5000000',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

//Nutrition


export const GET_USDA_FOODS_LIST = {
  route: 'search?',
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};

export const GET_ALL_FOODS = {
  route: '/all-food-search',
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};
export const GET_ALL_FOOD_BY_ID = {
  route: '/all-foods/:Id?populate=*',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_DISCOVERY_FOOD = {
  route: '/all-foods-discovery?category=:category&populate=image',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_MY_FOODS = {
  route: '/my-foods?filters[user][id][$eq]=:userId&populate=*',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const CRREATE_MY_FOODS = {
  route: '/my-foods?populate=*',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const SEARCH_MY_FOODS = {
  route: '/my-food-search?user=:userId&populate=my_foods.image',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const DELETE_MY_FOOD_BY_ID = {
  route: '/my-foods/:Id?populate=*',
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
export const UPDATE_MY_FOOD_BY_ID = {
  route: '/my-foods/:Id?populate=*',
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};
export const GET_MY_FOOD_BY_ID = {
  route: '/my-foods/:Id?populate=*',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

//Meal Api's

export const CREATE_MEAL = {
  route: '/my-meals?populate=*',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const GET_MY_MEAL = {
  route:
    '/my-meals?filters[user][id][$eq]=:userId&populate=*&_sort=data.attributes.updatedAt:asc',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
//
export const GET_MY_MEAL_BY_ID = {
  route:
    '/my-meals/:Id?populate=labelNutrients&populate=my_foods.image&populate=all_foods.image&populate=all_foods.labelNutrients&populate=my_foods.labelNutrients&populate=image&populate=mealsFoods.all_food&populate=mealsFoods.my_food',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const DELETE_MY_MEAL_BY_ID = {
  route: '/my-meals/:Id?populate=*',
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
export const UPDATE_MY_MEAL_BY_ID = {
  route: '/my-meals/:Id?populate=*',
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};
export const SEARCH_MY_MEAL = {
  route: '/my-meal-search?user=:userId&populate=image',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

//Recipe Api's
export const CREATE_RECIPE = {
  route: '/my-recipes?populate=*',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const GET_MY_RECIPE = {
  route: '/my-recipes?filters[user][id][$eq]=:userId&populate=*',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_MY_RECIPE_BY_ID = {
  route:
    '/my-recipes/:Id?populate=my_foods.image&populate=all_foods.image&populate=all_foods.labelNutrients&populate=my_foods.labelNutrients&populate=image&populate=recipesFoods.all_food&populate=recipesFoods.my_food&populate=recipesFoods.all_food.labelNutrients&populate=recipesFoods.my_food.labelNutrients',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const DELETE_MY_RECIPE_BY_ID = {
  route: '/my-recipes/:Id?populate=*',
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
export const UPDATE_MY_RECIPE_BY_ID = {
  route: '/my-recipes/:Id?populate=*',
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};
export const SEARCH_MY_RECIPE = {
  route: '/my-recipe-search?user=:userId&populate=image',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

//ingredients
export const GET_INGRETIENTS_LIST = {
  route: '/ingredients/',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const CREATE_INGRETIENTS = {
  route: '/ingredients/',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

//dailyNutrition

export const GET_DAILY_NUTRITION = {
  route:
    '/daily-nutritions?filters[date][$eq]=:date&filters[user][id][$eq]=:userId&populate=my_foods.image&populate=all_foods.image&populate=all_foods.labelNutrients&populate=my_foods.labelNutrients&_sort=createdAt:asc',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const CREATE_DAILY_NUTRITION = {
  route:
    '/daily-nutritions?&populate=my_foods.image&populate=all_foods.image&populate=all_foods.labelNutrients&populate=my_foods.labelNutrients',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const UPDATE_DAILY_NUTRITION = {
  route:
    '/daily-nutritions/:Id?&populate=my_foods.image&populate=all_foods.image&populate=all_foods.labelNutrients&populate=my_foods.labelNutrients',
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

export const DELETE_DAILY_NUTRITION = {
  route: '/daily-nutritions/:Id?populate=*',
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

export const callRequest = function (
  url,
  data,
  parameter,
  header = {},
  query,
  ApiSauce,
  baseUrl = BASE_URL,
) {
  let _header = header;
console.log('callRequest url =>>> ', baseUrl);
  if (url.access_token_required) {
    const _access_token = Util.getCurrentUserAccessToken();
    if (_access_token) {
      _header = {
        ...{
          Authorization: `Bearer ${_access_token}`,
        },
        ..._header,
      };
    }
  }

  let _url =
    parameter && !_.isEmpty(parameter)
      ? `${url.route}/${parameter}`
      : url.route;
  console.log('_url =>>> ', _url);
   let finalQuery = query;
  if (baseUrl === NiNJA_BASE_URL) {
    const keyParam = `api_key=${USDA_API_KEY}`;
    // normalize finalQuery: remove leading '?'
    if (finalQuery && typeof finalQuery === 'string') {
      finalQuery = finalQuery.replace(/^\?/, '');
      // if the query already contains api_key param, leave it
      if (finalQuery.includes('api_key=')) {
        // nothing
      } else {
        // if finalQuery looks like a raw key (only hex/letters/dashes and length reasonable), treat it as the api_key
        const rawKeyCandidate = finalQuery.trim();
        const isRawKey = /^[0-9a-fA-F-]{10,}$/.test(rawKeyCandidate);
        if (isRawKey) {
          finalQuery = `api_key=${rawKeyCandidate}`;
        } else if (finalQuery !== '') {
          // append api_key to existing query params
          finalQuery = `${finalQuery}&${keyParam}`;
        } else {
          finalQuery = keyParam;
        }
      }
    } else {
      finalQuery = keyParam;
    }
  }

  if (finalQuery && finalQuery !== null && finalQuery !== '') {
    _url = `${_url}?${finalQuery}`;
  }

  console.log({_url});

  if (url.type === REQUEST_TYPE.POST) {
    return ApiSauce.post(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.GET) {
    return ApiSauce.get(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.PUT) {
    return ApiSauce.put(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.DELETE) {
    return ApiSauce.delete(_url, data, _header, baseUrl);
  }
  // return ApiSauce.post(url.route, data, _header);
};
