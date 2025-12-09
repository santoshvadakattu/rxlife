import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import Home from '../../containers/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors, Fonts, Images, Metrics} from '../../theme';
import {
  SCREENS,
  challengeWithoutTabBar,
  homeWithoutTabbar,
  myChallengeWithoutTabBar,
  nutritionTabbbar,
  programsWithoutTabBar,
} from '../../constants';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {View, Image, StyleSheet} from 'react-native';
import {
  DrawerContent,
  FriendRequestItem,
  NutritionGraph,
  Text,
} from '../../components';
import {createDrawerNavigator} from '@react-navigation/drawer';
import util from '../../util';
import {
  ActivityAllChart,
  ActivityWeeklyPoint,
  AddPaymentMethod,
  ChallengeDetail,
  ChallengeSearch,
  Challenges,
  Checkout,
  DisplayVideo,
  MyChallenges,
  Contactus,
  IndividualActivity,
  LeaderboardListing,
  Notification,
  PrivacyPolicy,
  ProgressTracker,
  StatisticsChart,
  TermsConditions,
  WatchConnect,
  WeeklyActivityListing,
  Settings,
  Transactions,
  FriendRequest,
  Friends,
  FriendProfile,
  ProfileSetup,
  Profile,
  UpdatePassword,
  NotificationSettings,
  EditProfile,
  SetupUserGoals,
  IndividualActivityGarmin,
  ActivityAllChartGarmin,
  ChatList,
  ChatSearchList,
  Chat,
  ChatMedia,
  SelectParticipants,
  CreateGroup,
  GroupInfo,
  EditGroup,
  AddParticipants,
  ForwardChat,
  VideoScreen,
  SetTarget,
  Nutrition,
  AddNatrition,
  FoodDetails,
  NewRecipe,
  AddFood,
  NutritionGraphScreen,
  NutritentIndividual,
  WeeklyNutritionSettings,
  NutritionExercise,
  Cardiovascular,
  CreateExercise,
  AddWater,
  NutritionSettings,
  AddReminders,
  Units,
  CustomizeMealName,
  EditGoals,
  CalorieMacroGoals,
  AddNoteList,
  AddNote,
  StartGoals,
  QuickAddMeal,
  AddIngredient,
  AddDirections,
  AddNewIngredient,
  DiscoverRecipes,
  DiscoverRecipesDetails,
  AddWeight,
  SetGoals,
  GetGoalsTarget,
  SetGoalsTarget,
  GoalDepanderQuestions,
  GoalsActivityLevel,
  GoalYourself,
  GoalYourselfWeight,
  WeeklyGoal,
  Programs,
  PaymentMethod,
  ProgramDays,
  RecipeDetails,
  MyFoodList,
  MealDetails,
  NewRecipeSecond,
} from '../../containers';
import AddFriends from '../../containers/AddFriends';
import {useDispatch, useSelector} from 'react-redux';
import SocketIO from '../../services/SocketIO';
import {
  getAllRoomsSuccess,
  removeParticipantSuccess,
} from '../../redux/slicers/chat';
import {
  getAllRoomsManipulator,
  singleMessageManipulator,
} from '../../Helper/chatManipulator';
import CreateMeal from '../../containers/CreateMeal';
import CreateFood from '../../containers/CreateFood';
import AddFoodList from '../../containers/AddNoteList';
import CreateFoodSecond from '../../containers/CreateFoodSecond';
import WeightTracker from '../../containers/WeightTracker';
import ProgramsDetails from '../../containers/Program/ProgramDetails';

const Stack = createStackNavigator();

