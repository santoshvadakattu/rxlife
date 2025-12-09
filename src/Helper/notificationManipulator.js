import _ from 'lodash';
import {NOTIFICATION_TYPES} from '../constants';

export function notificationListManipulator(list = []) {
  try {
    if (_.isEmpty(list)) return [];

    const result = [];

    for (let item of list) {
      const payload = {
        id: item?.id,
        title: item?.attributes?.title,
        description: item?.attributes?.description,
        date: new Date(item?.attributes?.createdAt),
        type: item?.attributes?.type,
        entity: item?.attributes?.entity,
        isRead: item?.attributes?.isRead,
        type: NOTIFICATION_TYPES?.[item?.attributes?.type],
        notType: item?.attributes?.type,
      };

      result.push(payload);
    }

    return result;
  } catch (error) {
    console.error('notificationListManipulator error ==>>>', error);

    return [];
  }
}
