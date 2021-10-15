import React from 'react';
import videojs from 'video.js'
import axios from 'axios';
// import config from '../../server/config/default';
import baseUrl from '../../utils/baseUrl';
import cookie from 'js-cookie';
import './VideoPlayer.css';
 
 
export default class VideoPlayer extends React.Component {
 
    constructor(props) {
        super(props);
 
        this.state = {
            stream: false,
            videoJsOptions: null,
            user:{},
        }
    }
 
    componentDidMount() {
        console.log(this.props.username);
        axios.get(`${baseUrl}/api/streams/user?username=${this.props.username}`, {
            headers:{
                Authorization: cookie.get('token'),
            }
        }).then(res => {
            this.setState({
                stream: true,
                videoJsOptions: {
                    autoplay: true,
                    controls: true,
                    sources: [{
                        src: 'http://127.0.0.1:8888/live/' + res.data.streamKey + '/index.m3u8',
                        type: 'application/x-mpegURL'
                    }],
                    fluid: true,
                },
                user:res.data,
            }, () => {
                this.player = videojs(this.videoNode, this.state.videoJsOptions, function onPlayerReady() {
                    console.log('onPlayerReady', this)
                });
            });
        })
    }
 
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    }
 
    render() {
        return (
            <div className="row">
                <div id='instructions'>
                    {this.state.stream ? (
                        <div data-vjs-player id='instructions'>
                            <video ref={node => this.videoNode = node} className="video-js vjs-big-play-centered" data-setup='{ "aspectRatio":"640:267", "playbackRates": [0.25,0.50,0.75,1, 1.5, 2] }' width="800px" height="500px"/>
                        </div>
                    ) : ' Loading ... '}
                </div>
                <div className="streambanner">
                     
                </div>
            </div>
        )
    }
}