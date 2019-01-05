<div id="lyric-player"></div>
<song
name="Name Song"
song="http://www.botecodigital.info/exemplos/audio/i_am_the_doctor.mp3"
cover="cover.png"
artist="Artist Name"
album="Album Name">
  <lyric time="00:00:01" value="Part of Music"></lyric>
  <lyric time="00:00:02" value="Part of Music 2"></lyric>
  <lyric time="00:00:03" value="Part of Music 3"></lyric>
  <lyric time="00:00:04" value="Part of Music"></lyric>
  <lyric time="00:00:05" value="Part of Music 2"></lyric>
  <lyric time="00:00:06" value="Part of Music 3"></lyric>
  <lyric time="00:00:07" value="Part of Music"></lyric>
  <lyric time="00:00:08" value="Part of Music 2"></lyric>
  <lyric time="00:00:09" value="Part of Music 3"></lyric>
  <lyric time="00:00:10" value="Part of Music"></lyric>
  <lyric time="00:00:11" value="Part of Music 2"></lyric>
  <lyric time="00:00:12" value="Part of Music Obarr"></lyric>
</song>
<script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
<script>
//Peaga todas as musicas para a playlist
var songs = document.getElementsByTagName('song');
var song_now = 0;
var varLyric = new Array();
//pega o player
var player = $('#lyric-player');
//criar os elementos dos player
$(player).append('<audio id="lyric-audio" src="'+songs[song_now].getAttribute('song')+'"></audio><div id="lyric-viewer">LyricsJS</div><div id="lyric-controls-bar"><progress id="lyric-progress-bar" max="0" value="0"></progress><a id="lyric-play">play</a><a id="lyric-pause">pause</a><a id="lyric-stop">stop</a><a id="lyric-volume-mute">mute</a><a id="lyric-volume-down">-</a><progress id="lyric-progress-volume" max="1" value="1"></progress><a id="lyric-volume-up">+</a><div id="lyric-now-time">00:00:00</div><div id="lyric-total-time">00:00:00</div></div>');


var audio = document.getElementById('lyric-audio');
//esconde o pause ao iniciar
$("#lyric-pause").hide();
//??não sei do que se trata
audio.addEventListener('play', lyric_play_event , false);
audio.addEventListener('timeupdate', lyric_run , false);

//Play na musica
$("#lyric-play").click(function() {
  audio.play();
  lyric_play_event();
  $(this).hide();
  $("#lyric-pause").show();
});
//Pause na musica
$("#lyric-pause").click(function() {
  audio.pause();
  $(this).hide();
  $("#lyric-play").show();
});
//Parar a musica
$("#lyric-stop").click(function() {
  audio.pause();
  audio.currentTime = 0;
  $("#lyric-pause").hide();
  $("#lyric-play").show();
});
//Alterar volume da musica
$("#lyric-volume-up").click(function() {
  var volume = audio.volume + 0.1;
  if(volume > 1){
      volume = 1;
  }
  audio.volume = volume;
  $("#lyric-progress-volume").val(volume);
});
//abaixar o volume da musica
$("#lyric-volume-down").click(function() {
  var volume = audio.volume - 0.1;
  if(volume < 0){
      volume = 0;
  }
  audio.volume = volume;
  $("#lyric-progress-volume").val(volume);
});
//colocar no mudo
$("#lyric-volume-mute").click(function() {
  audio.volume = 0;
  $("#lyric-progress-volume").val(0);
});


function lyric_play_event(){
  $('#lyric-now-time').text(lyric_str( audio.currentTime));
  $('#lyric-total-time').text(lyric_str( audio.duration ));
  $("#lyric-progress-bar").attr("max", audio.duration);
  $('#lyric-progress-bar').val(audio.currentTime);
  var lyrics = songs[song_now].getElementsByTagName('lyric');
  var i;
  for (i = 0; i < lyrics.length; i++) {
    varLyric[lyrics[i].getAttribute('time')] = lyrics[i].getAttribute('value');
  }
}

function lyric_run(){
  document.getElementById('lyric-now-time').innerHTML = lyric_str( audio.currentTime);
  document.getElementById('lyric-progress-bar').value = audio.currentTime;
  var t = lyric_str(audio.currentTime);
  var l = varLyric[t];
  if(l != undefined){
    $("#lyric-viewer").text(varLyric[t]);
  };
}

function lyric_str( sec ) {
  sec = Math.floor( sec );
  var h = Math.floor(sec / 3600);
  var m = Math.floor((sec - (h * 3600)) / 60);
  var s = sec - (h * 3600) - (m * 60);

  if (h < 10) h = "0"+h;
  if (m < 10) m = "0"+m;
  if (s < 10) s = "0"+s;

  var result    = h+':'+m+':'+s;

  return result;
}
</script>
