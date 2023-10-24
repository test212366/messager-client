import { ChangeEvent, FC, lazy, useEffect, useRef, useState } from "react"
import { useTypeSelector } from "../../hooks/useTypeSelector"
import { useActions } from "../../hooks/useAction"
import { useTransformTime } from "../../hooks/useTransformTime"

const ContactsCom = lazy(() => import("./ContactsCom"))
const ContactsPhone = lazy(() => import("./ContactsPhone"))
interface ContactsProps {
	isPhone?: any
}

const Contacts: FC<ContactsProps> = ({ isPhone }) => {
	const [stateValues, setStateValues] = useState({
		inputSearch: '',
		inputValue: '',
		startAnim: false,
		visibleSetStatus: false,
		lengthValueInput: 0,
		data: [{ name: '01', completed: 0, ongoing: 0, amt: 0 }]
	}),
		[online, setOnline] = useState<any>(""),
		stateFind = useTypeSelector(state => state.fingUser),
		{ findUser, changeUserChat, changeStatus, changeAvatar } = useActions(),
		{ user, chatUser, theme } = useTypeSelector(state => state),
		slider = useRef<any>(null),
		selectImage = useRef<any>(null)


	useTransformTime(chatUser.user.name ? chatUser.user.online : user.user.name ? 'online' : "")?.then((time: string) => setOnline(time))

	useEffect(() => setStateValues({ ...stateValues, inputValue: user.user.status || '', startAnim: true }), [])
	useEffect(() => setStateValues({ ...stateValues, inputValue: user.user.status || '' }), [user])
	useEffect(() => {
		if (chatUser.user.data && chatUser.user.data.length === 0) setStateValues({ ...stateValues })
		else if (chatUser.user.name !== '') setStateValues({ ...stateValues, data: chatUser.user.data })
		if (slider.current && chatUser.user.name !== '') slider.current.slickGoTo(1)
	}, [chatUser, slider])

	const handlerFind = () => {
		if (stateValues.inputSearch) {
			findUser({ userName: stateValues.inputSearch.trim() })
			setStateValues({ ...stateValues, inputSearch: '' })
		}

	},
		handlerChangeContactUser = async () => {
			if (stateFind.user.name === chatUser.user.name) return
			setStateValues({ ...stateValues, inputSearch: '' })
			const dataNameChat = await fetch('https://calm-bayou-24720.herokuapp.com/user/getUserName', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: "POST",
				body: JSON.stringify({ chat: { userName: stateFind.user.name, lastText: 'Нажмите чтобы быстро продолжить чат' }, userMeName: user.user.name })
			})
			const userChat = await dataNameChat.json()
			changeUserChat(userChat.user)
			setStateValues({ ...stateValues, startAnim: false })
		},
		handlerChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
			if (stateValues.lengthValueInput > 19) return
			setStateValues({ ...stateValues, inputValue: e.target.value, lengthValueInput: stateValues.inputValue.length })
		},
		handlerSetStatusFetch = async () => {
			changeStatus({ ...user.user, status: stateValues.inputValue })
			setStateValues({ ...stateValues, inputValue: '', lengthValueInput: 0 })
			handlerSetStatus()
		},
		handlerSetStatus = () => setStateValues({ ...stateValues, visibleSetStatus: !stateValues.visibleSetStatus }),
		handlerEmitMessage = () => {
			changeUserChat({ name: '', email: '', password: '', token: '' })
			findUser({ userName: chatUser.user.name })
		},
		handlerChangeChatAllMessages = async (chat: any) => {
			if (chatUser.user.name === chat.userName) return
			const dataNameChat = await fetch('https://calm-bayou-24720.herokuapp.com/user/getChatUser', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: "POST",
				body: JSON.stringify({ chat })
			})
			const userChat = await dataNameChat.json()
			changeUserChat(userChat.chatUser)
		}

	return (
		<>
			{isPhone ? <ContactsPhone changeAvatar={changeAvatar} chatUser={chatUser} handlerChangeChatAllMessages={handlerChangeChatAllMessages} handlerChangeContactUser={handlerChangeContactUser} handlerChangeInputValue={handlerChangeInputValue} handlerEmitMessage={handlerEmitMessage} handlerFind={handlerFind} handlerSetStatus={handlerSetStatus} handlerSetStatusFetch={handlerSetStatusFetch} online={online} selectImage={selectImage} setStateValues={setStateValues} slider={slider} stateFind={stateFind} stateValues={stateValues} theme={theme} user={user} />
				: <ContactsCom changeAvatar={changeAvatar} chatUser={chatUser} handlerChangeChatAllMessages={handlerChangeChatAllMessages} handlerChangeContactUser={handlerChangeContactUser} handlerChangeInputValue={handlerChangeInputValue} handlerEmitMessage={handlerEmitMessage} handlerFind={handlerFind} handlerSetStatus={handlerSetStatus} handlerSetStatusFetch={handlerSetStatusFetch} online={online} selectImage={selectImage} setStateValues={setStateValues} stateFind={stateFind} stateValues={stateValues} theme={theme} user={user} />}
		</>


	)
}
export default Contacts