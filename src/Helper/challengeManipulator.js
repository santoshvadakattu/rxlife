import _ from 'lodash';
import moment from 'moment';
import util, {uuid} from '../util';

export const getAllChallengesManipulator = (list) => {
  return challengeDetailManipulator(list, false, false);
};

export const getOnChallengesManipulator = (list) => {
  return challengeDetailManipulator(list, true, false);
};

export const getCompleteChallengeManipulator = (list) => {
  if (_.isEmpty(list)) return {};

  try {
    const data = [];

    for (let entry of list) {
      const payload = {};

      payload.id = entry?.id;
      payload.days =
        entry?.attributes?.days?.length > 0
          ? entry?.attributes?.days?.map((item) => ({
              ...item,
              date: moment(item?.date).format('DD-MM-YYYY'),
              tasks: item?.tasks?.map((task) => ({
                ...task,
                id: uuid(),
              })),
            }))
          : [];
      data.push(payload);
    }

    return data?.[0] ?? {};
  } catch (error) {
    console.error('getCompleteChallengeManipulator ==>>>', error);
    return {};
  }
};

export const getCompleteChallengeManipulatorOnlyCreate = (list) => {
  if (_.isEmpty(list)) return {};

  try {
    const data = [];

    for (let entry of list) {
      const payload = {};

      payload.id = entry?.id;
      payload.days =
        entry?.days?.length > 0
          ? entry?.days?.map((item) => ({
              ...item,
              date: moment(item?.date).format('DD-MM-YYYY'),
              tasks: item?.tasks?.map((task) => ({
                ...task,
                id: uuid(),
              })),
            }))
          : [];
      data.push(payload);
    }

    console.log('getCompleteChallengeManipulatorOnlyCreate ==>>>', data?.[0]);

    return data?.[0] ?? {};
  } catch (error) {
    console.error('getCompleteChallengeManipulator ==>>>', error);
    return {};
  }
};

const challengeDetailManipulator = (
  list,
  ongoing = false,
  completed = false,
) => {
  if (_.isEmpty(list)) return [];

  try {
    console.log(
      'challengeDetailManipulator list ====>>>',
      JSON.stringify(list),
    );
    const data = [];

    for (let challenge of list) {
      const payload = {};

      payload.title = challenge?.title ?? '';
      payload.onGoing = ongoing;
      payload.completed = completed;
      payload.id = challenge?.id ?? '';
      payload.habit = challenge?.habit ?? '';
      payload.description = challenge?.description ?? '';
      payload.rules = challenge?.rules ?? '';
      payload.createdAt = challenge?.createdAt ?? '';
      payload.updatedAt = challenge?.updatedAt ?? '';
      payload.startDate = challenge?.start_date ?? '';
      payload.startDateDisplay =
        moment(challenge?.start_date).format('DD-MMMM-YYYY') ?? '';
      payload.endDate = challenge?.end_date ?? '';
      payload.amount = challenge?.price ?? 0;
      payload.prizes = challenge?.prizes ?? '';
      payload.completedTasks = challenge?.completedTasks ?? 0;
      // payload.resource = challenge?.resource ?? '';
      payload.bgImage = challenge?.cover?.url ?? '';
      payload.introVideo = challenge?.intro_video?.url ?? '';
      payload.isPaid = challenge?.is_paid ?? false;
      payload.chatRoomId = challenge?.chat_room_id ?? null;
      payload.task =
        challenge?.task?.length > 0
          ? challenge?.task?.map((item) => ({
              title: item?.task?.title,
              points: item?.points,
              id: uuid(),
            }))
          : [];
      payload.totalDays = challenge?.total_days;

      payload.remainingDays = moment(challenge?.start_date).isBefore(moment())
        ? moment(challenge?.end_date)
            .add(1, 'day')
            .diff(moment(), 'days', false) + 1
        : challenge?.total_days;

      payload.isDaily = payload?.totalDays == 1 ? true : false;
      // payload.points = challenge?.total_points ?? 0;
      payload.points = challenge?.total_points
        ? payload?.totalDays
          ? payload?.totalDays * challenge?.total_points
          : 0
        : 0;
      payload.dailyVideos =
        challenge?.daily_videos?.length > 0
          ? challenge?.daily_videos?.map((item) => {
              return {
                date: moment(item?.date).format('DD-MM-YYYY'),
                url: item?.video?.url,
                thumbnail: item?.thumbnail?.url || '',
                title: item?.title,
              };
            })
          : [];

      payload.participants = challenge?.participants?.length ?? 0;
      payload.participantsData =
        challenge?.participants?.length > 0
          ? challenge?.participants?.map((item) => ({
              ...item,
              fullName: item?.fullname ?? '',
              chatUserId: item?.chat_user_id ?? null,
            }))
          : [];

      const participantsPictures = [];

      if (challenge?.participants?.length > 0) {
        for (let participant of challenge?.participants) {
          if (participant?.user_profile?.image?.url) {
            participantsPictures?.push(participant?.user_profile?.image?.url);
          }

          if (participantsPictures?.length >= 3) {
            break;
          }
        }
      }

      payload.participantsPictures = participantsPictures;

      const resources = [];

      if (challenge?.resources?.length > 0) {
        for (let resource of challenge?.resources) {
          resources.push({
            link: resource?.resource_link,
          });
        }
      }

      payload.resources = resources;

      data.push(payload);
    }

    return data;
  } catch (error) {
    console.error('getAllChallengesManipulator error ===>>>>', error);
    return [];
  }
};

export const getMyCompletedChallengeManipulator = (list) => {
  return challengeDetailManipulator(list, false, true);
};

export const onGoingTasksManipulator = (list) => {
  try {
    if (_.isEmpty(list)) return [];

    const res = [];

    for (let challenge of list) {
      const payload = {
        ...challenge?.challenge,
        text: 'ongoing',
        completedChallengeId: challenge?.completedChallenge?.id || '',
      };

      const completedTasks =
        challenge?.completedChallenge?.days?.[0]?.tasks?.map((item) => {
          return {
            ...item,
            id: uuid(),
          };
        }) ?? [];

      if (!completedTasks.length) {
        continue;
      }

      payload.tasks = completedTasks;

      res.push(payload);
    }

    return res;
  } catch (error) {
    console.error('onGoingTasksManipulator error ===>>>', error);
    return [];
  }
};
