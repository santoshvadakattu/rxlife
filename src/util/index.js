// @flow
import {Platform, Linking} from 'react-native';
import moment from 'moment';
import _ from 'lodash';
import {MessageBarManager} from 'react-native-message-bar';
import {MESSAGE_TYPES, DISCARD_WARNING} from '../constants';
import {isEmpty, cloneDeep, findIndex, unionBy, isEqual, isNull} from 'lodash';
import DataHandler from '../services/DataHandler';
import {challengeLogoutUser} from '../redux/slicers/challenge';
import {paymentLogoutUser} from '../redux/slicers/payment';
import {logoutUserRequest} from '../redux/slicers/user';
import {friendsLogoutUser} from '../redux/slicers/friends';
import {AES, enc} from 'crypto-js';
import {deleteDeviceToken} from '../firebase/firebaseHelper';
import {emptyChatOnLogout} from '../redux/slicers/chat';
import {it} from 'rn-emoji-keyboard';

class Util {
  keyExtractor = (item: Object, index: number) => index.toString();
  isPlatformAndroid() {
    return Platform.OS === 'android';
  }
  isValidURL(url: 'string') {
    const re =
      /^(http|https|fttp):\/\/|[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/;
    return re.test(url);
  }
  isEmailValid(email: string) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  getAge(date) {
    var now = new Date();
    var current_year = now.getFullYear();
    var year_diff = current_year - date.getFullYear();
    var birthday_this_year = new Date(
      current_year,
      date.getMonth(),
      date.getDate(),
    );
    var has_had_birthday_this_year = now >= birthday_this_year;

    return has_had_birthday_this_year ? year_diff : year_diff - 1;
  }
  isArrayEmpty = (mArr) => {
    return isEmpty(mArr);
  };

  checkIsNull(text) {
    if (isNull(text)) {
      return true;
    }
    return false;
  }
  isPasswordValid(password: string) {
    return password.length >= 8;
  }
  strongePassword = (password) => {
    const re = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,25}$/;
    const temp = re.test(password);
    return temp;
  };
  areValuesEqual = (objA, objB) => isEqual?.(objA, objB);
  unionBy = (mArrOne, mArrTwo) => unionBy(mArrOne, mArrTwo, 'id');
  cloneDeepArray = (mArr) => cloneDeep(mArr);
  unionById = (mArrOne, mArrTwo) => {
    let mArrOneClone = this.cloneDeepArray(mArrOne);
    let mArrTwoClone = this.cloneDeepArray(mArrTwo);

    if (this.isArrayEmpty(mArrOneClone) || this.isArrayEmpty(mArrTwoClone)) {
      if (!this.isArrayEmpty(mArrOneClone)) return mArrOneClone;
      else return mArrTwoClone;
    }

    mArrOneClone = unionBy(mArrOne, mArrTwo, 'id');
    for (let i = 0; i < mArrTwo.length; i++) {
      const mIndex = this.findIndexById(mArrOneClone, mArrTwo[i].id);
      mArrOneClone[mIndex] = mArrTwo[i];
    }
    return mArrOneClone;
  };
  isValidName(name) {
    return /^[a-zA-Z '.-]*$/.test(name);
  }
  isEmptyValueWithoutTrim = (value = '') => isEmpty(String(value));
  isEmptyValue = (value = ' ') => isEmpty(String(value?.trim?.() ?? value));
  isEmptyObj = (obj) => Object.keys(obj)?.length === 0;

  isValidUserName(username) {
    var regexp = /^\S*$/;
    return regexp.test(username);
  }
  cloneDeep = (toClone) => cloneDeep(toClone);
  findIndexById = (mArr, id) => findIndex(mArr, (item) => item.id == id);

  topAlert(message, alertType = 'success') {
    MessageBarManager.showAlert({
      message,
      alertType,
      viewTopInset: 35,
    });
  }

  characterLimit(text, beforeDecimalLimit, afterDecimalLimit) {
    if (text == '0') {
      return false;
    }
    const digitsBeforeDecimal = `{0,${beforeDecimalLimit}}`;
    const digitsAfterDecimal = `{0,${afterDecimalLimit}}`;
    const regexString = `^\\d${digitsBeforeDecimal}(\\.\\d${digitsAfterDecimal})?$`;
    const regex = new RegExp(regexString);
    return regex.test(text);
  }
  obfuscateEmail(email) {
    const [username, domain] = email.split('@');
    const usernameLength = username.length;

    if (usernameLength < 3) {
      return email; // If the username is too short, return the original email
    }

    const obfuscatedUsername =
      username[0] +
      '*'.repeat(usernameLength - 2) +
      username[usernameLength - 1];
    const obfuscatedEmail = `${obfuscatedUsername}@${domain}`;
    return obfuscatedEmail;
  }
  topAlertError(message, alertType = MESSAGE_TYPES.ERROR) {
    MessageBarManager.showAlert({
      message,
      alertType,
      viewTopInset: 35,
    });
  }

  getCurrentMonthWeeks() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const weeks = [];
    let firstDate = new Date(currentYear, currentMonth, 1);

    // If the 1st is not a Sunday, move to the last Sunday of the previous month
    if (firstDate.getDay() !== 0) {
      firstDate.setMonth(currentMonth, 0); // Set to the last day of the previous month
      const daysUntilSunday = firstDate.getDay();
      firstDate.setDate(firstDate.getDate() - daysUntilSunday); // Move to the last Sunday
    }

    const lastDate = new Date(currentYear, currentMonth + 1, 0);

    let weekNumber = 1;

    while (firstDate <= lastDate) {
      const weekStartDate = new Date(firstDate);
      const weekEndDate = new Date(firstDate);
      weekEndDate.setDate(weekEndDate.getDate() + 6);

      const weekTitle = `Week ${weekNumber}`;
      const weekDescription = `${
        monthNames[weekStartDate.getMonth()]
      } ${weekStartDate.getDate()} to ${
        monthNames[weekEndDate.getMonth()]
      } ${weekEndDate.getDate()} - ${currentYear}`;

      weeks.push({
        title: weekTitle,
        des: weekDescription,
        startDate: new Date(weekStartDate),
        endDate: new Date(weekEndDate),
      });

      firstDate.setDate(firstDate.getDate() + 7);
      weekNumber++;
    }

    return weeks;
  }

