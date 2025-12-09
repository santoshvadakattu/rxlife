import moment from 'moment';
import {Colors, Images} from '../theme';

// export const TIME_ZONE = (-1 * new Date().getTimezoneOffset()) / 60;
export const APP_URL = '';
export const APP_DOMAIN = '';
export const QUERY_LIMIT = 10;
export const SAGA_ALERT_TIMEOUT = 500;

// date time formats
export const DATE_FORMAT1 = 'dddd, DD MMMM, YYYY';

// Messages

export const LOCATION_PERMISSION_DENIED_ERROR2 =
  'Location permission required, please go to app settings to allow access';
export const INVALID_NAME_ERROR = 'Invalid name';
export const INVALID_EMAIL_ERROR = 'Invalid email';
export const INTERNET_ERROR = 'Please connect to the working internet';
export const SESSION_EXPIRED_ERROR = 'Session expired, Please login again';

// Message types
export const MESSAGE_TYPES = {
  INFO: 'info',
  ERROR: 'error',
  SUCCESS: 'success',
};

// File Types
export const FILE_TYPES = {VIDEO: 'video', IMAGE: 'image', AUDIO: 'audi'};

export const strings = {
  NAME_SHOULD_NOT_CONTAIN_ONLY_SPACES:
    'Field should not contain only spaces in it.',
  PASSWORD_SHOULD_NOT_CONTAIN_ONLY_SPACES:
    'Password should not contain only spaces in it.',
  EMAIL_SHOULD_NOT_CONTAIN_ONLY_SPACES:
    'Email should not contain only spaces in it.',
  INVALID_USERNAME: 'Invalid Username.',
  REQUIRED_FIELD: '*Required Field',
  SHOULD_BE_GREATER_THAN_ZERO: 'Should be greater than zero',
  INVALID_EMAIL: 'Invalid Email',
  NEW_PASSWORD: 'New Password',
  CONFIRM_PASSWORD: 'Confrim Password',
  PASSWORD_MUST: 'Password should not be less than 6 characters',
  PASSWORD_AND_CONFIRM_PASS_SHOULD_BE_SAME:
    'Password and confirm password does not match.',
  PASSWORD_AND_CURRENT_PASS_SHOULD_BE_SAME: 'You have entered old password.',
  EMAIL_AND_CONFIRM_EMAIL_SHOULD_BE_SAME:
    'Email and confirm email does not match.',
  PASSWORD_STRONGE:
    'Password should not be less than 8 characters and at least contain one alphabet, one digit and one special character in it.',
  INVALID_VALUE: 'Invalid value',
  FRIEND_REQUEST_EMPTY: 'There is no any friend request',
  FRIEND_EMPTY: 'There is no any friends',
  NO_RESULT_FOUND: 'No Result Found',
};

const getGoal = (number) => {
  return {
    id: number,
    title: `Goal ${number}`,
    isChecked: false,
  };
};

export const GOALS = [...Array(12)].map((_, index) => getGoal(index + 1));
// garmin keys
// export const GARMIN_CONSUMER_KEY = 'eed56f46-d440-41be-9d72-39f5c81c330d';
// export const GARMIN_CONSUMER_SECRET = 'n7QtimNmN6SpU8GcwXbBTkGQpCbbAWTkOF9';

