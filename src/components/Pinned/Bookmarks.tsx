import { FC, lazy, useEffect, useState } from "react"

import { useActions } from "../../hooks/useAction"
import { useTypeSelector } from "../../hooks/useTypeSelector"

const BookmarksCom = lazy(() => import("./BookmarksCom")),
	BookmarksPhone = lazy(() => import("./BookmarksPhone"))
interface BookmarksProps {
	isPhone?: any
}

const Bookmarks: FC<BookmarksProps> = ({ isPhone }) => {
	const [startAnim, setStartAnim] = useState<boolean>(false),
		{ chatUser, user, theme } = useTypeSelector(state => state),
		{ changeUserChat } = useActions()
	useEffect(() => setStartAnim(true), [])

	const handlerChangeChatAllMessages = async (chat: any) => {
		if (chatUser.user.name === chat.userName) return
		const dataNameChat = await fetch('https://calm-bayou-24720.herokuapp.com/user/getChatUser', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify({ chat })
		}),
			userChat = await dataNameChat.json()
		changeUserChat(userChat.chatUser)
	}

	return (
		<>
			{isPhone ? <BookmarksPhone theme={theme} startAnim={startAnim} handlerChangeChatAllMessages={handlerChangeChatAllMessages} user={user} />
				: <BookmarksCom theme={theme} startAnim={startAnim} handlerChangeChatAllMessages={handlerChangeChatAllMessages} user={user} />}

		</>

	)



}
export default Bookmarks