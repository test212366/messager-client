
import { isRecordActions, isRecordState, RecordActionTypes } from "../../types/isRecord"

const RecordState: isRecordState = {
	isRecord: false,

}


export const recordReducer = (state: isRecordState = RecordState, action: isRecordActions): isRecordState => {
	switch (action.type) {
		case (RecordActionTypes.SET_RECORD):
			return { isRecord: action.payload }
		default:
			return state
	}

}