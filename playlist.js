// Elementos del DOM
const audio = document.querySelector('audio');
const playBtn = document.getElementById('reproducir');
const prevBtn = document.getElementById('anterior');
const nextBtn = document.getElementById('siguiente');
const restartBtn = document.getElementById('reiniciar');
const progressContainer = document.getElementById('barradeprogreso');
const progress = document.getElementById('progreso');
const currentTimeEl = document.getElementById('tiempoActual');
const durationEl = document.getElementById('tiempoDuracion');
const titleEl = document.getElementById('titulo');
const artistEl = document.getElementById('artista');
const albumArt = document.querySelector('.imagenreproductor img');
const playlistTitle = document.getElementById('playlistTitle');
const cambiarPlaylistBtn = document.getElementById('cambiarplaylist');      
const playlistAnteriorBtn = document.getElementById('playlistAnterior');    
const songList = document.getElementById('songList');
const volumeBar = document.getElementById('volume');
const volumeIcon = document.getElementById('volume-icon');
const blurBG = document.getElementById("blur-bg");

function actualizarImagenAlbum(url) {
    albumArt.classList.remove("show");
    albumArt.src = url;
    if (blurBG) blurBG.style.backgroundImage = `url(${url})`;
    setTimeout(() => albumArt.classList.add("show"), 20);
}

const playlists = [

    {
        title: 'PLAYLIST 1: SERIES',
        songs: [
            { title: 'Ben 10 Opening Original', artist: 'Andy Sturmer', src: 'audio/playlist1/ben10_original.mp3', image: 'imagenes/index/playlist1/ben10_original.jpg' },
            { title: 'Ben 10 Fuerza Alienígena Opening', artist: 'Andy Sturmer', src: 'audio/playlist1/ben10_fuerzaalienigena.mp3', image: 'imagenes/index/playlist1/ben10_fuerzaalienigena.jpg' },
            { title: 'Ben 10 Supremacía Alienígena Opening', artist: 'Andy Sturmer', src: 'audio/playlist1/ben10_supremaciaalienigena.mp3', image: 'imagenes/index/playlist1/ben10_supremaciaalienigena.jpg' },
            { title: 'Ben 10 Omniverse Opening', artist: 'Parry Gripp', src: 'audio/playlist1/ben10_omniverse.mp3', image: 'imagenes/index/playlist1/ben10_omniverse.jpg' },
            { title: 'Ben 10 Ending Original', artist: 'Andy Sturmer', src: 'audio/playlist1/ben10_ending.mp3', image: 'imagenes/index/playlist1/ben10_ending.jpg' }
        ]
    },
	
    {
        title: 'PLAYLIST 2: PELÍCULAS',
        songs: [
            { title: 'Ben 10: Alien X-Tinction', artist: 'Andy Sturmer', src: 'audio/playlist2/ben10_alienxtinction.mp3', image: 'imagenes/index/playlist2/alienxtinction.jpg' },
            { title: 'Ben 10010', artist: 'Andy Sturmer', src: 'audio/playlist2/ben10010.mp3', image: 'imagenes/index/playlist2/ben10010.jpg' },
            { title: 'Ben 10: Héroes Unidos', artist: 'Andy Sturmer', src: 'audio/playlist2/ben10_generadorrex.mp3', image: 'imagenes/index/playlist2/heroesunidos.jpg' },
            { title: 'Ben 10: Carrera Contra el Tiempo', artist: 'Andy Sturmer', src: 'audio/playlist2/ben10_carrera.mp3', image: 'imagenes/index/playlist2/carrera.jpg' },
            { title: 'Ben 10: Invasión Alienígena', artist: 'Andy Sturmer', src: 'audio/playlist2/ben10_invasionalienigena.mp3', image: 'imagenes/index/playlist2/invasionalienigena.jpg' },
            { title: 'Ben 10: Versus el Universo', artist: 'Andy Sturmer', src: 'audio/playlist2/ben10_vsuniverso.mp3', image: 'imagenes/index/playlist2/vsuniverso.jpg' }
        ]
    },
	
    {
        title: 'PLAYLIST 3: VIDEOJUEGOS',
        songs: [
            { title: 'Ben 10: Protector of Earth', artist: 'Andy Sturmer', src: 'audio/playlist3/ben10_protectorofearth.mp3', image: 'imagenes/index/playlist3/protectorofearth.jpg' },
            { title: 'Ben 10: Alien Force', artist: 'Kristopher Carter', src: 'audio/playlist3/ben10_alienforce.mp3', image: 'imagenes/index/playlist3/alienforce.jpg' },
            { title: 'Ben 10: Alien Force - The Rise of Hex', artist: 'Nathan Lee', src: 'audio/playlist3/ben10_theriseofhex.mp3', image: 'imagenes/index/playlist3/riseofhex.jpg' },
            { title: 'Ben 10: Alien Force - Vilgax Attacks', artist: 'Mark Watters y Robert Irving', src: 'audio/playlist3/ben10_vilgaxattacks.mp3', image: 'imagenes/index/playlist3/vilgaxattacks.jpg' },
            { title: 'Ben 10: Ultimate Alien Cosmic Destruction', artist: 'Mark Watters, Robert Irving y Billy Martin', src: 'audio/playlist3/ben10_ultimatealiencosmicdestruction.mp3', image: 'imagenes/index/playlist3/cosmicdestruction.jpg' },
            { title: 'Ben 10: Galactic Racing', artist: 'Rod Abernethy', src: 'audio/playlist3/ben10_galacticracing.mp3', image: 'imagenes/index/playlist3/galacticracing.jpg' },
            { title: 'Ben 10: Omniverse', artist: 'Sebastian Evans II', src: 'audio/playlist3/ben10_omniverse.mp3', image: 'imagenes/index/playlist3/omniverse.jpg' },
            { title: 'Ben 10: Omniverse 2', artist: 'Sebastian Evans II', src: 'audio/playlist3/ben10_omniverse2.mp3', image: 'imagenes/index/playlist3/omniverse2.jpg' }
        ]
    }
	
];