// export const GARMIN_CONSUMER_KEY = 'cd3c8fea-0a3d-4788-b200-9ffa9a17fe44';
// export const GARMIN_CONSUMER_SECRET = 'u4x9UauTIP5FPPKbsa8qXcYImVuKp7ybNWW';
export const GARMIN_CONSUMER_KEY = 'c634e36b-d6db-4aa9-94bb-028ff3af4b52';
export const GARMIN_CONSUMER_SECRET = 'MusC41pfAWclz0znjnAxFNrIMfOgdfBUAVm';
export const USDA_DATA_KEY = 'bLWmKtejE3eZg77FTgoHwXSjCRaI9ml6c7QD4i1b';
export const SCREENS = {
  auth: 'auth',
  unAuth: 'unAuth',
  AUTH: {
    walkThrough: 'walkThrough',
    login: 'login',
    signup: 'signup',
    forgotPassword: 'forgotPassword',
    emailVerification: 'emailVerification',
    changePassword: 'changePassword',
    profileSetup: 'profileSetup',
    setupGoals: 'setupGoals',
  },
  HOME: {
    challenges: 'challenges',
    challengesSearch: 'challengesSearch',
    challengeDetail: 'challengeDetail',
    myChallengeDetail: 'myChallengeDetail',
    checkout: 'checkout',
    notification: 'notification',
    paymentMethod: 'paymentMethod',
    paymentMethodSetting: 'paymentMethodSetting',
    myChallenges: 'myChallenges',
    challengeVideo: 'challengeVideo',
    myChallengeVideo: 'myChallengeVideo',
    drawer: 'drawer',
    weightTracker: 'weightTracker',
    addWeight: 'addWeight',
    settings: 'settings',
    transaction: 'transaction',
    friendRequest: 'friendRequest',
    friends: 'friends',
    contactus: 'contactus',
    privacyPolicy: 'privacyPolicy',
    termsConditions: 'termsConditions',
    addFriends: 'addFriends',
    friendProfile: 'friendProfile',
    profile: 'profile',
    home: 'home',
    editProfile: 'editProfile',
    setupUserGoals: 'setupUserGoals',
    updatePassword: 'updatePassword',
    notificationSettings: 'notificationSettings',
    chatList: 'chatList',
    chatSearchList: 'chatSearchList',
    chat: 'chat',
    chatMedia: 'chatMedia',
    selectParticipants: 'selectParticipants',
    createGroup: 'createGroup',
    groupInfo: 'groupInfo',
    editGroup: 'editGroup',
    addParticipants: 'addParticipants',
    forwardChat: 'forwardChat',
    videoScreen: 'videoScreen',
    setTarget: 'setTarget',
  },
  NUTRITION: {
    nutrition: 'nutrition',
    addNatrition: 'addNatrition',
    foodDetails: 'foodDetails',
    createMeal: 'createMeal',
    newRecipe: 'newRecipe',
    newRecipeSecond: 'newRecipeSecond',
    addFood: 'addFood',
    createFood: 'createFood',
    quickAddMeal: 'quickAddMeal',
    nutritionGraphScreen: 'nutritionGraphScreen',
    nutritentIndividual: 'nutritentIndividual',
    weeklyNutritionSettings: 'weeklyNutritionSettings',
    nutritionExercise: 'nutritionExercise',
    cardiovascular: 'cardiovascular',
    createExercise: 'createExercise',
    discoverRecipes: 'discoverRecipes',
    discoverRecipesDetails: 'discoverRecipesDetails',
    addNote: 'addNote',
    addNoteList: 'addNoteList',
    customizeMealName: 'customizeMealName',
    editGoals: 'editGoals',
    nutritionSettings: 'nutritionSettings',
    calorieMacroGoals: 'calorieMacroGoals',
    units: 'units',
    addDirections: 'addDirections',
    addIngredient: 'addIngredient',
    addNewIngredient: 'addNewIngredient',
    createFoodSecond: 'createFoodSecond',
    startGoals: 'startGoals',
    addWater: 'addWater',
    addReminders: 'addReminders',
    recipeDetails: 'recipeDetails',
    myFoodList: 'myFoodList',
    mealDetails: 'mealDetails',
  },
  PROGRESS: {
    progressTracker: 'progressTracker',
    statisticsChart: 'statisticsChart',
  },
  GOALS: {
    setGoals: 'setGoals',
    setGoalsTarget: 'setGoalsTarget',
    goalDepanderQuestions: 'goalDepanderQuestions',
    goalsActivityLevel: 'goalsActivityLevel',
    goalYourself: 'goalYourself',
    goalYourselfWeight: 'goalYourselfWeight',
    weeklyGoal: 'weeklyGoal',
  },
  PROGRAMS: {
    programs: 'programs',
    programsDetails: 'programsDetails',
    paymentMethod: 'paymentMethod',
    addPaymentMethod: 'addPaymentMethod',
    programDays: 'programDays',
    videoScreen: 'videoScreen',
  },
};

