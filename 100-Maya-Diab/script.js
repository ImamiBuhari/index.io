function onYouTubeIframeAPIReady() {

  var prevBtn = document.getElementById('prev');
  var nextBtn = document.getElementById('next');


var videos = [ 'DeSdqCNgZIg', '2651hzL5Djw', '2X36wXLNkcw', '1tEbNOlPgxc', 'NrhXpOe8P1o', 's_h023D-3H4', '376gK-H585I', '6Px7XvOD6KA', '0yByT4V5MpI', '8Ly0OyMZkNI',  
'6XNowkaAXS8','kfEQsGYmKeE','OUM-KW-jpe0', '-eG8pFhOEZg','3S43G28Whcs','XutYffQy4Ag','EwM3KgELpns','UyesACrhhjU','CNg8526379A', 'B0hv3MLBHNk','foSO47ceJaQ','3nZlyfBT4vs',
'5pUPf1CWFAc','UyesACrhhjU','J6FGpPAvRZA','cHr6lA6Bt1Y','wET915X7kXg','iP_U4qlXxvs','WA02-p-KwM8','4DP7kYdOO7c','ARCh7ApfzWc','55Qx5SQFiws',
'Yym5ey176Jw','A3gtFpbPL8I','FV0xZyg5YYc','BuiOO21E6L8','o1gU7rLBJtw','YYA93hzP6Jw','R55vXluB1f4','9B1aus2kDaA','I3Y4p7TrX14','Y1rnC1Yb02Y',
'rF6lTS0syrM','DO_qQRfNsZs','vA4WtaSsWhA','tlxc9gjnisY','rLnPhJrPqsg','LExXtBucjVI','Vk4oa6z4pyM','cZylaWbOBeg','uJllSjBSNPM',
'sf2ejwVk1Ro','RBxyj-8XKOY','QEwPOOUA12o','tC2GqKhqy5I','dKcsaWQCj9k','nCveDGo4H68','yYKZs0-CW8I','GkbIUxBsimc',     'w0TWX3aMFz4' ];
  var playlistThumbs = document.querySelector('.playlist-thumbs');

  var videoThumbs;
  var currentIndex = 0;

  videos.forEach(function(id, i){
    var activeClass = '';
    if ( i === currentIndex ) {
      activeClass = 'is-active';
    }
    playlistThumbs.innerHTML += '<li class="video-thumb '+activeClass+'"><img src="https://img.youtube.com/vi/'+id+'/default.jpg"/></li>';
  });
  
  videoThumbs = document.querySelectorAll('.video-thumb');
  
  initPlayer(videos[currentIndex]);
  
  
  var player;
  function initPlayer(id) {
    console.log('initPlayer');
    // This function creates an <iframe> (and YouTube player) after the API code downloads.
    player = new YT.Player('player', {
      height: '250',
      width: '340',
      videoId: id,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }
  
  prevBtn.addEventListener('click', playPrevVideo);
  nextBtn.addEventListener('click', playNextVideo);

  // The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    console.log('onPlayerREady', event);
    event.target.playVideo();
  }
  
  function onPlayerStateChange(event) {
    if ( event.data === 0 ) { // video ended
      playNextVideo();
    }
  }

  function playNextVideo() {
    currentIndex += 1;
    player.loadVideoById(videos[currentIndex], 0, "large");
    for ( var i=0; videoThumbs.length > i; i++ ) {
      videoThumbs[i].className = videoThumbs[i].className.split('is-active').join('');
      videoThumbs[currentIndex].className += ' is-active';
    }
  }
  
  function playPrevVideo() {
    currentIndex -= 1;
    player.loadVideoById(videos[currentIndex], 0, "large");
    for ( var i=0; videoThumbs.length > i; i++ ) {
      videoThumbs[i].className = videoThumbs[i].className.split('is-active').join('');
      videoThumbs[currentIndex].className += ' is-active';
    }
  }
  
  
  
}