const BottomTabComp = () => {
  const Stack = createStackNavigator();
  const BottomTab = createBottomTabNavigator();
  const {userProfile} = useSelector((state) => state?.user);
  const {hasNutrition} = userProfile;

  return (
    <>
      <BottomTab.Navigator
        initialRouteName={'homeBottom'}
        key={2}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.white,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: util.isPlatformAndroid() ? 90 : 100,
            backgroundColor: Colors.white,
          },
        }}>
        <BottomTab.Screen
          name="homeBottom"
          options={({route}) => ({
            headerShown: false,
            tabBarStyle: [
              {
                display: homeWithoutTabbar?.includes(
                  getFocusedRouteNameFromRoute(route),
                )
                  ? 'none'
                  : 'flex',
              },
              styles.tabBarStyles,
            ],
            tabBarIcon: ({focused}) => (
              <View style={styles.tabBarIcon}>
                <Image
                  source={Images.HomeActive}
                  style={[
                    {height: 24, width: 24},
                    focused
                      ? {tintColor: Colors.text.theme}
                      : {tintColor: '#36405B'},
                  ]}
                />
              </View>
            ),
          })}>
          {() => (
            <Stack.Navigator initialRouteName="home">
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.home}
                component={Home}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name="leaderboardListing"
                component={LeaderboardListing}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name="weeklyActivityListing"
                component={WeeklyActivityListing}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name="individualActivity"
                component={IndividualActivity}
              />

              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name="individualActivityGarmin"
                component={IndividualActivityGarmin}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name="activityAllChart"
                component={ActivityAllChart}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name="activityAllChartGarmin"
                component={ActivityAllChartGarmin}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name="activityWeeklyPoint"
                component={ActivityWeeklyPoint}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name="watchConnect"
                component={WatchConnect}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name="notification"
                component={Notification}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.friendProfile}
                component={FriendProfile}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.chatList}
                component={ChatList}
              />

              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.chatSearchList}
                component={ChatSearchList}
              />

              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.chat}
                component={Chat}
              />

              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.chatMedia}
                component={ChatMedia}
              />

              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.selectParticipants}
                component={SelectParticipants}
              />

              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.createGroup}
                component={CreateGroup}
              />

              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.groupInfo}
                component={GroupInfo}
              />

              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.editGroup}
                component={EditGroup}
              />

              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.addParticipants}
                component={AddParticipants}
              />

              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.profile}
                component={Profile}
              />

              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.editProfile}
                component={EditProfile}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.setupUserGoals}
                component={SetupUserGoals}
              />

              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.challengeDetail}
                component={ChallengeDetail}
              />

              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.checkout}
                component={Checkout}
              />

              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.paymentMethod}
                component={AddPaymentMethod}
              />

              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.forwardChat}
                component={ForwardChat}
              />

              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.videoScreen}
                component={VideoScreen}
              />

              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.setTarget}
                component={SetTarget}
              />
            </Stack.Navigator>
          )}
        </BottomTab.Screen>

        <BottomTab.Screen
          name="natrition"
          options={({route}) => {
            return {
              headerShown: false,
              tabBarStyle: [
                {
                  display: nutritionTabbbar?.includes(
                    getFocusedRouteNameFromRoute(route),
                  )
                    ? 'none'
                    : 'flex',
                },
                styles.tabBarStyles,
              ],
              tabBarIcon: ({focused}) => (
                <View style={styles.tabBarIcon}>
                  <Image
                    source={Images.NutritionIcon}
                    style={[
                      focused
                        ? {tintColor: Colors.text.theme}
                        : {tintColor: '#36405B'},
                    ]}
                  />
                </View>
              ),
            };
          }}>
          {() => (
            <Stack.Navigator>
              {!hasNutrition && (
                <Stack.Screen
                  options={() => ({
                    headerShown: false,
                  })}
                  name={SCREENS.NUTRITION.startGoals}
                  component={StartGoals}
                />
              )}

              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.nutrition}
                component={Nutrition}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.quickAddMeal}
                component={QuickAddMeal}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name="watchConnect"
                component={WatchConnect}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.addNatrition}
                component={AddNatrition}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.addIngredient}
                component={AddIngredient}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.foodDetails}
                component={FoodDetails}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.createMeal}
                component={CreateMeal}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.newRecipe}
                component={NewRecipe}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.newRecipeSecond}
                component={NewRecipeSecond}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.createFood}
                component={CreateFood}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.addNoteList}
                component={AddNoteList}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.addNote}
                component={AddNote}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.nutritionGraphScreen}
                component={NutritionGraphScreen}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.nutritentIndividual}
                component={NutritentIndividual}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.weeklyNutritionSettings}
                component={WeeklyNutritionSettings}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.nutritionExercise}
                component={NutritionExercise}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.cardiovascular}
                component={Cardiovascular}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.createExercise}
                component={CreateExercise}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.addWater}
                component={AddWater}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.nutritionSettings}
                component={NutritionSettings}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.addReminders}
                component={AddReminders}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.units}
                component={Units}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.customizeMealName}
                component={CustomizeMealName}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.editGoals}
                component={EditGoals}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.calorieMacroGoals}
                component={CalorieMacroGoals}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.addDirections}
                component={AddDirections}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.addNewIngredient}
                component={AddNewIngredient}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.createFoodSecond}
                component={CreateFoodSecond}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.discoverRecipes}
                component={DiscoverRecipes}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.discoverRecipesDetails}
                component={DiscoverRecipesDetails}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.recipeDetails}
                component={RecipeDetails}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.GOALS.setGoals}
                component={SetGoalsNavigator}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.myFoodList}
                component={AddNatrition}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.NUTRITION.mealDetails}
                component={MealDetails}
              />
            </Stack.Navigator>
          )}
        </BottomTab.Screen>

        <BottomTab.Screen
          name="challengesBottom"
          options={({route}) => {
            return {
              headerShown: false,
              tabBarStyle: [
                {
                  display: challengeWithoutTabBar?.includes(
                    getFocusedRouteNameFromRoute(route),
                  )
                    ? 'none'
                    : 'flex',
                },
                styles.tabBarStyles,
              ],
              tabBarIcon: ({focused}) => (
                <View style={[styles.tabBarIcon]}>
                  <Image
                    source={Images.ChallengesIcon}
                    style={[
                      focused
                        ? {tintColor: Colors.text.theme}
                        : {tintColor: '#36405B'},
                    ]}
                  />
                </View>
              ),
            };
          }}>
          {() => (
            <Stack.Navigator initialRouteName={SCREENS.HOME.myChallenges}>
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.challenges}
                component={Challenges}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.challengesSearch}
                component={ChallengeSearch}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.checkout}
                component={Checkout}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.challengeDetail}
                component={ChallengeDetail}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.paymentMethod}
                component={AddPaymentMethod}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.challengeVideo}
                component={DisplayVideo}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name="notification"
                component={Notification}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.friendProfile}
                component={FriendProfile}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.chatList}
                component={ChatList}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.chatSearchList}
                component={ChatSearchList}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.chat}
                component={Chat}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.chatMedia}
                component={ChatMedia}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.selectParticipants}
                component={SelectParticipants}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.createGroup}
                component={CreateGroup}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.groupInfo}
                component={GroupInfo}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.editGroup}
                component={EditGroup}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.addParticipants}
                component={AddParticipants}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.forwardChat}
                component={ForwardChat}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.videoScreen}
                component={VideoScreen}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.myChallenges}
                component={MyChallenges}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.myChallengeDetail}
                component={ChallengeDetail}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.myChallengeVideo}
                component={DisplayVideo}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name="leaderboardListing"
                component={LeaderboardListing}
              />
            </Stack.Navigator>
          )}
        </BottomTab.Screen>

        <BottomTab.Screen
          name="programs"
          options={({route}) => {
            return {
              headerShown: false,
              tabBarStyle: [
                {
                  display: programsWithoutTabBar?.includes(
                    getFocusedRouteNameFromRoute(route),
                  )
                    ? 'none'
                    : 'flex',
                },
                styles.tabBarStyles,
              ],
              tabBarIcon: ({focused}) => (
                <View style={[styles.tabBarIcon]}>
                  <Image
                    source={Images.ProgramIcon}
                    style={[
                      focused
                        ? {tintColor: Colors.text.theme}
                        : {tintColor: '#36405B'},
                    ]}
                  />
                </View>
              ),
            };
          }}>
          {() => (
            <Stack.Navigator initialRouteName={SCREENS.HOME.challenges}>
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.PROGRAMS.programs}
                component={Programs}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.PROGRAMS.programsDetails}
                component={ProgramsDetails}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.PROGRAMS.paymentMethod}
                component={PaymentMethod}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.PROGRAMS.addPaymentMethod}
                component={AddPaymentMethod}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.PROGRAMS.programDays}
                component={ProgramDays}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.videoScreen}
                component={VideoScreen}
              />
            </Stack.Navigator>
          )}
        </BottomTab.Screen>

        <BottomTab.Screen
          name="trackerBottom"
          options={({route}) => ({
            headerShown: false,
            tabBarStyle: [
              {
                display: homeWithoutTabbar?.includes(
                  getFocusedRouteNameFromRoute(route),
                )
                  ? 'none'
                  : 'flex',
              },
              styles.tabBarStyles,
            ],
            tabBarIcon: ({focused}) => (
              <View style={styles.tabBarIcon}>
                <Image
                  source={Images.TrackerActive}
                  style={[
                    {height: 24, width: 24},
                    focused
                      ? {tintColor: Colors.text.theme}
                      : {tintColor: '#36405B'},
                  ]}
                />
              </View>
            ),
          })}>
          {() => (
            <Stack.Navigator initialRouteName="home">
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.PROGRESS.progressTracker}
                component={ProgressTracker}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.notification}
                component={Notification}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.PROGRESS.statisticsChart}
                component={StatisticsChart}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.friendProfile}
                component={FriendProfile}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.chatList}
                component={ChatList}
              />

              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.chatSearchList}
                component={ChatSearchList}
              />

              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.chat}
                component={Chat}
              />

              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.chatMedia}
                component={ChatMedia}
              />

              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.selectParticipants}
                component={SelectParticipants}
              />

              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.createGroup}
                component={CreateGroup}
              />

              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.groupInfo}
                component={GroupInfo}
              />

              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.editGroup}
                component={EditGroup}
              />

              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.addParticipants}
                component={AddParticipants}
              />

              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.checkout}
                component={Checkout}
              />

              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.paymentMethod}
                component={AddPaymentMethod}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.forwardChat}
                component={ForwardChat}
              />
              <Stack.Screen
                options={() => ({
                  headerShown: false,
                })}
                name={SCREENS.HOME.videoScreen}
                component={VideoScreen}
              />
            </Stack.Navigator>
          )}
        </BottomTab.Screen>
      </BottomTab.Navigator>
    </>
  );
};

const FriendRequestNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={SCREENS.HOME.friendRequest}
        component={FriendRequest}
      />
      <Stack.Screen
        name={SCREENS.HOME.friendProfile}
        component={FriendProfile}
      />
      <Stack.Screen name={SCREENS.HOME.addFriends} component={AddFriends} />

      <Stack.Screen
        options={() => ({
          headerShown: false,
        })}
        name={SCREENS.HOME.chat}
        component={Chat}
      />

      <Stack.Screen
        options={() => ({
          headerShown: false,
        })}
        name={SCREENS.HOME.chatMedia}
        component={ChatMedia}
      />
    </Stack.Navigator>
  );
};

const FriendsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.HOME.friends} component={Friends} />
      <Stack.Screen
        name={SCREENS.HOME.friendProfile}
        component={FriendProfile}
      />
      <Stack.Screen name={SCREENS.HOME.addFriends} component={AddFriends} />

      <Stack.Screen
        options={() => ({
          headerShown: false,
        })}
        name={SCREENS.HOME.chat}
        component={Chat}
      />

      <Stack.Screen
        options={() => ({
          headerShown: false,
        })}
        name={SCREENS.HOME.chatMedia}
        component={ChatMedia}
      />
    </Stack.Navigator>
  );
};

const TransactionNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.HOME.transaction} component={Transactions} />
      <Stack.Screen
        name={SCREENS.HOME.paymentMethodSetting}
        component={AddPaymentMethod}
      />
    </Stack.Navigator>
  );
};

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.HOME.profile} component={Profile} />
      <Stack.Screen name={SCREENS.HOME.editProfile} component={EditProfile} />
      <Stack.Screen
        name={SCREENS.HOME.setupUserGoals}
        component={SetupUserGoals}
      />
    </Stack.Navigator>
  );
};

const SetGoalsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={SCREENS.GOALS.setGoalsTarget}
        component={SetGoalsTarget}
      />
      <Stack.Screen
        name={SCREENS.GOALS.goalDepanderQuestions}
        component={GoalDepanderQuestions}
      />
      <Stack.Screen
        name={SCREENS.GOALS.goalsActivityLevel}
        component={GoalsActivityLevel}
      />
      <Stack.Screen
        name={SCREENS.GOALS.goalYourself}
        component={GoalYourself}
      />
      <Stack.Screen
        name={SCREENS.GOALS.goalYourselfWeight}
        component={GoalYourselfWeight}
      />
      <Stack.Screen name={SCREENS.GOALS.weeklyGoal} component={WeeklyGoal} />
    </Stack.Navigator>
  );
};

const WeightTrackerNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={SCREENS.HOME.weightTracker}
        component={WeightTracker}
      />
      <Stack.Screen name={SCREENS.HOME.addWeight} component={AddWeight} />
    </Stack.Navigator>
  );
};

const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.HOME.settings} component={Settings} />
      <Stack.Screen
        name={SCREENS.HOME.updatePassword}
        component={UpdatePassword}
      />
      <Stack.Screen
        name={SCREENS.HOME.notificationSettings}
        component={NotificationSettings}
      />
    </Stack.Navigator>
  );
};