export const connectedWatch = {
  GRAMIN: 'Garmin',
  APPLE: 'apple',
};
export const programsWithoutTabBar = [
  'programsDetails',
  'paymentMethod',
  'addPaymentMethod',
];
export const challengeWithoutTabBar = [
  'challengesSearch',
  'challengeDetail',
  'checkout',
  'paymentMethod',
  'notification',
  'chatList',
  'chatSearchList',
  'chat',
  'chatMedia',
  'selectParticipants',
  'createGroup',
  'groupInfo',
  'editGroup',
  'addParticipants',
  'forwardChat',
  'videoScreen',
];

export const myChallengeWithoutTabBar = [
  'myChallengeDetail',
  'leaderboardListing',
  'notification',
  'chatList',
  'chatSearchList',
  'chat',
  'chatMedia',
  'selectParticipants',
  'createGroup',
  'groupInfo',
  'editGroup',
  'addParticipants',
  'checkout',
  'paymentMethod',
  'forwardChat',
  'videoScreen',
];

export const nutritionTabbbar = [
  'addNatrition',
  'foodDetails',
  'createMeal',
  'newRecipe',
  'newRecipeSecond',
  'createFood',
  'addFood',
  'nutritionGraphScreen',
  'nutritentIndividual',
  'weeklyNutritionSettings',
  'addNote',
  'addNoteList',
  'customizeMealName',
  'editGoals',
  'nutritionSettings',
  'calorieMacroGoals',
  'customizeMealName',
  'addReminders',
  'units',
  'addDirections',
  'addIngredient',
  'addNewIngredient',
  'createFoodSecond',
  'cardiovascular',
  'createExercise',
  'discoverRecipes',
  'discoverRecipesDetails',
  'setGoals',
  'setGoalsTarget',
  'goalDepanderQuestions',
  'recipeDetails',
  'addWater',
  'quickAddMeal',
  'myFoodList',
  'mealDetails',
];
export const homeWithoutTabbar = [
  'leaderboardListing',
  'challengeDetail',
  'myChallengeDetail',
  'weeklyActivityListing',
  'individualActivity',
  'individualActivityGarmin',
  'watchConnect',
  'notification',
  'statisticsChart',
  'activityAllChart',
  'activityAllChartGarmin',
  'activityWeeklyPoint',
  'friendProfile',
  'chatList',
  'chatSearchList',
  'chat',
  'chatMedia',
  'selectParticipants',
  'createGroup',
  'groupInfo',
  'editGroup',
  'addParticipants',
  'checkout',
  'paymentMethod',
  'forwardChat',
  'videoScreen',
  'setTarget',
];

export const STRIPE_PUBLISH_KEY = {
  publishKey:
    'pk_test_51KHAiQDM6P2npzvmAy06l6INPbqCbL9liYgj0toASmfz15KdJaBTVgJXN3UbkrcaSuhA2CAxdWT5OYM1BuwpdYdZ005LtL1ynR',
  // publishKey:
  //   'pk_live_51Mxq8lBJVuVEZBC8s2lU2UQX5sppVrHD4sm6Q2IgvYiJ1zKuce12TOFnz75vcRU1bCefUBqobZ2Ot92oCSi0kVUq00b6Z0yDFZ',
};

