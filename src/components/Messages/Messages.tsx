import { ChangeEvent, FC, lazy, useEffect, useRef, useState } from "react"

import { useActions } from "../../hooks/useAction"
import { useTransformTime } from "../../hooks/useTransformTime"
import { useTypeSelector } from "../../hooks/useTypeSelector"



import { socket } from "../../App"



const MessagesPhone = lazy(() => import("./MessagesPhone"))
const MessagesCom = lazy(() => import("./MessagesCom"))


interface MessagesProps {
	persButton: boolean
	isPhone: boolean
}

const Messages: FC<MessagesProps> = ({ isPhone, persButton }) => {
	window.navigator.getUserMedia = window.navigator.getUserMedia || window.navigator.mozGetUserMedia || window.navigator.msGetUserMedia || window.navigator.webkitGetUserMedia
	const [stateValues, setStateValues] = useState<any>({
		chatUserLocal: { user: { name: '', status: '', password: '', avatarSRC: '', _id: '', chats: [], data: [], online: '', pinnedChats: [], todo: [], nowChat: '', email: '' } },
		isVolume: true,
		isPinned: false,
		loadingMess: [],
		showPersonalMan: false,
		loadingRecord: false,
		recorded: false,
		loadingPhoto: false,
		havePhoto: false,
		srcPhoto: '',
		typed: false,
		loadingMessages: false,
		startAnim: false,
		valueInput: '',
		urlAudio: '',
		urlAudioLocal: '',
		mediaRecorder: null
	})

	const selectImage = useRef<any>(null),
		slider = useRef(null),
		bottomScroll = useRef<HTMLDivElement>(null),
		[online, setOnline] = useState<string>(''),
		{ user, chatUser, theme, isRecord } = useTypeSelector(state => state), 	//get state in Redux ts
		{ clearFindUser, changeUserChat, loginUserInLocalStorage, SetIsRecord } = useActions(), //get action creators
		[pinnedChats, setPinnedChats]: any[] = useState([]), //arrays locals это не трогать !!
		[localChats, setLocalChats]: any[] = useState([]), // не трогать!! или изменять стейт в редакс
		[loadingMess, setLoadingMess]: any[] = useState([]),	//initionalize//controlled inputs values
		audioSend = new Audio(require('../../assets/live_chat_001_38569.mp3')),
		audioYouSend = new Audio(require('../../assets/Sound_22469.mp3')),
		scrollToBottom = () => bottomScroll.current?.scrollIntoView({ behavior: 'smooth' }),
		onRecord = () => chatUser.user.name || stateValues.chatUserLocal.user.name ? navigator.getUserMedia({ audio: true }, onSuccess, (err: any) => console.log("FollowError " + err)) : '',
		stop = () => chatUser.user.name || stateValues.chatUserLocal.user.name ? stateValues.mediaRecorder.stop() : '',
		onSuccess = (stream: any) => {
			const recorder = new MediaRecorder(stream)
			recorder.start()
			recorder.onstart = () => {
				SetIsRecord(true)
				setStateValues({ ...stateValues, recorded: false, mediaRecorder: recorder, valueInput: '', havePhoto: false })
			}
			recorder.onstop = () => {
				SetIsRecord(false)
				setStateValues({ ...stateValues, valueInput: '' })
			}
			recorder.ondataavailable = async (e: any) => {
				const audioURL = window.URL.createObjectURL(e.data),
					file = new File([e.data], 'audio.ogg'),
					formData = new FormData()
				formData.append("audio", file)
				setStateValues({ ...stateValues, loadingRecord: true })
				const responce = await fetch('https://calm-bayou-24720.herokuapp.com/upload/setAudio', {
					method: "POST",
					body: formData
				}),
					dataResponce = await responce.json()
				setStateValues({ ...stateValues, urlAudio: dataResponce.url, urlAudioLocal: audioURL, loadingRecord: false, recorded: true })
			}
		}


	let timerId: any = null,
		[localMess, setLocalMess]: any[] = useState([])
	useEffect(() => {
		navigator.getUserMedia({ audio: true }, () => { }, () => { })
		const loginUser = localStorage.getItem('token')
		if (loginUser) loginUserInLocalStorage({ token: loginUser, isChange: true })
	}, [])
	useEffect(() => {
		user.user.pinnedChats.map((chat: any) => chat.userName === chatUser.user.name || chat.userName === stateValues.chatUserLocal.user.name ? setStateValues({ ...stateValues, isPinned: true }) : '')
		user.user.pinnedChats.length !== 0 && setPinnedChats([...user.user.pinnedChats])
		user.user.chats.length !== 0 && setLocalChats([...user.user.chats])
	}, [user])

	useEffect(() => { chatUser.user.name !== '' && scrollToBottom() }, [localMess, chatUser, stateValues.chatUserLocal])

	useEffect(() => setStateValues({ ...stateValues, startAnim: true }), [stateValues.startAnim])
	const updateChatUserOnline = (chatUserOnline: any) => chatUserOnline.user !== null ? chatUserOnline.user.name === chatUser.user.name ? changeUserChat(chatUserOnline.user) : chatUserOnline.user.name === stateValues.chatUserLocal.user.name ? setStateValues({ ...stateValues, chatUserLocal: chatUserOnline }) : '' : ''
	useEffect(() => {
		socket.on('CLIENT:RESPONCE_SEND_MESSAGE', emitMessages)
		socket.on('CLIENT:RESPONCE_TYPED', typedChatUser)
		socket.on('CLIENT:RESPONCE_CHANGE_CHAT', changeChatUser)
		socket.on('CLIENT:RESPONCE_ONLINE_UPDATE', updateChatUserOnline)
		socket.on('SERVER:RESPONCE_UPGRATE_AVATAR_CHAT_USER', updateAvatarChatUser)
		return () => {
			socket.removeListener("CLIENT:RESPONCE_CHANGE_CHAT", changeChatUser)
			socket.removeListener("CLIENT:RESPONCE_TYPED", typedChatUser)
			socket.removeListener("CLIENT:RESPONCE_SEND_MESSAGE", emitMessages)
			socket.removeListener("CLIENT:RESPONCE_ONLINE_UPDATE", updateChatUserOnline)
			socket.removeListener("SERVER:RESPONCE_UPGRATE_AVATAR_CHAT_USER", updateAvatarChatUser)
		}
	}, [chatUser, stateValues.chatUserLocal, localChats, localMess])


	function changeChatUser(chatUserF: any) {

		if (!chatUserF.user.readMessages) {
			chatUser.user.name == chatUserF.user.chatUser.name && changeUserChat(chatUserF.user.chatUser)
			stateValues.chatUserLocal.user.name == chatUserF.user.chatUser.name && changeUserChat(chatUserF.user.chatUser)

		}
		if (chatUserF.user.readMessages !== 'none' && chatUser.user.name == chatUserF.user.chatUser.name || chatUserF.user.readMessages !== 'none' && stateValues.chatUserLocal.user.name == chatUserF.user.chatUser.name) {
			setLocalMess([])
			setStateValues({ ...stateValues, loadingMess: chatUserF.user.readMessages })
		}
	}
	function typedChatUser(dataTypedMessage: any) {
		if (chatUser.user.name !== '' || stateValues.chatUserLocal.user.name !== '') {

			if (dataTypedMessage.partner === user.user.name && dataTypedMessage.secondPartner === chatUser.user.name || dataTypedMessage.partner === chatUser.user.name && dataTypedMessage.secondPartner === user.user.name || dataTypedMessage.partner === user.user.name && dataTypedMessage.secondPartner === stateValues.chatUserLocal.user.name || dataTypedMessage.partner === stateValues.chatUserLocal.user.name && dataTypedMessage.secondPartner === user.user.name) {

				if (dataTypedMessage.secondPartner === chatUser.user.name || dataTypedMessage.secondPartner === stateValues.chatUserLocal.user.name) {
					setStateValues({ ...stateValues, typed: true })
					clearTimeout(timerId)
					timerId = setTimeout(() => setStateValues({ ...stateValues, typed: false }), 500)
					if (chatUser.user.name === user.user.name || stateValues.chatUserLocal.user.name === user.user.name) setStateValues({ ...stateValues, typed: false })
				}

			}
		}

	}
	function emitMessages(message: any) {
		let inchat: any = false
		const updateLocalChat = (updateMess: boolean = false) => {
			updateMess && setLocalMess(localMess = [...localMess, message])
			setLocalChats([{ userName: message.secondPartner, avatarSRC: chatUser.user.avatarSRC, partner: message.partner, lastText: message.text, time: message.time, isRead: message.secondPartner === user.user.name, lastTextAuthor: message.secondPartner }, ...localChats.filter((chat: any) => chat.userName !== message.secondPartner)])
		},
			updateLocalChats = (isLocalUS: boolean = false) => {
				if (isLocalUS) {
					const currentLocalArray = localChats.filter((chat: any) => chat.userName !== stateValues.chatUserLocal.user.name)
					setLocalChats([{ userName: stateValues.chatUserLocal.user.name, lastText: localMess[localMess.length - 1].text, avatarSRC: chatUser.user.avatarSRC, partner: message.partner, time: message.time, lastTextAuthor: localMess[localMess.length - 1].secondPartner, }, ...currentLocalArray])
				} else {
					const currentLocalArray = localChats.filter((chat: any) => chat.userName !== chatUser.user.name)
					setLocalChats([{ userName: chatUser.user.name, avatarSRC: chatUser.user.avatarSRC, lastText: localMess[localMess.length - 1].text, partner: message.partner, time: message.time, lastTextAuthor: localMess[localMess.length - 1].secondPartner, }, ...currentLocalArray])
				}
			}
		if (chatUser.user.name !== '' && chatUser.user.name !== user.user.name || stateValues.chatUserLocal.user.name !== '' && stateValues.chatUserLocal.user.name !== user.user.name) {
			if (message.partner === user.user.name && message.secondPartner === chatUser.user.name || message.partner === chatUser.user.name && message.secondPartner === user.user.name || message.partner === user.user.name && message.secondPartner === stateValues.chatUserLocal.user.name || message.partner === stateValues.chatUserLocal.user.name && message.secondPartner === user.user.name) {
				inchat = true
				if (message.secondPartner === chatUser.user.name && stateValues.isVolume || message.secondPartner === stateValues.chatUserLocal.user.name && stateValues.isVolume) audioSend.play()
				setLocalMess(localMess = [...localMess, message])
				stateValues.chatUserLocal.user.name !== '' ? updateLocalChats(true) : updateLocalChats()
				clearFindUser()
			}
		}
		if (message.partner === user.user.name && message.secondPartner === user.user.name) updateLocalChat(true)
		if (chatUser.user.name === '' && message.partner === user.user.name || stateValues.chatUserLocal.user.name === '' && message.partner === user.user.name) updateLocalChat()
		if (chatUser.user.name !== '' && message.partner === user.user.name && !inchat || stateValues.chatUserLocal.user.name !== '' && message.partner === user.user.name && !inchat) updateLocalChat()
	}
	function updateAvatarChatUser(chatUserF: any) {

		chatUser.user.name == chatUserF.chatUserF.user.name && changeUserChat(chatUserF.chatUserF.user)
		stateValues.chatUserLocal.user.name == chatUserF.chatUserF.user.name && changeUserChat(chatUserF.chatUserF.user)
	}

	const hSend = async (message: any) => {
		socket.emit('CLIENT:SEND_MESSAGE', message)
		setStateValues({ ...stateValues, valueInput: '', recorded: false })
		await fetch('https://calm-bayou-24720.herokuapp.com/user/updateResMess', {
			headers: {
				"Content-Type": 'application/json'
			},
			method: "POST",
			body: JSON.stringify(message)
		})
		if (stateValues.chatUserLocal.user.name !== '') {
			await fetch('https://calm-bayou-24720.herokuapp.com/messages/updateChats', {
				headers: {
					"Content-Type": 'application/json'
				},
				method: "POST",
				body: JSON.stringify({ text: message.text, partner: message.partner, urlAudio: stateValues.urlAudio, imgSRC: stateValues.srcPhoto, secondPartner: message.secondPartner, time: message.time, isRead: stateValues.chatUserLocal.user.nowChat === user.user.name })
			})
		} else {
			await fetch('https://calm-bayou-24720.herokuapp.com/messages/updateChats', {
				headers: {
					"Content-Type": 'application/json'
				},
				method: "POST",
				body: JSON.stringify({ text: message.text, partner: message.partner, urlAudio: stateValues.urlAudio, imgSRC: stateValues.srcPhoto, secondPartner: message.secondPartner, time: message.time, isRead: chatUser.user.nowChat === user.user.name })
			})
		}
		setStateValues({ ...stateValues, recorded: false, urlAudio: '', urlAudioLocal: '', valueInput: '', havePhoto: false, srcPhoto: '' })
	},
		handlerSend = () => {
			if (isRecord.isRecord || stateValues.loadingRecord) return
			if (chatUser.user.name && stateValues.valueInput && !stateValues.loadingPhoto || stateValues.chatUserLocal.user.name && stateValues.valueInput && !stateValues.loadingPhoto || chatUser.user.name && stateValues.urlAudio && !stateValues.loadingPhoto || stateValues.chatUserLocal.user.name && stateValues.urlAudio && !stateValues.loadingPhoto) {
				stateValues.isVolume && audioYouSend.play()
				chatUser.user.name === user.user.name || stateValues.chatUserLocal.user.name === user.user.name ? stateValues.chatUserLocal.user.name !== '' ? hSend({ text: stateValues.urlAudio ? 'aудио' : stateValues.valueInput, time: `${new Date}`, partner: stateValues.chatUserLocal.user.name, urlAudio: stateValues.urlAudio, imgSRC: stateValues.srcPhoto, avatarSRC: chatUser.user.avatarSRC, secondPartner: user.user.name, isRead: true })
					: hSend({ text: stateValues.urlAudio ? 'aудио' : stateValues.valueInput, time: `${new Date}`, partner: chatUser.user.name, urlAudio: stateValues.urlAudio, avatarSRC: chatUser.user.avatarSRC, imgSRC: stateValues.srcPhoto, secondPartner: user.user.name, isRead: true })
					: stateValues.chatUserLocal.user.name !== '' ? hSend({ text: stateValues.urlAudio ? 'aудио' : stateValues.valueInput, time: `${new Date}`, partner: stateValues.chatUserLocal.user.name, urlAudio: stateValues.urlAudio, avatarSRC: chatUser.user.avatarSRC, imgSRC: stateValues.srcPhoto, secondPartner: user.user.name, isRead: stateValues.chatUserLocal.user.nowChat === user.user.name })
						: hSend({ text: stateValues.urlAudio ? 'aудио' : stateValues.valueInput, time: `${new Date}`, partner: chatUser.user.name, urlAudio: stateValues.urlAudio, avatarSRC: chatUser.user.avatarSRC, imgSRC: stateValues.srcPhoto, secondPartner: user.user.name, isRead: chatUser.user.nowChat === user.user.name })
			}
		},
		emitType = (isLocal: boolean = false, e: ChangeEvent<HTMLInputElement>) => {
			if (isLocal) {
				setStateValues({ ...stateValues, valueInput: e.target.value })
				socket.emit('CLIENT:TYPED_MESSAGE', { partner: stateValues.chatUserLocal.user.name, secondPartner: user.user.name })
			} else {
				setStateValues({ ...stateValues, valueInput: e.target.value })
				socket.emit('CLIENT:TYPED_MESSAGE', { partner: chatUser.user.name, secondPartner: user.user.name })
			}

		},
		handlerChange = (e: ChangeEvent<HTMLInputElement>) => stateValues.chatUserLocal.user.name !== '' ? emitType(true, e) : emitType(false, e),
		updatePinned = async (newPinned: any[]) => {
			await fetch('https://calm-bayou-24720.herokuapp.com/user/setPinnedChats', {
				headers: {
					'Content-Type': 'application/json',

				},
				method: "POST",
				body: JSON.stringify({ userName: user.user.name, pinnedChats: newPinned })
			})
		},
		handlerSetPinnedChat = () => {
			if (stateValues.chatUserLocal.user.name !== '') {
				const newPinned = pinnedChats.filter((chat: any) => chat.userName !== stateValues.chatUserLocal.user.name)
				updatePinned(newPinned)
				setPinnedChats(newPinned)
			} else {
				const newPinned = pinnedChats.filter((chat: any) => chat.userName !== chatUser.user.name)
				updatePinned(newPinned)
				setPinnedChats(newPinned)
			}


		},
		handlerPinnedChat = () => {
			let isUsedPinnedChat = false
			pinnedChats.map((chat: any) => {
				if (chat.userName === chatUser.user.name) return isUsedPinnedChat = true
			})
			if (isUsedPinnedChat) return
			localChats.map(async (chat: any) => {
				if (chat.userName === chatUser.user.name) {

					await fetch('https://calm-bayou-24720.herokuapp.com/user/setPinnedChats', {
						headers: {
							'Content-Type': 'application/json',

						},
						method: "POST",
						body: JSON.stringify({ userName: user.user.name, pinnedChats: [...pinnedChats, { userName: chat.userName, partner: chat.partner, lastText: 'Нажмите чтобы быстро продолжить чат', lastTextAuthor: '' }] })
					})

					setPinnedChats([...pinnedChats, { userName: chat.userName, partner: chat.partner, lastText: 'Нажмите чтобы быстро продолжить чат', lastTextAuthor: '' }])
				}
			})

		},
		handlerSelectPhoto = async (e: any) => {
			const formData = new FormData()
			formData.append('image', e.target.files[0])
			setStateValues({ ...stateValues, loadingPhoto: true })

			const responce = await fetch('https://calm-bayou-24720.herokuapp.com/upload/setImage', {
				method: "POST",
				body: formData
			}),
				dataResponce = await responce.json()
			setStateValues({ ...stateValues, loadingPhoto: false, havePhoto: true, srcPhoto: dataResponce.url })
		}
	useTransformTime(chatUser.user.name !== '' ? chatUser.user.online : stateValues.chatUserLocal.user.name !== '' ? stateValues.chatUserLocal.user.online : '')?.then((time: string) => setOnline(time))
	return (
		<>
			{isPhone ?
				<MessagesPhone bottomScroll={bottomScroll} stop={stop} chatUser={chatUser} handlerChange={handlerChange} handlerPinnedChat={handlerPinnedChat} handlerSelectPhoto={handlerSelectPhoto} handlerSend={handlerSend} isPhone={isPhone} handlerSetPinnedChat={handlerSetPinnedChat} isRecord={isRecord} loadingMess={loadingMess} localChats={localChats} localMess={localMess} onRecord={onRecord} online={online} pinnedChats={pinnedChats} selectImage={selectImage} setLoadingMess={setLoadingMess} setLocalChats={setLocalChats} setLocalMess={setLocalMess} setStateValues={setStateValues} slider={slider} stateValues={stateValues} theme={theme} user={user} />

				: <MessagesCom persButton={persButton} stop={stop} bottomScroll={bottomScroll} chatUser={chatUser} handlerChange={handlerChange} handlerPinnedChat={handlerPinnedChat} handlerSelectPhoto={handlerSelectPhoto} handlerSend={handlerSend} isPhone={isPhone} handlerSetPinnedChat={handlerSetPinnedChat} isRecord={isRecord} loadingMess={loadingMess} localChats={localChats} localMess={localMess} onRecord={onRecord} online={online} pinnedChats={pinnedChats} selectImage={selectImage} setLoadingMess={setLoadingMess} setLocalChats={setLocalChats} setLocalMess={setLocalMess} setStateValues={setStateValues} stateValues={stateValues} theme={theme} user={user} />

			}



		</>


	)
}
export default Messages

