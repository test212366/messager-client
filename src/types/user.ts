interface User {
	id?: string
	name: string
	email: string
	password?: string
	isAuth: boolean
	token: string
	chats: any[]
	nowChat: string
	pinnedChats: any[]
	todo: any[]
	data: any[]
	status?: string
	online: string
	loadingAvatar: boolean
	avatarSRC: string
}

export interface userState {
	user: User,
	loading: boolean,
	error: string
}




export enum UserActionsTypes {
	FETCH_USER_REGISTER = 'FETCH_USER_REGISTER',
	FETCH_USERS_REGISTER_SUCCESS = 'FETCH_USERS_REGISTER_SUCCESS',
	FETCH_USERS_REGISTER_ERROR = 'FETCH_USERS_REGISTER_ERROR',
	FETCH_USER_LOGIN_GOOGLE = 'FETCH_USER_LOGIN_GOOGLE',
	FETCH_USER_SUCCESS_LOGIN_GOOGLE = 'FETCH_USER_SUCCESS_LOGIN_GOOGLE',
	FETCH_USER_ERROR_LOGIN_GOOGLE = 'FETCH_USER_ERROR_LOGIN_GOOGLE',
	FETCH_USER_LOGIN = 'FETCH_USER_LOGIN',
	FETCH_USER_LOGIN__SUCCESS = 'FETCH_USER_LOGIN_SUCCESS',
	FETCH_USER_ERROR_LOGIN = 'FETCH_USER_ERROR_LOGIN',
	USER_CHANGE_OBJ = 'USER_CHANGE_OBJ',

	FETCH_USER_LOCAL = "FETCH_USER_LOCAL",
	FETCH_USER_LOCAL_SUCCESS = 'FETCH_USER_LOCAL_SUCCESS',
	FETCH_USER_LOCAL_ERROR = 'FETCH_USER_LOCAL_ERROR',
	USER_UPDATE = 'USER_UPDATE',
	USER_EXIT = 'USER_EXIT',
}

interface UserChangeObj {
	type: UserActionsTypes.USER_CHANGE_OBJ
	payload: User
}
interface FecthUserRegister {
	type: UserActionsTypes.FETCH_USER_REGISTER
}

interface UserUpdate {
	type: UserActionsTypes.USER_UPDATE
	payload: User
}
interface UserExit {
	type: UserActionsTypes.USER_EXIT
	payload: User
}
interface FecthUserSuccessRegister {
	type: UserActionsTypes.FETCH_USERS_REGISTER_SUCCESS
	payload: User
}
interface FecthUserErrorRegister {
	type: UserActionsTypes.FETCH_USERS_REGISTER_ERROR
	payload: string
}

interface FecthUserLoginGoogle {
	type: UserActionsTypes.FETCH_USER_LOGIN_GOOGLE

}
interface FecthUserSuccessLoginGoogle {
	type: UserActionsTypes.FETCH_USER_SUCCESS_LOGIN_GOOGLE
	payload: User
}
interface FecthUserErrorLoginGoogle {
	type: UserActionsTypes.FETCH_USER_ERROR_LOGIN_GOOGLE
	payload: string
}
interface FecthUserLogin {
	type: UserActionsTypes.FETCH_USER_LOGIN
}
interface FecthUserLoginSuccess {
	type: UserActionsTypes.FETCH_USER_LOGIN__SUCCESS
	payload: User
}
interface FecthUserErrorLogin {
	type: UserActionsTypes.FETCH_USER_ERROR_LOGIN
	payload: string
}

interface FecthUserLoginLocal {
	type: UserActionsTypes.FETCH_USER_LOCAL
}
interface FecthUserLoginLocalSuccess {
	type: UserActionsTypes.FETCH_USER_LOCAL_SUCCESS
	payload: User
}
interface FecthUserLoginLocalError {
	type: UserActionsTypes.FETCH_USER_LOCAL_ERROR
	payload: string
}


export type userActions = FecthUserRegister | FecthUserSuccessRegister | FecthUserErrorRegister |
	FecthUserLoginGoogle | FecthUserSuccessLoginGoogle | FecthUserErrorLoginGoogle
	| FecthUserLogin | FecthUserLoginSuccess | FecthUserErrorLogin
	| FecthUserLoginLocal | FecthUserLoginLocalSuccess | FecthUserLoginLocalError | UserExit | UserUpdate | UserChangeObj 