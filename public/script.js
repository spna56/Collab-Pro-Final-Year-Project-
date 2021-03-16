

              const myPeer = new Peer(undefined, {
                    path: '/peerjs',
                    host: '/',
                    port: '5000'
              })

              let myVideoStream;
              const myVideo = document.getElementById('my-video');

             // myVideo.muted=true
              
              navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
              }).then(stream => {
                myVideoStream=stream
                addVideoStream(myVideo, stream)

                myPeer.on('call', call => {
                      call.answer(stream)
                      const video = document.getElementById('second-video');
                      call.on('stream', userVideoStream => {
                        addVideoStream(video, userVideoStream)
                      })
                    })
                    socket.on("user-connected", (userId) => {
                      console.log("user connected.,.........."+userId);
                      setTimeout(function () {
                        connectToNewUser(userId, stream);
                      }, 1000)
                    })
              })
              var roomId = $('#roomId').val()

              myPeer.on('open', id => {

                socket.emit('join-room', {roomId:roomId}, id)
                console.log(roomId)
              })

              function connectToNewUser(userId, stream) {
                 
                    const call = myPeer.call(userId, stream)
                    const video = document.getElementById('second-video')
                    call.on('stream', userVideoStream => {
                      addVideoStream(video, userVideoStream)
                    })
                   // call.on('close', () => {
                     // video.remove()
                   // })

                 //   peers[userId] = call
              }

              function addVideoStream(video, stream) {
                video.srcObject = stream
                video.addEventListener('loadedmetadata', () => {
                  video.play()
                })
                   
              }
             

              const muteUnmute = () => {
                const enabled = myVideoStream.getAudioTracks()[0].enabled;
                if (enabled) {
                  myVideoStream.getAudioTracks()[0].enabled = false;
                  setUnmuteButton();
                } else {
                  setMuteButton();
                  myVideoStream.getAudioTracks()[0].enabled = true;
                }
              }

              const playStop = () => {
                console.log('object')
                let enabled = myVideoStream.getVideoTracks()[0].enabled;
                if (enabled) {
                  myVideoStream.getVideoTracks()[0].enabled = false;
                  setPlayVideo()
                } else {
                  setStopVideo()
                  myVideoStream.getVideoTracks()[0].enabled = true;
                }
              }
              const setMuteButton = () => {
                const html = `
                  <i class="fas fa-microphone"></i>
                  <span>Mute</span>
                `
                document.querySelector('.main__mute_button').innerHTML = html;
              }
              
              const setUnmuteButton = () => {
                const html = `
                  <i class="unmute fas fa-microphone-slash"></i>
                  <span>Unmute</span>
                `
                document.querySelector('.main__mute_button').innerHTML = html;
              }



              const setStopVideo = () => {
                const html = `
                  <i class="fas fa-video"></i>
                  <span>Stop Video</span>
                `
                document.querySelector('.main__video_button').innerHTML = html;
              }
              
              const setPlayVideo = () => {
                const html = `
                <i class="stop fas fa-video-slash"></i>
                  <span>Play Video</span>
                `
                document.querySelector('.main__video_button').innerHTML = html;
              }