document.addEventListener('DOMContentLoaded', () => {
    let audio = document.getElementById('screamerSound');
    let playButton = document.getElementById('playButton');

    // Try to play audio automatically
    audio.play().catch((error) => {
        console.error('Audio playback error:', error);
        // Show button if automatic play fails
        playButton.style.display = 'block';
    });

    // Add event listener for the button
    if (playButton) {
        playButton.addEventListener('click', () => {
            audio.play();
            playButton.style.display = 'none';
        });
    } else {
        console.error('playButton element not found');
    }
});
