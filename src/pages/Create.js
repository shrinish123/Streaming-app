import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Message, Segment, Divider } from "semantic-ui-react";
import ImageDropDiv from "../components/UI/ImageDropDiv";
// import { HeaderMessage, FooterMessage } from "../components/Common/WelcomeMessage";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import uploadPic from "../utils/uploadPicToCloudinary";
import { useHistory} from 'react-router-dom'
import cookie from 'js-cookie';
import { registerStream} from '../utils/registerStream'


function Create() {

    const [user, setUser] = useState({});

    useEffect(() => {
      const getLoggedUser = async () => {
        const res = await axios.get(`${baseUrl}/api/auth`, {
          headers: { Authorization: cookie.get("token") },
        });
        setUser(res.data.user);
        setStream(prev=>({...prev,streamKey:user.streamKey}));
      };
      getLoggedUser();
    }, [user.streamKey]);
       
    const [stream, setStream] = useState({
        title: "",
        description: "",
        streamKey: user.streamKey,

      });

      const [errorMsg, setErrorMsg] = useState(null);
      const [formLoading, setFormLoading] = useState(false);
      const [submitDisabled, setSubmitDisabled] = useState(true);

      const [media, setMedia] = useState(null);
      const [mediaPreview, setMediaPreview] = useState(null);
      const [highlighted, setHighlighted] = useState(false);
      const inputRef = useRef();
      const [showStreamKey,setShowStreamKey] = useState(false);
      const [userId,setUserId] = useState(user._id);
    
      const { title, description, streamKey } = stream;
      const history = useHistory(); 
      console.log(userId);

      useEffect(() => {
        const isUser = Object.values({ title, description }).every(item =>
          Boolean(item)
        );
        isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
      }, [stream,title,description]);
    
      const handleChange = e => {
        const { name, value, files } = e.target;
    
        if (name === "media") {
          setMedia(files[0]);
          setMediaPreview(URL.createObjectURL(files[0]));
        }
    
        setStream(prev => ({ ...prev, [name]: value }));
      };

      const handleSubmit = async e => {
        e.preventDefault();
        setFormLoading(true);
    
        let thumbnail;
        if (media !== null) {
           thumbnail= await uploadPic(media);
        }
    
        if (media !== null && !thumbnail) {
          setFormLoading(false);
          return setErrorMsg("Error Uploading Image");
        }
    
        const res = await registerStream(stream,userId, thumbnail, setErrorMsg, setFormLoading);
        res && history.push('/');
      };

    return (
        <>
        <Form loading={formLoading} error={errorMsg !== null} onSubmit={handleSubmit}>
        <Message
          error
          header="Oops!"
          content={errorMsg}
          onDismiss={() => setErrorMsg(null)}
        />

        <Segment>
          <ImageDropDiv
            mediaPreview={mediaPreview}
            setMediaPreview={setMediaPreview}
            setMedia={setMedia}
            inputRef={inputRef}
            highlighted={highlighted}
            setHighlighted={setHighlighted}
            handleChange={handleChange}
          />
          <Form.Input
            required
            label="Title"
            placeholder="Title of the Stream"
            name="title"
            value={title}
            onChange={handleChange}
            fluid
            icon="user"
            iconPosition="left"
          />

          <Form.Input
            required
            label="Description"
            placeholder="Add Stream Description"
            name="description"
            value={description}
            onChange={handleChange}
            fluid
            icon="envelope"
            iconPosition="left"
          />

        <Divider hidden />
        {!showStreamKey && (
            <Button
            icon="signup"
            content="Get Stream Key"
            type="submit"
            color="red"
            disabled={submitDisabled}
            onClick={()=>{setShowStreamKey(true);setStream(prev=>({...prev,streamKey:user.streamKey})); setUserId(user._id)}}
          />
        )}
          

          
        {showStreamKey && (
            <>
             <Form.Input
             label="StreamKey"
             name="password"
             value={streamKey}
             fluid
           />
 
           <Divider hidden />
           <Button
             icon="signup"
             content="Start Stream"
             type="submit"
             color="red"
             disabled={submitDisabled}
           />
           </>
        )}
         
        </Segment>
      </Form>
            
        </>
    )
}

export default Create
