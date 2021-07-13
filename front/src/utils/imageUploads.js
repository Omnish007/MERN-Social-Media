export const checkImage = (file) => {
    let err=""
    if(!file) return err="File does not exist"

    if(file.size > 1024 * 1024)//1mb
    err="Size of image should be 1MB or less"

    if(file.type !== "image/jpeg" && file.type !== "image/png" )
    err="Only JPEG & PNG format file supported"

    return err;
}

export const imageUpload = async (images) => {
    let imgArr = []

    for(const item of images){
        const formData = new FormData()

        if(item.camera){
            formData.append("file", item.camera)
        }
        else{
            formData.append("file", item)
        }

        
        formData.append("upload_preset", "bn5lpvkp")
        formData.append("cloud_name", "dulj4xv1l")

        const res = await fetch("https://api.cloudinary.com/v1_1/dulj4xv1l/upload",{
            method:"POST",
            body: formData
        })

        const data = await res.json()
        imgArr.push({public_id: data.public_id, url: data.secure_url})
    }
    return imgArr;
};
