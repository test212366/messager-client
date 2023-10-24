import { FC, useState } from "react";
import { useTransformTime } from "../../hooks/useTransformTime";
import { useTypeSelector } from "../../hooks/useTypeSelector";

interface MessageProps {
	nameUser: string
	lastUserMess?: string
	lastData?: any
	online: boolean
	isFind?: boolean
	isYou?: boolean
	isRead?: boolean
	isContact?: boolean
	avatar?: any
}

const Message: FC<MessageProps> = ({ nameUser, lastUserMess, lastData, online, isFind = false, isYou = false, isRead = true, isContact = false, avatar }) => {
	const [currentTime, setCurrentTime] = useState<string>(''),
		{ theme } = useTypeSelector(state => state)

	useTransformTime(lastData)?.then((time: string) => setCurrentTime(time))


	return (
		<div className="message__item">
			<div className="message__avatar">

				<img className="message__img" height='60px' width='60px' src={avatar || 'https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png'} alt="message__avatar" />
				{online ? <div className="online"></div> : ''}


			</div>
			<div className="message__desc">
				<div className={theme.isLigthTheme ? "message__name black" : "message__name"}>
					<p>{nameUser}</p>
				</div>
				<div className="message__last" >
					{isContact ? 'Нажмите, что-бы посмотреть профиль' : ''}
					{isFind && !isContact ? <>Нажмите, что-бы начать переписку</> : ''}
					{isYou ? 'Вы: ' : ''}
					{lastUserMess}
				</div>
				<div className="message__data">
					{currentTime}
				</div>

				{!isRead && !isYou ? <div className="message__no-read">(1)</div> : ''}
			</div>

		</div>
	)
}
export default Message