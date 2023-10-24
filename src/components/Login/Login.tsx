import { FC, useState } from "react"
import { useActions } from "../../hooks/useAction"
import { useTypeSelector } from "../../hooks/useTypeSelector"

interface LoginProps {
	setOpen: any
}

const Login: FC<LoginProps> = ({ setOpen }) => {
	const [stateValues, setStateValues] = useState({
		email: '',
		password: '',
		see: false
	}),
		{ loginUser } = useActions(),
		{ error } = useTypeSelector(state => state.user),
		handlerLogin = () => stateValues.email && stateValues.password ? loginUser({ email: stateValues.email.trim(), password: stateValues.password.trim() }) : ""
	return (
		<div className="register__container">

			<div className="relative">
				<p>Войти через эл. почту</p>
				{error === 'email не используется, пользователь не найден..' ? <small className="error">{error}</small> : ''}
				{error === 'Bad Request' ? <small className="error">Неверный email</small> : ''}
				<div className="relative">
					<input type="email" placeholder="Добавьте эл.почту" value={stateValues.email} onChange={e => setStateValues({ ...stateValues, email: e.target.value })} />
					<div className="login__logo temp">
						<svg fill="none" height="16" viewBox="0 0 34 27" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M28.5 25.6H5.5C3.4 25.6 1.70001 23.8929 1.70001 21.7841V5.41592C1.70001 3.30714 3.4 1.59998 5.5 1.59998H28.5C30.6 1.59998 32.3 3.30714 32.3 5.41592V21.7841C32.4 23.8929 30.6 25.6 28.5 25.6Z" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" /><path d="M17 14.9557L2.60001 3.60834" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" /><path d="M31.4 3.60834L17 14.9557" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" /></svg>
					</div>
				</div>
				{error === 'не действительный пароль' ? <small className="error">{error}</small> : ""}
				<div className="relative">
					<input type={stateValues.see ? 'text' : 'password'} placeholder="Введите пароль" value={stateValues.password} onChange={e => setStateValues({ ...stateValues, password: e.target.value })} />
					<div className="seePassword" onClick={() => setStateValues({ ...stateValues, see: !stateValues.see })}>
						{stateValues.see ? <svg height="40px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="40px" xmlns="http://www.w3.org/2000/svg" ><g><path d="   M261.2,193.4c-46.4,0-86.8,25.2-108.5,62.6c21.7,37.4,62.1,62.6,108.5,62.6c46.4,0,86.8-25.2,108.5-62.6   C348,218.6,307.5,193.4,261.2,193.4z" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="10" /><circle cx="261.2" cy="256" fill="none" r="37.7" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="10" /><line strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="10" x1="152.7" x2="369.6" y1="348.5" y2="170" /></g></svg>
							: <svg height="40px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="40px" xmlns="http://www.w3.org/2000/svg"  ><g><path d="   M256,193.4c-46.4,0-86.8,25.2-108.5,62.6c21.7,37.4,62.1,62.6,108.5,62.6c46.4,0,86.8-25.2,108.5-62.6   C342.8,218.6,302.4,193.4,256,193.4z" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="10" /><circle cx="256" cy="256" fill="none" r="37.7" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="10" /></g></svg>}

					</div>

					<div className="login__logo temp">
						<svg viewBox="0 0 32 32" width='20px' height='19px' xmlns="http://www.w3.org/2000/svg"><defs> </defs><title /><g data-name="Layer 56" id="Layer_56"><path d="M16,31a1,1,0,0,1-.6-.2l-4-3A1,1,0,0,1,11,27V17.47a9,9,0,1,1,10,0V19a1,1,0,0,1-.29.71L19.41,21l1.3,1.29a1,1,0,0,1,0,1.42L19.41,25l1.3,1.29a1,1,0,0,1,.29.78,1,1,0,0,1-.4.73l-4,3A1,1,0,0,1,16,31Zm-3-4.5,3,2.25,2.48-1.86-1.19-1.18a1,1,0,0,1,0-1.42L18.59,23l-1.3-1.29a1,1,0,0,1,0-1.42L19,18.59V16.92a1,1,0,0,1,.5-.86,7,7,0,1,0-7,0,1,1,0,0,1,.5.86ZM20,19h0Z" /><circle cx="16" cy="8" r="1" /><path d="M16,10a2,2,0,1,1,2-2A2,2,0,0,1,16,10Zm0-2Z" /></g></svg>
					</div>
				</div>

				<button className="registration regM" onClick={handlerLogin}>
					Продолжить

				</button>


				<div className="close" onClick={() => setOpen({
					reg: false,
					log: false
				})} >&#10006;</div>
			</div>

		</div>
	)
}
export default Login