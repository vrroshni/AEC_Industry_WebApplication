import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userChatList, addtoChat } from '../../actions/userActions'


function User_ChatList({ chat_receiver }) {

  const dispatch = useDispatch()

  const ChatList = useSelector(state => state.userChatList)
  const { chat_list_users } = ChatList
  console.log(chat_list_users, 'cccccccccccccccccccccccccchhhhhhhhhhhhhhhhhhh')

  useEffect(() => {

    dispatch(userChatList())

  }, [])


  return (
    <div class="card mb-sm-3 mb-md-0 " style={{ display: "block" }}>
      <div class="card-header chat-list-header text-center">
        <a href="javascript:void(0);"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect fill="#000000" x="4" y="11" width="16" height="2" rx="1" /><rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) " x="4" y="11" width="16" height="2" rx="1" /></g></svg></a>
        <div>
          <h6 class="mb-1">Chat List</h6>
          <p class="mb-0">Show All</p>
        </div>
        <a href="javascript:void(0);"></a>
      </div>
      <div class="card-body contacts_body p-0 dz-scroll  " id="DZ_W_Contacts_Body">
        <ul class="contacts">
          {chat_list_users?.length !== 0 ? <>
            {chat_list_users?.map((user, id) => {
              return (
                <li class="active dz-chat-user" key={id} onClick={() => chat_receiver(user.id)}>
                  <div class="d-flex bd-highlight">
                    <div class="img_cont">
                      <img src={user.pro_pic} class="rounded-circle user_img" alt="" />
                      <span class="online_icon"></span>
                    </div>
                    <div class="user_info">
                      <span>{user.full_name}</span>
                    </div>
                  </div>
                </li>)
            })}
          </> : 
          <li class="active dz-chat-user">
            <p>NO USERS YET!</p>
          </li>


          }
        </ul>
      </div>
    </div>
  )
}

export default User_ChatList