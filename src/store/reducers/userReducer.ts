import { userActions, UserActionsTypes, userState } from "../../types/user";

const initinalState: userState = {
	user: {
		name: '',
		email: '',
		password: '',
		isAuth: false,
		token: '',
		chats: [],
		pinnedChats: [],
		todo: [],
		nowChat: 'none',
		data: [{ name: '01', completed: 0, ongoing: 0, amt: 0 }],
		online: '',
		avatarSRC: '',
		loadingAvatar: false
	},
	loading: false,
	error: ''
}
export const userReducer = (state: userState = initinalState, action: userActions): userState => {
	switch (action.type) {
		case UserActionsTypes.FETCH_USER_REGISTER:
			return { ...initinalState, loading: true }
		case UserActionsTypes.FETCH_USERS_REGISTER_SUCCESS:
			return { ...initinalState, user: action.payload }
		case UserActionsTypes.FETCH_USERS_REGISTER_ERROR:
			return { ...initinalState, error: action.payload }
		case UserActionsTypes.FETCH_USER_LOGIN_GOOGLE:
			return { ...initinalState, loading: true }
		case UserActionsTypes.FETCH_USER_SUCCESS_LOGIN_GOOGLE:
			return { ...initinalState, user: action.payload }
		case UserActionsTypes.FETCH_USER_ERROR_LOGIN_GOOGLE:
			return { ...initinalState, error: action.payload }
		case UserActionsTypes.FETCH_USER_LOGIN:
			return { ...initinalState, loading: true }
		case UserActionsTypes.FETCH_USER_LOGIN__SUCCESS:
			return { loading: false, user: action.payload, error: '' }
		case UserActionsTypes.FETCH_USER_ERROR_LOGIN:
			return { ...initinalState, error: action.payload }
		case UserActionsTypes.FETCH_USER_LOCAL:
			return { ...initinalState, loading: true }
		case UserActionsTypes.FETCH_USER_LOCAL_SUCCESS:
			return { ...initinalState, user: action.payload }
		case UserActionsTypes.FETCH_USER_LOCAL_ERROR:
			return { ...initinalState, error: action.payload }
		case UserActionsTypes.USER_EXIT:
			return { ...initinalState, user: action.payload }
		case UserActionsTypes.USER_CHANGE_OBJ:
			return { ...initinalState, user: action.payload }
		case UserActionsTypes.USER_UPDATE:
			return { ...initinalState, user: action.payload }
		default:
			return state
	}
}