export const weeklyActivityData = [
  {
    image: Images.Calories,
    imageStyle: {width: 17, height: 17},
    title: 'Calories',
    color: 'rgba(13, 130, 255, 1)',
    unit: 'Kcal',
  },
  {
    image: Images.Steps2,
    imageStyle: {width: 23.2, height: 16},
    title: 'Steps',
    color: 'rgba(13, 130, 255, 1)',
    unit: 'steps',
  },
  {
    image: Images.Intensity,
    imageStyle: {width: 23, height: 23},
    title: 'Intensity Minutes',
    color: 'rgba(13, 130, 255, 1)',
    unit: 'min',
  },
  {
    image: Images.HeartRate,
    imageStyle: {width: 20, height: 17},
    title: 'Resting Heart Rt.',
    color: 'rgba(13, 130, 255, 1)',
    unit: 'bpm',
  },
  {
    image: Images.HRV,
    imageStyle: {width: 19, height: 19},
    title: 'HRV',
    color: 'rgba(13, 130, 255, 1)',
    unit: 'ms',
  },
  {
    image: Images.SleepHrs,
    imageStyle: {width: 21, height: 22},
    title: 'Sleep',
    color: 'rgba(13, 130, 255, 1)',
    unit: 'hours',
  },
  {
    image: Images.Vo2Max,
    imageStyle: {width: 32, height: 24},
    title: 'VO2 MAX',
    color: 'rgba(13, 130, 255, 1)',
    unit: 'ml',
  },
  {
    image: Images.unFillStart,
    imageStyle: {width: 17, height: 17},
    title: 'Winning Points',
    color: 'rgba(97, 216, 94, 1)',
    unit: '',
  },
];
export const allActivityData = [
  {
    image: Images.StepsRunner,
    imageStyle: {width: 26, height: 26, tintColor: '#FF294F'},
    title: 'Total Steps',
    color: '#FF294F',
    unit: 'Steps',
    value: '9,865',
  },
  {
    image: Images.DistanceIcon,
    imageStyle: {width: 30, height: 29},
    title: 'Distance',
    color: Colors.background.primary,
    unit: 'km',
    value: 35.02,
  },
  {
    image: Images.FootArrowIcon,
    imageStyle: {width: 28, height: 23},
    title: 'Step Length',
    color: Colors.background.primary,
    unit: 'meter',
    value: 1.2,
  },

  {
    image: Images.WalkingFoot,
    imageStyle: {width: 27, height: 21},
    title: 'Walking Speed',
    color: Colors.background.primary,
    unit: 'Km/h',
    value: 35,
  },
  {
    image: Images.KcalIcon,
    imageStyle: {width: 18, height: 24},
    title: 'Calories Burn',
    color: '#FF294F',
    unit: 'Kcal',
    value: 205,
  },
];

export const notificaitonListing = [
  {
    title: 'Challenger Reminders',
    description: 'Established fact that a reader',
    date: new Date(),
    type: 1,
    isRead: false,
  },
  {
    title: 'Friend Request',
    description: 'john smith send a request',
    date: new Date(),
    type: 2,
    isRead: false,
  },
  {
    title: 'Congratulations',
    description: 'You are on the leader board',
    date: new Date(),
    type: 3,
    isRead: true,
  },
  {
    title: 'Friend Request',
    description: 'john smith send a request',
    date: new Date(),
    type: 2,
    isRead: true,
  },
  {
    title: 'Challenger Reminders',
    description: 'Established fact that a reader',
    date: new Date(),
    type: 1,
    isRead: true,
  },
  {
    title: 'Friend Request',
    description: 'john smith send a request',
    date: new Date(),
    type: 2,
    isRead: true,
  },
  {
    title: 'Congratulations',
    description: 'You are on the leader board',
    date: new Date(),
    type: 3,
    isRead: true,
  },
  {
    title: 'Friend Request',
    description: 'john smith send a request',
    date: new Date(),
    type: 2,
    isRead: true,
  },
  {
    title: 'Congratulations',
    description: 'You are on the leader board',
    date: new Date(),
    type: 3,
    isRead: true,
  },
];

export const NOTIFICATION_TYPES = {
  'Challenger Reminders': 1,
  'Friend Invitation': 2,
  'Upcoming Challenges': 3,
  Others: 4,
};