  describeDate(inputDate) {
    const today = new Date();
    const tomorrow = new Date();
    const yesterday = new Date();

    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);

    tomorrow.setDate(today.getDate() + 1);
    yesterday.setDate(today.getDate() - 1);

    const date = new Date(inputDate);
    date.setHours(0, 0, 0, 0);

    if (date.getTime() === today.getTime()) {
      return 'Today';
    } else if (date.getTime() === tomorrow.getTime()) {
      return 'Tomorrow';
    } else if (date.getTime() === yesterday.getTime()) {
      return 'Yesterday';
    } else {
      return moment(date).format('dddd, MMMM D, YYYY');
    }
  }

  // getCurrentMonthWeeks() {
  //   const currentDate = new Date();
  //   const currentYear = currentDate.getFullYear();
  //   const currentMonth = currentDate.getMonth();
  //   const monthNames = [
  //     'Jan',
  //     'Feb',
  //     'Mar',
  //     'Apr',
  //     'May',
  //     'Jun',
  //     'Jul',
  //     'Aug',
  //     'Sep',
  //     'Oct',
  //     'Nov',
  //     'Dec',
  //   ];
  //   const weeks = [];
  //   let firstDate = new Date(currentYear, currentMonth, 1);

  //   // Adjust firstDate to the first Sunday or the last Sunday of the previous month
  //   const dayOfWeek = firstDate.getDay(); // 0 (Sunday) to 6 (Saturday)
  //   const daysToAdd = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  //   firstDate.setDate(firstDate.getDate() - daysToAdd);

  //   const lastDate = new Date(currentYear, currentMonth + 1, 0);

  //   let weekNumber = 1;

  //   while (firstDate <= lastDate) {
  //     const weekStartDate = new Date(firstDate);
  //     const weekEndDate = new Date(firstDate);
  //     weekEndDate.setDate(weekEndDate.getDate() + 6);

  //     const weekTitle = `Week ${weekNumber}`;
  //     const weekDescription = `${
  //       monthNames[weekStartDate.getMonth()]
  //     } ${weekStartDate.getDate()} to ${
  //       monthNames[weekEndDate.getMonth()]
  //     } ${weekEndDate.getDate()} - ${currentYear}`;

  //     weeks.push({
  //       title: weekTitle,
  //       des: weekDescription,
  //       startDate: new Date(weekStartDate),
  //       endDate: new Date(weekEndDate),
  //     });

  //     firstDate.setDate(firstDate.getDate() + 7);
  //     weekNumber++;
  //   }

  //   return weeks;
  // }
  // getCurrentMonthWeeks() {
  //   const currentDate = new Date();
  //   const currentYear = currentDate.getFullYear();
  //   const currentMonth = currentDate.getMonth();
  //   const monthNames = [
  //     'Jan',
  //     'Feb',
  //     'Mar',
  //     'Apr',
  //     'May',
  //     'Jun',
  //     'Jul',
  //     'Aug',
  //     'Sep',
  //     'Oct',
  //     'Nov',
  //     'Dec',
  //   ];
  //   const weeks = [];
  //   let firstDate = new Date(currentYear, currentMonth, 1);
  //   const lastDate = new Date(currentYear, currentMonth + 1, 0);

  //   let weekNumber = 1;

  //   while (firstDate <= lastDate) {
  //     const weekStartDate = new Date(firstDate);
  //     const weekEndDate = new Date(firstDate);
  //     weekEndDate.setDate(weekEndDate.getDate() + 6);

  //     const weekTitle = `Week ${weekNumber}`;
  //     let weekDescription;
  //     if (weekStartDate.getMonth() === weekEndDate.getMonth()) {
  //       weekDescription = `${
  //         monthNames[weekStartDate.getMonth()]
  //       } ${weekStartDate.getDate()} to ${
  //         monthNames[weekEndDate.getMonth()]
  //       } ${weekEndDate.getDate()} - ${currentYear}`;
  //     } else {
  //       weekDescription = `${
  //         monthNames[weekStartDate.getMonth()]
  //       } ${weekStartDate.getDate()} to ${
  //         monthNames[weekEndDate.getMonth()]
  //       } ${weekEndDate.getDate()} - ${currentYear}`;
  //     }

  //     weeks.push({
  //       title: weekTitle,
  //       des: weekDescription,
  //       startDate: new Date(weekStartDate),
  //       endDate: new Date(weekEndDate),
  //     });

  //     firstDate.setDate(firstDate.getDate() + 7);
  //     weekNumber++;
  //   }

  //   return weeks;
  // }

  getHoursBetween(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const hoursDifference = (end - start) / (1000 * 60 * 60);
    return hoursDifference;
  }

  fillMissingDaysWithDataSleep(data, startDate, endDate) {
    for (
      var arr = [], dt = new Date(startDate);
      dt <= new Date(endDate);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    let tempArr = [];
    arr.map((item) => {
      let hasThisDate = data.filter(
        (it) =>
          new Date(it.startDate).toDateString() ==
          new Date(item).toDateString(),
      );

      if (isEmpty(hasThisDate)) {
        const obj = {
          startDate: startDate,
          endDate: endDate,
          sourceName: 'Health',
          value: 0,
          sourceId: 'com.apple.Health',
          hoursDifference: 0,
        };
        tempArr.push(obj);
      } else {
        tempArr.push(hasThisDate[0]);
      }
    });
    return tempArr;
  }

  fillMissingDaysWithData(data, startDate, endDate) {
    for (
      var arr = [], dt = new Date(startDate);
      dt <= new Date(endDate);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    let tempArr = [];
    arr.map((item) => {
      let hasThisDate = data.filter(
        (it) =>
          new Date(it.startDate).toDateString() ==
          new Date(item).toDateString(),
      );

      if (isEmpty(hasThisDate)) {
        const obj = {
          startDate: startDate,
          endDate: endDate,
          sourceName: 'Health',
          value: 'EMPTY',
          sourceId: 'com.apple.Health',
          value: 0,
        };
        tempArr.push(obj);
      } else {
        tempArr.push(hasThisDate[0]);
      }
    });
    return tempArr;
  }

  addSameDateValue(results) {
    const mergedData = {};
    results.forEach((item) => {
      const start = new Date(item.startDate).toISOString();
      const hours =
        (new Date(item.endDate) - new Date(item.startDate)) / (1000 * 60 * 60);

      if (mergedData[start]) {
        mergedData[start].hoursDifference += hours;
      } else {
        mergedData[start] = {...item, hoursDifference: hours};
      }
    });
    const result = Object.values(mergedData);
    const mergedData1 = {};
    result.forEach((item) => {
      const start = new Date(item.startDate);
      const startKey =
        start.getDate() +
        '-' +
        (start.getMonth() + 1) +
        '-' +
        start.getFullYear();
      if (mergedData1[startKey]) {
        mergedData1[startKey].hoursDifference += item.hoursDifference;
      } else {
        mergedData1[startKey] = item;
      }
    });
    const result1 = Object.values(mergedData1);
    return result1;
  }

  generateEmptyWeeks(data, weekStartDate, weekEndDate) {
    data.map((item) => {});
  }

  capitalizeFirstLetter(string) {
    return string?.charAt(0)?.toUpperCase() + string.slice(1) ?? '';
  }

  getFormattedDateTime = (date, format) => {
    if (date) return moment(date).format(format);
    return '';
  };

  getDateObjectFromString = (date, format) => {
    if (date) return moment(date, format).toDate();
    return '';
  };

  showLoader = (instance, loadingFor = '') => {
    if (!instance.state.loading) {
      instance.setState({
        loading: true,
        loadingFor,
      });
    }
  };

  hideLoader = (instance, callback) => {
    if (instance.state.loading) {
      instance.setState(
        {
          loading: false,
          loadingFor: '',
        },
        callback,
      );
    }
  };

  getCurrentUserAccessToken() {
    return DataHandler.getStore().getState()?.user?.token;
    // return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjk2OTI4ODA4LCJleHAiOjE2OTk1MjA4MDh9.z05_Shctvwo5r5-8tuC1hhXPOM7CwXvF0dQxylcjmww';
  }
  calculateBMI(heightFeet, weight, heightIn) {
    // const tempWeight = cloneDeep(heightFeet);
    // let heightMeter = tempWeight * 0.3048;
    // let heightMetreTwoTime = heightMeter * heightMeter;
    // const weightKg = weight / 2.2046;
    // const bmi = weightKg / heightMetreTwoTime;
    // return bmi;
    let heightInch = Number(heightFeet) * 12;
    heightInch = Number(heightInch) + Number(heightIn);
    return (Number(weight) / (Number(heightInch) * Number(heightInch))) * 703;
  }

  calculateNavyBodyFatPercentage(
    gender,
    abdomen,
    waist,
    neck,
    hip,
    height,
    heightIn,
  ) {
    if (gender.value == 'Male') {
      //For Male
      let heightInch = height * 12;
      heightInch = Number(heightInch) + Number(heightIn);
      const bodyFatPercentage =
        86.01 * Math.log10(Number(waist) - Number(neck)) -
        70.041 * Math.log10(heightInch) +
        36.76;

      return bodyFatPercentage;
    } else if (gender.value == 'Female') {
      //For woman
      let heightInch = Number(height) * 12;
      heightInch = Number(heightInch) + Number(heightIn);

      // console.log({waist, hip: Number(hip), neck, heightInch});
      // let v1 = 0.35004 * Math.log10(Number(waist) + Number(hip) - Number(neck));
      // let v2 = 0.221 * Math.log10(heightInch);
      // const temp = 1.29579 - v1 + v2;
      // const bodyFatPercentage =
      //   495 /
      //     (1.29579 -
      //       0.35004 * Math.log10(Number(waist) + Number(hip) - Number(neck)) +
      //       0.221 * Math.log10(heightInch)) -
      //   450;
      const bodyFatPercentage =
        163.205 * Math.log10(Number(waist) + Number(hip) - Number(neck)) -
        97.684 * Math.log10(heightInch) -
        78.387;

      return bodyFatPercentage;
    }
  }
  isNumber(val) {
    return /^\d+$/.test(val);
  }

  openLinkInBrowser(url) {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
      }
    });
  }

  generateGetParameter(obj) {
    let final = '?';
    for (const key in obj) {
      final = `${final}${key}=${obj[key]}&`;
    }
    final = final.slice(0, -1);
    return final;
  }
  minsToPresentableText(duration, long = false) {
    const durationHoursText = parseInt(duration / 60);
    const durationMinsText = parseInt(duration % 60);

    return `${
      durationHoursText > 0
        ? `${
            durationHoursText > 1
              ? `${durationHoursText}${long ? 'hours' : 'hrs'}`
              : `${durationHoursText}${long ? 'hour' : 'hr'}`
          }`
        : ``
    } ${
      durationMinsText > 0
        ? `${
            durationMinsText > 1
              ? `${durationMinsText}${long ? 'minutes' : 'min'}`
              : `${durationMinsText}${long ? 'minute' : 'min'}`
          }`
        : ``
    }`;
  }

  replaceDot = (text) => {
    const regex = /\./g; // The "g" flag makes it global, replacing all occurrences.
    return text.replace(regex, '');
  };

  formatCardNumber = (input) => {
    // Remove non-numeric characters and limit to 16 digits
    const numericInput = input.replace(/\D/g, '').slice(0, 16);

    // Add spaces for every 4 digits
    const maskedInput = numericInput.replace(/(\d{4})(?=\d)/g, '$1 ');

    return maskedInput;
  };

  generateDateRangeArray(_startDate, _endDate) {
    const startDate = moment(_startDate); // Today's date
    const endDate = moment(_endDate); // Today's date + n days
    const dateRange = [];

    let currentDate = startDate;

    while (currentDate.isSameOrBefore(endDate, 'day')) {
      dateRange.push({
        title: currentDate.format('dddd'), // Full day name (e.g., "Monday")
        text: currentDate.format('MMM DD - YYYY'), // Date in YYYY-MM-DD format
      });
      currentDate.add(1, 'days');
    }

    return dateRange;
  }

  calculatePercentage(part, whole) {
    if (whole === 0) {
      return 0;
    }
    let percengate = (part / whole) * 100;
    return percengate.toFixed(1);
  }

  calculateTotalKcal(labelNutrients) {
    let calories = 0;
    labelNutrients?.map((item) => {
      if (item.name.toLowerCase() === 'fat') {
        calories += item.value * 9;
      }
      if (item.name.toLowerCase() === 'carbohydrates') {
        calories += item.value * 4;
      }
      if (item.name.toLowerCase() === 'protein') {
        calories += item.value * 4;
      }
    });
    return calories.toString();
  }

  getlabelNutrientsFromMyMealFood(data) {
    let tempArr = [];
    data?.map((item) => {
      console.log({item});
      // tempArr = this.unionBy(tempArr, item?.labelNutrients);
      tempArr = [...tempArr, ...item.labelNutrients];
    });
    const result = tempArr.reduce((acc, obj) => {
      if (acc[obj.name]) {
        acc[obj.name].value += obj.value;
      } else {
        acc[obj.name] = {...obj};
      }
      return acc;
    }, {});

    const summedArray = Object.values(result);
    console.log('summedArray', summedArray);
    return summedArray;
  }
  getfoodNutrientsFromMyMealFood(data) {
    let tempArr = [];
    data?.map((item) => {
      console.log({item});
      // tempArr = this.unionBy(tempArr, item?.labelNutrients);
      tempArr = [...tempArr, ...item.foodNutrients];
    });
    const result = tempArr.reduce((acc, obj) => {
      if (acc[obj.name]) {
        acc[obj.name].value += obj.value;
      } else {
        acc[obj.name] = {...obj};
      }
      return acc;
    }, {});

    const summedArray = Object.values(result);
    console.log('foodNutrientsArra', summedArray);
    return summedArray;
  }

  getSumOFKcalfoodNutrients(data) {
    const allDataFlattened = data.flatMap((item) => item.allData);

    const totalCaloriesSum = allDataFlattened.reduce(
      (sum, current) => sum + parseFloat(current?.Kcal),
      0,
    );
    return totalCaloriesSum;
  }

  getAllFoodFromNutritionData(array) {
    let tempArr = [];
    array.map((item) => {
      let isHasMoreOneFood = item?.allData?.length > 1 ? true : false;
      const temp = item?.allData?.map((it) => ({
        ...it,
        idNutrient: item.id,
        isMoreFood: isHasMoreOneFood,
      }));
      tempArr = [...tempArr, ...temp];
    });

    return tempArr;
  }
  mergeArraysDiscoverRecipe(arr1, arr2) {
    let mergedArray = [];
    let titlesMap = new Map();

    function mergeData(existingData, newData) {
      return [...existingData, ...newData];
    }

    arr1.forEach((item) => {
      if (titlesMap.has(item.title)) {
        let existingItem = titlesMap.get(item.title);
        existingItem.data = mergeData(existingItem.data, item.data);
      } else {
        titlesMap.set(item.title, {...item});
      }
    });

    arr2.forEach((item) => {
      if (titlesMap.has(item.title)) {
        let existingItem = titlesMap.get(item.title);
        existingItem.data = mergeData(existingItem.data, item.data);
      } else {
        titlesMap.set(item.title, {...item});
      }
    });

    titlesMap.forEach((value, key) => {
      mergedArray.push(value);
    });

    return mergedArray;
  }
}

