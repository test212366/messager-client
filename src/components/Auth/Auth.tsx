import { FC, useState } from "react";
import GoogleLogin from "react-google-login";
import { CSSTransition } from "react-transition-group";
import { useActions } from "../../hooks/useAction";
import Login from "../Login/Login";
import Register from "../Register/Register";

const Auth: FC = () => {

	const [open, setOpen] = useState({ log: false, reg: false }),
		{ loginUserGoogle } = useActions(),
		handlerLoginGoogle = (e: any) => loginUserGoogle({ email: e.profileObj.email, name: e.profileObj.name })

	return (
		<section className="container__auth">
			<div className="wrapper__buttons">
				<p>Давайте начнем</p>
				<h1>Для начала создайте аккаунт <span>NZOx</span> </h1>
				<button className="login" onClick={() => setOpen({
					log: !open.log,
					reg: false
				})}>
					Войти в аккаунт
					<div className="login__logo">
						<svg fill="none" height="20" viewBox="0 0 34 27" width="27" xmlns="http://www.w3.org/2000/svg"><path d="M28.5 25.6H5.5C3.4 25.6 1.70001 23.8929 1.70001 21.7841V5.41592C1.70001 3.30714 3.4 1.59998 5.5 1.59998H28.5C30.6 1.59998 32.3 3.30714 32.3 5.41592V21.7841C32.4 23.8929 30.6 25.6 28.5 25.6Z" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" /><path d="M17 14.9557L2.60001 3.60834" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" /><path d="M31.4 3.60834L17 14.9557" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" /></svg>
					</div>
				</button>
				<div className="or">
					<hr />
					или
					<hr />
				</div>
				<button className="registration" onClick={() => setOpen({
					log: false,
					reg: !open.reg
				})}>
					Зарегистрироваться
					<div className="login__logo">
						<svg fill="none" height="20" viewBox="0 0 35 27" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M5.60001 12.6C7.1464 12.6 8.39999 11.3464 8.39999 9.8C8.39999 8.25361 7.1464 7 5.60001 7C4.05361 7 2.8 8.25361 2.8 9.8C2.8 11.3464 4.05361 12.6 5.60001 12.6Z" strokeMiterlimit="10" strokeWidth="2" /><path d="M8.3 23.6H2.60001C1.70001 23.6 1.10001 22.9 1.10001 22V19.2C1.10001 17 2.8 15.3 5 15.3H8.5" strokeMiterlimit="10" strokeWidth="2" /><path d="M17.6 10C20.0301 10 22 8.03007 22 5.60001C22 3.16996 20.0301 1.20001 17.6 1.20001C15.17 1.20001 13.2 3.16996 13.2 5.60001C13.2 8.03007 15.17 10 17.6 10Z" strokeMiterlimit="10" strokeWidth="2" /><path d="M24.1 25.2H10.7C9.3 25.2 8.2 24.1 8.2 22.7V18.4C8.2 15 11.1 12.2 14.6 12.2H20.3C23.8 12.2 26.7 15 26.7 18.4V22.7C26.6 24.1 25.5 25.2 24.1 25.2Z" strokeMiterlimit="10" strokeWidth="2" /><path d="M29 12.6C30.5464 12.6 31.8 11.3464 31.8 9.8C31.8 8.25361 30.5464 7 29 7C27.4536 7 26.2 8.25361 26.2 9.8C26.2 11.3464 27.4536 12.6 29 12.6Z" strokeMiterlimit="10" strokeWidth="2" /><path d="M26.3 23.6H32C32.9 23.6 33.5 22.9 33.5 22V19.2C33.5 17 31.8 15.3 29.6 15.3H26.1" strokeMiterlimit="10" strokeWidth="2" /></svg>
					</div>
				</button>

				<GoogleLogin clientId="1094366230693-o4p7m2jepb1neslgl7593k7dqea96s4s.apps.googleusercontent.com"

					onSuccess={e => handlerLoginGoogle(e)}
					onFailure={(e) => console.log(e)}
					render={renderProps => (
						<button className="auth__google" disabled={renderProps.disabled} onClick={renderProps.onClick}>
							Войти с помощью <span>Google</span>
							<div className="login__logo">
								<svg width='20px' height='20px' enableBackground="new 0 0 128 128" id="Social_Icons" version="1.1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"  ><g id="_x31__stroke"><g id="Google"><rect clipRule="evenodd" fill="none" fillRule="evenodd" height="128" width="128" /><path clipRule="evenodd" d="M27.585,64c0-4.157,0.69-8.143,1.923-11.881L7.938,35.648    C3.734,44.183,1.366,53.801,1.366,64c0,10.191,2.366,19.802,6.563,28.332l21.558-16.503C28.266,72.108,27.585,68.137,27.585,64" fill="#FBBC05" fillRule="evenodd" /><path clipRule="evenodd" d="M65.457,26.182c9.031,0,17.188,3.2,23.597,8.436L107.698,16    C96.337,6.109,81.771,0,65.457,0C40.129,0,18.361,14.484,7.938,35.648l21.569,16.471C34.477,37.033,48.644,26.182,65.457,26.182" fill="#EA4335" fillRule="evenodd" /><path clipRule="evenodd" d="M65.457,101.818c-16.812,0-30.979-10.851-35.949-25.937    L7.938,92.349C18.361,113.516,40.129,128,65.457,128c15.632,0,30.557-5.551,41.758-15.951L86.741,96.221    C80.964,99.86,73.689,101.818,65.457,101.818" fill="#34A853" fillRule="evenodd" /><path clipRule="evenodd" d="M126.634,64c0-3.782-0.583-7.855-1.457-11.636H65.457v24.727    h34.376c-1.719,8.431-6.397,14.912-13.092,19.13l20.474,15.828C118.981,101.129,126.634,84.861,126.634,64" fill="#4285F4" fillRule="evenodd" /></g></g></svg>
							</div>
						</button>
					)}
					cookiePolicy={'single_host_origin'}

				/>

			</div>
			<p className="info__footer">После регистрации вы получите доступ ко всем возможностям <span>NZOx</span> </p>
			<div className="logoAUTH">
				<svg width="50" height="50" viewBox="0 0 504 299" xmlns="http://www.w3.org/2000/svg">
					<path d="M348.235 163.891C369.577 148.071 388.34 136.536 404.542 128.398C421.376 119.944 435.425 115.169 446.717 113.062C458.023 110.952 466.496 111.528 472.228 113.69C477.932 115.842 480.864 119.524 481.376 123.723C481.895 127.98 479.966 133.058 475.301 138.006C465.983 147.893 446.058 156.88 415.5 156.88C394.433 156.88 371.598 159.757 348.235 163.891ZM315.937 172.249C324.071 170.541 332.202 168.895 340.279 167.377C319.337 183.382 296.062 203.364 270.436 228.084C270.043 221.223 267.849 216.146 264.022 212.704C259.802 208.908 253.767 207.254 246.493 207.171C231.974 207.006 211.927 213.094 189.603 222.096C167.24 231.113 142.441 243.117 118.372 254.903C116.348 255.894 114.329 256.883 112.317 257.869C90.3888 268.617 69.2993 278.954 51.4259 286.448C41.67 290.539 32.9017 293.77 25.4992 295.757C18.0635 297.753 12.1382 298.456 8.00452 297.618C5.95948 297.203 4.41259 296.422 3.32331 295.29C2.23971 294.164 1.53053 292.608 1.30171 290.495C0.837023 286.204 2.3737 279.796 6.52577 270.765C14.8056 252.757 33.1813 224.944 64.8634 184.099C77.1185 168.3 91.3577 150.559 107.763 130.691C107.786 146.422 110.678 158.75 116.032 168.242C121.416 177.786 129.251 184.393 139.006 188.699C158.445 197.28 185.52 196.728 216.193 192.296C238.78 189.033 263.459 183.64 288.652 178.134C297.705 176.156 306.824 174.163 315.937 172.249ZM224.249 68.1791C197.091 84.6409 159.545 104.786 108.89 129.327C134.657 98.1591 165.713 61.7977 202.752 19.5389L204.206 17.8797H202C194.337 17.8797 188.907 17.5448 185.338 16.9772C183.548 16.6926 182.278 16.3571 181.443 16.0022C180.551 15.6231 180.401 15.327 180.389 15.2878C180.387 15.2835 180.387 15.2812 180.387 15.2749C180.388 15.2669 180.391 15.2418 180.41 15.1963C180.45 15.0978 180.551 14.9351 180.772 14.7143C181.221 14.2679 182.003 13.7406 183.15 13.1581C185.426 12.0018 188.875 10.7583 193.19 9.52541C210.454 4.59301 240.735 0.0643498 262.092 1.66965C267.424 2.07041 272.158 2.85089 275.976 4.08294C279.811 5.32049 282.61 6.97824 284.212 9.05426C285.768 11.0722 286.282 13.6014 285.312 16.8646C284.326 20.1806 281.808 24.2306 277.292 29.1105C268.265 38.8628 251.526 51.6457 224.249 68.1791Z" strokeWidth="2" />
					<path d="M277.08 72.6697L307.888 16.5H492.312L277.08 72.6697Z" strokeWidth="3" />
					<path d="M275.157 75.1358L304.692 21.2879L285.396 115.522L275.157 75.1358Z" fill="#2A354B" strokeWidth="2" />
					<path d="M287.222 126.174L176.693 177.723L273.885 76.9898L287.222 126.174Z" strokeWidth="3" />
				</svg>
			</div>
			<CSSTransition in={open.reg} classNames='alert' timeout={300} unmountOnExit>

				<Register setOpen={setOpen} />
			</CSSTransition>
			<CSSTransition in={open.reg || open.log} classNames='alert-back' timeout={300} unmountOnExit>
				<div className="register__wrapper-close " onClick={() => setOpen({
					reg: false,
					log: false
				}
				)}></div>
			</CSSTransition >
			<CSSTransition in={open.log} classNames='alert' timeout={300} unmountOnExit>

				<Login setOpen={setOpen} />
			</CSSTransition>


		</section >
	)
}
export default Auth