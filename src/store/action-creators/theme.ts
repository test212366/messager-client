import { Dispatch } from "react"
import { ThemeActions, ThemeActionTypes } from "../../types/theme"

export const setIsLightTheme = (value: boolean) => {
	return (dispatch: Dispatch<ThemeActions>) => {
		try {
			dispatch({ type: ThemeActionTypes.SET_IS_LIGHT_THEME, payload: value })
		} catch (e) {
			console.error(e)
		}
	}

} 