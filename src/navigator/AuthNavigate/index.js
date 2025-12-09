import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ChangePassword,
  ForgotPassword,
  GoalDepanderQuestions,
  GoalYourself,
  GoalYourselfWeight,
  GoalsActivityLevel,
  Login,
  ProfileSetup,
  SetGoals,
  SetGoalsTarget,
  SetupGoals,
  Signup,
  Verification,
  WalkThrough,
  WeeklyGoal,
} from '../../containers';
import Welcome from '../../containers/Welcome';
import {useSelector} from 'react-redux';
import {SCREENS} from '../../constants';

const AuthNavigate = () => {
  const Stack = createStackNavigator();
  const {isFirst} = useSelector((state) => state.general);

  return (
    <Stack.Navigator>
      {isFirst && (
        <Stack.Screen
          name={SCREENS.AUTH.walkThrough}
          component={WalkThrough}
          options={{headerShown: false, width: '100%'}}
        />
      )}

      <Stack.Screen
        name={SCREENS.AUTH.login}
        component={Login}
        options={{
          headerShown: false,
          width: '100%',
        }}
      />

      <Stack.Screen
        name={SCREENS.AUTH.signup}
        component={Signup}
        options={{headerShown: false, width: '100%'}}
      />

      <Stack.Screen
        name={SCREENS.AUTH.forgotPassword}
        component={ForgotPassword}
        options={{headerShown: false, width: '100%'}}
      />

      <Stack.Screen
        name={SCREENS.AUTH.emailVerification}
        component={Verification}
        options={{headerShown: false, width: '100%'}}
      />

      <Stack.Screen
        name={SCREENS.AUTH.changePassword}
        component={ChangePassword}
        options={{headerShown: false, width: '100%'}}
      />

      <Stack.Screen
        name={SCREENS.AUTH.profileSetup}
        component={ProfileSetup}
        options={{headerShown: false, width: '100%'}}
      />

      <Stack.Screen
        name={SCREENS.AUTH.setupGoals}
        component={SetupGoals}
        options={{headerShown: false, width: '100%'}}
      />

      <Stack.Screen
        name={SCREENS.GOALS.setGoals}
        options={{headerShown: false, width: '100%'}}
        component={SetGoals}
      />
      <Stack.Screen
        name={SCREENS.GOALS.setGoalsTarget}
        options={{headerShown: false, width: '100%'}}
        component={SetGoalsTarget}
      />
      <Stack.Screen
        name={SCREENS.GOALS.goalDepanderQuestions}
        options={{headerShown: false, width: '100%'}}
        component={GoalDepanderQuestions}
      />
      <Stack.Screen
        name={SCREENS.GOALS.goalsActivityLevel}
        options={{headerShown: false, width: '100%'}}
        component={GoalsActivityLevel}
      />
      <Stack.Screen
        name={SCREENS.GOALS.goalYourself}
        options={{headerShown: false, width: '100%'}}
        component={GoalYourself}
      />
      <Stack.Screen
        name={SCREENS.GOALS.goalYourselfWeight}
        options={{headerShown: false, width: '100%'}}
        component={GoalYourselfWeight}
      />
      <Stack.Screen
        name={SCREENS.GOALS.weeklyGoal}
        options={{headerShown: false, width: '100%'}}
        component={WeeklyGoal}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigate;
