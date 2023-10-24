import { FC, useState } from "react";
import { useTransformTime } from "../../hooks/useTransformTime";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import Customaudio from "./Customaudio";

interface ChatMessageProps {
	you?: boolean
	text: string
	name: string
	isPhone?: boolean
	time: string
	isRead: boolean

	imgSRC?: string
	audioUrl?: string
}

const ChatMessage: FC<ChatMessageProps> = ({ isPhone, you, text, name, time, isRead, imgSRC, audioUrl }) => {

	const [currentTime, setCurrentTime] = useState<string>(''),
		{ theme, user, chatUser } = useTypeSelector(state => state)
	useTransformTime(time)?.then((currentTimeRes: string) => setCurrentTime(currentTimeRes))

	return (
		<div className="chat__message-item">
			<div className={`message__user-photo ${you && 'message__user-photoYOU'}`}>
				{!you && !isPhone &&
					<img width='50px' height='50px' src={chatUser.user.avatarSRC || 'https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png'} alt="userPhotoMessages" />
				}

				<p className={`${you ? 'userYou' : ''} ${theme.isLigthTheme ? "blackName" : ""}`}> {you ? 'Вы' : name}</p>
				<div className={`message__time ${you && 'timeYOU'} ${theme.isLigthTheme ? "blackName" : ""}`}>
					{currentTime}
				</div>
				{you &&
					<img width='50px' height='50px' src={user.user.avatarSRC || 'https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png'} alt="userPhotoMessages" />
				}

			</div>
			<div className={`wrapper__description-message ${you && 'wrapperYOU'} ${audioUrl ? "audioHave" : ""}`} >
				<div className={theme.isLigthTheme ? `message__descripti ${you && 'borderYou'} light__mess ` : `message__descripti ${you && 'borderYou'}`}>
					<div className={`textMessage  `}> {text}
						{imgSRC && <img src={imgSRC} className='imgChatMessage' alt="chatImg" />}

						{audioUrl ? <Customaudio you={you} url={audioUrl} /> : ''}
					</div>

					<div className={`send__message-title ${you && 'sendYOU'}`}>
						{isRead ? <div className='sendView ViewRead'><small className={`${audioUrl ? "haveAudioS" : ""}  `}>прочитано</small><svg className={`${you && audioUrl ? 'haveAudioSVG' : audioUrl ? "haveAudioSVG tempSVGA" : ""}`} width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd" d="M3.66648 6.87477L10.2103 0.139168C10.3908 -0.0463894 10.6839 -0.0463894 10.8643 0.139168C11.0452 0.324251 11.0452 0.62513 10.8643 0.810213L3.99532 7.88086C3.8167 8.06405 3.51946 8.06405 3.34084 7.88086L0.135337 4.60679C-0.0451125 4.42171 -0.0451125 4.1213 0.135337 3.93575C0.315787 3.75019 0.608904 3.75019 0.789354 3.93575L3.66648 6.87477ZM7.14111 7.06654L14.1548 0.139864C14.3479 -0.0466214 14.6616 -0.0466214 14.8548 0.139864C15.0484 0.325873 15.0484 0.628256 14.8548 0.814264L7.55877 8.13855C7.3676 8.32265 5.87166 7.56707 5.75484 7.46285C5.64238 7.36252 6.30121 6.77489 6.30121 6.77489C6.50611 6.87518 7.08691 7.12008 7.14111 7.06654Z" fill="#0C8FE4" />
						</svg>  </div> :
							<div className="sendView" ><small className={`${audioUrl ? "haveAudioS" : ""}`}>
								отправлено
							</small><svg className={`${you && audioUrl ? 'haveAudioSVG' : audioUrl ? "haveAudioSVG tempSVGA" : ""}`} width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd" clipRule="evenodd" d="M10.2103 0.156208L3.66648 7.71651L0.789354 4.41763C0.608904 4.20936 0.315787 4.20936 0.135337 4.41763C-0.0451125 4.62591 -0.0451125 4.9631 0.135337 5.17084L3.34084 8.84579C3.51946 9.0514 3.8167 9.0514 3.99532 8.84579L10.8643 0.909415C11.0452 0.701671 11.0452 0.363952 10.8643 0.156208C10.6839 -0.0520693 10.3908 -0.0520693 10.2103 0.156208Z" fill="#0C8FE4" />
								</svg>

							</div>



						}

					</div>

					<div></div>
				</div>
			</div>
		</div>

	)
}
export default ChatMessage