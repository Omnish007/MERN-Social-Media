import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { checkImage } from "../../utils/imageUploads"
import { GLOBALTYPES } from "../../redux/actions/globalType"
import { updateProfileUser } from "../../redux/actions/profileAction"


const EditProfile = ({ setOnEdit }) => {

    const initialState = {
        fullname: "", mobile: "", address: "", website: "", story: "", gender: ""
    }

    const [userData, setUserData] = useState(initialState)

    const { fullname, mobile, address, website, story, gender } = userData

    const [avatar, setAvatar] = useState("")

    const { auth, theme } = useSelector(state => state)
    
    const dispatch = useDispatch()

    useEffect(() => {
        setUserData(auth.user)
    }, [auth.user])

    const changeAvatar = (e) => {
        const file = e.target.files[0]
        const err = checkImage(file)

        if(err) return dispatch({
            type: GLOBALTYPES.ALERT,
            payload:{error:err}
        })
        setAvatar(file)
    }

    const handleInput = (e) => {
        const { name, value } = e.target
        setUserData({
            ...userData,
            [name]: value
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateProfileUser({userData, avatar, auth}))
    }

    return (
        <div className="edit_profile">
            <button className="btn btn-danger btn_close"
                onClick={() => setOnEdit(false)}>
                Close
            </button>

            <form onSubmit={handleSubmit}>
                <div className="info_avatar">
                    <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt="avatar" className="supper-avatar" style={{ filter: theme ? "invert(1)" : "invert(0)" }} />

                    <span>
                        <i className="fas fa-camera" aria-hidden="false"/>
                        <p>change</p>
                        <input type="file" name="file" id="file_up"
                            accept="image/*" onChange={changeAvatar} />
                    </span>
                </div>

                <div className="form_group">
                    <label htmlFor="fullname">Full Name</label>
                    <div className="position-relative">
                        <input className="form-control" type="text"
                            name="fullname" id="fullaname" value={fullname}
                            onChange={handleInput}
                        />
                        <small className="text-danger position-absolute"
                            style={{ top: "50%", right: "5px", transform: "translateY(-50%)" }}
                        >
                            {fullname.length}/25
                        </small>
                    </div>
                </div>

                <div className="form_group">
                    <label htmlFor="text">Mobile</label>
                    <input className="form-control" type="number"
                        name="mobile" value={mobile}
                        onChange={handleInput}
                    />
                </div>

                <div className="form_group">
                    <label htmlFor="address">Address</label>
                    <input className="form-control" type="text"
                        name="address" value={address}
                        onChange={handleInput}
                    />
                </div>

                <div className="form_group">
                    <label htmlFor="website">Website</label>
                    <input className="form-control" type="text"
                        name="website" value={website}
                        onChange={handleInput}
                    />
                </div>

                <div className="form_group">
                    <label htmlFor="story">Story</label>
                    <textarea name="story" value={story} cols="30" rows="4"
                        className="form-control" onChange={handleInput}
                    />

                    <span className="text-danger d-block text-right">
                        {story.length}/200
                    </span>
                </div>

                <label htmlFor="gender">Gender</label>
                <div className="input_group-prepend px-0 mb-4">
                    <select name="gender" id="gender" value={gender}
                    className="custom-select tect-capitalize"
                    onChange={handleInput}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <button className="btn btn-info w-100" type="submit">Save</button>
            </form>
        </div>
    )
}

export default EditProfile
