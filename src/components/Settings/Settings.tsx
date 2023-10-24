import { FC, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import { useActions } from "../../hooks/useAction"
import { useTypeSelector } from "../../hooks/useTypeSelector"
import Message from "../handlersC/Message"
import NavBar from "../handlersC/NavBar"


interface SettingsProps {
	isPhone?: any

}
const Settings: FC<SettingsProps> = ({ isPhone }) => {
	const [stateValues, setStateValues] = useState({
		openRegister: false,
		dialogs: false,
		pinnedDialogs: false,
		email: false,
		startAnim: false
	}),
		{ user, theme } = useTypeSelector(state => state),
		{ exitUser } = useActions()


	useEffect(() => setStateValues({ ...stateValues, startAnim: true }), [])

	const handlerExit = async () => {
		localStorage.removeItem('token')
		exitUser()
		await fetch('https://calm-bayou-24720.herokuapp.com/user/updateOnline', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify({ userName: user.user.name, online: `${new Date()}` })
		})
	}

	return (
		<section className={`${isPhone ? `mobuleMessages disFlex ${theme.isLigthTheme ? 'light' : ""}` : 'settings__center'}`}  >
			{isPhone && <NavBar isSettingsPhone={isPhone} />}

			<div className={`settingsItem ${theme.isLigthTheme ? "light" : ""}`}>
				<NavLink to='/contacts' className='noneViewProfile'>
					<div className={`settings__user ${theme.isLigthTheme ? 'light' : ''}`}>
						<div className="user__first-info">
							<div className="settings__id">
								<p> <span>@</span>{user.user.id}</p>
							</div>
							<div className="user__photo">
								<img src={user.user.avatarSRC || 'https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png'} width='80px' height='80px' alt="userPhoto" />
								<div className="online BIG"></div>
							</div>
						</div>

						<div className="user__info">
							<div className="settings__name">
								{user.user.name}
							</div>
							<div className={`settings__status ${theme.isLigthTheme ? "black" : ''}`}>
								{user.user.status ? user.user.status : "Установите статус"}
							</div>
							<div className="settings__info">
								нажмите что-бы посмотреть профиль
							</div>
						</div>

					</div>
				</NavLink>

				<div className={`settings__buttons ${theme.isLigthTheme ? "lightButtonExit" : ""}`}>
					<CSSTransition in={stateValues.startAnim} classNames='messages' timeout={800}>
						<div className={`acardion__item ${theme.isLigthTheme ? "light" : ""}`} >
							<button onClick={() => setStateValues({ ...stateValues, dialogs: !stateValues.dialogs })}>Список диалогов
								<div className={stateValues.dialogs ? 'arrow rotate' : 'arrow'}>
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

							</button>
							<div className={stateValues.dialogs ? 'settings__show-accordion  show-accordion  ' : "settings__show-accordion  "}>
								{user.user.chats.length === 0 ? <p className={`noneAccordion ${theme.isLigthTheme ? "black" : ""}`}>нет диалогов...</p> : ""}
								{user.user.chats.map((chat: any, i: number) => <div className="dialog__item" key={i} >
									<Message nameUser={chat.userName} avatar={chat.avatarSRC} lastUserMess={`Контакт пользователя, ${user.user.name}`} lastData={chat.time} online={false} />
								</div>
								)}
							</div>
						</div>


					</CSSTransition>

					<CSSTransition in={stateValues.startAnim} classNames='messages' timeout={800}>

						<div className={`acardion__item ${theme.isLigthTheme ? "light" : ""}`} >
							<button onClick={() => setStateValues({ ...stateValues, pinnedDialogs: !stateValues.pinnedDialogs })}>Список закрепленных диалогов
								<div className={stateValues.pinnedDialogs ? 'arrow rotate' : 'arrow'}>
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

							</button>
							<div className={stateValues.pinnedDialogs ? 'settings__show-accordion  show-accordion  ' : "settings__show-accordion  "}>
								{user.user.pinnedChats.length === 0 ? <p className={`noneAccordion ${theme.isLigthTheme ? "black" : ""}`}>нет закрепленных диалогов...</p> : ""}
								{user.user.pinnedChats.map((chat: any, i: number) => <div className="dialog__item" key={i} >
									<Message nameUser={chat.userName} avatar={chat.avatarSRC} lastUserMess={`Контакт пользователя, ${user.user.name}`} lastData={chat.time} online={false} />
								</div>
								)}
							</div>
						</div>
					</CSSTransition>
					<CSSTransition in={stateValues.startAnim} classNames='messages' timeout={800}>
						<div className={`acardion__item ${theme.isLigthTheme ? "light" : ""}`} >
							<button onClick={() => setStateValues({ ...stateValues, email: !stateValues.email })}>ваш email
								<div className={stateValues.email ? 'arrow rotate' : 'arrow'}>
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
							</button>
							<div className={stateValues.email ? `settings__show-accordion email__show show-accordion-email ${theme.isLigthTheme ? "black" : ""} ` : `settings__show-accordion email__show ${theme.isLigthTheme ? "black" : ""}`}>
								<p>{user.user.email}</p>
							</div>
						</div>
					</CSSTransition>
					<button onClick={() => setStateValues({ ...stateValues, openRegister: true })}>выйти из профиля </button>
				</div>
				<CSSTransition in={stateValues.openRegister} classNames='alert' timeout={100} unmountOnExit>
					<>
						<div className="confirm__exit-bg" onClick={() => setStateValues({ ...stateValues, openRegister: false })}>

						</div>
						<div className="confirm__exit">

							<div className={`wrapper__confirm ${theme.isLigthTheme ? "light" : ""}`}>
								<p className="close__alert" onClick={() => setStateValues({ ...stateValues, openRegister: false })}>&#10006;</p>
								<p>Вы уверены что хотите выйти?</p>
								<NavLink to='/' className='noneViewProfile'>
									<button onClick={handlerExit}>выйти</button>
								</NavLink>

							</div>

						</div>
					</>
				</CSSTransition>
			</div>
			<p className={`info__footer ${theme.isLigthTheme ? "black" : ""}`}>После выхода вы потеряете доступ ко всем возможностям <span>REASE</span> NZ </p>
		</section >
	)
}
export default Settings