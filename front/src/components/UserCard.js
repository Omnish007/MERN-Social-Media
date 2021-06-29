import React from 'react'
import Avatar from "./Avatar"
import { Link } from "react-router-dom"

const UserCard = ({ user, border, handleClose }) => {

    const handleCloseAll = () => {
        if(handleClose) handleClose()
    }

    return (
        <div className={`d-flex p-2 align-item-center ${border}`}>

            <div>
                <Link to={`/profile/${user._id}`} onClick={handleCloseAll}
                className="d-flex align-item-center">
                    
                    <Avatar src={user.avtar} size="big-avatar" />

                    <div className="ml-1" style={{ transform: "translateY(-2px)" }}>
                        <span className="d-block">{user.username}</span>
                        <span style={{ opacity: 0.7 }}>{user.fullname}</span>
                    </div>
                </Link>
            </div>


        </div>
    )
}

export default UserCard