export const statisticData = [
  {
    title: 'Days Active',
    value: 0,
  },
  {
    title: 'Challenges Completed',
    value: 0,
  },
  {
    title: 'Challenges Won',
    value: 0,
  },
  {
    title: 'Active Challenges',
    value: 0,
  },
  {
    title: 'Daily Challenges Completed',
    value: 0,
  },
  {
    title: 'Daily Challenge Streak',
    value: 0,
  },
];

export const CHALLENGES = [
  {
    id: 1,
    title: 'Sport Challenge',
    startDate: moment().format('DD-MMMM-YYYY'),
    bgImage: Images.ChallengeBG,
    participants: [
      {title: 'John Doe', image: Images.ChallengeBG1},
      {title: 'John Doe', image: Images.ChallengeBG2},
      {title: 'John Doe', image: Images.ChallengeBG3},
    ],
    amount: 10,
    isFree: false,
    isDaily: false,
    totalDays: 20,
    remainingDays: 10,
  },

  {
    id: 2,
    title: 'Sport Challenge',
    startDate: moment().format('DD-MMMM-YYYY'),
    bgImage: Images.ChallengeBG,
    participants: [
      {title: 'John Doe', image: Images.ChallengeBG1},
      {title: 'John Doe', image: Images.ChallengeBG2},
      {title: 'John Doe', image: Images.ChallengeBG3},
    ],
    amount: 10,
    isFree: false,
    isDaily: false,
    totalDays: 20,
    remainingDays: 10,
  },

  {
    id: 3,
    title: 'Sport Challenge',
    startDate: moment().format('DD-MMMM-YYYY'),
    bgImage: Images.ChallengeBG,
    participants: [
      {title: 'John Doe', image: Images.ChallengeBG1},
      {title: 'John Doe', image: Images.ChallengeBG2},
      {title: 'John Doe', image: Images.ChallengeBG3},
    ],
    amount: 10,
    isFree: true,
    isDaily: true,
    totalDays: 20,
    remainingDays: 10,
  },
  {
    id: 4,
    title: 'Sport Challenge',
    startDate: moment().format('DD-MMMM-YYYY'),
    bgImage: Images.ChallengeBG,
    participants: [
      {title: 'John Doe', image: Images.ChallengeBG1},
      {title: 'John Doe', image: Images.ChallengeBG2},
      {title: 'John Doe', image: Images.ChallengeBG3},
    ],
    amount: 10,
    isFree: true,
    isDaily: true,
    totalDays: 20,
    remainingDays: 10,
  },
];

