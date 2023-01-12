import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getOtherUserProfile } from '../../actions/userActions';
import { OTHER_USER_PROFILE_RESET } from '../../constants/userConstants'
import Loader from '../Loader';
import { format, render, cancel, register } from 'timeago.js';


function User_MessagePage({ message_to_user_server, receiver_id }) {
	const dispatch = useDispatch()
	const Navigate = useNavigate()

	const [message, setMessage] = useState('');

	const ChatMessages = useSelector(state => state.chatmessages)
	const { messages } = ChatMessages
	console.log(messages, 'lllllllllll')

	const getUserProfileInfo = useSelector(state => state.getUserProfile)
	const { fullUserProfileInfo } = getUserProfileInfo


	const OthersProfile = useSelector(state => state.othersprofile)
	const { loading, otheruser } = OthersProfile

	const send_message = (message, receiver_id) => {
		message_to_user_server(message, receiver_id)
		setMessage('')
	}

	useEffect(() => {
		dispatch(getOtherUserProfile(receiver_id))
		return () => {
			dispatch({ type: OTHER_USER_PROFILE_RESET })
		}
	}, [])

	return (

		<>
			<div class="card chat dz-chat-history-box">
				{loading && <Loader />}
				<div class="card-header chat-list-header text-center">
					<a onClick={() => Navigate('-1')} class="dz-chat-history-back">
						<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><polygon points="0 0 24 0 24 24 0 24" /><rect fill="#000000" opacity="0.3" transform="translate(15.000000, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-15.000000, -12.000000) " x="14" y="7" width="2" height="10" rx="1" /><path d="M3.7071045,15.7071045 C3.3165802,16.0976288 2.68341522,16.0976288 2.29289093,15.7071045 C1.90236664,15.3165802 1.90236664,14.6834152 2.29289093,14.2928909 L8.29289093,8.29289093 C8.67146987,7.914312 9.28105631,7.90106637 9.67572234,8.26284357 L15.6757223,13.7628436 C16.0828413,14.136036 16.1103443,14.7686034 15.7371519,15.1757223 C15.3639594,15.5828413 14.7313921,15.6103443 14.3242731,15.2371519 L9.03007346,10.3841355 L3.7071045,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(9.000001, 11.999997) scale(-1, -1) rotate(90.000000) translate(-9.000001, -11.999997) " /></g></svg>
					</a>
					<div className='d-flex'>
						<div class="img_cont_msg">
							<img src={otheruser?.pro_pic} class="rounded-circle user_img_msg" alt="" />
						</div>
						<div>
							<h6 class=" mt-2 ms-2">Chat with {otheruser?.full_name}</h6>
							<p class="mb-1 text-primary">@{otheruser?.username}</p>

						</div>
						{/* <p class="mb-1 text-primary">@{otheruser?.username}</p> */}
						{/* <p class="mb-0 text-success">Online</p> */}
					</div>
					<div class="dropdown">
						<a href="javascript:void(0);" data-bs-toggle="dropdown" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24" /><circle fill="#000000" cx="5" cy="12" r="2" /><circle fill="#000000" cx="12" cy="12" r="2" /><circle fill="#000000" cx="19" cy="12" r="2" /></g></svg></a>
						<ul class="dropdown-menu dropdown-menu-end">
							<li class="dropdown-item"><i class="fa fa-user-circle text-primary me-2"></i> View profile</li>
						</ul>
					</div>
				</div>
				 <div class="card-body msg_card_body" id="DZ_W_Contacts_Body3" style={{overflowY: "auto",height: "8 0vh"}}>
					
					{
						messages?.length !== 1 ?

							<>{messages?.filter(e=>e.message != null).map((message) => {
								return (
									<>
										{
											(message?.sender?.id === fullUserProfileInfo.id) ?

											<div class="d-flex justify-content-end mb-4">
												<div class="msg_cotainer_send"> {message.message}
													<span class="msg_time_send">{format(message.timestamp)}</span>
												</div>
												<div class="img_cont_msg">
													<img src={message?.sender?.pro_pic} class="rounded-circle user_img_msg" alt="" />
												</div>
											</div>:
											<div class="d-flex justify-content-start mb-4">
												<div class="img_cont_msg">
													<img src={message?.receiver?.pro_pic} class="rounded-circle user_img_msg" alt="" />
												</div>
												<div class="msg_cotainer">
													{message.message}
													<span class="msg_time">{format(message.timestamp)}</span>
												</div>
											</div>


										}


									</>
								)
							})}
							</>
							:
							<li class="active dz-chat-user">
								<p>NO Messages yet YET!</p>
							</li>


					}
				</div> 
				<div class="card-footer type_msg">
					<div class="input-group">
						<textarea class="form-control" placeholder="Type your message..." value={message} onChange={(e) => setMessage(e.target.value)} ></textarea>
						<div class="input-group-append">
							<button type="button" class="btn btn-primary"><i class="fa fa-location-arrow" onClick={() => send_message(message, receiver_id)}></i></button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default User_MessagePage