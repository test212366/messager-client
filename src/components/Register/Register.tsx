import { FC, useState } from "react"
import { useActions } from "../../hooks/useAction"
import { useTypeSelector } from "../../hooks/useTypeSelector"


interface RegisterProps {

	setOpen: any
}

const Register: FC<RegisterProps> = ({ setOpen }) => {
	const [stateValues, setStateValues] = useState({
		email: '',
		password: '',
		name: '',
		errorName: false,
		errorPass: false,
		see: false
	}),
		{ error } = useTypeSelector(state => state.user),
		{ registerUser } = useActions(),
		handlerRegister = () => {

			if (stateValues.email && stateValues.password.length > 6 && stateValues.password.length < 15 && stateValues.name.length > 4 && stateValues.password.length < 15) {
				registerUser({ name: stateValues.name.trim().toLowerCase(), email: stateValues.email.trim().toLowerCase(), password: stateValues.password.trim().toLowerCase() })
				setStateValues({ ...stateValues, errorName: false, errorPass: false })
			}

		}

	return (<section className="register__container">

		<div className="relative">
			<p>Регистрация</p>
			{error === 'Bad Request' ? <small className="error">Неверный email</small> : ''}
			{error === 'email уже используется' ? <small className="error">{error}</small> : ''}
			<div className="relative">

				<input type="email" placeholder="Добавьте эл.почту" value={stateValues.email} onChange={e => setStateValues({ ...stateValues, email: e.target.value })} />
				<div className="login__logo temp">
					<svg fill="none" height="16" viewBox="0 0 34 27" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M28.5 25.6H5.5C3.4 25.6 1.70001 23.8929 1.70001 21.7841V5.41592C1.70001 3.30714 3.4 1.59998 5.5 1.59998H28.5C30.6 1.59998 32.3 3.30714 32.3 5.41592V21.7841C32.4 23.8929 30.6 25.6 28.5 25.6Z" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" /><path d="M17 14.9557L2.60001 3.60834" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" /><path d="M31.4 3.60834L17 14.9557" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" /></svg>
				</div>
			</div>
			{error === 'имя пользователя уже используется' ? <small className="error">{error}</small> : ''}
			{stateValues.errorName ? <small className="error">Имя должно быть больше 4-ёx символов и меньше чем 10, сейчас: {stateValues.name.length}</small> : ''}
			<div className="relative">
				<input type="text" value={stateValues.name} onChange={e => {

					if (stateValues.name.length >= 4 && stateValues.password.length < 10) setStateValues({ ...stateValues, name: e.target.value, errorName: false })
					else setStateValues({ ...stateValues, name: e.target.value, errorName: true })
				}} placeholder="Введите имя пользователя" />
				<div className="login__logo temp">
					<svg fill="none" height="20" viewBox="0 0 35 27" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M5.60001 12.6C7.1464 12.6 8.39999 11.3464 8.39999 9.8C8.39999 8.25361 7.1464 7 5.60001 7C4.05361 7 2.8 8.25361 2.8 9.8C2.8 11.3464 4.05361 12.6 5.60001 12.6Z" strokeMiterlimit="10" strokeWidth="2" /><path d="M8.3 23.6H2.60001C1.70001 23.6 1.10001 22.9 1.10001 22V19.2C1.10001 17 2.8 15.3 5 15.3H8.5" strokeMiterlimit="10" strokeWidth="2" /><path d="M17.6 10C20.0301 10 22 8.03007 22 5.60001C22 3.16996 20.0301 1.20001 17.6 1.20001C15.17 1.20001 13.2 3.16996 13.2 5.60001C13.2 8.03007 15.17 10 17.6 10Z" strokeMiterlimit="10" strokeWidth="2" /><path d="M24.1 25.2H10.7C9.3 25.2 8.2 24.1 8.2 22.7V18.4C8.2 15 11.1 12.2 14.6 12.2H20.3C23.8 12.2 26.7 15 26.7 18.4V22.7C26.6 24.1 25.5 25.2 24.1 25.2Z" strokeMiterlimit="10" strokeWidth="2" /><path d="M29 12.6C30.5464 12.6 31.8 11.3464 31.8 9.8C31.8 8.25361 30.5464 7 29 7C27.4536 7 26.2 8.25361 26.2 9.8C26.2 11.3464 27.4536 12.6 29 12.6Z" strokeMiterlimit="10" strokeWidth="2" /><path d="M26.3 23.6H32C32.9 23.6 33.5 22.9 33.5 22V19.2C33.5 17 31.8 15.3 29.6 15.3H26.1" strokeMiterlimit="10" strokeWidth="2" /></svg>
				</div>
			</div>
			{stateValues.errorPass ? <small className="error">Пароль должен быть больше 6-ти символов и меньше чем 15, сейчас: {stateValues.password.length}</small>
				: ""}

			<div className="relative">
				<input type={stateValues.see ? 'text' : 'password'} placeholder="Введите пароль" value={stateValues.password} onChange={e => {
					if (stateValues.password.length >= 6 && stateValues.password.length < 15) setStateValues({ ...stateValues, password: e.target.value, errorPass: false })
					else setStateValues({ ...stateValues, password: e.target.value, errorPass: true })
				}} />
				<div className="seePassword" onClick={() => setStateValues({ ...stateValues, see: !stateValues.see })}>
					{stateValues.see ? <svg height="40px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="40px" xmlns="http://www.w3.org/2000/svg" ><g><path d="   M261.2,193.4c-46.4,0-86.8,25.2-108.5,62.6c21.7,37.4,62.1,62.6,108.5,62.6c46.4,0,86.8-25.2,108.5-62.6   C348,218.6,307.5,193.4,261.2,193.4z" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="10" /><circle cx="261.2" cy="256" fill="none" r="37.7" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="10" /><line strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="10" x1="152.7" x2="369.6" y1="348.5" y2="170" /></g></svg>
						: <svg height="40px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="40px" xmlns="http://www.w3.org/2000/svg"  ><g><path d="   M256,193.4c-46.4,0-86.8,25.2-108.5,62.6c21.7,37.4,62.1,62.6,108.5,62.6c46.4,0,86.8-25.2,108.5-62.6   C342.8,218.6,302.4,193.4,256,193.4z" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="10" /><circle cx="256" cy="256" fill="none" r="37.7" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="10" /></g></svg>}

				</div>
				<div className="login__logo temp">
					<svg viewBox="0 0 32 32" width='20px' height='19px' xmlns="http://www.w3.org/2000/svg"><defs> </defs><title /><g data-name="Layer 56" id="Layer_56"><path d="M16,31a1,1,0,0,1-.6-.2l-4-3A1,1,0,0,1,11,27V17.47a9,9,0,1,1,10,0V19a1,1,0,0,1-.29.71L19.41,21l1.3,1.29a1,1,0,0,1,0,1.42L19.41,25l1.3,1.29a1,1,0,0,1,.29.78,1,1,0,0,1-.4.73l-4,3A1,1,0,0,1,16,31Zm-3-4.5,3,2.25,2.48-1.86-1.19-1.18a1,1,0,0,1,0-1.42L18.59,23l-1.3-1.29a1,1,0,0,1,0-1.42L19,18.59V16.92a1,1,0,0,1,.5-.86,7,7,0,1,0-7,0,1,1,0,0,1,.5.86ZM20,19h0Z" /><circle cx="16" cy="8" r="1" /><path d="M16,10a2,2,0,1,1,2-2A2,2,0,0,1,16,10Zm0-2Z" /></g></svg>
				</div>
			</div>

			<button className="registration regM" onClick={handlerRegister}  >
				Зарегистрироваться
				<div className="login__logo">
					<svg fill="none" height="20" viewBox="0 0 35 27" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M5.60001 12.6C7.1464 12.6 8.39999 11.3464 8.39999 9.8C8.39999 8.25361 7.1464 7 5.60001 7C4.05361 7 2.8 8.25361 2.8 9.8C2.8 11.3464 4.05361 12.6 5.60001 12.6Z" strokeMiterlimit="10" strokeWidth="2" /><path d="M8.3 23.6H2.60001C1.70001 23.6 1.10001 22.9 1.10001 22V19.2C1.10001 17 2.8 15.3 5 15.3H8.5" strokeMiterlimit="10" strokeWidth="2" /><path d="M17.6 10C20.0301 10 22 8.03007 22 5.60001C22 3.16996 20.0301 1.20001 17.6 1.20001C15.17 1.20001 13.2 3.16996 13.2 5.60001C13.2 8.03007 15.17 10 17.6 10Z" strokeMiterlimit="10" strokeWidth="2" /><path d="M24.1 25.2H10.7C9.3 25.2 8.2 24.1 8.2 22.7V18.4C8.2 15 11.1 12.2 14.6 12.2H20.3C23.8 12.2 26.7 15 26.7 18.4V22.7C26.6 24.1 25.5 25.2 24.1 25.2Z" strokeMiterlimit="10" strokeWidth="2" /><path d="M29 12.6C30.5464 12.6 31.8 11.3464 31.8 9.8C31.8 8.25361 30.5464 7 29 7C27.4536 7 26.2 8.25361 26.2 9.8C26.2 11.3464 27.4536 12.6 29 12.6Z" strokeMiterlimit="10" strokeWidth="2" /><path d="M26.3 23.6H32C32.9 23.6 33.5 22.9 33.5 22V19.2C33.5 17 31.8 15.3 29.6 15.3H26.1" strokeMiterlimit="10" strokeWidth="2" /></svg>
				</div>
			</button>
			<div className="close" onClick={() => setOpen({
				reg: false,
				log: false
			})}>&#10006;</div>
		</div>

	</section>)
}
export default Register