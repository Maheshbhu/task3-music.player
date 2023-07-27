const play=document.getElementById('play');
const artist=document.getElementById('artist');
const title=document.getElementById('title');
const music=document.querySelector('audio');
const prev=document.getElementById('prev');
const next=document.getElementById('next');
const img=document.querySelector('img');
let progress=document.getElementById('progress');
let total_duration=document.getElementById("duration");
let currrent_time=document.getElementById("progress");
let start_time=document.getElementById('current_time');
const progress_div=document.getElementById("progress_div");
let isplaying=false;
const songs=[
    {
    name:"m1",
    title:"Yo juni",
    artist:"Bishnu majhi",
    img:"images/img1.png"
},
{
    name:"m2",
    title:"Dalle sabun",
    artist:"Pashupati prasad",
    img:"images/img2.png"
},
{
    name:"m3",
    title:"Saree ke fall sa",
    artist:"nakash aziz",
    img:"images/img3.png"
}




]


 const loadsong=(songs)=>{
    title.textContent=songs.title;
    artist.textContent=songs.artist;
    music.src="songs/"+songs.name+".mp3";
    img.src=songs.img;

 }
//loadsong(songs[2]);
//play ka logic
const playMusic=()=>{
    isplaying=true;
    music.play();
    play.classList.replace('fa-play','fa-pause');//click krne pe icon change

img.classList.add("anime")//css me style krke rkha tha

};

//pause logic
const pauseMusic=()=>{
    isplaying=false;
    music.pause();
    play.classList.replace('fa-pause','fa-play');//click krne pe icon change

img.classList.remove("anime")//css me style krke rkha tha

};

play.addEventListener('click',()=>{
    if(isplaying){
        pauseMusic();
    }
    else{
        playMusic();
    }
});


//next song
var index=0;
const nextsong=()=>{
    index=(index+1)%songs.length;
    music.play(loadsong(songs[index]));
    index++;
    
}

const prevsong=()=>{
    index=(index-1+songs.length)%songs.length;
    music.play(loadsong(songs[index]));
    
    
}



//progress bar
music.addEventListener('timeupdate',(event)=>{
   
    const{currentTime,duration}=event.srcElement;

    let progress_time=(currentTime/duration)*100;
    progress.style.width=`${progress_time}%`;
// music duration update

let min_duration=Math.floor(duration/60);
let sec_duration=Math.floor(duration%60);

let tot_duration=`${min_duration}:${sec_duration}`;
if(duration){
    total_duration.textContent=`${tot_duration}`;

}


// music current time update

let min_currentTime=Math.floor(currentTime/60);
let sec_currentTime=Math.floor(currentTime%60);
if(sec_currentTime<10){
    sec_currentTime=`0${sec_currentTime}`;

}

let tot_currentTime=`${min_currentTime}:${sec_currentTime}`;

    start_time.textContent=`${tot_currentTime}`;


})
//paly pause
next.addEventListener("click",nextsong);

prev.addEventListener("click",prevsong);

//if music is ended
music.addEventListener("ended",nextsong);


//musi control with progressbar



progress_div.addEventListener("click",(event)=>{
    const{duration}=music;
    let mov_progress=(event.offsetX/event.srcElement.clientWidth)*duration;
    music.currentTime=mov_progress;


});