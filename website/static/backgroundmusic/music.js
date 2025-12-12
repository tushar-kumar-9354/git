document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const audio = document.getElementById('birthday-audio');
    const heartIcon = document.getElementById('heart-icon');
    
    // Player state
    let isPlaying = false;
    let hasPlayedOnce = false;
    let userInteracted = false;
    
    // Initialize
    function init() {
        // Remove loop attribute so it plays only once
        audio.removeAttribute('loop');
        
        // Add event listeners
        heartIcon.addEventListener('click', togglePlay);
        
        // Audio events
        audio.addEventListener('playing', () => {
            isPlaying = true;
            updateHeart();
            console.log('Birthday song is playing...');
        });
        
        audio.addEventListener('pause', () => {
            isPlaying = false;
            updateHeart();
        });
        
        audio.addEventListener('ended', () => {
            isPlaying = false;
            hasPlayedOnce = true;
            updateHeart();
            console.log('Song ended. Click heart to play again.');
            
            // Change heart color when song ends
            heartIcon.style.color = '#c0d6df'; // Light pink
            heartIcon.style.background = 'rgba(192, 214, 223, 0.2)';
        });
        
        audio.addEventListener('error', (e) => {
            console.error('Audio error:', e);
            heartIcon.style.color = '#ff0000'; // Red for error
            heartIcon.style.background = 'rgba(255, 0, 0, 0.1)';
        });
        
        // Auto-play when page loads
        setTimeout(() => {
            autoPlaySong();
        }, 1000); // 1 second delay
        
        // Update heart initially
        updateHeart();
    }
    
    // Auto-play the birthday song
    function autoPlaySong() {
        if (!hasPlayedOnce && !isPlaying) {
            console.log('Auto-playing birthday song...');
            
            audio.play()
                .then(() => {
                    isPlaying = true;
                    updateHeart();
                })
                .catch(err => {
                    console.log('Auto-play prevented. Click the heart to play.');
                    
                    // Show gentle pulse to indicate it wants to play
                    heartIcon.style.animation = 'gentlePulse 2s infinite';
                    
                    // Mark user interaction on any click
                    document.addEventListener('click', function firstClick() {
                        userInteracted = true;
                        document.removeEventListener('click', firstClick);
                        
                        // Try to play again after user interaction
                        setTimeout(() => {
                            if (!isPlaying && !hasPlayedOnce) {
                                audio.play()
                                    .then(() => {
                                        isPlaying = true;
                                        updateHeart();
                                    })
                                    .catch(e => {
                                        console.log('Still blocked. User must click heart.');
                                    });
                            }
                        }, 500);
                    });
                });
        }
    }
    
    // Toggle play/pause
    function togglePlay() {
        userInteracted = true;
        
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
        } else {
            // If song has ended, reset to beginning
            if (audio.ended || hasPlayedOnce) {
                audio.currentTime = 0;
                hasPlayedOnce = false;
                // Reset heart color
                heartIcon.style.color = '#ff1493';
                heartIcon.style.background = 'rgba(255, 20, 147, 0.3)';
            }
            
            audio.play()
                .then(() => {
                    isPlaying = true;
                })
                .catch(err => {
                    console.error('Play failed:', err);
                });
        }
        
        updateHeart();
    }
    
    // Update heart appearance
    function updateHeart() {
        if (isPlaying) {
            heartIcon.classList.add('playing');
            heartIcon.title = 'Click to pause birthday song';
        } else {
            heartIcon.classList.remove('playing');
            
            if (hasPlayedOnce) {
                heartIcon.title = 'Song ended. Click to play again';
                // Add restart animation
                heartIcon.style.animation = 'gentlePulse 2s infinite';
            } else {
                heartIcon.title = 'Click to play birthday song';
            }
        }
    }
    
    // Start everything
    init();
    
    // Make audio available globally for debugging
    window.birthdayAudio = audio;
    window.birthdayPlayer = {
        play: function() { audio.play(); },
        pause: function() { audio.pause(); },
        restart: function() { 
            audio.currentTime = 0; 
            audio.play(); 
        }
    };
});