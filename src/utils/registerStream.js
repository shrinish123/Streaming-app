import axios from "axios";
import baseUrl from "./baseUrl";
import catchErrors from "./catchErrors";

export const registerStream = async (stream,userId, thumbnail, setError, setLoading) => {


    try {

         const {title,description,streamKey} = stream;
         

      const res = await axios.post(`${baseUrl}/api/streams`, { userId,title,description,streamKey,thumbnail  });
  
      return res.data;
    } catch (error) {
      const errorMsg = catchErrors(error);
      setError(errorMsg);
    }
    setLoading(false);
  };