export const MY_CHALLENGES = [
  {
    id: 1,
    title: 'Sport Challenge',
    startDate: moment().format('DD-MMMM-YYYY'),
    bgImage: Images.ChallengeBG,
    participants: [
      {title: 'John Doe', image: Images.ChallengeBG1},
      {title: 'John Doe', image: Images.ChallengeBG2},
      {title: 'John Doe', image: Images.ChallengeBG3},
    ],
    amount: 10,
    isFree: false,
    isDaily: false,
    totalDays: 20,
    remainingDays: 10,
    onGoing: false,
    points: 15,
  },

  {
    id: 2,
    title: 'Sport Challenge',
    startDate: moment().format('DD-MMMM-YYYY'),
    bgImage: Images.ChallengeBG,
    participants: [
      {title: 'John Doe', image: Images.ChallengeBG1},
      {title: 'John Doe', image: Images.ChallengeBG2},
      {title: 'John Doe', image: Images.ChallengeBG3},
    ],
    amount: 10,
    isFree: false,
    isDaily: false,
    totalDays: 20,
    remainingDays: 10,
    onGoing: false,
    points: 10,
  },

  {
    id: 3,
    title: 'Sport Challenge',
    startDate: moment().format('DD-MMMM-YYYY'),
    bgImage: Images.ChallengeBG,
    participants: [
      {title: 'John Doe', image: Images.ChallengeBG1},
      {title: 'John Doe', image: Images.ChallengeBG2},
      {title: 'John Doe', image: Images.ChallengeBG3},
    ],
    amount: 10,
    isFree: true,
    isDaily: true,
    totalDays: 20,
    remainingDays: 10,
    onGoing: false,
    points: 20,
  },

  {
    id: 4,
    title: 'Sport Challenge',
    startDate: moment().format('DD-MMMM-YYYY'),
    bgImage: Images.ChallengeBG,
    participants: [
      {title: 'John Doe', image: Images.ChallengeBG1},
      {title: 'John Doe', image: Images.ChallengeBG2},
      {title: 'John Doe', image: Images.ChallengeBG3},
    ],
    amount: 10,
    isFree: false,
    isDaily: false,
    totalDays: 20,
    remainingDays: 10,
    onGoing: true,
    points: 10,
  },

  {
    id: 5,
    title: 'Sport Challenge',
    startDate: moment().format('DD-MMMM-YYYY'),
    bgImage: Images.ChallengeBG,
    participants: [
      {title: 'John Doe', image: Images.ChallengeBG1},
      {title: 'John Doe', image: Images.ChallengeBG2},
      {title: 'John Doe', image: Images.ChallengeBG3},
    ],
    amount: 10,
    isFree: true,
    isDaily: true,
    totalDays: 20,
    remainingDays: 10,
    onGoing: true,
    points: 20,
  },

  {
    id: 6,
    title: 'Sport Challenge',
    startDate: moment().format('DD-MMMM-YYYY'),
    bgImage: Images.ChallengeBG,
    participants: [
      {title: 'John Doe', image: Images.ChallengeBG1},
      {title: 'John Doe', image: Images.ChallengeBG2},
      {title: 'John Doe', image: Images.ChallengeBG3},
    ],
    amount: 10,
    isFree: true,
    isDaily: true,
    totalDays: 20,
    remainingDays: 10,
    onGoing: true,
    points: 20,
  },
];

export const POINTS = [
  {
    title: 'Running 5 min',
    points: 5,
    id: 1,
  },
  {
    title: '4ltr Drinking water',
    points: 5,
    id: 2,
  },
  {
    title: 'Running 5 min',
    points: 5,
    id: 3,
  },
  {
    title: 'Running 5 min',
    points: 5,
    id: 4,
  },
  {
    title: 'Running 5 min',
    points: 5,
    id: 5,
  },
];

export const LEADERBOARD_INFO = [
  {
    position: 1,
    positionimage: Images.firstPosition,
    image: Images.profile1,
    name: 'Ralph Edwards',
    points: 789,
  },
  {
    position: 2,
    positionimage: Images.SecondPosition,
    image: Images.profile2,
    name: 'Robert Fox',
    points: 789,
  },
  {
    position: 3,
    positionimage: Images.thirdPosition,
    image: Images.profile3,
    name: 'Jane Cooper',
    points: 789,
  },

  {
    position: 4,
    positionimage: Images.thirdPosition,
    image: Images.profile3,
    name: 'Jane Cooper',
    points: 789,
  },

  {
    position: 5,
    positionimage: Images.thirdPosition,
    image: Images.profile3,
    name: 'Jane Cooper',
    points: 789,
  },
];

export const TRANSACTIONS = [
  {
    challengeName: 'Challenge 1',
    id: '5468781325589',
    amount: 10,
  },

  {
    challengeName: 'Challenge 1',
    id: '546878132558',
    amount: 10,
  },

  {
    challengeName: 'Challenge 1',
    id: '5468781325584',
    amount: 10,
  },

  {
    challengeName: 'Challenge 1',
    id: '5468781325585',
    amount: 10,
  },
];

