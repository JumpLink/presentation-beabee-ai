import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/night.css';

// Initialize Reveal.js
const deck = new Reveal({
  // Configuration options
  hash: true,
  transition: 'slide',
  center: false,
  // Enable scrolling within slides
  mouseWheel: true,
  // Disable the default slide navigation when scrolling
  embedded: false,
  // Ensure content can be scrolled
  touch: true,
  // Prevent content from being cut off
  margin: 0.1,
  // Ensure scrollable elements work properly
  containerAttributes: {
    'data-prevent-swipe': ''
  }
});

// Add event listener to handle scrolling within slides
document.addEventListener('wheel', function(event) {
  // Find if we're inside a scrollable element
  let target = event.target;
  while (target && target !== document) {
    if (target.classList.contains('scrollable-content')) {
      // If the scrollable element is at the top and scrolling up, or
      // at the bottom and scrolling down, let Reveal handle it
      const isAtTop = target.scrollTop === 0;
      const isAtBottom = target.scrollHeight - target.scrollTop === target.clientHeight;
      
      if ((isAtTop && event.deltaY < 0) || (isAtBottom && event.deltaY > 0)) {
        // Let Reveal handle the event
        return;
      }
      
      // Otherwise, prevent Reveal from handling it
      event.stopPropagation();
      return;
    }
    target = target.parentNode;
  }
}, true);

deck.initialize(); 