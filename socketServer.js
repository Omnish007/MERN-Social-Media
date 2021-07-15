let users = []

const SocketServer = (socket) => {

    //connect
    socket.on("joinUser", user => {
        users.push({ id: user._id, socketId: socket.id, followers: user.followers})
    })

    //disconnect
    socket.on("disconnect", () => {
        const data = users.find(user => user.socketId === socket.id)
        if(data){
            const clients = users.filter(user => 
                data.followers.find(item => item._id === user.id)
            )
            if(clients.length > 0){
                clients.forEach(client => {
                    socket.to(`${client.socketId}`).emit("checkUserOffline", data.id)
                })
            }
        }
        users = users.filter(user => user.socketId !== socket.id)
    })

    //like
    socket.on("likePost", newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))

        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit("likeToClient", newPost)
            })
        }
    })

    //unlike
    socket.on("unlikePost", newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))

        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit("unLikeToClient", newPost)
            })
        }
    })

    //createcomment
    socket.on("createComment", newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))

        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit("createCommentToClient", newPost)
            })
        }
    })

    //deletecomment
    socket.on("deleteComment", newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))

        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit("deleteCommentToClient", newPost)
            })
        }
    })

    //follow 
    socket.on("follow", newUser => {
        const user = users.find(user => user.id === newUser._id)
        user && socket.to(`${user.socketId}`).emit("followToClient", newUser)
    })

    //unfollow 
    socket.on("unFollow", newUser => {
        const user = users.find(user => user.id === newUser._id)
        user && socket.to(`${user.socketId}`).emit("unFollowToClient", newUser)
    })

    // notification
    socket.on("createNotify", msg => {

        const clients = users.filter(user => msg.recipients.includes(user.id))

        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit("createNotifyToClient", msg)
            })
        }
    })

    //remove notification
    socket.on("removeNotify", msg => {

        const clients = users.filter(user => msg.recipients.includes(user.id))

        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit("removeNotifyToClient", msg)
            })
        }
    })

    //add message
    socket.on("addMessage", msg => {
        const user = users.find(user => user.id === msg.recipient)
        user && socket.to(`${user.socketId}`).emit("addMessageToClient", msg)
    })

    //check online offline status
    socket.on("checkUserOnline", data => {
        const following = users.filter(user =>
            data.following.find(item => item._id === user.id)
        )
        socket.emit("checkUserOnlineToMe", following)

        const clients = users.filter(user =>
            data.followers.find(item => item._id === user.id)
        )

        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit("checkUserOnlineToClient", data._id)
            })
        }
    })

}

module.exports = SocketServer