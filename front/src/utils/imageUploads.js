export const checkImage = (file) => {
    let err=""
    if(!file) return err="File does not exist"

    if(file.size > 1024 * 1024)//1mb
    err="Size of image should be 1MB or less"

    if(file.type !== "image/jpeg" && file.type !== "image/png" )
    err="Only JPEG & PNG format file supported"

    return err
}

export const imageUpload = (images) => {
    console.log(images)
}