const HomeNavigate = () => {
  const Drawer = createDrawerNavigator();
  const dispatch = useDispatch();
  const {userData} = useSelector((state) => state?.user);
  const myUserId = userData?.chatUserId;

  useEffect(() => {
    // connecting socket
    if (myUserId)
      SocketIO.connect(
        () => {
          console.log('Socket connected Successfully');
          joinOwnSocketRoom(); // join own room to recieve your messages
        },
        undefined,
        myUserId,
      );

    return () => {
      SocketIO?.disconnect();
    };
  }, [myUserId]);

  /**
   *
   * Join socket room with your user Id to listen your messages
   */
  const joinOwnSocketRoom = () => {
    SocketIO.joinRoom(
      `${myUserId}`,
      (res) => {
        if (res.status) {
          // after joining room listen for new messages and Reactions
          // handleMessageRecieved();
          handleReceiveHighlight();
          handleLatestChatListRecieve();
          handleOnParticipantRemove();
          handleOnGroupLeave();
        } else {
          joinOwnSocketRoom();
          toastAlert('Trying to Connect Server', ALERT_TYPES.error);
        }
      },
      {userId: myUserId, token: ''},
    );
  };

  // Recieve highlight event like someone joined group etc
  const handleReceiveHighlight = () => {
    SocketIO.onHighlightRecieved((res) => {
      console.log('onHighlightRecieved --->>>>', res);
      dispatch(addReceiveMessageToRoom(singleMessageManipulator(res)));
    });
  };

  const handleLatestChatListRecieve = () => {
    SocketIO.latestChatUpdate((res) => {
      console.log('latestChatUpdate --->>', JSON.stringify(res));
      dispatch(getAllRoomsSuccess({rooms: getAllRoomsManipulator(res)}));
    });
  };

  const handleOnParticipantRemove = () => {
    SocketIO.onParticipantRemoved((res) => {
      console.log('onParticipantRemoved --->>', res);
      dispatch(removeParticipantSuccess(res));
      // dispatch(getAllRoomsSuccess(getAllRoomsManipulator(res)));
    });
  };

  const handleOnGroupLeave = () => {
    SocketIO.onGroupLeave((res) => {
      console.log('onGroupLeave --->>', res);
      dispatch(removeParticipantSuccess(res));
      // dispatch(getAllRoomsSuccess(getAllRoomsManipulator(res)));
    });
  };

  return (
    <Drawer.Navigator
      detachInactiveScreens={true}
      screenOptions={{
        headerShown: false,
        swipeEnabled: true,
        drawerStyle: {
          width: Metrics.screenWidth,
        },
      }}
      drawerContent={DrawerContent}>
      <Drawer.Screen name={SCREENS.HOME.drawer} component={BottomTabComp} />
      <Drawer.Screen
        name={SCREENS.HOME.weightTracker}
        component={WeightTrackerNavigator}
      />
      <Drawer.Screen name={SCREENS.HOME.profile} component={ProfileNavigator} />
      <Drawer.Screen
        name={SCREENS.HOME.friendRequest}
        component={FriendRequestNavigator}
      />
      <Drawer.Screen name={SCREENS.HOME.friends} component={FriendsNavigator} />
      <Drawer.Screen name={SCREENS.HOME.contactus} component={Contactus} />
      <Drawer.Screen
        name={SCREENS.HOME.settings}
        component={SettingsNavigator}
      />
      <Drawer.Screen
        name={SCREENS.HOME.transaction}
        component={TransactionNavigator}
      />
      <Drawer.Screen
        name={SCREENS.HOME.privacyPolicy}
        component={PrivacyPolicy}
      />
      <Drawer.Screen
        name={SCREENS.HOME.termsConditions}
        component={TermsConditions}
      />
    </Drawer.Navigator>
  );
};

export default HomeNavigate;

const styles = StyleSheet.create({
  tabBarStyles: {
    height: util.isPlatformAndroid() ? 70 : 100,
    // justifyContent: 'flex-end',
    backgroundColor: Colors.white,
  },

  tabBarIcon: {
    // width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
});