export const generateGuid = () => {
  const S4 = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
};

export const convetStringToObject = (data) => {
  try {
    return JSON.parse(
      data.replace(/(\w+:)|(\w+ :)/g, function (matchedStr) {
        return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":';
      }),
    );
  } catch (error) {
    return {};
  }
};

export const logoutUser = async () => {
  await deleteDeviceToken();
  DataHandler.getStore().dispatch(challengeLogoutUser());
  DataHandler.getStore().dispatch(logoutUserRequest());
  DataHandler.getStore().dispatch(friendsLogoutUser());
  DataHandler.getStore().dispatch(paymentLogoutUser());
  DataHandler.getStore().dispatch(emptyChatOnLogout());
};

export function uuid() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
}

export default new Util();

export const groupMessagesByDate = (messages) => {
  const groupedMessages = _.groupBy(messages, (message) => {
    return moment(message.createdAt).utc(true).format().split('T')[0];
  });

  const groupedMessagesArray = Object.entries(groupedMessages).map(
    ([date, messages]) => {
      return {date, messages};
    },
  );

  return groupedMessagesArray;
};

export const decryptMessage = (decryptMessage) => {
  try {
    const bytes = AES.decrypt(decryptMessage, 'RxLifeCHAT');
    const decrypted = bytes.toString(enc.Utf8);
    return decrypted;
  } catch (error) {
    console.error('decryptMessage --->>>', error);
    return '';
  }
};

