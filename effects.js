function copyAddress(id) {
    const svgElement = document.getElementById(id + 'Input');
    const title = svgElement.getAttribute('title');

    navigator.clipboard.writeText(title).then(() => {
        alert('copied the discord to clipboard: @' + title);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

function removeOverlay() {
    var overlay = document.getElementById('overlay');
    var userpage = document.getElementById('user-page');
    var audio = document.getElementById('backgroundsong');

    overlay.style.opacity = '0';
    userpage.style.display = 'flex';
    audio.volume = getVolume();
    audio.muted = audio.volume === 0;
    audio.play();
    updateMusicIcon();

    setTimeout(function() { 
        overlay.style.display = 'none';
    }, 2000);
}

function toggleMusic() {
    var audio = document.getElementById('backgroundsong');
    var volumeSlider = document.getElementById('music-volume');

    if (audio.muted || audio.volume === 0) {
        var restoredVolume = Number(volumeSlider.dataset.previousVolume) || 30;
        volumeSlider.value = restoredVolume;
        audio.volume = restoredVolume / 100;
        audio.muted = false;
    } else {
        volumeSlider.dataset.previousVolume = String(Number(volumeSlider.value) || 30);
        audio.muted = true;
    }

    updateMusicIcon();
}

function getVolume() {
    return Number(document.getElementById('music-volume').value) / 100;
}

function updateMusicIcon() {
    var audio = document.getElementById('backgroundsong');
    var icon = document.getElementById('music-icon');
    var button = document.getElementById('music-toggle');
    var isMuted = audio.muted || audio.volume === 0;

    icon.src = isMuted
        ? './r2.wya.lol/music_icon_mute.svg'
        : './r2.wya.lol/music_icon.svg';
    button.setAttribute('aria-label', isMuted ? 'Unmute music' : 'Mute music');
}

document.addEventListener("DOMContentLoaded", () => {
    const volumeSlider = document.getElementById('music-volume');
    const audio = document.getElementById('backgroundsong');

    volumeSlider.dataset.previousVolume = volumeSlider.value;
    audio.volume = getVolume();
    updateMusicIcon();

    volumeSlider.addEventListener('input', () => {
        const volume = Number(volumeSlider.value);
        audio.volume = volume / 100;
        audio.muted = volume === 0;

        if (volume > 0) {
            volumeSlider.dataset.previousVolume = String(volume);
        }

        updateMusicIcon();
    });

    const prefix = "⠐ ";
    const titleText = "guns.lol is trash";
    let index = 0;
    let isDeleting = false;

function typeWriter() {
    document.title = prefix + titleText.substring(0, index);

    if (!isDeleting && index < titleText.length) {
        index++;
    setTimeout(typeWriter, 200);

    } else if (isDeleting && index > 0) {
        index--;
    setTimeout(typeWriter, 200);

    } else {
        isDeleting = !isDeleting;
    setTimeout(typeWriter, 1000);
    }
}

typeWriter();
});

document.addEventListener("DOMContentLoaded", function () {
const elements = document.querySelectorAll('.typewriter');
const texts = ["Why is orange called orange but apple is not called a red?", "Professional Idiot ","Why am I named after a block in minecraft?","Why does this typewriter effect go so hard ?", "What do yall think of VS code users ? ","Prismarine lowkey is a terrible name ngl","Congrats you reached the end of the texts!"];
const typingSpeed = 75;
const pauseDuration = 1250;
let currentIndex = 0;

elements.forEach((element) => {
element.textContent = '';
let textIndex = 0;
let forward = true;

function typeWriter() {
    const currentText = texts[currentIndex];

    if (forward) {
        if (textIndex < currentText.length) {
            element.textContent += currentText.charAt(textIndex);
            textIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            setTimeout(() => {
                forward = false;
                typeWriter();
            }, pauseDuration);
        }
    } else {
        if (textIndex > 0) {
            textIndex--;
            element.textContent = currentText.substring(0, textIndex);
            setTimeout(typeWriter, typingSpeed);
        } else {
            currentIndex = (currentIndex + 1) % texts.length;
            forward = true;
            setTimeout(typeWriter, pauseDuration);
        }
    }
}

typeWriter();
});
});
