import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getDataAPI } from "../../utils/fetchData"
import { GLOBALTYPES } from "../../redux/actions/globalType"
import { Link } from "react-router-dom"
import UserCard from '../UserCard'

const Search = () => {

    const [search, setSearch] = useState("")
    const [users, setUsers] = useState([])

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleSearch = async (e) => {
        e.preventDefault()
        if(!search) return

        try {
            const res = await getDataAPI(`search?username=${search}`, auth.token)
            setUsers(res.data.users)
        } catch (error) {
            dispatch({
            type: GLOBALTYPES.ALERT, payload: { error: error.response?.data.msg }
            })
        }
    }

    const handleClose = () => {
        setSearch("")
        setUsers([])
    }

    return (
        <form className="search_form" onSubmit={handleSearch}>
            <input type="text" name="search" value={search} id="search"
                onChange={e => setSearch(e.target.value.toLowerCase().replace(/ /g, ""))} />

            <div className="search_icon" style={{ opacity: search ? 0 : 0.3 }}>
                <span className="material-icons">search</span>
                <span>Search</span>
            </div>

            <div className="close_search" style={{ opacity: users.length === 0 ? 0 : 1, cursor: "pointer" }}
                onClick={handleClose}>
                &times;
            </div>

            <button type="submit">Search</button>

            <div className="users">
                {
                    search && users.map(user => (
                        <Link key={user._id} to={`/profile/${user._id}`} onClick={handleClose}>
                            <UserCard user={user} border={"border"} />
                        </Link>

                    ))
                }
            </div>
        </form>
    )
}

export default Search
