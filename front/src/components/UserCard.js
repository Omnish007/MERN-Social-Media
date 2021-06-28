import React from 'react'
import Avatar from "./Avatar"

const UserCard = ({user, border}) => {
    return (
        <div className={`d-flex p-2 align-item-center ${border}`}>
            <Avatar src={user.avtar} size="big-avatar"/>
            <div className="ml-1" style={{transform: "translateY(-2px)"}}>
                <span className="d-block">{user.username}</span>
                <span style={{opacity:0.7}}>{user.fullname}</span>
            </div>
        </div>
    )
}

export default UserCard