export const NOTIFICATIONS_SETTINGS = [
  {
    id: 1,
    title: 'Challenger Reminders',
    isAllowed: true,
  },
  {
    id: 2,
    title: 'Friend Invitation',
    isAllowed: false,
  },

  {
    id: 3,
    title: 'Group Invitations',
    isAllowed: false,
  },

  {
    id: 4,
    title: 'Events',
    isAllowed: true,
  },

  {
    id: 5,
    title: 'Messages',
    isAllowed: true,
  },

  {
    id: 6,
    title: 'News and Updates',
    isAllowed: false,
  },
];

// Function to get the start and end date of a specific week
function getWeekDates(year, weekNumber) {
  const startDate = new Date(year, 0, 1 + (weekNumber - 1) * 7);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  return {startDate, endDate};
}

// Function to get the week number within a month
function getWeekNumberInMonth(date) {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayOfWeek = firstDayOfMonth.getDay();
  const adjustedDate = date.getDate() + dayOfWeek;
  return Math.ceil(adjustedDate / 7);
}

// Function to generate the JSON format for a week
function generateWeekData(year, weekNumber) {
  const {startDate, endDate} = getWeekDates(year, weekNumber);
  const startMonth = startDate.toLocaleString('default', {month: 'short'});
  const endMonth = endDate.toLocaleString('default', {month: 'short'});

  let title;
  if (startMonth === endMonth) {
    title = `Week ${getWeekNumberInMonth(startDate)}`;
  } else {
    title = `Week ${getWeekNumberInMonth(startDate)}`;
  }

  return {
    des: `${startMonth} ${startDate.getDate()} to ${endMonth} ${endDate.getDate()} - ${year}`,
    endDate: endDate.toISOString(),
    startDate: startDate.toISOString(),
    title,
    // weekNumberInMonth: getWeekNumberInMonth(startDate),
  };
}

// Function to generate data for a range of weeks
function generateWeekDataRange(startYear, startWeek, endYear, endWeek) {
  const weekData = [];

  for (let year = startYear; year <= endYear; year++) {
    const startWeekOfYear = year === startYear ? startWeek : 1;
    const endWeekOfYear = year === endYear ? endWeek : 52; // Assuming 52 weeks in a year

    for (
      let weekNumber = startWeekOfYear;
      weekNumber <= endWeekOfYear;
      weekNumber++
    ) {
      weekData.push(generateWeekData(year, weekNumber));
    }
  }

  return weekData;
}

// Get the current year and week number

export const generateWeeksData = () => {
  const currentYear = new Date().getFullYear();
  const currentWeek = getWeekNumberInMonth(new Date());

  // Generate data for 50 weeks backward and 50 weeks forward
  const weeksData = generateWeekDataRange(
    currentYear - 1,
    currentWeek - 50,
    currentYear + 1,
    currentWeek + 50,
  );

  return weeksData;
};

export const NOTIFICATION_TYPES_TEXT = {
  friendInvitation: 'Friend Invitation',
  challengeReminder: 'Challenger Reminders',
  upcomingChallenges: 'Upcoming Challenges',
  chat: 'chat',
  reaction: 'reaction',
};

export const CaloriesData = [
  {
    title: 'Protein',
    value: 20,
    total: 100,
    left: 80,
    progress: 0.2,
  },
  {
    title: 'Fiber',
    value: 30,
    total: 120,
    left: 40,
    progress: 0.9,
  },
  {
    title: 'Sugar',
    value: 30,
    total: 120,
    left: 40,
    progress: 0.2,
  },
  {
    title: 'Fat',
    value: 30,
    total: 120,
    left: 40,
    progress: 0.3,
  },
  {
    title: 'Protein',
    value: 30,
    total: 120,
    left: 40,
    progress: 0.5,
  },
  {
    title: 'Protein',
    value: 20,
    total: 100,
    left: 80,
    progress: 0.4,
  },
  {
    title: 'Fiber',
    value: 30,
    total: 120,
    left: 40,
    progress: 0.8,
  },
  {
    title: 'Sugar',
    value: 30,
    total: 120,
    left: 40,
    progress: 0.5,
  },
  {
    title: 'Fat',
    value: 30,
    total: 120,
    left: 40,
    progress: 0.7,
  },
  {
    title: 'Protien',
    value: 30,
    total: 120,
    left: 40,
    progress: 0.8,
  },
  {
    title: 'Protein',
    value: 20,
    total: 100,
    left: 80,
    progress: 0.4,
  },
  {
    title: 'Fiber',
    value: 30,
    total: 120,
    left: 40,
    progress: 0.8,
  },
  {
    title: 'Sugar',
    value: 30,
    total: 120,
    left: 40,
    progress: 0.5,
  },
  {
    title: 'Fat',
    value: 30,
    total: 120,
    left: 40,
    progress: 0.7,
  },
  {
    title: 'Protien',
    value: 30,
    total: 120,
    left: 40,
    progress: 0.8,
  },
];

