import React, { useEffect, useState } from 'react'
import NoMessage from './NoMessage'
import User_MessagePage from './User_MessagePage'
import { useDispatch, useSelector } from 'react-redux'
import {
	CHAT_FROM_PROFILE_RESET
} from '../../constants/userConstants'
import User_ChatList from './User_ChatList'
import useWindowSize from '../../CustomHooks/useWindowSize'
import { userChatList, addtoChat, chatmessages } from '../../actions/userActions'



function ChatPage() {

	const dispatch = useDispatch()

	const Profileid = useSelector(state => state.chatFromProfile)
	const { profileid } = Profileid

	const initialState = profileid ? profileid : null;
	const [receiverId, setReceiverId] = useState(initialState)

	const getUserProfileInfo = useSelector(state => state.getUserProfile)
	const { fullUserProfileInfo } = getUserProfileInfo


	const socket = new WebSocket('ws://127.0.0.1:8000/ws/' + fullUserProfileInfo.id + '/' + receiverId + '/')
	// const [width, height] = useWindowSize()
	// console.log(width, height, 'diiiiiiiiiiiii')

	socket.onopen = function (e) {
		console.log('Connection Established');
	}

	socket.onclose = function (e) {
		console.log('Connection lost',e);
	}

	socket.onerror = function (e) {
		console.log('Error', e);
	}

	socket.onmessage = function (e) {
		console.log(e,'messageeeeeeeeeeeee')
		const data = JSON.parse(e.data)
		if (data) {
			dispatch(chatmessages(receiverId))
		}
    
	}


	const message_to_user_server = (message, receiver_id) => {
		console.log(message,'kkkkkkkkkkkkkkkkk')
		socket.send(JSON.stringify({
			'message': message,
			'sender_id':fullUserProfileInfo.id,
			'receiver_id': receiver_id
		}))
		user_chatlist()
		chat_receiver_details(receiver_id)

	}

	const chat_receiver_details = (receiver_id) => {
		setReceiverId(receiver_id)
		user_chat_messages(receiver_id)
	}

	const user_chat_messages = (receiver_id) => {
		dispatch(chatmessages(receiver_id))
	}

	const user_chatlist = () => {
		dispatch(userChatList())
	}

	useEffect(() => {
		if (profileid) {
			user_chat_messages(profileid)
			user_chatlist()
		}

		return () => {
			dispatch({ type: CHAT_FROM_PROFILE_RESET })
		}
	}, [receiverId])



	return (
		<>
			<div className="chatbox" style={{ right: "0", width: "100%" }}>
				<div className="row">
					<>
						<div className="col-4">
							<User_ChatList chat_receiver={chat_receiver_details} />
						</div>
						<div className="col-8">
							{receiverId !== null ? <User_MessagePage message_to_user_server={message_to_user_server} receiver_id={receiverId} /> : <NoMessage />}
						</div>
					</>
				</div>
			</div>
		</>
	)
}

export default ChatPage