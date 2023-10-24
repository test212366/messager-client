import { FC, lazy } from "react"
import { NavLink } from "react-router-dom"


import AllMessages from "../handlersC/AllMessages"
import ChatMessage from "../handlersC/ChatMessage"
import Customaudio from "../handlersC/Customaudio"
import NavBar from "../handlersC/NavBar"
const PersonalManager = lazy(() => import("../handlersC/PersonalManager"))
const Slider = lazy(() => import("react-slick"))
interface MessagesPhoneProps {
	slider: any
	theme: any
	setStateValues: any
	stateValues: any
	user: any
	chatUser: any
	handlerSetPinnedChat: any
	selectImage: any
	setLocalMess: any
	onRecord: any
	pinnedChats: any
	localMess: any
	localChats: any
	setLocalChats: any
	setLoadingMess: any
	online: string
	isPhone: boolean
	isRecord: any
	handlerPinnedChat: any
	handlerChange: any
	loadingMess: any
	handlerSelectPhoto: any
	stop: any
	handlerSend: any
	bottomScroll: any
}

const MessagesPhone: FC<MessagesPhoneProps> = ({ slider, stop, handlerSend, handlerChange, handlerSelectPhoto, handlerPinnedChat, isRecord, onRecord, handlerSetPinnedChat, loadingMess, bottomScroll, chatUser, isPhone, localMess, pinnedChats, setLocalChats, setLoadingMess, setLocalMess, localChats, online, selectImage, setStateValues, stateValues, theme, user }) => {
	return (
		<div className="mobuleMessages">
			<Slider ref={slider} {...{
				Infinite: false,
				speed: 500,
				slidesToShow: 1,
				slidesToScroll: 1,

			}}>
				<div>
					<div className={`disFlex ${theme.isLigthTheme ? 'light' : ""}`}>

						<NavBar />
						<AllMessages chatUserLocal={stateValues} isPhone={isPhone} slider={slider} setChatUser={setStateValues} setLocalChats={setLocalChats} setLoadingMess={setLoadingMess} setLocalMessages={setLocalMess} userChatName={chatUser.user.name} localChats={localChats} yourName={user.user.name} pinnedChats={pinnedChats} />

					</div>

				</div>
				<div>
					<div className={theme.isLigthTheme ? "chat light" : "chat"}>

						<div className={localMess.length === 0 && stateValues.chatUserLocal.user.name == '' ? theme.isLigthTheme ? 'user__head noneChat light' : 'user__head noneChat' : theme.isLigthTheme ? "user__head light" : "user__head"}>

							<div className="user__desc-all">
								{localMess.length === 0 && stateValues.chatUserLocal.user.name == '' ? <p className={theme.isLigthTheme ? "LogoRease black" : "LogoRease"}> <span>N</span>ZOx</p> : <>
									<NavLink to='/contacts' className='viewProfile'   >
										<div className="user__photo">
											<img src={stateValues.chatUserLocal.user.avatarSRC || 'https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png'} width='80px' height='80px' alt="userPhoto" />

											{online !== 'ne в ' ? '' : <div className="online BIG"></div>}

										</div>
										<div className="user__description">
											<p className={theme.isLigthTheme ? "user__name black" : "user__name"}>{stateValues.chatUserLocal.user.name !== user.user.name ? stateValues.chatUserLocal.user.name : 'Вы'}</p>
											<p className={theme.isLigthTheme ? "user__online black" : "user__online"}>{online !== 'ne в ' ? `был(а) ${online}` : 'online'}</p>
											<p className={theme.isLigthTheme ? "user__status black" : "user__status"}>   {stateValues.chatUserLocal.user.status}</p>



										</div>	</NavLink></>}

							</div>

							{isPhone ? <><div className="phoneArrows messagesItem">
								<div className="arrow">
									<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
										width="15px" height="15px" viewBox="0 0 284.929 284.929"
									>
										<g>
											<path d="M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441
		L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082
		c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647
		c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z"/>
										</g>

									</svg>
								</div>

							</div>
								<div className="phoneArrowsSecond messageItemSecond">
									<div className="arrow">
										<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
											width="15px" height="15px" viewBox="0 0 284.929 284.929"
										>
											<g>
												<path d="M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441
		L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082
		c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647
		c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z"/>
											</g>

										</svg>
									</div>
								</div>
							</> : ''}


							<div className="wrapper__navigation">
								{localMess.length === 0 && stateValues.chatUserLocal.user.name == '' ? '' : ""}
								{stateValues.isPinned ?
									<div onClick={handlerSetPinnedChat} >
										<div className="remove__pinned-chat">
											<p>&#10006;</p>
										</div>
									</div>

									: <div onClick={handlerPinnedChat} >
										<div className={theme.isLigthTheme ? "navbar__messages pine__head black" : "navbar__messages pine__head"}>
											<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="60px" height="60px" viewBox="0 0 256 256"  >

												<defs>
												</defs>
												<g>
													<g  >
														<path d="M 84.303 82.191 l -6.492 -6.492 l -6.492 -6.492 c -1.077 -1.087 -2.175 -2.153 -3.235 -3.257 c -0.016 -0.009 -0.031 -0.017 -0.047 -0.025 l -2.154 -2.154 L 90 39.653 l -1.056 -1.056 c -9.367 -9.368 -23.457 -12.705 -36.139 -8.632 l -7.345 -7.344 c 0.929 -7.947 -1.815 -15.958 -7.422 -21.565 L 36.983 0 L 0 36.982 l 1.057 1.056 c 5.606 5.606 13.614 8.353 21.565 7.422 l 7.345 7.345 c -4.073 12.681 -0.737 26.772 8.631 36.139 L 39.653 90 l 24.117 -24.117 l 2.155 2.155 c 0.008 0.015 0.016 0.031 0.025 0.046 c 1.1 1.058 2.164 2.152 3.247 3.226 l 8.081 8.081 l 0 0 l 4.912 4.912 l 3.246 3.246 c 1.403 0.761 2.796 1.532 4.302 2.19 c -0.658 -1.506 -1.429 -2.899 -2.19 -4.302 L 84.303 82.191 z M 33.086 52.897 l 0.311 -0.886 l -9.714 -9.714 l -0.742 0.108 c -6.763 0.987 -13.633 -1.042 -18.681 -5.459 L 36.948 4.26 c 4.415 5.047 6.447 11.92 5.458 18.68 l -0.108 0.742 l 9.714 9.714 l 0.886 -0.311 c 11.361 -3.984 24.084 -1.387 32.853 6.593 L 39.678 85.75 C 31.698 76.981 29.102 64.254 33.086 52.897 z" strokeLinecap="round" />
													</g>
												</g>
											</svg>
										</div>
									</div>}




								{stateValues.isVolume ? <div className="calls pr" onClick={() => setStateValues({ ...stateValues, isVolume: !stateValues.isVolume })}>
									<div className={theme.isLigthTheme ? 'navbar__messages black' : "navbar__messages"}>
										<svg height='30px' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs> </defs><title /><g data-name="Layer 32" id="Layer_32"><path d="M16,31a5,5,0,0,1-5-5,1,1,0,0,1,2,0,3,3,0,0,0,.88,2.12,3.06,3.06,0,0,0,4.24,0,1,1,0,0,1,1.42,1.42A5,5,0,0,1,16,31Z" /><path d="M16,6a1,1,0,0,1-1-1V2a1,1,0,0,1,2,0V5A1,1,0,0,1,16,6Z" /><rect height="36.77" transform="translate(-6.61 16.79) rotate(-47)" width="2" x="15" y="-2.38" /><path d="M26.73,27H5a1,1,0,0,1-.89-1.45,18.08,18.08,0,0,0,1.89-8V14a8,8,0,0,1,.06-1,1,1,0,1,1,2,.28A6,6,0,0,0,8,14v3.53A20.07,20.07,0,0,1,6.55,25H26.73a1,1,0,1,1,0,2Z" /><path d="M25.06,20a1,1,0,0,1-1-.92Q24,18.31,24,17.53V14A8,8,0,0,0,11.93,7.12,7.66,7.66,0,0,0,9.35,9.57a1,1,0,1,1-1.68-1.1A9.74,9.74,0,0,1,10.92,5.4,9.95,9.95,0,0,1,23.07,6.94,9.86,9.86,0,0,1,26,14v3.53c0,.46,0,.91.06,1.37A1,1,0,0,1,25.14,20Z" /></g></svg>
									</div>
								</div> : <div className="calls pr" onClick={() => setStateValues({ ...stateValues, isVolume: !stateValues.isVolume })}>
									<div className={theme.isLigthTheme ? 'navbar__messages black' : "navbar__messages"}>
										<svg height="30px" version="1.1" viewBox="0 0 24 24" width="30px" xmlns="http://www.w3.org/2000/svg"><title /><path d="M15.984 17.016v-6c0-2.484-1.5-4.5-3.984-4.5s-3.984 2.016-3.984 4.5v6h7.969zM18 15.984l2.016 2.016v0.984h-16.031v-0.984l2.016-2.016v-4.969c0-3.094 1.641-5.625 4.5-6.328v-0.703c0-0.844 0.656-1.5 1.5-1.5s1.5 0.656 1.5 1.5v0.703c2.859 0.703 4.5 3.281 4.5 6.328v4.969zM12 21.984c-1.078 0-2.016-0.891-2.016-1.969h4.031c0 1.078-0.938 1.969-2.016 1.969z" /></svg>
									</div>
								</div>}


							</div>

						</div>

						<div className="chat__messages">
							{stateValues.loadingMessages ? <div className="loadingMessages">
								загрузка сообщений..
								<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
							</div> : ''}
							{loadingMess.map((message: any, i: number) => <ChatMessage key={i} audioUrl={message.urlAudio} imgSRC={message.imgSRC} isPhone={isPhone} isRead={message.isRead} time={message.time} you={message.secondPartner === user.user.name} name={message.secondPartner} text={message.text} />)}
							{localMess.map((message: any, i: number) => <ChatMessage key={i} audioUrl={message.urlAudio} imgSRC={message.imgSRC} isPhone={isPhone} isRead={message.isRead} time={message.time} you={message.secondPartner === user.user.name} name={message.secondPartner} text={message.text} />)}
							<div className='scroll' ref={bottomScroll}></div>
							{localMess.length === 0 && stateValues.chatUserLocal.user.name == '' && !stateValues.loadingMessages ? <div className={theme.isLigthTheme ? "info light" : "info"}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="35px" height="35px"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z" /></svg>
								Выберите или найдите чат..
							</div> : ''}
							{localMess.length === 0 && stateValues.chatUserLocal.user.name != '' && loadingMess.length === 0 && !stateValues.loadingMessages ? <div className={theme.isLigthTheme ? "info light" : "info"}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="35px" height="35px"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z" /></svg>
								Напишите что-нибудь..

							</div> : ''}

							{stateValues.typed ?
								<div className={theme.isLigthTheme ? "typed light" : 'typed'}><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
									<small>Печатает..</small>

								</div>
								: ""}

							<div className="chat__input">
								<div className="chat__input-wrapper">
									{stateValues.recorded && <Customaudio url={stateValues.urlAudioLocal} />}
									{stateValues.recorded ? <p className="audioClose" onClick={() => setStateValues({ ...stateValues, urlAudioLocal: '', urlAudio: '', recorded: false })}>&#10006;</p> : ""}
									<input ref={selectImage} type="file" className="fileSelectNone" onChange={(e) => handlerSelectPhoto(e)} />
									<input className={theme.isLigthTheme ? "chat__input-target black" : "chat__input-target"} type="text" onChange={handlerChange} value={stateValues.valueInput} placeholder="Напишите что-нибудь.." />
									<div className="addFile" onClick={() => selectImage.current.click()}>
										{stateValues.loadingPhoto || stateValues.loadingRecord ? <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
											: stateValues.havePhoto ? "" : isRecord.isRecord ? <><div className="recordNow"></div> <p className="recordingText">запись...</p> </> : <svg height="28" viewBox="0 0 28 28" width="28" xmlns="http://www.w3.org/2000/svg"><path d="M7 13.7998C7 13.3584 7.35742 13 7.80078 13H13V7.7998C13 7.58008 13.0879 7.38086 13.2324 7.23535C13.377 7.08984 13.5781 7 13.8008 7H14.1992C14.6426 7 15 7.3584 15 7.7998V13H20.1992C20.4531 13 20.6777 13.1172 20.8242 13.2998C20.9355 13.4365 21 13.6104 21 13.7998V14.2002C21 14.6416 20.6426 15 20.1992 15H15V20.2002C15 20.373 14.9453 20.5322 14.8516 20.6631C14.707 20.8662 14.4688 21 14.1992 21H13.8008C13.3574 21 13 20.6416 13 20.2002V15H7.80078C7.54883 15 7.32422 14.8838 7.17773 14.7031C7.06641 14.5654 7 14.3906 7 14.2002V13.7998Z" /><path clipRule="evenodd" d="M1 14C1 6.82031 6.82031 1 14 1C21.1797 1 27 6.82031 27 14C27 21.1797 21.1797 27 14 27C6.82031 27 1 21.1797 1 14ZM14 3C7.92578 3 3 7.9248 3 14C3 20.0752 7.92578 25 14 25C20.0742 25 25 20.0752 25 14C25 7.9248 20.0742 3 14 3Z" /></svg>
										}</div>

									{stateValues.havePhoto ? <p className="havePhoto">1</p> : ""}
									<div className="voice-message" onMouseDown={onRecord} onMouseUp={stop}  >
										<svg id="Слой_1" width='30' height='30' version="1.1" viewBox="-379 381 40 40" xmlns="http://www.w3.org/2000/svg" ><g><path d="M-359.1,410.2c4.7,0,8.5-3.8,8.5-8.5v-12.2c0-4.7-3.8-8.5-8.5-8.5c-4.7,0-8.5,3.8-8.5,8.5v12.2   C-367.6,406.4-363.8,410.2-359.1,410.2z M-365.6,400.6h4c0.6,0,1-0.4,1-1c0-0.6-0.4-1-1-1h-4v-2h4c0.6,0,1-0.4,1-1c0-0.6-0.4-1-1-1   h-4v-2h4c0.6,0,1-0.4,1-1c0-0.6-0.4-1-1-1h-4v-1.1c0-3.6,2.9-6.5,6.5-6.5c3.6,0,6.5,2.9,6.5,6.5v1.1h-4c-0.6,0-1,0.4-1,1   c0,0.5,0.5,1,1,1h4v2h-4c-0.6,0-1,0.4-1,1c0,0.5,0.5,1,1,1h4v2h-4c-0.6,0-1,0.4-1,1c0,0.5,0.5,1,1,1h4v1.1c0,3.6-2.9,6.5-6.5,6.5   c-3.6,0-6.5-2.9-6.5-6.5V400.6z" /><path d="M-346.6,401.6c0-0.5-0.5-1-1-1s-1,0.5-1,1c0,5.8-4.7,10.5-10.5,10.5c-5.8,0-10.5-4.7-10.5-10.5c0-0.5-0.5-1-1-1s-1,0.5-1,1   c0,6.6,5.1,12,11.5,12.5v4.9h-6.5c-0.5,0-1,0.4-1,1s0.5,1,1,1h15c0.5,0,1-0.4,1-1s-0.5-1-1-1h-6.5v-4.9   C-351.7,413.6-346.6,408.2-346.6,401.6z" /></g></svg>
									</div>
									<div className={theme.isLigthTheme ? "send black" : "send"} onClick={handlerSend}>
										<svg width="30" height="30" viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
											<path opacity="0.501256" d="M18.9849 8.3707L0.98361 0.062425C0.696975 -0.0677381 0.354951 0.00980584 0.155552 0.256285C-0.0452315 0.502764 -0.0521551 0.853096 0.138935 1.1065L6.05858 8.99936L0.138935 16.8922C-0.0521551 17.1456 -0.0452315 17.4973 0.154167 17.7424C0.288484 17.91 0.489268 18 0.692821 18C0.791135 18 0.88945 17.9792 0.982226 17.9363L18.9835 9.62802C19.23 9.51448 19.3864 9.26938 19.3864 8.99936C19.3864 8.72934 19.23 8.48425 18.9849 8.3707Z" />
										</svg>

									</div>
								</div>

							</div>


						</div>
					</div>
				</div>
				<div>
					<PersonalManager />
				</div>

			</Slider>
		</div>
	)
}
export default MessagesPhone