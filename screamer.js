document.addEventListener('DOMContentLoaded', () => {
    let audio = document.getElementById('screamerSound');
    let playButton = document.getElementById('playButton');

    
    audio.play().catch((error) => {
        console.error('Audio playback error:', error);
   
        playButton.style.display = 'block';
    });

    if (playButton) {
        playButton.addEventListener('click', () => {
            audio.play();
            playButton.style.display = 'none';
        });
    } else {
        console.error('playButton element not found');
    }
});
