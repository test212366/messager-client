export interface isRecordState {
	isRecord: boolean
}
export enum RecordActionTypes {
	SET_RECORD = 'SET_RECORD'
}

export interface setRecord {
	type: RecordActionTypes.SET_RECORD
	payload: boolean
}


export type isRecordActions = setRecord  