import { Dispatch } from "react"
import { socket } from "../../App"

import { userActions, UserActionsTypes } from "../../types/user"

interface RegisterProps {
	name: string
	email: string
	password: string
}
interface LoginGoogleProps {
	name: string,
	email: string
}
interface LoginProps {
	email: string,
	password: string,
}
interface loginLocalProps {
	token: any
	isChange?: any
}

export const setMessages = (user: any) => {
	return async (dispatch: Dispatch<userActions>) => {

	}
}


export const changeAvatar = (user: any, e: any) => {
	return async (dispatch: Dispatch<userActions>) => {
		dispatch({ type: UserActionsTypes.USER_CHANGE_OBJ, payload: { ...user.user, loadingAvatar: true } })
		const formData = new FormData()
		formData.append('avatar', e.target.files[0])
		formData.append('name', user.user.name)

		const responce = await fetch('https://calm-bayou-24720.herokuapp.com/upload/setAvatar', {
			method: "POST",
			body: formData
		})
		const dataResponce = await responce.json()
		const responceUser = await fetch('https://calm-bayou-24720.herokuapp.com/user/setAvatar', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: user.user.name, path: dataResponce.url })
		})
		const userNew = await responceUser.json()

		dispatch({ type: UserActionsTypes.USER_CHANGE_OBJ, payload: { ...user.user, avatarSRC: userNew.avatarSRC, loadingAvatar: false } })
		socket.emit('CLIENT:RESPONCE_UPGRATE_AVATAR_CHAT_USER', { user: userNew })


	}
}

export const changeStatus = (user: any) => {

	return async (dispatch: Dispatch<userActions>) => {
		dispatch({ type: UserActionsTypes.USER_CHANGE_OBJ, payload: user })
		await fetch('https://calm-bayou-24720.herokuapp.com/user/setStatus', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify({ userName: user.name, status: user.status })
		})
	}

}


