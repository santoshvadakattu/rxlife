import _ from 'lodash';

export function loadRoomDataManipulator(data) {
  try {
    if (_.isEmpty(data)) return {};

    const members = [];
    const payload = {
      id: data?.id ?? null,
      roomName: data?.room_name ?? '',
      roomType: data?.room_type ?? '',
      isBlocked: data?.is_blocked ?? false,
      isArchived: data?.is_archived ?? false,
      isMuted: data?.user_room_detail?.is_mute ?? false,
      unreadCount: data?.unreadCount ?? 0,
      blockedBy: data?.blocked_by ?? null,
      roomImage: data?.room_image ?? null,
      challengeId: data?.challenge_id ?? null,
    };

    if (data?.room_members?.length > 0) {
      for (let member of data?.room_members) {
        const _mem = {
          isAdmin: member?.is_admin ?? false,
          isLeaved: member?.is_leaved ?? false,
          isRemoved: member?.is_removed ?? false,
          id: member?.room_user_Detail?.id,
          email: member?.room_user_Detail?.user_email,
          fullName: member?.room_user_Detail?.user_fullname,
          display: member?.room_user_Detail?.user_fullname,
          image: member?.room_user_Detail?.user_image,
          userUniqueId: member?.room_user_Detail?.user_unique_id,
        };

        members.push(_mem);
      }

      payload.members = members;
    }

    if (data?.room_type === 'indiviual' || data?.room_type === 'individual') {
      const otherPersonData = {
        id: data?.otherPerson?.room_user_Detail?.id,
        email: data?.otherPerson?.room_user_Detail?.user_email,
        fullName: data?.otherPerson?.room_user_Detail?.user_fullname,
        userImage: data?.otherPerson?.room_user_Detail?.user_image,
      };

      payload.otherPerson = otherPersonData;
      payload.roomName = otherPersonData?.fullName;
      payload.roomImage = otherPersonData?.userImage;
    }

    if (data?.messages?.length > 0) {
      const latestMessage = singleMessageManipulator(data?.messages[0]);
      if (latestMessage == false && data?.messages[0]?.message_type == 'file') {
        payload.latestMessage = {
          text: 'Media',
          createdAt: data?.messages[0]?.createdAt,
        };
      } else {
        payload.latestMessage = latestMessage;
      }
    }

    return payload;
  } catch (error) {
    console.error('loadRoomDataManipulator --->>>', error);
    return {};
  }
}

export function getMessagesManipulator(list) {
  try {
    if (_.isEmpty(list)) return [];

    const finalResult = [];

    for (let msg of list) {
      const payload = singleMessageManipulator(msg);
      if (payload) finalResult.push(payload);
    }

    return finalResult;
  } catch (error) {
    console.error('getMessagesManipulator -->>>>', error);
    return [];
  }
}

export function singleMessageManipulator(data) {
  if (_.isEmpty(data)) return {};

  try {
    // const messageText =
    //   data?.message_type !== MESSAGE_TYPES.highlight
    //     ? decryptMessage(data?.message_text)
    //     : data?.message_text;

    const messageText = data?.message_text;

    if (!messageText && _.isEmpty(data?.message_attachments)) return false;

    const reactions = [];

    const payload = {
      id: data?.id ?? null,
      _id: data?.id ?? null,
      messageStatus: data?.messageStatus ?? false,
      messageType: data?.message_type ?? 'text',
      childMessages: data?.childMessages?.length > 0 ? true : false,
      messageText: messageText,
      text: messageText,
      roomId: data?.room_id ?? null,
      createdAt: data?.createdAt ?? null,
      parentMessageId: data?.parentMessage?.id ?? null,
      parentMessage: data?.parentMessage ?? {},
      messageSender: {
        id: data?.message_sender?.id ?? null,
        userId: data?.message_sender?.user_unique_id ?? null,
        email: data?.message_sender?.user_email ?? '',
        fullName: data?.message_sender?.user_fullname ?? '',
        image: data?.message_sender?.user_image ?? '',
      },
      user: {
        _id: data?.message_sender?.id ?? null,
        userId: data?.message_sender?.user_unique_id ?? null,
        email: data?.message_sender?.user_email ?? '',
        name: data?.message_sender?.user_fullname ?? '',
        image: data?.message_sender?.user_image ?? '',
        // image:
      },
    };

    if (data?.message_type === 'highlight') {
      payload.system = true;
    }

    if (data?.message_attachments?.length > 0) {
      for (let file of data?.message_attachments) {
        if (
          file?.attachment_path?.endsWith('.jpg') ||
          file?.attachment_path?.endsWith('.jpeg') ||
          file?.attachment_path?.endsWith('.gif') ||
          file?.attachment_path?.endsWith('.png')
        ) {
          payload.image = file?.attachment_path;
        }

        if (
          file?.attachment_path?.endsWith('.mp4') ||
          file?.attachment_path?.endsWith('.webm') ||
          file?.attachment_path?.endsWith('.webm') ||
          file?.attachment_path?.endsWith('.mkv')
        ) {
          payload.video = file?.attachment_path;
        }

        // const doc = {
        //   name: file?.attachment_name ?? '',
        //   ext: file?.attachment_extension ?? '',
        //   type: file?.attachment_type,
        //   url: file?.attachment_path,
        //   id: file?.id,
        //   size: file?.attachment_size,
        //   createdAt: file?.createdAt,
        // };
      }
    }

    if (data?.MessageReacts?.length > 0) {
      for (let reaction of data?.MessageReacts) {
        const _reactMsg = reactMsgManipulator(reaction);
        if (_reactMsg) reactions.push(_reactMsg);
      }
    }

    payload.reactions = reactions ?? [];

    return payload;
  } catch (error) {
    console.error('singleMessageManipulator --->>>', error);
  }
}

