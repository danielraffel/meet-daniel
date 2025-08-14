// Story segments
const storySegments = [
    "Picture this: It's a beautiful San Francisco afternoon...",
    "I just finished teaching a dozen entrepreneurs how to use Cursor at a venture-funded residency in the Mission.",
    "My mind was buzzing with the energy of watching people discover they could suddenly build things they never imagined possible.",
    "I needed to eat, had consumed too much coffee, and was exhilarated.",
    "Then, as I'm driving home...",
    "I see the CEO of Cursor. Just walking down the street.",
    "It felt like I'd manifested him. 😂 Or maybe I'm living in his AI simulation?",
    "Either way, I knew I had to reach out somehow.",
    "So here we are..."
];

const dialogues = [
    { type: 'daniel', text: "Oh my god, is that...?" },
    { type: 'daniel', text: "Michael! Hi! I'm Daniel!" },
    { type: 'daniel', text: "I literally JUST taught a Cursor course!" },
    { type: 'daniel', text: "I use Cursor every single day!" },
    { type: 'daniel', text: "I've messaged you feedback about Cursor!" },
    { type: 'michael', text: "This is... unexpected" },
    { type: 'daniel', text: "I know this is weird but..." },
    { type: 'daniel', text: "Cursor is changing everything!" },
    { type: 'daniel', text: "I'd love to be part of it!" }
];

let currentSegment = 0;
let currentDialogue = 0;
let animationPhase = 0;
let player;
let isPlayerReady = false;

// Get elements
const startBtn = document.getElementById('startStory');
const intro = document.getElementById('intro');
const scene = document.getElementById('scene');
const narrativeText = document.getElementById('narrativeText');
const skyNarrative = document.getElementById('skyNarrative');
const aboutSection = document.getElementById('aboutSection');
const tesla = document.getElementById('tesla');
const daniel = document.getElementById('daniel');
const michael = document.getElementById('michael');
const danielSpeech = document.getElementById('danielSpeech');
const michaelThought = document.getElementById('michaelThought');
const portal = document.getElementById('portal');
const guru = document.getElementById('guru');
const guruMessage = document.getElementById('guruMessage');
const skipContainer = document.getElementById('skipContainer');
const skipBtn = document.getElementById('skipStory');

// YouTube Player API
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'J65GxJ2v9Wg',
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'start': 2844 // Start at 47:24
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    isPlayerReady = true;
}

// Start the story
function startStory() {
    intro.style.display = 'none';
    scene.classList.add('active');
    skipContainer.classList.add('active');
    
    // Start Michael walking
    michael.classList.add('walking');
    
    // Begin the story
    setTimeout(() => {
        playStorySegments();
    }, 500);
}

// Skip to about section
function skipToAbout() {
    // Stop any ongoing animations
    currentSegment = storySegments.length;
    currentDialogue = dialogues.length;
    
    // Hide animation elements
    scene.classList.remove('active');
    skipContainer.classList.remove('active');
    danielSpeech.style.display = 'none';
    michaelThought.style.display = 'none';
    portal.classList.remove('active');
    guru.classList.remove('active');
    
    // Stop music if playing
    if (isPlayerReady && player) {
        player.pauseVideo();
    }
    
    // Show about section
    aboutSection.classList.add('active');
    aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Auto-start after page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        startStory();
    }, 1500); // Start automatically after 1.5 seconds
});

// Also allow manual start if needed
startBtn.addEventListener('click', startStory);

// Skip button handler
skipBtn.addEventListener('click', skipToAbout);

// Show narrative in sky
function showNarrative(text) {
    narrativeText.textContent = text;
    narrativeText.classList.add('visible');
    
    setTimeout(() => {
        narrativeText.classList.remove('visible');
    }, 3000);
}

// Play story segments
function playStorySegments() {
    if (currentSegment < 5) {
        showNarrative(storySegments[currentSegment]);
        currentSegment++;
        setTimeout(playStorySegments, 3500);
    } else if (currentSegment === 5) {
        // Tesla drives in
        showNarrative(storySegments[currentSegment]);
        currentSegment++;
        setTimeout(() => {
            teslaArrives();
        }, 1500);
    }
}

