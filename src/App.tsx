import { FC, lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { io } from "socket.io-client";

import { useActions } from "./hooks/useAction";
import { useTypeSelector } from "./hooks/useTypeSelector";

import jwt_decode from "jwt-decode";
const Auth = lazy(() => import("./components/Auth/Auth"))
const Contacts = lazy(() => import("./components/Contacts/Contacts"))
const NavBar = lazy(() => import("./components/handlersC/NavBar"))
const Messages = lazy(() => import("./components/Messages/Messages"))
const Bookmarks = lazy(() => import("./components/Pinned/Bookmarks"))
const Settings = lazy(() => import("./components/Settings/Settings"))




const loginUser = localStorage.getItem('token')
let decoded: any = ""

if (loginUser) decoded = jwt_decode(loginUser)

export const socket = io('https://calm-bayou-24720.herokuapp.com/', {
	transports: ['websocket'],
	query: {
		"name": `${decoded.email}`
	}
}),
	App: FC = () => {
		const { loginUserInLocalStorage, setIsLightTheme } = useActions(),
			{ user, theme } = useTypeSelector(state => state),
			location: any = useLocation(),
			themeLocal = localStorage.getItem('theme')
		useEffect(() => {
			if (themeLocal === 'true') setIsLightTheme(true)
			if (loginUser) loginUserInLocalStorage({ token: loginUser })
		}, [])
		socket.on('disconnect', () => user.user.name !== '' ? socket.emit('CLIENT:UPDATE_ONLINE', { online: new Date(), userName: user.user.name }) : '')
		return (
			<div className={`container disFlex ${theme.isLigthTheme ? "light" : ""}`}>
				<Suspense fallback={<section className="lazyLoadingTr"> <p>Загрузка контента...</p>  <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
				</section>}>
					{user.user.isAuth && !user.loading && socket && !(window.innerWidth <= 850) && <NavBar />}
					<TransitionGroup component={null}>
						<CSSTransition key={location.key} in={true} timeout={300}
							classNames="page"
						>
							{user.user.isAuth && !user.loading && socket ?
								<Routes>
									<Route path='/settings' element={<Settings isPhone={window.innerWidth <= 850} />} />
									<Route path='/bookmarks' element={<Bookmarks isPhone={window.innerWidth <= 850} />} />
									<Route path='/contacts' element={<Contacts isPhone={window.innerWidth <= 850} />} />
									<Route path='/' element={<Messages persButton={window.innerWidth <= 1366 && window.innerWidth! >= 850} isPhone={window.innerWidth <= 850} />} />
								</Routes>
								:
								<Routes>
									<Route path='/' element={<Auth />} />
								</Routes>
							}
						</CSSTransition>
					</TransitionGroup>

				</Suspense>





			</div>

		)
	}

export default App
