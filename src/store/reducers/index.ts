import { combineReducers } from "redux";
import { ChatUserReducer } from "./chatUserReducer";

import { FindUserReducer } from "./findUserReducer";
import { recordReducer } from "./recordReducer";
import { themeReducer } from "./themeReducer";
import { userReducer } from "./userReducer";


export const rootReducers = combineReducers({
	user: userReducer,
	theme: themeReducer,
	fingUser: FindUserReducer,
	chatUser: ChatUserReducer,
	isRecord: recordReducer,
})

export type RootState = ReturnType<typeof rootReducers>