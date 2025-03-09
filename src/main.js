import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/night.css';

// Initialize Reveal.js
const deck = new Reveal({
  // Configuration options
  hash: true,
  transition: 'fade',
  center: false,
  // Disable mouseWheel navigation
  mouseWheel: false,
  // Disable the default slide navigation when scrolling
  embedded: false,
  // Ensure content can be scrolled
  touch: true,
  // Prevent content from being cut off
  margin: 0,
  // Full width and height
  width: '100%',
  height: '100%',
  // Disable automatic scaling
  minScale: 1,
  maxScale: 1,
  // Disable automatic layout
  disableLayout: true,
  // Ensure scrollable elements work properly
  containerAttributes: {
    'data-prevent-swipe': ''
  }
});

// Add event listener to handle scrolling within slides
document.addEventListener('wheel', function(event) {
  // Find if we're inside a slide section
  let target = event.target;
  let insideSlide = false;
  
  while (target && target !== document) {
    if (target.tagName === 'SECTION' && target.parentNode && target.parentNode.classList.contains('slides')) {
      insideSlide = true;
      
      // If the slide is at the top and scrolling up, or
      // at the bottom and scrolling down, let Reveal handle it
      const isAtTop = target.scrollTop === 0;
      const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 5; // Adding small buffer
      
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

// Chat functionality
// Constants
const DROPDOWN_SELECTOR = '.dropdown-content';
const PROMPT_FUNCTION_SELECTOR = '.prompt-function';
const DROPDOWN_ITEM_SELECTOR = '.dropdown-item';

// Dropdown functionality
window.toggleDropdown = function(event, id) {
  // Prevent default behavior and stop propagation
  event.preventDefault();
  event.stopPropagation();
  
  const dropdown = document.getElementById(id);
  
  // Close all other dropdowns first
  document.querySelectorAll(DROPDOWN_SELECTOR).forEach(el => {
    if (el.id !== id) {
      el.classList.remove('show');
    }
  });
  
  // Toggle the clicked dropdown
  dropdown.classList.toggle('show');
};

// Close dropdowns when clicking elsewhere
function closeDropdownsOnOutsideClick(event) {
  if (!event.target.matches(PROMPT_FUNCTION_SELECTOR) && !event.target.matches(DROPDOWN_ITEM_SELECTOR)) {
    document.querySelectorAll(DROPDOWN_SELECTOR).forEach(el => {
      el.classList.remove('show');
    });
  }
}

// Prevent dropdown items from navigating
function preventDropdownNavigation() {
  document.querySelectorAll(DROPDOWN_ITEM_SELECTOR).forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
    });
  });
}

// Insert prompt function text into input field
window.insertPromptFunction = function(type, inputId) {
  const input = document.getElementById(inputId);
  let text = '';
  
  if (type === 'callout') {
    text = '@Callout: Wie beeinflusst rechter Populismus die politische Debatte in Deutschland? ';
  } else if (type === 'frage') {
    text = '@Frage: 1 ';
  }
  
  insertTextAtCursor(input, text);
};

// Helper function to insert text at cursor position
function insertTextAtCursor(input, text) {
  // Insert at cursor position or append
  if (typeof input.selectionStart !== 'undefined') {
    const startPos = input.selectionStart;
    const endPos = input.selectionEnd;
    input.value = input.value.substring(0, startPos) + text + input.value.substring(endPos);
    input.selectionStart = input.selectionEnd = startPos + text.length;
  } else {
    input.value += text;
  }
  
  // Focus the input
  input.focus();
}

// Send message (demo only)
window.sendMessage = function(inputId) {
  const input = document.getElementById(inputId);
  if (input.value.trim() !== '') {
    // In a real app, this would send the message
    // For demo purposes, just clear the input
    input.value = '';
    input.focus();
  }
};

// Initialize event listeners
function initEventListeners() {
  // Close dropdowns when clicking elsewhere
  document.addEventListener('click', closeDropdownsOnOutsideClick);
  
  // Allow Enter key to send message for all chat inputs
  document.querySelectorAll('.chat-input').forEach(input => {
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage(this.id);
      }
    });
  });
  
  // Initialize on DOM content loaded
  document.addEventListener('DOMContentLoaded', preventDropdownNavigation);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', initEventListeners); 