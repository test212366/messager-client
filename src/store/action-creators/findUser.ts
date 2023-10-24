import { Dispatch } from "react"
import { findUserActions, FindUserActionTypes } from "../../types/findUsers"

interface findUserProps {
	userName: string
}
export const findUser = ({ userName }: findUserProps) => {
	return (dispatch: Dispatch<findUserActions>) => {
		try {
			const api = async () => {
				dispatch({ type: FindUserActionTypes.FETCH_FIND_USER })
				const responce = await fetch('https://calm-bayou-24720.herokuapp.com/user/findUser', {
					headers: {
						'Content-Type': 'application/json'
					},
					method: "POST",
					body: JSON.stringify({ userName })
				})
				const data = await responce.json()
				console.log(data.user)
				if (data.error) {
					dispatch({ type: FindUserActionTypes.FETCH_FIND_USER_ERROR, payload: data.error })
				} else {
					dispatch({ type: FindUserActionTypes.FETCH_FIND_USER_SUCCESS, payload: data.user })
				}

			}
			api()
		} catch (e) {
			dispatch({ type: FindUserActionTypes.FETCH_FIND_USER_ERROR, payload: `${e}` })
		}

	}
}
export const clearFindUser = () => {
	return (dispatch: Dispatch<findUserActions>) => {
		try {
			dispatch({ type: FindUserActionTypes.CLEAR_FIND_USER })
		} catch (e) {
			dispatch({ type: FindUserActionTypes.FETCH_FIND_USER_ERROR, payload: `${e}` })
		}
	}
}