export function reactMsgManipulator(data) {
  try {
    if (_.isEmpty(data)) return false;

    const _reactMsg = {
      id: data?.id,
      messageId: data?.message_id,
      emoji: data?.message_react_emoji,
      reactorId: data?.reactor_id,
      roomId: data?.room_id,
      reactorDetails: {
        id: data?.reactor_details?.id,
        email: data?.reactor_details?.user_email,
        image: data?.reactor_details?.user_image,
        name: data?.reactor_details?.user_name,
        fullName: data?.reactor_details?.user_fullname,
        userName: data?.reactor_details?.user_username,
        createdAt: data?.reactor_details?.createdAt,
      },
    };

    return _reactMsg;
  } catch (error) {
    console.error('reactMsgManipulator -->>>', error);
    return false;
  }
}

export function RoomInfoManipulator(data) {
  try {
    if (_.isEmpty(data)) return;

    const attachments = [];
    const users = [];
    const links = [];

    if (data?.attachments?.length > 0) {
      for (let file of data?.attachments) {
        const doc = {
          name: file?.attachment_name ?? '',
          ext: file?.attachment_extension ?? '',
          type: file?.attachment_type,
          url: file?.attachment_path,
          id: file?.id,
          size: file?.attachment_size,
          createdAt: file?.createdAt,
        };

        attachments.push(doc);
      }
    }

    if (data?.users?.length > 0) {
      for (let user of data?.users) {
        const u = {
          id: user?.room_user_Detail?.id,
          email: user?.room_user_Detail?.user_email,
          fullName: user?.room_user_Detail?.user_fullname,
          isAdmin: user?.is_admin ?? false,
          isLeaved: user?.is_leaved ?? false,
          isRemoved: user?.is_removed ?? false,
        };

        users.push(u);
      }
    }

    if (data?.links?.length > 0) {
      for (let msg of data?.links) {
        const link = singleMessageManipulator(msg);

        links.push(link);
      }
    }

    const payload = {
      attachments,
      users,
      roomType: data?.room_type,
      links,
      // room_name: ,
    };

    return payload;
  } catch (error) {
    console.error('RoomInfoManipulator --->>>', error);
    return {};
  }
}

// SPRINT 2 WORK STARTS HERE ---->>>>>>>>>>>>>>>>>>>>>

export const getAllRoomsManipulator = (list) => {
  try {
    if (_.isEmpty(list)) return [];

    const data = [];

    for (let room of list) {
      const roomInfo = loadRoomDataManipulator(room);
      if (roomInfo) data.push(roomInfo);
    }

    return data;
  } catch (error) {
    console.error('getAllRoomsManipulator --->>>>', error);
    return [];
  }
};

export const attachmentsManipulator = (list) => {
  if (_.isEmpty(list)) {
    return {
      data: [],
      recentData: [],
      lastWeekData: [],
      olderData: [],
    };
  }
  try {
    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Get the current date
    const currentDate = new Date();

    // Filter the data based on time intervals
    const recentData = list.filter((item) => {
      const itemDate = new Date(item.createdAt);
      const diffInDays = Math.floor(
        (currentDate - itemDate) / (1000 * 60 * 60 * 24),
      );
      return diffInDays <= 1; // You can adjust the time interval as needed
    });

    const lastWeekData = list.filter((item) => {
      const itemDate = new Date(item.createdAt);
      const diffInDays = Math.floor(
        (currentDate - itemDate) / (1000 * 60 * 60 * 24),
      );
      return diffInDays > 1 && diffInDays <= 7;
    });

    const olderData = list.filter((item) => {
      const itemDate = new Date(item.createdAt);
      const diffInDays = Math.floor(
        (currentDate - itemDate) / (1000 * 60 * 60 * 24),
      );
      return diffInDays > 7;
    });

    // Display the formatted data

    return {
      data: list,
      recentData,
      olderData,
      lastWeekData,
    };
  } catch (error) {
    console.error('attachmentsManipulator error ==>>>', error);
    return {
      data: [],
      recentData: [],
      lastWeekData: [],
      olderData: [],
    };
  }
};

export const singleMemberManipulator = (list) => {
  try {
    if (_.isEmpty(list)) return [];

    const result = [];

    for (let member of list) {
      const _mem = {
        isAdmin: member?.is_admin ?? false,
        isLeaved: member?.is_leaved ?? false,
        isRemoved: member?.is_removed ?? false,
        id: member?.room_user_Detail?.id,
        email: member?.room_user_Detail?.user_email,
        fullName: member?.room_user_Detail?.user_fullname,
        display: member?.room_user_Detail?.user_fullname,
        image: member?.room_user_Detail?.user_image,
      };

      result.push(_mem);

      return result;
    }
  } catch (error) {
    console.error('singleMemberManipulator error ===>>>', error);
    return [];
  }
};
