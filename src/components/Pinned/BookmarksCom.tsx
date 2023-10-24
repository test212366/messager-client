import { FC, lazy } from "react"
import { NavLink } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import Message from "../handlersC/Message"
const PersonalManager = lazy(() => import("../handlersC/PersonalManager"))

interface BookmarksComProps {
	theme: any
	user: any
	handlerChangeChatAllMessages: any
	startAnim: boolean

}

const BookmarksCom: FC<BookmarksComProps> = ({ theme, user, handlerChangeChatAllMessages, startAnim }) => {
	return (
		<div className="disFlex">
			<div className={`messages__all contacts ${theme.isLigthTheme ? "light" : ""}`}>
				<div className="wrapper__select"></div>
				<h4 className={`home__messages ${theme.isLigthTheme ? 'black' : ""}`}>Контакты <span>({user.user.chats.length})</span></h4>
				<div className="all__messages">
					<p className={`pinned ${theme.isLigthTheme ? "black" : ""}`}>все контакты</p>
				</div>
				{user.user.chats.map((chat: any, i: number) =>
					<NavLink to='/contacts' className='viewProfile' key={i}>
						<div onClick={() => handlerChangeChatAllMessages(chat)} >
							<CSSTransition in={startAnim} classNames='messages' timeout={800} >
								<Message nameUser={chat.userName} avatar={chat.avatarSRC} lastUserMess={'Ваш контакт, нажмите что-бы посмотреть профиль'} online={false} lastData={chat.time} />
							</CSSTransition>
						</div>
					</NavLink>
				)}
				{user.user.chats.length === 0 ? <p className="startChats"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z" /></svg>найдите и начните общение</p> : ''}
			</div>

			<PersonalManager inWidth={true} />
		</div>
	)
}
export default BookmarksCom