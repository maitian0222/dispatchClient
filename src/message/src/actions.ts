const MESSAGEIN_SUCCESS = 'MESSAGE/MESSAGEIN_SUCCESS';
const MESSAGEOUT_SUCCESS = 'MESSAGE/MESSAGEOUT_SUCCESS';

const ActionTypes = {
  MESSAGEIN_SUCCESS,
  MESSAGEOUT_SUCCESS,
};

/**
 * 设置消息列表
 *
 * @param {object} message
 * @returns
 */
function messageinSuccess(messageList: object) {
  return {
    type: MESSAGEIN_SUCCESS,
    messageList,
  };
}

function messageoutSuccess() {
  return {
    type: MESSAGEOUT_SUCCESS,
  };
}

const ActionCreators = {
  messageinSuccess,
  messageoutSuccess,
};

export { ActionTypes, ActionCreators };
