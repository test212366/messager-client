import { findUserActions, FindUserActionTypes, findUserState } from "../../types/findUsers"

const FindUserState: findUserState = {
	error: '',
	loading: false,
	user: {
		name: '',
		password: '',
		email: '',
		token: ''
	}
}


export const FindUserReducer = (state: findUserState = FindUserState, action: findUserActions): findUserState => {
	switch (action.type) {

		case (FindUserActionTypes.FETCH_FIND_USER):
			return { ...FindUserState, loading: true }
		case (FindUserActionTypes.FETCH_FIND_USER_SUCCESS):
			return { ...FindUserState, user: action.payload }
		case (FindUserActionTypes.FETCH_FIND_USER_ERROR):
			return { ...FindUserState, error: action.payload }
		case (FindUserActionTypes.CLEAR_FIND_USER):
			return { ...FindUserState }
		default:
			return state
	}

}