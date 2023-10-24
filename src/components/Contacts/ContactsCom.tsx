import { FC } from "react"
import { NavLink } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import Message from "../handlersC/Message"


interface ConstactsComProps {

	theme: any
	setStateValues: any
	stateValues: any
	user: any
	chatUser: any
	handlerFind: any
	selectImage: any
	handlerChangeInputValue: any
	handlerSetStatus: any
	handlerChangeContactUser: any
	handlerChangeChatAllMessages: any
	stateFind: any
	changeAvatar: any
	online: string
	handlerEmitMessage: any
	handlerSetStatusFetch: any
}
const ContactsCom: FC<ConstactsComProps> = ({ theme, online, setStateValues, changeAvatar, stateValues, handlerSetStatusFetch, handlerEmitMessage, user, handlerFind, selectImage, handlerChangeInputValue, stateFind, handlerChangeContactUser, handlerChangeChatAllMessages, chatUser, handlerSetStatus }) => {
	return (
		<div className="disFlex">
			<div className={`messages__all contacts ${theme.isLigthTheme ? 'light' : ''}`}>
				<div className="wrapper__select">

				</div>

				<h4 className={`home__messages ${theme.isLigthTheme ? "black" : ""}`}>Контакты <span>({user.user.chats.length})</span></h4>
				<div className="search">
					<input onChange={(e: any) => setStateValues({ ...stateValues, inputSearch: e.target.value })} onKeyDown={(e: any) => e.key === 'Enter' && handlerFind()} value={stateValues.inputSearch} type="text" className={`home__input-search ${theme.isLigthTheme ? "light" : ""}`} placeholder="поиск контактов.." />
					<div className={`search__logo custom__search ${theme.isLigthTheme ? "light" : ""}`} onClick={handlerFind}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<circle cx="11" cy="11" r="8" />
							<line x1="21" y1="21" x2="16.65" y2="16.65" />
						</svg>
					</div>


				</div>

				{stateFind.user.name ? <>
					<div className="pinned__messages">
						<p className={`pinned ${theme.isLigthTheme ? "black" : ""}`}>найденные пользователи</p>
						<div className="pinned__logo find">
							<svg fill="none" height="20" viewBox="0 0 35 27" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M5.60001 12.6C7.1464 12.6 8.39999 11.3464 8.39999 9.8C8.39999 8.25361 7.1464 7 5.60001 7C4.05361 7 2.8 8.25361 2.8 9.8C2.8 11.3464 4.05361 12.6 5.60001 12.6Z" strokeMiterlimit="10" strokeWidth="2" /><path d="M8.3 23.6H2.60001C1.70001 23.6 1.10001 22.9 1.10001 22V19.2C1.10001 17 2.8 15.3 5 15.3H8.5" strokeMiterlimit="10" strokeWidth="2" /><path d="M17.6 10C20.0301 10 22 8.03007 22 5.60001C22 3.16996 20.0301 1.20001 17.6 1.20001C15.17 1.20001 13.2 3.16996 13.2 5.60001C13.2 8.03007 15.17 10 17.6 10Z" strokeMiterlimit="10" strokeWidth="2" /><path d="M24.1 25.2H10.7C9.3 25.2 8.2 24.1 8.2 22.7V18.4C8.2 15 11.1 12.2 14.6 12.2H20.3C23.8 12.2 26.7 15 26.7 18.4V22.7C26.6 24.1 25.5 25.2 24.1 25.2Z" strokeMiterlimit="10" strokeWidth="2" /><path d="M29 12.6C30.5464 12.6 31.8 11.3464 31.8 9.8C31.8 8.25361 30.5464 7 29 7C27.4536 7 26.2 8.25361 26.2 9.8C26.2 11.3464 27.4536 12.6 29 12.6Z" strokeMiterlimit="10" strokeWidth="2" /><path d="M26.3 23.6H32C32.9 23.6 33.5 22.9 33.5 22V19.2C33.5 17 31.8 15.3 29.6 15.3H26.1" strokeMiterlimit="10" strokeWidth="2" /></svg>

						</div>
					</div>
					<div onClick={handlerChangeContactUser}>
						<CSSTransition in={stateValues.startAnim} classNames='messages' timeout={800}>
							<Message nameUser={stateFind.user.name} avatar={stateFind.user.avatarSRC} online={false} isContact={true} />
						</CSSTransition>
					</div>

				</>
					: ''}





				<div className="pinned__messages">
					<p className={`pinned ${theme.isLigthTheme ? "black" : ""}`}>закреплённые</p>
					<div className="pinned__logo">
						<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="50px" height="50px" viewBox="0 0 256 256"  >

							<defs>
							</defs>
							<g>
								<g  >
									<path d="M 84.303 82.191 l -6.492 -6.492 l -6.492 -6.492 c -1.077 -1.087 -2.175 -2.153 -3.235 -3.257 c -0.016 -0.009 -0.031 -0.017 -0.047 -0.025 l -2.154 -2.154 L 90 39.653 l -1.056 -1.056 c -9.367 -9.368 -23.457 -12.705 -36.139 -8.632 l -7.345 -7.344 c 0.929 -7.947 -1.815 -15.958 -7.422 -21.565 L 36.983 0 L 0 36.982 l 1.057 1.056 c 5.606 5.606 13.614 8.353 21.565 7.422 l 7.345 7.345 c -4.073 12.681 -0.737 26.772 8.631 36.139 L 39.653 90 l 24.117 -24.117 l 2.155 2.155 c 0.008 0.015 0.016 0.031 0.025 0.046 c 1.1 1.058 2.164 2.152 3.247 3.226 l 8.081 8.081 l 0 0 l 4.912 4.912 l 3.246 3.246 c 1.403 0.761 2.796 1.532 4.302 2.19 c -0.658 -1.506 -1.429 -2.899 -2.19 -4.302 L 84.303 82.191 z M 33.086 52.897 l 0.311 -0.886 l -9.714 -9.714 l -0.742 0.108 c -6.763 0.987 -13.633 -1.042 -18.681 -5.459 L 36.948 4.26 c 4.415 5.047 6.447 11.92 5.458 18.68 l -0.108 0.742 l 9.714 9.714 l 0.886 -0.311 c 11.361 -3.984 24.084 -1.387 32.853 6.593 L 39.678 85.75 C 31.698 76.981 29.102 64.254 33.086 52.897 z" strokeLinecap="round" />
								</g>
							</g>
						</svg>
					</div>
				</div>

				{user.user.pinnedChats.length === 0 ? <p className={`startChats ${theme.isLigthTheme ? 'black' : ""}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z" /></svg>закрепите свой первый чат</p> : ''}

				{user.user.pinnedChats.map((chat: any, i: number) => <div key={i} onClick={() => handlerChangeChatAllMessages(chat)}>
					<CSSTransition in={stateValues.startAnim} classNames='messages' timeout={800} >
						<Message nameUser={chat.userName} avatar={chat.avatarSRC} lastUserMess={'Ваш закрепленный контакт '} online={false} />
					</CSSTransition>
				</div>
				)}


				<div className="all__messages">
					<p className={`pinned ${theme.isLigthTheme ? "black" : ""}`}>все контакты</p>
				</div>
				{user.user.chats.map((chat: any, i: number) => <div key={i} onClick={() => handlerChangeChatAllMessages(chat)} >
					<CSSTransition in={stateValues.startAnim} classNames='messages' timeout={800} >
						<Message nameUser={chat.userName} avatar={chat.avatarSRC} lastUserMess={'Ваш контакт, нажмите что-бы посмотреть профиль'} online={false} lastData={chat.time} isRead={chat.isRead} />
					</CSSTransition>
				</div>
				)}
				{user.user.chats.length === 0 ? <p className={`startChats ${theme.isLigthTheme ? 'black' : ""}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z" /></svg>найдите и начните общение</p> : ''}






			</div>
			{
				user.user.name && chatUser.user.name === '' ?
					<>

						<div className="wrapper__contacts">
							<CSSTransition in={stateValues.startAnim} classNames='headMess' timeout={800} >
								<div className={`user__head contacts__user-head ${theme.isLigthTheme ? "light" : ""}`}>
									<p> <span>@</span>{user.user.id}</p>

									<div className="wrapper__navigation">

										<NavLink to='/settings'>
											<div className={`settings pr ${theme.isLigthTheme ? "black" : ""}`}>
												<div className="navbar__messages">
													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="30px" height="30px"><path d="M 22.205078 2 A 1.0001 1.0001 0 0 0 21.21875 2.8378906 L 20.246094 8.7929688 C 19.076509 9.1331971 17.961243 9.5922728 16.910156 10.164062 L 11.996094 6.6542969 A 1.0001 1.0001 0 0 0 10.708984 6.7597656 L 6.8183594 10.646484 A 1.0001 1.0001 0 0 0 6.7070312 11.927734 L 10.164062 16.873047 C 9.583454 17.930271 9.1142098 19.051824 8.765625 20.232422 L 2.8359375 21.21875 A 1.0001 1.0001 0 0 0 2.0019531 22.205078 L 2.0019531 27.705078 A 1.0001 1.0001 0 0 0 2.8261719 28.691406 L 8.7597656 29.742188 C 9.1064607 30.920739 9.5727226 32.043065 10.154297 33.101562 L 6.6542969 37.998047 A 1.0001 1.0001 0 0 0 6.7597656 39.285156 L 10.648438 43.175781 A 1.0001 1.0001 0 0 0 11.927734 43.289062 L 16.882812 39.820312 C 17.936999 40.39548 19.054994 40.857928 20.228516 41.201172 L 21.21875 47.164062 A 1.0001 1.0001 0 0 0 22.205078 48 L 27.705078 48 A 1.0001 1.0001 0 0 0 28.691406 47.173828 L 29.751953 41.1875 C 30.920633 40.838997 32.033372 40.369697 33.082031 39.791016 L 38.070312 43.291016 A 1.0001 1.0001 0 0 0 39.351562 43.179688 L 43.240234 39.287109 A 1.0001 1.0001 0 0 0 43.34375 37.996094 L 39.787109 33.058594 C 40.355783 32.014958 40.813915 30.908875 41.154297 29.748047 L 47.171875 28.693359 A 1.0001 1.0001 0 0 0 47.998047 27.707031 L 47.998047 22.207031 A 1.0001 1.0001 0 0 0 47.160156 21.220703 L 41.152344 20.238281 C 40.80968 19.078827 40.350281 17.974723 39.78125 16.931641 L 43.289062 11.933594 A 1.0001 1.0001 0 0 0 43.177734 10.652344 L 39.287109 6.7636719 A 1.0001 1.0001 0 0 0 37.996094 6.6601562 L 33.072266 10.201172 C 32.023186 9.6248101 30.909713 9.1579916 29.738281 8.8125 L 28.691406 2.828125 A 1.0001 1.0001 0 0 0 27.705078 2 L 22.205078 2 z M 23.056641 4 L 26.865234 4 L 27.861328 9.6855469 A 1.0001 1.0001 0 0 0 28.603516 10.484375 C 30.066026 10.848832 31.439607 11.426549 32.693359 12.185547 A 1.0001 1.0001 0 0 0 33.794922 12.142578 L 38.474609 8.7792969 L 41.167969 11.472656 L 37.835938 16.220703 A 1.0001 1.0001 0 0 0 37.796875 17.310547 C 38.548366 18.561471 39.118333 19.926379 39.482422 21.380859 A 1.0001 1.0001 0 0 0 40.291016 22.125 L 45.998047 23.058594 L 45.998047 26.867188 L 40.279297 27.871094 A 1.0001 1.0001 0 0 0 39.482422 28.617188 C 39.122545 30.069817 38.552234 31.434687 37.800781 32.685547 A 1.0001 1.0001 0 0 0 37.845703 33.785156 L 41.224609 38.474609 L 38.53125 41.169922 L 33.791016 37.84375 A 1.0001 1.0001 0 0 0 32.697266 37.808594 C 31.44975 38.567585 30.074755 39.148028 28.617188 39.517578 A 1.0001 1.0001 0 0 0 27.876953 40.3125 L 26.867188 46 L 23.052734 46 L 22.111328 40.337891 A 1.0001 1.0001 0 0 0 21.365234 39.53125 C 19.90185 39.170557 18.522094 38.59371 17.259766 37.835938 A 1.0001 1.0001 0 0 0 16.171875 37.875 L 11.46875 41.169922 L 8.7734375 38.470703 L 12.097656 33.824219 A 1.0001 1.0001 0 0 0 12.138672 32.724609 C 11.372652 31.458855 10.793319 30.079213 10.427734 28.609375 A 1.0001 1.0001 0 0 0 9.6328125 27.867188 L 4.0019531 26.867188 L 4.0019531 23.052734 L 9.6289062 22.117188 A 1.0001 1.0001 0 0 0 10.435547 21.373047 C 10.804273 19.898143 11.383325 18.518729 12.146484 17.255859 A 1.0001 1.0001 0 0 0 12.111328 16.164062 L 8.8261719 11.46875 L 11.523438 8.7734375 L 16.185547 12.105469 A 1.0001 1.0001 0 0 0 17.28125 12.148438 C 18.536908 11.394293 19.919867 10.822081 21.384766 10.462891 A 1.0001 1.0001 0 0 0 22.132812 9.6523438 L 23.056641 4 z M 25 17 C 20.593567 17 17 20.593567 17 25 C 17 29.406433 20.593567 33 25 33 C 29.406433 33 33 29.406433 33 25 C 33 20.593567 29.406433 17 25 17 z M 25 19 C 28.325553 19 31 21.674447 31 25 C 31 28.325553 28.325553 31 25 31 C 21.674447 31 19 28.325553 19 25 C 19 21.674447 21.674447 19 25 19 z" /></svg>
												</div>
											</div>

										</NavLink>


									</div>

								</div>
							</CSSTransition>
							<div className="user__desc-all contacts__userDesc">
								<div className="user__photo">
									{user.user.loadingAvatar ? <div className="lds-spinner  "><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> : ""}
									<img src={user.user.avatarSRC || 'https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png'} width='80px' height='80px' alt="userPhoto" onClick={() => selectImage.current.click()} />
									<input ref={selectImage} type="file" className="fileSelectNone" onChange={(e: any) => changeAvatar(user, e)} />
									<div className="online BIG"></div>
								</div>
								<div className="user__description">
									<p className={`user__name ${theme.isLigthTheme ? "black" : ""}`}>{user.user.name}</p>
									<p className={`user__online ${theme.isLigthTheme ? "black" : ""}`}>{online !== 'ne в ' ? `был(а) ${online}` : 'online'}</p>
									{stateValues.visibleSetStatus ? '' : user.user.status ? <p className={`user__status ${theme.isLigthTheme ? "black" : ""}`} onClick={handlerSetStatus}>{user.user.status}</p> : <p className="user__status setStatus" onClick={handlerSetStatus}>Установить статус</p>}


								</div>
								{stateValues.visibleSetStatus ?
									<>
										<input type="text" value={stateValues.inputValue} onChange={handlerChangeInputValue} placeholder='Установить статус' className={`user__set-user-status ${theme.isLigthTheme ? "light" : ""}`} />
										<button className="buttonStatus" onClick={() => {
											setStateValues({ ...stateValues, inputValue: '' })
											setStateValues({ ...stateValues, lengthValueInput: 0 })
										}}>&#10006;</button>
										<button className="buttonStatus" onClick={handlerSetStatusFetch}><svg version="1.1" id="Capa_1" height='20px' width='20px' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
											viewBox="0 0 568.599 568.599"  >
											<g>
												<g>
													<path d="M565.692,147.211L507.96,89.479c-4.08-4.08-10.404-4.08-14.484,0L241.128,342.031L75.276,176.179
			c-4.08-4.08-10.404-4.08-14.484,0L3.06,233.911c-4.08,4.08-4.08,10.404,0,14.484l230.724,230.724
			c1.836,1.836,4.488,3.06,7.14,3.06s5.304-1.02,7.14-3.06l317.628-317.424C569.568,157.615,569.568,151.291,565.692,147.211z
			 M241.128,457.495L24.684,241.051l43.248-43.248l165.852,165.852c4.08,4.08,10.404,4.08,14.484,0L500.82,111.103l43.248,43.248
			L241.128,457.495z"/>
													<path d="M497.148,133.543L352.92,277.771c-2.04,2.04-2.04,5.304,0,7.14c1.02,1.02,2.244,1.428,3.672,1.428
			c1.428,0,2.652-0.408,3.672-1.428L500.82,144.355l10.812,10.812c2.04,2.04,5.304,2.04,7.14,0c2.04-2.04,2.04-5.304,0-7.14
			l-14.484-14.484c-1.02-1.02-2.244-1.428-3.672-1.428C499.188,132.115,498.168,132.523,497.148,133.543z"/>
												</g>
											</g>
											<g>
											</g>
											<g>
											</g>
											<g>
											</g>
											<g>
											</g>
											<g>
											</g>
											<g>
											</g>
											<g>
											</g>
											<g>
											</g>
											<g>
											</g>
											<g>
											</g>
											<g>
											</g>
											<g>
											</g>
											<g>
											</g>
											<g>
											</g>
											<g>
											</g>
										</svg>
										</button>
										<p className="maxLengthStatus">{stateValues.lengthValueInput}/20</p>
									</> : ""}
							</div>
							<div className="wrapper__buttons-contacts">

								<p className="statistics__manager">Статистика выполненных задач</p>


							</div>
							<div className="wrapper__statistics-contacts">
								<ResponsiveContainer width="100%" height="100%">
									<LineChart
										width={600}
										height={500}
										data={user.user.data}
										margin={{
											top: 20,
											right: 20,
											left: 40,
											bottom: 5,
										}}
									>
										<CartesianGrid strokeDasharray="2 2" />
										<XAxis dataKey="name" />
										<YAxis />
										<Tooltip />
										<Legend />
										<Line type="monotone" dataKey="completed" stroke="#8884d8" activeDot={{ r: 8 }} />
										<Line type="monotone" dataKey="ongoing" stroke="#82ca9d" />
									</LineChart>
								</ResponsiveContainer>

								<p className="statistics__manager pl">Контакты пользователя</p>
								<div className="pl">
									{user.user.chats.map((chat: any, i: number) => <Message key={i} avatar={chat.avatarSRC} nameUser={chat.userName} lastUserMess={`Контакт пользователя, ${user.user.name}`} lastData={chat.time} online={false} />)}
								</div>




							</div>

						</div>
					</>

					: <>

						<div className="wrapper__contacts"><CSSTransition in={stateValues.startAnim} classNames='headMess' timeout={800} >
							<div className={`user__head contacts__user-head ${theme.isLigthTheme ? "light" : ""}`}>
								<p> <span>@</span>{chatUser.user._id}</p>

								<div className="wrapper__navigation">

									<NavLink to='/settings'>
										<div className={`settings pr ${theme.isLigthTheme ? "black" : ""}`}>
											<div className="navbar__messages">
												<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="30px" height="30px"><path d="M 22.205078 2 A 1.0001 1.0001 0 0 0 21.21875 2.8378906 L 20.246094 8.7929688 C 19.076509 9.1331971 17.961243 9.5922728 16.910156 10.164062 L 11.996094 6.6542969 A 1.0001 1.0001 0 0 0 10.708984 6.7597656 L 6.8183594 10.646484 A 1.0001 1.0001 0 0 0 6.7070312 11.927734 L 10.164062 16.873047 C 9.583454 17.930271 9.1142098 19.051824 8.765625 20.232422 L 2.8359375 21.21875 A 1.0001 1.0001 0 0 0 2.0019531 22.205078 L 2.0019531 27.705078 A 1.0001 1.0001 0 0 0 2.8261719 28.691406 L 8.7597656 29.742188 C 9.1064607 30.920739 9.5727226 32.043065 10.154297 33.101562 L 6.6542969 37.998047 A 1.0001 1.0001 0 0 0 6.7597656 39.285156 L 10.648438 43.175781 A 1.0001 1.0001 0 0 0 11.927734 43.289062 L 16.882812 39.820312 C 17.936999 40.39548 19.054994 40.857928 20.228516 41.201172 L 21.21875 47.164062 A 1.0001 1.0001 0 0 0 22.205078 48 L 27.705078 48 A 1.0001 1.0001 0 0 0 28.691406 47.173828 L 29.751953 41.1875 C 30.920633 40.838997 32.033372 40.369697 33.082031 39.791016 L 38.070312 43.291016 A 1.0001 1.0001 0 0 0 39.351562 43.179688 L 43.240234 39.287109 A 1.0001 1.0001 0 0 0 43.34375 37.996094 L 39.787109 33.058594 C 40.355783 32.014958 40.813915 30.908875 41.154297 29.748047 L 47.171875 28.693359 A 1.0001 1.0001 0 0 0 47.998047 27.707031 L 47.998047 22.207031 A 1.0001 1.0001 0 0 0 47.160156 21.220703 L 41.152344 20.238281 C 40.80968 19.078827 40.350281 17.974723 39.78125 16.931641 L 43.289062 11.933594 A 1.0001 1.0001 0 0 0 43.177734 10.652344 L 39.287109 6.7636719 A 1.0001 1.0001 0 0 0 37.996094 6.6601562 L 33.072266 10.201172 C 32.023186 9.6248101 30.909713 9.1579916 29.738281 8.8125 L 28.691406 2.828125 A 1.0001 1.0001 0 0 0 27.705078 2 L 22.205078 2 z M 23.056641 4 L 26.865234 4 L 27.861328 9.6855469 A 1.0001 1.0001 0 0 0 28.603516 10.484375 C 30.066026 10.848832 31.439607 11.426549 32.693359 12.185547 A 1.0001 1.0001 0 0 0 33.794922 12.142578 L 38.474609 8.7792969 L 41.167969 11.472656 L 37.835938 16.220703 A 1.0001 1.0001 0 0 0 37.796875 17.310547 C 38.548366 18.561471 39.118333 19.926379 39.482422 21.380859 A 1.0001 1.0001 0 0 0 40.291016 22.125 L 45.998047 23.058594 L 45.998047 26.867188 L 40.279297 27.871094 A 1.0001 1.0001 0 0 0 39.482422 28.617188 C 39.122545 30.069817 38.552234 31.434687 37.800781 32.685547 A 1.0001 1.0001 0 0 0 37.845703 33.785156 L 41.224609 38.474609 L 38.53125 41.169922 L 33.791016 37.84375 A 1.0001 1.0001 0 0 0 32.697266 37.808594 C 31.44975 38.567585 30.074755 39.148028 28.617188 39.517578 A 1.0001 1.0001 0 0 0 27.876953 40.3125 L 26.867188 46 L 23.052734 46 L 22.111328 40.337891 A 1.0001 1.0001 0 0 0 21.365234 39.53125 C 19.90185 39.170557 18.522094 38.59371 17.259766 37.835938 A 1.0001 1.0001 0 0 0 16.171875 37.875 L 11.46875 41.169922 L 8.7734375 38.470703 L 12.097656 33.824219 A 1.0001 1.0001 0 0 0 12.138672 32.724609 C 11.372652 31.458855 10.793319 30.079213 10.427734 28.609375 A 1.0001 1.0001 0 0 0 9.6328125 27.867188 L 4.0019531 26.867188 L 4.0019531 23.052734 L 9.6289062 22.117188 A 1.0001 1.0001 0 0 0 10.435547 21.373047 C 10.804273 19.898143 11.383325 18.518729 12.146484 17.255859 A 1.0001 1.0001 0 0 0 12.111328 16.164062 L 8.8261719 11.46875 L 11.523438 8.7734375 L 16.185547 12.105469 A 1.0001 1.0001 0 0 0 17.28125 12.148438 C 18.536908 11.394293 19.919867 10.822081 21.384766 10.462891 A 1.0001 1.0001 0 0 0 22.132812 9.6523438 L 23.056641 4 z M 25 17 C 20.593567 17 17 20.593567 17 25 C 17 29.406433 20.593567 33 25 33 C 29.406433 33 33 29.406433 33 25 C 33 20.593567 29.406433 17 25 17 z M 25 19 C 28.325553 19 31 21.674447 31 25 C 31 28.325553 28.325553 31 25 31 C 21.674447 31 19 28.325553 19 25 C 19 21.674447 21.674447 19 25 19 z" /></svg>
											</div>
										</div>

									</NavLink>



								</div>

							</div>
						</CSSTransition>
							<div className="user__desc-all contacts__userDesc">
								<div className="user__photo">
									<img src={chatUser.user.avatarSRC || 'https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png'} width='80px' height='80px' alt="userPhoto" />
									<div className="online BIG"></div>
								</div>
								<div className="user__description">
									<p className={`user__name ${theme.isLigthTheme ? "black" : ""}`}>{chatUser.user.name}</p>
									<p className={`user__online ${theme.isLigthTheme ? "black" : ""}`}>{online !== 'ne в ' ? `был(а) ${online}` : 'online'}</p>
									<p className={`user__status ${theme.isLigthTheme ? "black" : ""}`}>{chatUser.user.status}</p>

								</div>
							</div>
							<div className="wrapper__buttons-contacts">
								<NavLink to='/' >
									<button className="message__button" onClick={handlerEmitMessage}>Написать сообщение</button>
								</NavLink>


								<p className="statistics__manager">Статистика выполненных задач</p>


							</div>
							<div className="wrapper__statistics-contacts">
								<ResponsiveContainer width="100%" height="100%">
									<LineChart
										width={600}
										height={500}
										data={stateValues.data}
										margin={{
											top: 20,
											right: 20,
											left: 40,
											bottom: 5,
										}}
									>
										<CartesianGrid strokeDasharray="2 2" />
										<XAxis dataKey="name" />
										<YAxis />
										<Tooltip />
										<Legend />
										<Line type="monotone" dataKey="completed" stroke="#8884d8" activeDot={{ r: 8 }} />
										<Line type="monotone" dataKey="ongoing" stroke="#82ca9d" />
									</LineChart>
								</ResponsiveContainer>

								<p className="statistics__manager pl">Контакты пользователя  </p>
								<div className="pl">
									{chatUser.user.chats.map((chat: any, i: number) => <Message key={i} avatar={chat.avatarSRC} nameUser={chat.userName} lastUserMess={`Контакт пользователя, ${user.user.name}`} lastData={chat.time} online={false} />)}
								</div>





							</div>

						</div>
					</>
			}





		</div >
	)
}
export default ContactsCom