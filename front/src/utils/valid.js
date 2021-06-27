const valid = ({fullname, username, email, password, cf_password}) => {
    const error = {}

    if(!fullname){
        error.fullname = "Please enter your full name"
    }else if(fullname.length > 25){
        error.fullname = "Fullname is upto 25 characters long"
    }
    
    if(!username){
        error.username = "Please enter your username"
    }else if(username.replace(/ /g, "").length > 25){
        error.username = "Username is upto 25 characters long"
    }

    if(!email){
        error.email = "Please enter your email"
    }else if(!validateEmail(email)){
        error.email = "Email format is incorrect"
    }

    if(!password){
        error.password = "Please enter your password"
    }else if(password.length < 6 ){
        error.password = "password must be at least 6 character long "
    }

    if(password !== cf_password){
        error.cf_password = "Confirm password did not match"
    }

    return {
        errMsg: error,
        errLength: Object.keys(error).length
    }

}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export default valid