let currentPlaylistIndex = 0;
let currentSongIndex = 0;
let isPlaying = false;
audio.volume = 1;

function populatePlaylist(songs) {
	
    songList.innerHTML = '';
	
    songs.forEach((song, index) => {
		
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = song.image;
        img.alt = song.title;
        const span = document.createElement('span');
        span.textContent = song.title;
        li.appendChild(img);
        li.appendChild(span);
		
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong();
            playSong();
        });
		
        songList.appendChild(li);
		
    });
	
}

function loadSong() {
    const song = playlists[currentPlaylistIndex].songs[currentSongIndex];
    audio.src = song.src;
    titleEl.textContent = song.title;
    artistEl.textContent = song.artist;
    actualizarImagenAlbum(song.image);
    audio.load();
    resetProgress();
    updateActiveSong();
}

function resetProgress() {
    progress.style.width = '0%';
    currentTimeEl.textContent = '0:00';
}

function updateActiveSong() {
	
    Array.from(songList.children).forEach((li, i) => {
        li.classList.toggle('active', i === currentSongIndex);
    });
	
}

function playSong() {
	
    audio.play().then(() => {
        playBtn.setAttribute('name', 'pause-outline');
        playBtn.setAttribute('title', 'Pausar Canción');
        isPlaying = true;
    }).catch(err => console.error("Error al reproducir:", err));
	
}

function pauseSong() {
    audio.pause();
    playBtn.setAttribute('name', 'play');
    playBtn.setAttribute('title', 'Reproducir Canción');
    isPlaying = false;
}

function formatTime(time) {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
}

function actualizarNavegacionPlaylist() {
	
    if (currentPlaylistIndex < playlists.length - 1) {
        cambiarPlaylistBtn.style.display = "block";
    }

	else {
        cambiarPlaylistBtn.style.display = "none";
    }

    if (currentPlaylistIndex > 0) {
        playlistAnteriorBtn.style.display = "block";
    } 
	
	else {
        playlistAnteriorBtn.style.display = "none";
    }
	
}

function cambiarPlaylist() {
	
    playlistTitle.textContent = playlists[currentPlaylistIndex].title;
    songList.style.opacity = '0';
    songList.style.transform = 'translateX(30px)';

    setTimeout(() => {
        populatePlaylist(playlists[currentPlaylistIndex].songs);
        currentSongIndex = 0;
        loadSong();
        if (isPlaying) playSong();
        songList.style.opacity = '1';
        songList.style.transform = 'translateX(0)';
        actualizarNavegacionPlaylist();
    }, 300);
}

cambiarPlaylistBtn.addEventListener('click', () => {
	
    if (currentPlaylistIndex < playlists.length - 1) {
        currentPlaylistIndex++;
        cambiarPlaylist();
    }
	
});

playlistAnteriorBtn.addEventListener('click', () => {
	
    if (currentPlaylistIndex > 0) {
        currentPlaylistIndex--;
        cambiarPlaylist();
    }
	
});

populatePlaylist(playlists[0].songs);
loadSong();
playlistTitle.textContent = playlists[0].title;
songList.style.opacity = '1';
songList.style.transform = 'translateX(0)';
actualizarNavegacionPlaylist();  

playBtn.addEventListener('click', () => {
    if (isPlaying) pauseSong();
    else playSong();
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + playlists[currentPlaylistIndex].songs.length) % playlists[currentPlaylistIndex].songs.length;
    loadSong();
    if (isPlaying) playSong();
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % playlists[currentPlaylistIndex].songs.length;
    loadSong();
    if (isPlaying) playSong();
});

restartBtn.addEventListener('click', () => {
    audio.currentTime = 0;
    resetProgress();
    if (isPlaying) playSong();
});

let rafId = null;
audio.addEventListener('timeupdate', () => {
	
    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
            progress.style.width = `${percent}%`;
            currentTimeEl.textContent = formatTime(audio.currentTime);
            durationEl.textContent = formatTime(audio.duration);
        });
    }
	
});

progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
});

audio.addEventListener('ended', () => {
    nextBtn.click();
});

let lastIconValue = 100;

volumeBar.addEventListener('input', () => {
    const value = parseInt(volumeBar.value);
    const vol = value / 100;
    audio.volume = vol;

    if (value === 0 || value === 50 || value === 100) {
		
        if (value !== lastIconValue) {
            lastIconValue = value;
            let iconName = 'volume-high';
            if (value === 0) iconName = 'volume-mute';
            else if (value === 50) iconName = 'volume-low';
            volumeIcon.style.transition = 'opacity 0.2s ease';
            volumeIcon.style.opacity = '0';
			
            setTimeout(() => {
                volumeIcon.setAttribute('name', iconName);
                volumeIcon.style.opacity = '1';
            }, 200);

            volumeBar.style.transition = 'transform 0.15s ease, box-shadow 0.15s ease';
            volumeBar.style.transform = 'scale(1.08)';
            volumeBar.style.boxShadow = '0 0 25px #17fc03, 0 0 40px #ccff14';
            clearTimeout(volumeBar._pulseTimeout);
			
            volumeBar._pulseTimeout = setTimeout(() => {
                volumeBar.style.transform = 'scale(1)';
                volumeBar.style.boxShadow = '0 0 10px #17fc03';
            }, 200);
			
        }
    }
});

volumeBar.value = 100;
audio.volume = 1;
volumeIcon.setAttribute('name', 'volume-high');
lastIconValue = 100;