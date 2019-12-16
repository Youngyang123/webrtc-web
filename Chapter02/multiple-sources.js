function hasUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)
}

if (hasUserMedia()) {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia

  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.log("不支持 enumerateDevices()")
  }

  navigator.mediaDevices
      .enumerateDevices().then(devices => {
    let audioSource = null
    let videoSource = null

    devices.forEach(device => {
      if(device.kind === "audio") {
        console.log("发现麦克风:", device.label, device.id)
        audioSource = device.id
      } else if (device.kind === "video") {
        console.log("发现摄像头:", device.label, device.id)
        videoSource = device.id
      } else {
        console.log("发现未知资源:", device)
      }
    })


    let constraints = {
      audio: {
        optional: [{sourceId: audioSource}]
      },
      video: {
        optional: [{sourceId: videoSource}]
      }
    }

    navigator.getUserMedia(constraints, stream => {
      let video = document.querySelector('video')
      video.src = window.URL.createObjectURL(stream)
    }, error => {
      console.log("获取媒体流发生错误:", error)
    })

  }).catch(err => {
    console.log("enumerateDevices获取所有媒体发生错误："+err)
  })
} else {
  alert("对不起，你的浏览器不支持getUserMedia")
}