export const registerUser = ({ name, email, password }: RegisterProps) => {
	return (dispatch: Dispatch<userActions>) => {
		try {
			dispatch({ type: UserActionsTypes.FETCH_USER_REGISTER })
			const api = async () => {
				const responce = await fetch('https://calm-bayou-24720.herokuapp.com/user/register', {
					headers: {
						'Content-Type': 'application/json'
					},
					method: "POST",
					body: JSON.stringify({ name, email, password })
				})
				const user = await responce.json()

				if (user.error) {
					dispatch({ type: UserActionsTypes.FETCH_USERS_REGISTER_ERROR, payload: user.error })
				} else {
					dispatch({ type: UserActionsTypes.FETCH_USERS_REGISTER_SUCCESS, payload: { online: user.user.online, loadingAvatar: false, avatarSRC: user.user.avatarSRC, name: user.user.name, data: user.user.data, todo: user.user.todo, email: user.user.email, status: user.user.status, password: user.user.password, chats: user.user.chats, pinnedChats: user.user.pinnedChats, token: user.token, isAuth: true, nowChat: user.nowChat, id: `${user.user._id}` } })
					localStorage.setItem('token', user.token)
				}

			}
			api()
		} catch (e) {
			dispatch({ type: UserActionsTypes.FETCH_USERS_REGISTER_ERROR, payload: `${e}` })
		}
	}
}
export const loginUserGoogle = ({ name, email }: LoginGoogleProps) => {
	return (dispatch: Dispatch<userActions>) => {
		try {

			const api = async () => {
				dispatch({ type: UserActionsTypes.FETCH_USER_LOGIN_GOOGLE })
				const responce = await fetch('https://calm-bayou-24720.herokuapp.com/user/loginGoogle', {
					headers: {
						"Content-Type": 'application/json'
					},
					method: 'POST',
					body: JSON.stringify({ name, email })
				})
				const user = await responce.json()
				dispatch({ type: UserActionsTypes.FETCH_USER_SUCCESS_LOGIN_GOOGLE, payload: { online: user.user.online, loadingAvatar: false, avatarSRC: user.user.avatarSRC, name: user.user.name, data: user.user.data, todo: user.user.todo, chats: user.user.chats, status: user.user.status, pinnedChats: user.user.pinnedChats, email: user.user.email, token: user.token, isAuth: true, nowChat: user.nowChat, id: `${user.user._id}` } })
				localStorage.setItem('token', user.token)
			}
			api()
		} catch (e) {
			dispatch({ type: UserActionsTypes.FETCH_USER_ERROR_LOGIN_GOOGLE, payload: `${e}` })
		}
	}
}
export const loginUser = ({ email, password }: LoginProps) => {
	return (dispatch: Dispatch<userActions>) => {
		try {
			const api = async () => {
				dispatch({ type: UserActionsTypes.FETCH_USER_LOGIN })
				const responce = await fetch('https://calm-bayou-24720.herokuapp.com/user/login', {
					headers: {
						'Content-Type': 'application/json'
					},
					method: "POST",
					body: JSON.stringify({ email, password })
				})
				const user = await responce.json()

				if (user.error) {
					dispatch({ type: UserActionsTypes.FETCH_USER_ERROR_LOGIN, payload: user.error })
				} else {
					dispatch({ type: UserActionsTypes.FETCH_USER_LOGIN__SUCCESS, payload: { online: user.user.online, loadingAvatar: false, avatarSRC: user.user.avatarSRC, name: user.user.name, data: user.user.data, todo: user.user.todo, status: user.user.status, email: user.user.email, chats: user.user.chats, pinnedChats: user.user.pinnedChats, token: user.token, isAuth: true, nowChat: user.nowChat, id: `${user.user._id}` } })
					localStorage.setItem('token', user.token)
				}

			}
			api()
		} catch (e) {
			dispatch({ type: UserActionsTypes.FETCH_USER_ERROR_LOGIN, payload: `${e}` })
		}
	}
}
export const loginUserInLocalStorage = ({ token, isChange = false }: loginLocalProps) => {
	return (dispatch: Dispatch<userActions>) => {
		try {
			const api = async () => {
				const responce = await fetch('https://calm-bayou-24720.herokuapp.com/user/getUser', {
					headers: {
						'Content-Type': 'application/json'
					},
					method: "POST",
					body: JSON.stringify({ token })
				})
				const user = await responce.json()

				if (user.error) {
					dispatch({ type: UserActionsTypes.FETCH_USER_LOCAL_ERROR, payload: user.error })
				} else if (!isChange) {
					dispatch({ type: UserActionsTypes.FETCH_USER_LOCAL_SUCCESS, payload: { online: user.user.online, loadingAvatar: false, avatarSRC: user.user.avatarSRC, name: user.user.name, data: user.user.data, todo: user.user.todo, status: user.user.status, email: user.user.email, chats: user.user.chats, pinnedChats: user.user.pinnedChats, token: user.token, isAuth: true, nowChat: user.user.nowChat, id: `${user.user._id}` } })
					localStorage.setItem('token', user.token)
				} else if (isChange) {
					dispatch({ type: UserActionsTypes.FETCH_USER_LOCAL_SUCCESS, payload: { online: user.user.online, loadingAvatar: false, avatarSRC: user.user.avatarSRC, name: user.user.name, data: user.user.data, todo: user.user.todo, status: user.user.status, email: user.user.email, chats: user.user.chats, pinnedChats: user.user.pinnedChats, token: user.token, isAuth: true, nowChat: user.user.nowChat, id: `${user.user._id}` } })
				}
			}
			api()
		} catch (e) {
			dispatch({ type: UserActionsTypes.FETCH_USER_LOCAL_ERROR, payload: `${e}` })
		}
	}
}
export const exitUser = () => {
	return (dispatch: Dispatch<userActions>) => {
		try {
			dispatch({
				type: UserActionsTypes.USER_EXIT, payload: {
					chats: [],
					isAuth: false,
					loadingAvatar: false,
					email: '',
					data: [],
					todo: [],
					name: '',
					nowChat: '',
					pinnedChats: [],
					token: '',
					id: '',
					password: '',
					status: '',
					avatarSRC: '',
					online: ''
				}
			})
		} catch (e) {
			console.log(e)
		}
	}
}
export const updateUserState = (user: any) => {
	console.log(user)
	return (dispach: Dispatch<userActions>) => {
		try {
			dispach({ type: UserActionsTypes.USER_UPDATE, payload: user })
		} catch (e) {
			console.log(e)
		}
	}
}