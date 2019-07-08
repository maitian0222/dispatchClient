import { ActionTypes } from './actions';

const defaultState = {
  messageList: [],
};

export interface ActionType {
  type: string;
  messageList?: [];
}

function onMessageSuccess(state: object, action: ActionType) {
  return {
    ...state,
    messageList: action.messageList,
  };
}

export default function(state: object = defaultState, action: ActionType) {
  switch (action.type) {
    case ActionTypes.MESSAGEIN_SUCCESS:
      return onMessageSuccess(state, action);
    case ActionTypes.MESSAGEOUT_SUCCESS:
      return defaultState;
    default:
      return state;
  }
}
