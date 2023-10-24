interface User {
	name: string
	email: string
	password?: string
	token: string
	nowChat?: string
	online: string
	avatarSRC?: string
	_id?: string
	chats?: any
	status?: string
	data?: any
}
export interface UserChatState {
	error: string
	loading: boolean
	user: User
}
export enum UserChatActionTypes {

	FETCH_USER_CHAT_SUCCESS = 'FETCH_USER_CHAT_SUCCESS',
	FETCH_USER_CHAT_ERROR = 'FETCH_USER_CHAT_ERROR'
}

export interface FetchUserChatSuccess {
	type: UserChatActionTypes.FETCH_USER_CHAT_SUCCESS
	payload: User
}
export interface FetchUserChatError {
	type: UserChatActionTypes.FETCH_USER_CHAT_ERROR
	payload: string
}

export type UserChatActions = FetchUserChatSuccess | FetchUserChatError