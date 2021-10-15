const config = {
    server: {
        secret: 'kjVkuti2xAyF3JGCzSZTk0YWM5JhI9mgQW4rytXc'
    },
    rtmp_server: {
        rtmp: {
            port: 1935,
            chunk_size: 60000,
            gop_cache: true,
            ping: 60,
            ping_timeout: 30
        },
        http: {
            port: 8888,
            mediaroot: './media',
            allow_origin: '*'
        },
        trans: {
            ffmpeg: 'C:/ffmpeg/ffmpeg.exe',
            tasks: [
                {
                    app: 'live',
                    hls: true,
                    hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
                    dash: true,
                    dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
                }
            ]
        }
    }
};

const NodeMediaServer = require('node-media-server')
const nms = new NodeMediaServer(config.rtmp_server);
const UserModel = require('./models/UserModel');

nms.on('prePublish',async(id,StreamPath,args)=>{
    let stream_key = getStreamKeyFromStreamPath(StreamPath);
    console.log('[NodeEvent on prePublish]',`id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    try {
        const user = await UserModel.findOne({streamKey:stream_key})

        if(!user) {
            let session= nms.getSession(id);
            session.reject();
        }
        
    } catch (error) {
        console.log(error);
        console.log('Sever Error');
    }

})

const  getStreamKeyFromStreamPath =(path) =>{
    let parts = path.split('/');
    return parts[parts.length - 1];
}

module.exports = nms;