export const MacrosData = [
  {
    title: 'Proteins',
    value: '10%',
    total: '56%',
  },
  {
    title: 'Fat',
    value: '10%',
    total: '56%',
  },
  {
    title: 'Carbohydrates',
    value: '10%',
    total: '56%',
  },
];

export const NUTRITION_GOALS_DATA_SET = [
  {
    goal: 'Loss Weight',
    question:
      'In the past, what were barriers to achieving weight loss? Select all that apply.',
    answers: [
      'Lack of time',
      'The regimen was too hard to follow',
      'Did not enjoy the food',
      'Difficult to make food choices',
      'Social eating and events',
      'Food cravings',
      'Lack of progress',
    ],
  },
  {
    goal: 'Gain Weight',
    question:
      'What are your reasons for wanting to gain weight? Select all that apply',
    answers: [
      'Competitive sport performance',
      'Gain muscle for general fitness',
      'I am underweight',
      'My healthcare provider recommended it',
      'Other',
    ],
  },
  {
    goal: 'Maintain Weight',
    question:
      'In the past, what have been your barriers to maintaining weight?',
    answers: [
      'Heathly diets lack variety',
      'Stress around food choices',
      'Holidays/Vacation/Social Events',
      'Food cravings',
      'Lack of progress',
      `Heathly food doesn't taste good`,
      'Heathly food is too expensive',
      'Cooking was too hard or time-consuming',
      'I did not experience barriers',
    ],
  },
  {
    goal: 'Gain Muscle',
    question:
      'What results do you want to achieve from gaining muscle? Select one',
    answers: [
      'Tone up - you want visible muscles with as little mass as possible, with a low body fat percentage',
      'Bulk up - you want large, well-defined muscles, with a low percentage of body fat',
      'Get strong - you want to lift the maximum amount of weight and are not concerned with body fat or muscle definition',
    ],
  },
  {
    goal: 'Modify My Diet',
    question:
      'In terms of diet modification, what do you want to focus on? Select all that apply',
    answers: [
      'Track macros',
      'Eat vegan',
      'Eat vegetarian',
      'Eat pescetarian',
      'Less sugar',
      'Less protein',
      'Less dairy',
      'Fewer carbs',
      'Less fat',
      'More protein',
      'More fat',
      'More fruits and vegetables',
      'Other',
    ],
  },
  {
    goal: 'Manage Stress',
    question: `Complete this statement: "I feel better after I —---------------, Select all that apply"`,
    answers: [
      'Walk',
      'Run',
      'Do a strength workout',
      'Go on a bike ride',
      'Do yoga or other fitness class',
      'Stretch',
      'Watch, read, or listen to something motivational',
      'Meditate Practice mindfulness',
      'Listen to music',
      'Do something else',
      'Nothing helps me relieve stress',
    ],
  },
  {
    goal: 'Increase My Step Count',
    question: 'How many steps do you take per day now? Select one',
    answers: [
      'Less than 1,000',
      '1,000 to 3,000',
      '3,000 to 7,000',
      'More than 7,000',
      "I don't know",
    ],
  },
];
