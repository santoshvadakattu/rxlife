import _ from 'lodash';

export function manipulateUserDataFromProfileSetup(userData) {
  let data = {};

  data['id'] = userData?.data.attributes?.user?.data.id ?? 0;
  data['username'] =
    userData?.data.attributes?.user?.data?.attributes?.username ?? '';
  data['notificationCount'] =
    userData?.data.attributes?.user?.data?.attributes?.notificationCount ?? 0;
  data['fullname'] = userData?.data.attributes?.fullname ?? '';
  data['chatUserId'] =
    userData?.data.attributes?.user?.data?.attributes?.chat_user_id ?? '';

  data['email'] =
    userData?.data.attributes?.user?.data?.attributes?.email ?? '';

  data['provider'] =
    userData?.data.attributes?.user?.data?.attributes?.provider ?? '';
  data['confirmed'] =
    userData?.data.attributes?.user?.data?.attributes?.confirmed ?? '';
  data['blocked'] =
    userData?.data.attributes?.user?.data?.attributes?.blocked ?? '';

  data['createdAt'] =
    userData?.data.attributes?.user?.data?.attributes?.createdAt ?? '';

  data['updatedAt'] =
    userData?.data.attributes?.user?.data?.attributes?.updatedAt ?? '';

  data['isProfileCreated'] =
    userData?.data.attributes?.user?.data?.attributes?.is_profile_created ?? '';

  return data;
}

export function manipulateUserProfileFromProfileSetup(userData) {
  let userProfile = {};

  userProfile['id'] = userData?.data?.id ?? '';
  userProfile['gender'] = userData?.data?.attributes?.gender ?? '';
  userProfile['birthday'] = userData?.data?.attributes?.birthday ?? '';
  userProfile['currentWeight'] =
    userData?.data?.attributes?.current_weight ?? '';
  userProfile['idealWeight'] = userData?.data?.attributes?.ideal_weight ?? '';
  userProfile['height'] = userData?.data?.attributes?.height_in_feet ?? '';
  userProfile['heightInch'] =
    userData?.data?.attributes?.height_in_inches ?? '';
  userProfile['neck'] = userData?.data?.attributes?.neck ?? '';
  userProfile['waist'] = userData?.data?.attributes?.waist ?? '';
  userProfile['hip'] = userData?.data?.attributes?.hip ?? '';
  userProfile['abdomen'] = userData?.data?.attributes?.abdomen ?? '';
  userProfile['arm'] = userData?.data?.attributes?.arm ?? '';
  userProfile['chest'] = userData?.data?.attributes?.chest ?? '';
  userProfile['calf'] = userData?.data?.attributes?.calf ?? '';
  userProfile['bodyFat'] = userData?.data?.attributes?.body_fat ?? '';
  userProfile['createdAt'] = userData?.data?.attributes?.createdAt ?? '';
  userProfile['updatedAt'] = userData?.data?.attributes?.updatedAt ?? '';
  userProfile['bmi'] = userData?.data?.attributes?.bmi ?? '';
  userProfile['age'] = userData?.data?.attributes?.age ?? '';
  userProfile['thigh'] = userData?.data?.attributes?.thigh ?? '';
  userProfile['fullname'] = userData?.data?.attributes?.fullname ?? '';
  userProfile['hasNutrition'] =
    userData?.data?.attributes?.hasNutrition ?? false;
  userProfile['image'] =
    userData?.data?.attributes?.image?.data?.attributes?.url ?? null;
  userProfile['imageId'] = userData?.data?.attributes?.image?.data?.id ?? null;
  userProfile['goalCalories'] = userData?.data?.attributes?.goalCalories ?? 0;

  return userProfile;
}
export function manipulateUserDataFromGetUser(userData) {
  console.log({userDatauserData: userData});
  let data = {};

  data['id'] = userData?.id ?? 0;
  data['username'] = userData?.username ?? '';
  data['notificationCount'] = userData?.notificationCount ?? 0;
  data['fullname'] = userData?.fullname ?? userData.username;
  data['email'] = userData?.email ?? '';
  data['confirmed'] = userData?.confirmed ?? '';
  data['provider'] = userData?.provider ?? '';
  data['loginProvider'] = userData?.login_provider ?? '';
  data['createdAt'] = userData?.createdAt ?? '';
  data['updatedAt'] = userData?.updatedAt ?? '';
  data['isProfileCreated'] = userData?.is_profile_created ?? '';
  data['chatUserId'] = userData?.chat_user_id ?? '';
  data['isAdmin'] = userData?.isAdmin ?? true;
  data['challenge_reminder'] = userData?.challenge_reminder ?? false;
  data['friend_invite'] = userData?.friend_invite ?? false;
  data['group_invite'] = userData?.group_invite ?? false;
  data['events'] = userData?.events ?? false;
  data['messages'] = userData?.messages ?? false;
  data['news_updates'] = userData?.news_updates ?? false;
  data['instensityGoal'] = userData?.instensity_goal ?? '';
  data['calorieGoal'] = userData?.calorie_goal ?? '';
  data['stepsGoal'] = userData?.steps_goal ?? '';

  return data;
}
export function manipulateUserProfileFromGetUser(userData) {
  let userProfile = {};

  userProfile['id'] = userData?.user_profile?.id ?? 0;
  userProfile['gender'] = userData?.user_profile?.gender ?? '';
  userProfile['birthday'] = userData?.user_profile?.birthday ?? '';
  userProfile['fullname'] = userData?.user_profile?.fullname
    ? userData?.user_profile?.fullname
    : userData.username ?? '';
  userProfile['currentWeight'] = userData?.user_profile?.current_weight ?? '';
  userProfile['idealWeight'] = userData?.user_profile?.ideal_weight ?? '';
  userProfile['height'] = userData?.user_profile?.height_in_feet ?? '';
  userProfile['heightInch'] = userData?.user_profile?.height_in_inches ?? '';
  userProfile['neck'] = userData?.user_profile?.neck ?? '';
  userProfile['waist'] = userData?.user_profile?.waist ?? '';
  userProfile['hip'] = userData?.user_profile?.hip ?? '';
  userProfile['abdomen'] = userData?.user_profile?.abdomen ?? '';
  userProfile['arm'] = userData?.user_profile?.arm ?? '';
  userProfile['chest'] = userData?.user_profile?.chest ?? '';
  userProfile['calf'] = userData?.user_profile?.calf ?? '';
  userProfile['bodyFat'] = userData?.user_profile?.body_fat ?? '';
  userProfile['createdAt'] = userData?.user_profile?.createdAt ?? '';
  userProfile['updatedAt'] = userData?.user_profile?.updatedAt ?? '';
  userProfile['bmi'] = userData?.user_profile?.bmi ?? '';
  userProfile['age'] = userData?.user_profile?.age ?? '';
  userProfile['thigh'] = userData?.user_profile?.thigh ?? '';
  userProfile['image'] = userData?.user_profile?.image?.url ?? null;
  userProfile['imageId'] = userData?.user_profile?.image?.id ?? null;
  userProfile['hasNutrition'] = userData?.user_profile?.hasNutrition ?? false;
  userProfile['goalCalories'] = userData?.user_profile?.goalCalories ?? false;
  return userProfile;
}

