import React from 'react'
import { useParams } from "react-router-dom"
import NotFound from './components/NotFound'

const ganeratePage = (pageName) => {
    const component = () => require(`./pages/${pageName}`).default

    try {
        return React.createElement(component())
    } catch (error) {
        return <NotFound />
    }
}

function PageRender() {

    const { page, id } = useParams()

    let pageName = ""

    if(id){
        pageName = `${page}/[id]`
    }
    else{
        pageName = `${page}`
    }
    console.log(pageName);

    return ganeratePage(pageName)
}

export default PageRender
