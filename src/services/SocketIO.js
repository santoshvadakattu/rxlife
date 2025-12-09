// @flow
import {io} from 'socket.io-client';
import {CHAT_APP_BASE_URL} from '../config/WebService';

let isConnectedWithSocket = false;
// const LOG = process.env.REACT_APP_ENV === DEV_ENV;
const LOG = true;

class SocketIO {
  _appToken = '';

  /**
   *
   *
   * @param {function} connectCallBack
   * @param {function} disconnectCallBack
   * @param {function} connectionErrorCallBack
   * @memberof SocketIO
   */
  connect(connectCallBack, connectionErrorCallBack = undefined, userId) {
    this.socket = io(CHAT_APP_BASE_URL, {
      withCredentials: true,
      query: {
        userId,
      },
    });

    if (!isConnectedWithSocket) {
      // Global events are bound against socket

      this.socket.on('connect_error', () => {
        if (LOG) {
        }

        if (connectionErrorCallBack) {
          connectionErrorCallBack();
        }
      });

      this.socket.on('connect', () => {
        isConnectedWithSocket = true;

        this.socket.off('ping');
        this.socket.on('ping', () => {});
        this.socket.off('pong');
        this.socket.on('pong', () => {});

        if (LOG) {
        }

        if (connectCallBack) {
          connectCallBack();
          /*
          setTimeout(() => {
            connectCallBack();
          }, 500);
          */
        }
      });
    } else if (connectCallBack) {
      connectCallBack();
      /*
        setTimeout(() => {
          connectCallBack();
        }, 500);
        */
    }

    this.socket.on('errormessage', (data) => {
      // alert("Disconnect");
      isConnectedWithSocket = false;

      if (LOG) {
      }
      if (connectionErrorCallBack) {
        connectionErrorCallBack();
      }
    });
  }

  disconnect() {
    if (this.socket) this.socket.disconnect();
    this.socket;
  }

  // ------------------ EMITS ------------------

  /**
   *
   *
   * @param {string} roomId
   * @param {string} userId
   
   * @memberof SocketIO
   */
  emit(...args) {
    this.socket.emit(...args);
  }

  /**
   *
   *
   * @param {string} roomId
   * @param {string} userId
   
   * @memberof SocketIO
   */
  joinRoom(roomId, callback = this._appToken, roomOptions = {}) {
    //
    //
    //
    //
    //
    //
    this.socket.emit('join-room', roomId, roomOptions, (data) => {
      if (callback) callback(data);
    });
  }

  // ------------------ LISTENERS ------------------

  onAppointmentUpdate(name, updateCallback = () => {}) {
    this.socket.on(name, updateCallback);
  }
  onDoctorAppointmentUpdate(name, updateCallback = () => {}) {
    this.socket.on(name, updateCallback);
  }
  onAdminAppointmentUpdate(name, updateCallback = () => {}) {
    this.socket.on(name, updateCallback);
  }
  onNotificationCreate(name, updateCallback = () => {}) {
    this.socket.on(name, updateCallback);
  }

  stillConnected(callback) {
    this.socket.off('stillConnected');
    this.socket.on('stillConnected', (data) => {
      if (LOG) {
      }

      if (callback) {
        callback(data);
      }
    });
  }

  /**
   *
   *
 
   * @memberof SocketIO
   */
  onDisconnect(callback) {
    this.socket.on('disconnect', () => {
      isConnectedWithSocket = false;
      if (LOG) {
      }

      if (callback) {
        callback();
      }
    });
  }

  onConnect(callback) {
    this.socket.on('connect', () => {
      isConnectedWithSocket = true;
      if (LOG) {
      }

      if (callback) {
        callback();
      }
    });
  }

  // CHAT APP FUNCTIONS

  onMessageRecieved(callback = () => {}) {
    this.socket.off('receive-message');
    this.socket.on('receive-message', callback);
  }

  onReactionRecieved(callback = () => {}) {
    this.socket.off('receive-react-event');
    this.socket.on('receive-react-event', callback);
  }

  onHighlightRecieved(callback = () => {}) {
    this.socket.off('receive-highlight-chat-event');
    this.socket.on('receive-highlight-chat-event', callback);
  }

  onRemoveReaction(callback = () => {}) {
    this.socket.off('remove-react-event');
    this.socket.on('remove-react-event', callback);
  }

  typingEvent(payload, callback = () => {}) {
    this.socket.emit('typing-event', payload, callback);
  }

  listenTypingEvent(callback = () => {}) {
    this.socket.off('receive-typing-event');
    this.socket.on('receive-typing-event', callback);
  }

  listenTypingEventOff() {
    this.socket.off('receive-typing-event');
  }

  onGroupAddYouAsUser(callback = () => {}) {
    this.socket.off('group-add-notification');
    this.socket.on('group-add-notification', callback);
  }

  latestChatUpdate(callback = () => {}) {
    this.socket.off('latest-chats-load-message');
    this.socket.on('latest-chats-load-message', callback);
  }

  onParticipantRemoved(callback = () => {}) {
    this.socket.off('removed-participants-group');
    this.socket.on('removed-participants-group', callback);
  }

  onGroupLeave(callback = () => {}) {
    this.socket.off('leave-participants-group');
    this.socket.on('leave-participants-group', callback);
  }

  onBlockParticipant(callback = () => {}) {
    this.socket.off('block-room-event');
    this.socket.on('block-room-event', callback);
  }

  onUnBlockParticipant(callback = () => {}) {
    this.socket.off('unblock-room-event');
    this.socket.on('unblock-room-event', callback);
  }
}

export default new SocketIO();