export function getAllUsersManipulator(list, alreadyInList) {
  try {
    if (_.isEmpty(list)) return alreadyInList;

    const result = [];

    for (let user of list) {
      const findUserInAlreadyList = alreadyInList?.findIndex(
        (u) => u?.id == user?.id,
      );

      if (findUserInAlreadyList > -1) {
        continue;
      }

      let data = {};

      data['id'] = user?.id ?? 0;
      data['username'] = user?.username ?? '';
      data['fullName'] = user?.fullname ?? user.username;
      data['email'] = user?.email ?? '';
      data['imageUrl'] = user?.image?.url ?? '';
      data['confirmed'] = user?.confirmed ?? '';
      data['provider'] = user?.provider ?? '';
      data['createdAt'] = user?.createdAt ?? '';
      data['updatedAt'] = user?.updatedAt ?? '';
      data['isProfileCreated'] = user?.is_profile_created ?? '';
      data['chatUserId'] = user?.chat_user_id ?? '';
      data['isAdmin'] = user?.isAdmin ?? true;
      data['notificationCount'] = user?.notificationCount ?? 0;

      result.push(data);
    }

    return [...alreadyInList, ...result];
  } catch (error) {
    console.error('getAllUsersManipulator error ==>>>', error);
    return alreadyInList;
  }
}

export function quoteManipulator(list) {
  try {
    if (_.isEmpty(list)) return [];

    const result = [];

    for (let quote of list) {
      const attributes = quote?.attributes;
      const payload = {
        id: quote?.id ?? '',
        quote: attributes?.quote ?? '',
        quotedBy: attributes?.quotedBy ?? '',
        image: attributes?.image?.data?.attributes?.url ?? '',
      };

      result.push(payload);
    }

    return result;
  } catch (error) {
    console.error('quoteManipulator error ==>>>', error);
    return [];
  }
}
