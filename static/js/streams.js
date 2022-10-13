
const APP_ID = '7a0a12131bdf45cca898514a4df85b31'
const TOKEN = '0067a0a12131bdf45cca898514a4df85b31IACOUg4gMbRRu9e2ThJfI7LV8lq3Una8xA//AL3nzUHJy2TNKL8AAAAAEACJVdSDjTK7YgEAAQCNMrti'
const CHANNEL = 'main'

let NAME = 'Moha'

const client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'})

let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async () => {                                                   
    document.getElementById('room-name').innerText = CHANNEL

    try{
        UID = await client.join(APP_ID, CHANNEL, TOKEN, UID)
    }catch(error){
        console.error(error)
        window.open('/', '_self')
    }
    
    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

    let player = `<div  class="video-container" id="user-container-${UID}">
                     <div class="video-player" id="user-${UID}"></div>
                     <div class="username-wrapper"><span class="user-name">${NAME}}</span></div>
                  </div>`
    
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)
    localTracks[1].play(`user-${UID}`)
    await client.publish([localTracks[0], localTracks[1]])
}

joinAndDisplayLocalStream()


