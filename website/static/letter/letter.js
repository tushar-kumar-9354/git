const text = `My Sweet Lover,

From the moment I heard your voice I felt a connection to your soul.
... (KEEP YOUR FULL PARAGRAPH)
ILY lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.ILY lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;


const paragraph = text.split("");
let indexPointer = 0;

// Function to handle typing effect
function dashOut(arr) {
  const textCont = document.querySelector(".textCont");
  
  if (indexPointer < arr.length) {
    textCont.textContent += arr[indexPointer];
    indexPointer++;
    
    // Use requestAnimationFrame for smoother timing if possible, 
    // but sticking to setTimeout for consistency with original code structure
    setTimeout(() => {
      dashOut(arr);
    }, interval(arr[indexPointer]));
    
  } else {
    // Optional: Remove the blinking cursor effect when typing is finished
    // You'd need to add a class to stop the blinking animation in CSS
    // textCont.classList.add('typing-done');
  }
}

// Function to control typing speed intervals
function interval(letter) {
  // Check for punctuation to introduce longer pauses
  if (letter === ";" || letter === "." || letter === ",") {
    return Math.floor(Math.random() * 500 + 500); // Slower for punctuation
  }
  return Math.floor(Math.random() * 130 + 20); // Normal speed
}

// Ensure jQuery and GSAP are loaded before this script runs
$(document).ready(function () {
    const $letterContainer = $('.letter-container');
    
    // --- STEP 1: Define the startTyping function ---
    function startTyping() {
        // Clear any pre-existing content just in case
        document.querySelector(".textCont").textContent = ''; 
        
        // Start the typing animation
        dashOut(paragraph);
    }

    // --- STEP 2: Animate the Letter Container into position using GSAP ---
    // This animation replaces the 20-second delay on window.onload.
    // We assume the container is initially positioned low (e.g., using translateY(100px) and opacity: 0 in CSS).
    
    // A longer delay (e.g., 15 seconds) is used here to match your original intent 
    // to wait before the letter appears, but the appearance is now smooth (slide up + fade in).
    const initialDelay = 15; // Delay in seconds before the container starts moving.

    TweenMax.to($letterContainer, 1.5, { 
        // y: 0 undoes the initial CSS transform: translateY(100px)
        y: 0, 
        opacity: 1, 
        ease: Power2.easeOut,
        delay: initialDelay, // The main delay before showing the letter
        onComplete: startTyping // Start the typing after the container has settled
    });
});