// Tesla arrival animation
function teslaArrives() {
    tesla.classList.add('driving');
    tesla.querySelectorAll('.wheel').forEach(wheel => {
        wheel.classList.add('spinning');
    });
    
    setTimeout(() => {
        tesla.querySelectorAll('.wheel').forEach(wheel => {
            wheel.classList.remove('spinning');
        });
        
        // Daniel gets out
        setTimeout(() => {
            danielGetsOut();
        }, 500);
    }, 3000);
}

// Daniel gets out of the car
function danielGetsOut() {
    daniel.classList.add('visible');
    daniel.style.left = '80px';
    
    showNarrative(storySegments[6]);
    
    setTimeout(() => {
        // Daniel walks to Michael
        daniel.classList.add('walking');
        michael.classList.remove('walking');
        
        setTimeout(() => {
            startDialogue();
        }, 3000);
    }, 1000);
}

// Start the dialogue
function startDialogue() {
    daniel.classList.remove('walking');
    showNarrative(storySegments[7]);
    
    // Hide/adjust labels when characters are close on mobile
    if (window.innerWidth <= 768) {
        adjustLabelsForMobile();
    }
    
    setTimeout(() => {
        playDialogue();
    }, 2000);
}

// Adjust labels to prevent overlap on mobile
function adjustLabelsForMobile() {
    const danielLabel = daniel.querySelector('.label');
    const michaelLabel = michael.querySelector('.label');
    
    // Hide both labels during dialogue when characters are close
    if (danielLabel) {
        danielLabel.style.opacity = '0';
        danielLabel.style.transition = 'opacity 0.3s ease';
    }
    
    if (michaelLabel) {
        michaelLabel.style.opacity = '0';
        michaelLabel.style.transition = 'opacity 0.3s ease';
    }
}

// Play dialogue sequence
function playDialogue() {
    if (currentDialogue < dialogues.length) {
        const dialogue = dialogues[currentDialogue];
        
        if (dialogue.type === 'daniel') {
            showSpeechBubble(danielSpeech, dialogue.text);
            
            // Special animation for bowing
            if (currentDialogue === 8) {
                setTimeout(() => {
                    daniel.classList.add('bowing');
                    setTimeout(() => {
                        daniel.classList.remove('bowing');
                    }, 2000);
                }, 500);
            }
        } else {
            showSpeechBubble(michaelThought, dialogue.text);
        }
        
        currentDialogue++;
        
        // Check if we should trigger the universe moment
        if (currentDialogue === dialogues.length - 1) {
            setTimeout(() => {
                showUniverseMessage();
            }, 2000);
        } else {
            setTimeout(playDialogue, 2500);
        }
    } else {
        // End of dialogue
        setTimeout(() => {
            finishStory();
        }, 2000);
    }
}

// Show the universe/portal effect
function showUniverseMessage() {
    // Hide speech bubbles
    danielSpeech.style.display = 'none';
    michaelThought.style.display = 'none';
    
    // Show narrative about universe
    showNarrative("The universe is telling us something...");
    
    setTimeout(() => {
        // Show portal effect
        portal.classList.add('active');
        
        // Add trippy background effect
        scene.style.background = 'linear-gradient(45deg, #FF00FF, #00FFFF, #FFFF00, #FF00FF)';
        scene.style.backgroundSize = '400% 400%';
        scene.style.animation = 'psychedelic 3s ease infinite';
        
        // Show guru after portal appears
        setTimeout(() => {
            showGuru();
        }, 1500);
    }, 2000);
}

// Show guru with meditation message
function showGuru() {
    guru.classList.add('active');
    
    // Play meditation music if player is ready
    if (isPlayerReady && player) {
        player.playVideo();
    }
    
    setTimeout(() => {
        guruMessage.classList.add('visible');
        
        // Keep guru visible for a while
        setTimeout(() => {
            hideGuru();
        }, 5000);
    }, 1000);
}

// Hide guru and transition to about section
function hideGuru() {
    guruMessage.classList.remove('visible');
    
    setTimeout(() => {
        guru.classList.remove('active');
        portal.classList.remove('active');
        
        // Stop music
        if (isPlayerReady && player) {
            player.pauseVideo();
        }
        
        // Reset background
        scene.style.background = 'linear-gradient(to bottom, #87CEEB 0%, #87CEEB 60%, #90EE90 60%)';
        scene.style.animation = 'none';
        
        // Transition to about section
        setTimeout(() => {
            finishStory();
        }, 1000);
    }, 500);
}

