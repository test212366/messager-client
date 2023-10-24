import { UserChatActions, UserChatActionTypes, UserChatState } from "../../types/userChat"

const initionalState: UserChatState = {
	error: '',
	loading: false,
	user: {
		name: '',
		email: '',
		password: '',
		token: '',
		online: '',
		avatarSRC: ""
	}
}

export const ChatUserReducer = (state: UserChatState = initionalState, action: UserChatActions): UserChatState => {
	switch (action.type) {
		case (UserChatActionTypes.FETCH_USER_CHAT_SUCCESS):
			return { ...initionalState, user: action.payload }
		case (UserChatActionTypes.FETCH_USER_CHAT_ERROR):
			return { ...initionalState, error: action.payload }
		default:
			return state
	}
}