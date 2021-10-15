import axios from 'axios'

const uploadPic = async(media) =>{
    try{
        const form = new FormData();
        form.append('file',media);
        form.append('upload_preset','social_media')
        form.append('cloud_name','dk96bclgg');

        const res = await axios.post('https://api.cloudinary.com/v1_1/dk96bclgg/image/upload',form);
        return res.data.url;
    }
    catch(error){
        return error;
    }
}

export default uploadPic;