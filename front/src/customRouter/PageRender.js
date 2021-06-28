import React from 'react'
import { useParams } from "react-router-dom"
import NotFound from '../components/NotFound'
import { useSelector } from 'react-redux'

const ganeratePage = (pageName) => {
    const component = () => require(`../pages/${pageName}`).default

    try {
        return React.createElement(component())
    } catch (error) {
        return <NotFound />
    }
}

function PageRender() {

    const { page, id } = useParams()
    const { auth } = useSelector(state => state)

    let pageName = ""

    if(auth.token){
        if(id){
            pageName = `${page}/[id]`
        }
        else{
            pageName = `${page}`
        }
    }

    return ganeratePage(pageName)
}

export default PageRender
