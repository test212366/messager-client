export interface themeState {
	isLigthTheme: boolean
}
export enum ThemeActionTypes {
	SET_IS_LIGHT_THEME = 'SET_IS_LIGHT_THEME'
}
interface SetTheme {
	type: ThemeActionTypes.SET_IS_LIGHT_THEME
	payload: boolean
}
export type ThemeActions = SetTheme