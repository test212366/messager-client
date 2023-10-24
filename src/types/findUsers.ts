interface User {
	name: string
	email: string
	password?: string
	token: string
	avatarSRC?: string
}

export interface findUserState {
	error: string
	user: User
	loading: boolean
}
export enum FindUserActionTypes {
	FETCH_FIND_USER = 'FETCH_FIND_USER',
	FETCH_FIND_USER_SUCCESS = 'FETCH_FIND_USER_SUCCESS',
	FETCH_FIND_USER_ERROR = 'FETCH_FIND_USER_ERROR',
	CLEAR_FIND_USER = 'CLEAR_FIND_USER',
}

export interface FecthFindUser {
	type: FindUserActionTypes.FETCH_FIND_USER
}
export interface FecthSuccessFindUser {
	type: FindUserActionTypes.FETCH_FIND_USER_SUCCESS
	payload: User
}
export interface FetchErrorFindUser {
	type: FindUserActionTypes.FETCH_FIND_USER_ERROR
	payload: string
}
export interface ClearFindUser {
	type: FindUserActionTypes.CLEAR_FIND_USER
}
export type findUserActions = FecthFindUser | FecthSuccessFindUser | FetchErrorFindUser | ClearFindUser