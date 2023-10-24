import { Dispatch } from "react"
import { isRecordActions, RecordActionTypes } from "../../types/isRecord"

export const SetIsRecord = (value: boolean) => {
	return (dispatch: Dispatch<isRecordActions>) => {
		try {
			dispatch({ type: RecordActionTypes.SET_RECORD, payload: value })
		} catch (e) {
			console.log(e)
		}
	}
}