// Show speech bubble
function showSpeechBubble(bubble, text) {
    bubble.style.display = 'block';
    bubble.querySelector('.bubble-content').textContent = text;
    
    // Position bubble above character on mobile
    if (window.innerWidth <= 768) {
        updateMobileBubblePosition(bubble);
    }
    
    // Animate in
    bubble.style.opacity = '0';
    setTimeout(() => {
        bubble.style.transition = 'opacity 0.3s ease';
        bubble.style.opacity = '1';
    }, 100);
    
    // Hide after delay
    setTimeout(() => {
        bubble.style.opacity = '0';
        setTimeout(() => {
            bubble.style.display = 'none';
        }, 300);
    }, 2000);
}

// Update bubble position on mobile to be above the character
function updateMobileBubblePosition(bubble) {
    if (bubble.id === 'danielSpeech') {
        const danielElement = document.getElementById('daniel');
        const danielRect = danielElement.getBoundingClientRect();
        const sceneRect = document.querySelector('.scene').getBoundingClientRect();
        
        // Position above Daniel
        bubble.style.left = (danielRect.left - sceneRect.left - 20) + 'px';
        bubble.style.right = 'auto';
        bubble.style.bottom = '180px';
        bubble.style.top = 'auto';
        bubble.style.maxWidth = '120px';
    } else if (bubble.id === 'michaelThought') {
        const michaelElement = document.getElementById('michael');
        const michaelRect = michaelElement.getBoundingClientRect();
        const sceneRect = document.querySelector('.scene').getBoundingClientRect();
        
        // Position above Michael
        bubble.style.right = (sceneRect.right - michaelRect.right - 20) + 'px';
        bubble.style.left = 'auto';
        bubble.style.bottom = '180px';
        bubble.style.top = 'auto';
        bubble.style.maxWidth = '120px';
    }
}

// Finish the story
function finishStory() {
    showNarrative(storySegments[8]);
    
    // Hide speech bubbles
    danielSpeech.style.display = 'none';
    michaelThought.style.display = 'none';
    
    // Hide skip button
    skipContainer.classList.remove('active');
    
    // Restore labels on mobile
    if (window.innerWidth <= 768) {
        const danielLabel = daniel.querySelector('.label');
        const michaelLabel = michael.querySelector('.label');
        
        if (danielLabel) {
            danielLabel.style.opacity = '1';
        }
        
        if (michaelLabel) {
            michaelLabel.style.opacity = '1';
        }
    }
    
    // Show about section after a delay
    setTimeout(() => {
        aboutSection.classList.add('active');
        aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 2000);
}

// Add psychedelic animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes psychedelic {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
`;
document.head.appendChild(style);

// Add some interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effect to Daniel
    daniel.addEventListener('mouseenter', () => {
        if (daniel.classList.contains('visible')) {
            daniel.style.transform = 'scale(1.1)';
        }
    });
    
    daniel.addEventListener('mouseleave', () => {
        daniel.style.transform = 'scale(1)';
    });
    
    // Add hover effect to Michael
    michael.addEventListener('mouseenter', () => {
        michael.style.transform = 'scale(1.1)';
    });
    
    michael.addEventListener('mouseleave', () => {
        michael.style.transform = 'scale(1)';
    });
    
    // Add hover effect to Tesla
    tesla.addEventListener('mouseenter', () => {
        tesla.querySelectorAll('.wheel').forEach(wheel => {
            wheel.style.animation = 'spin 0.5s linear infinite';
        });
    });
    
    tesla.addEventListener('mouseleave', () => {
        if (!tesla.classList.contains('driving')) {
            tesla.querySelectorAll('.wheel').forEach(wheel => {
                wheel.style.animation = 'none';
            });
        }
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && intro.style.display !== 'none') {
        e.preventDefault();
        startBtn.click();
    }
});

// Add a fun console message
console.log('%c Hey Michael! 👋', 'font-size: 24px; font-weight: bold; color: #667eea;');
console.log('%c If you\'re checking the console, you should know I built this with vanilla JS because I believe in understanding the fundamentals. Just like Cursor helps us build better by understanding our intent. 🚀', 'font-size: 14px; color: #764ba2;');
console.log('%c P.S. - Yes, I used Claude to help build this page about meeting you. Meta, right? 🤖', 'font-size: 12px; color: #999;');