import { ThemeActions, ThemeActionTypes, themeState } from "../../types/theme";

const initionalState: themeState = {
	isLigthTheme: false
}

export const themeReducer = (state: themeState = initionalState, action: ThemeActions): themeState => {
	switch (action.type) {
		case (ThemeActionTypes.SET_IS_LIGHT_THEME):
			return { isLigthTheme: action.payload }
		default:
			return state
	}
}