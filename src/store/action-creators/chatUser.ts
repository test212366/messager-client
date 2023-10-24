import { Dispatch } from "react"
import { UserChatActions, UserChatActionTypes } from "../../types/userChat"

interface UserChangeChatProps {
	name: string
	password?: string
	email: string
	token: string

}

export const changeUserChat = (user: any) => {
	return (dispatch: Dispatch<UserChatActions>) => {
		try {

			dispatch({ type: UserChatActionTypes.FETCH_USER_CHAT_SUCCESS, payload: user })
		} catch (e) {
			dispatch({ type: UserChatActionTypes.FETCH_USER_CHAT_ERROR, payload: `${e}` })
		}
	}
}