import React from 'react'
import { imageShow, videoShow } from '../../utils/mediaShow'
import Avatar from '../Avatar'
import { useSelector, useDispatch } from "react-redux"
import { deleteMessages } from "../../redux/actions/messageAction"

const MsgDisplay = ({ user, msg, theme, data }) => {

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleDeleteMessage = () => {
        if (data) {
            dispatch(deleteMessages({ msg, data, auth }))
        }
    }

    return (
        <>
            <div className="chat_title">
                <Avatar src={user.avatar} size="small-avatar" />
                <span>{user.username}</span>
            </div>

            <div className="you_content">
                {
                    user._id === auth.user._id &&
                    <i className="fas fa-trash text-danger"
                        onClick={handleDeleteMessage} />
                }

                <div>
                    {
                        msg.text &&
                        <div className="chat_text"
                            style={{ filter: theme ? "invert(1)" : "invert(0)" }}>
                            {msg.text}
                        </div>
                    }

                    {
                        msg.media.map((item, index) => (
                            <div key={index}>
                                {
                                    item.url.match(/video/i)
                                        ? videoShow(item.url, theme)
                                        : imageShow(item.url, theme)
                                }
                            </div>
                        ))
                    }
                </div>

            </div>



            <div className="chat_time">
                {new Date(msg.createdAt).toISOString()}
            </div>
        </>
    )
}

export default MsgDisplay