export const encryptMessage = (normalMsg) => {
  const cipherText = AES.encrypt(normalMsg, 'RxLifeCHAT');

  return cipherText.toString();
};

export function groupBy(arr, property) {
  return arr.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

export function formatNumber(num) {
  if (Math.floor(num) !== num) {
    return num.toFixed(2);
  } else {
    return num.toString();
  }
}

export function groupAndCount(arr, property) {
  const groups = arr.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = {count: 0, items: []};
    }
    acc[key].count++;
    acc[key].items.push(obj);
    return acc;
  }, {});

  return Object.entries(groups).map(([key, value]) => ({
    [property]: key,
    ...value,
  }));
}

export function isCheckVideo(fileExtension) {
  const videoExtensions = [
    'mp4',
    'webm',
    'ogg',
    'mov',
    'avi',
    'mkv',
    'wmv',
    'flv',
    '3gp',
    'mpeg',
    'mpg',
    'm4v',
  ];
  return videoExtensions.includes(fileExtension.toLowerCase());
}

export function currentMonthWeeks(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const offset = (firstDay + 6) % 7;
  const weeks = Math.ceil((lastDay + offset) / 7);
  return weeks;
}

export function calculateUserGoalCalories(
  gender,
  age,
  currentWeight,
  height,
  heightInch,
  idealWeight,
  activityValue,
) {
  let total_inches = Number(height) * 12 + Number(heightInch);
  let height_in_cm = total_inches * 2.54;
  let bmr = 0;
  if (gender == 'Female') {
    bmr =
      655.1 +
      9.563 * Number(currentWeight) * 0.454 +
      1.85 * height_in_cm -
      4.676 * Number(age);
  } else {
    bmr =
      66.47 +
      13.75 * Number(currentWeight) * 0.454 +
      5.003 * height_in_cm -
      6.755 * Number(age);
  }
  return bmr * activityValue;
}
