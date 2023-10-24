import * as UserActionsCreators from './user'
import * as ThemeActionsCreators from './theme'
import * as FindActionsCreators from './findUser'
import * as ChangeChatUserActionsCreators from './chatUser'
import * as IsRecord from './record'

export default {
	...UserActionsCreators,
	...ThemeActionsCreators,
	...FindActionsCreators,
	...ChangeChatUserActionsCreators,
	...IsRecord
}