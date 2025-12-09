import util from '../util';

export function manipulateUserDataFromSearchUser(userArray, userId) {
  const tempArr = userArray.map((item) => {
    const isRequestSent =
      !util.isArrayEmpty(item.requests) &&
      item?.requests?.some((it) => it.id == userId);

    let data = {};
    data['id'] = item?.id ?? 0;
    data['fullname'] = item?.fullname ?? item.username;
    data['email'] = item?.email ?? '';
    data['confirmed'] = item?.confirmed ?? '';
    data['provider'] = item?.provider ?? '';
    data['createdAt'] = item?.createdAt ?? '';
    data['updatedAt'] = item?.updatedAt ?? '';
    data['isProfileCreated'] = item?.is_profile_created ?? '';
    data['requests'] = item?.requests ?? [];
    data['isRequestSent'] = isRequestSent ?? false;
    data['image'] = item?.user_profile?.image?.url ?? null;
    return data;
  });

  return tempArr;
}
export function manipulateUserDataFromRequestUser(userArray) {
  const tempArr = userArray.map((item) => {
    let data = {};
    data['id'] = item?.id ?? 0;
    data['fullname'] = item?.fullname ?? item.username;
    data['email'] = item?.email ?? '';
    data['confirmed'] = item?.confirmed ?? '';
    data['provider'] = item?.provider ?? '';
    data['createdAt'] = item?.createdAt ?? '';
    data['updatedAt'] = item?.updatedAt ?? '';
    data['requestTime'] = item?.request_time ?? '';
    data['isProfileCreated'] = item?.is_profile_created ?? '';
    data['requests'] = item?.requests ?? item?.updatedAt;
    data['image'] = item?.user_profile?.image?.url ?? null;
    data['chatUserId'] = item?.chat_user_id ?? null;
    return data;
  });

  return tempArr;
}

export function manipulateUserDataFromViewProfileUser(userData, userId) {
  let data = {};

  const isRequestSent =
    !util.isArrayEmpty(userData.requests) &&
    userData?.requests?.some((it) => it.id == userId);
  data['id'] = userData?.id ?? 0;
  data['username'] = userData?.username ?? '';
  data['fullname'] = userData?.fullname ?? userData.username;
  data['email'] = userData?.email ?? '';
  data['chatUserId'] = userData?.chat_user_id ?? '';
  data['confirmed'] = userData?.confirmed ?? '';
  data['provider'] = userData?.provider ?? '';
  data['createdAt'] = userData?.createdAt ?? '';
  data['updatedAt'] = userData?.updatedAt ?? '';
  data['isProfileCreated'] = userData?.is_profile_created ?? '';
  data['requests'] = userData?.requests ?? '';
  data['friend'] = userData?.friend ?? false;
  data['request'] = userData?.request ?? false;
  data['isRequestSent'] = isRequestSent ?? false;
  data['image'] = userData?.user_profile?.image?.url ?? null;

  return data;
}
