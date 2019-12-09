function hasUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

if (hasUserMedia()) {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

  MediaStreamTrack.getSources(function(sources) {
    var audioSource = null;
    var videoSource = null;

    for (var i = 0; i != sources.length; ++i) {
      var source = sources[i];

      if(source.kind === "audio") {
        console.log("发现麦克风:", source.label, source.id);
        audioSource = source.id;
      } else if (source.kind === "video") {
        console.log("发现摄像头:", source.label, source.id);
        videoSource = source.id;
      } else {
        console.log("发现未知资源:", source);
      }
    }

    var constraints = {
      audio: {
        optional: [{sourceId: audioSource}]
      },
      video: {
        optional: [{sourceId: videoSource}]
      }
    };

    navigator.getUserMedia(constraints, function (stream) {
      var video = document.querySelector('video');
      video.src = window.URL.createObjectURL(stream);
    }, function (error) {
      console.log("Raised an error when capturing:", error);
    });
  });
} else {
  alert("Sorry, your browser does not support getUserMedia.");
}
