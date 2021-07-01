import React from 'react'
import Status from '../components/home/Status'
import Posts from '../components/home/Posts'

const home = () => {
    return (
        <div className="home row mx-0">
            <div className="col-md-8">
                <Status />
                <Posts />
            </div>
            
            <div className="col-md-4"></div>
        </div>
    )
}

export default home
