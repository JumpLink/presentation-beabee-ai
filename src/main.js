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
const TOOLBAR_BUTTON_SELECTOR = '.toolbar-button';
const TOOLBAR_DROPDOWN_SELECTOR = '.toolbar-dropdown';

// Available callouts and questions for toolbar dropdowns
const AVAILABLE_CALLOUTS = [
  "Wie beeinflusst rechter Populismus die politische Debatte in Deutschland?",
  "Klimawandel und persönliche Verantwortung",
  "Digitalisierung im Gesundheitswesen"
];

const AVAILABLE_QUESTIONS = [
  "1: Welche Veränderungen in der politischen Debatte hast du wahrgenommen?",
  "2: Welche Rolle spielen soziale Medien für die Verbreitung rechter populistischer Narrative?",
  "3: Wie sollten Medien mit rechten populistischen Aussagen umgehen?",
  "4: Wie hat sich dein Umgang mit politischen Diskussionen verändert?"
];

// Dropdown functionality
window.toggleDropdown = function(event, id) {
  // Prevent default behavior and stop propagation
  event.preventDefault();
  event.stopPropagation();
  
  const dropdown = document.getElementById(id);
  
  // Close all other dropdowns first
  document.querySelectorAll(DROPDOWN_SELECTOR + ', ' + TOOLBAR_DROPDOWN_SELECTOR).forEach(el => {
    if (el.id !== id) {
      el.classList.remove('show');
    }
  });
  
  // Toggle the clicked dropdown
  dropdown.classList.toggle('show');
};

// Toggle toolbar dropdown
window.toggleToolbarDropdown = function(event, id) {
  // Prevent default behavior and stop propagation
  event.preventDefault();
  event.stopPropagation();
  
  const dropdown = document.getElementById(id);
  
  // Close all other dropdowns first
  document.querySelectorAll(DROPDOWN_SELECTOR + ', ' + TOOLBAR_DROPDOWN_SELECTOR).forEach(el => {
    if (el.id !== id) {
      el.classList.remove('show');
    }
  });
  
  // Toggle the clicked dropdown
  dropdown.classList.toggle('show');
};

// Close dropdowns when clicking elsewhere
function closeDropdownsOnOutsideClick(event) {
  if (!event.target.matches(PROMPT_FUNCTION_SELECTOR) && 
      !event.target.matches(DROPDOWN_ITEM_SELECTOR) && 
      !event.target.matches(TOOLBAR_BUTTON_SELECTOR) &&
      !event.target.matches('i')) {
    document.querySelectorAll(DROPDOWN_SELECTOR + ', ' + TOOLBAR_DROPDOWN_SELECTOR).forEach(el => {
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
window.insertPromptFunction = function(type, value, inputId) {
  const input = document.getElementById(inputId);
  let text = '';
  
  if (type === 'callout') {
    text = '@Callout: ' + value + ' ';
  } else if (type === 'frage') {
    text = '@Frage: ' + value.split(':')[0].trim() + ' ';
  }
  
  insertTextAtCursor(input, text);
  
  // Close all dropdowns
  document.querySelectorAll(DROPDOWN_SELECTOR + ', ' + TOOLBAR_DROPDOWN_SELECTOR).forEach(el => {
    el.classList.remove('show');
  });
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

// Initialize toolbar dropdowns
function initToolbarDropdowns() {
  // Create callout dropdowns
  document.querySelectorAll('.toolbar-button-callout').forEach((button, index) => {
    const inputId = button.getAttribute('data-input-id');
    const dropdownId = 'toolbar-callout-dropdown-' + inputId;
    
    // Create dropdown content
    let dropdownHTML = `
      <div class="toolbar-dropdown" id="${dropdownId}">
        <div class="dropdown-header">Verfügbare Callouts:</div>
    `;
    
    // Add dropdown items
    AVAILABLE_CALLOUTS.forEach(callout => {
      dropdownHTML += `<div class="dropdown-item" onclick="insertPromptFunction('callout', '${callout}', '${inputId}')">${callout}</div>`;
    });
    
    dropdownHTML += '</div>';
    
    // Append dropdown to button
    button.insertAdjacentHTML('beforeend', dropdownHTML);
  });
  
  // Create question dropdowns
  document.querySelectorAll('.toolbar-button-frage').forEach((button, index) => {
    const inputId = button.getAttribute('data-input-id');
    const dropdownId = 'toolbar-frage-dropdown-' + inputId;
    
    // Create dropdown content
    let dropdownHTML = `
      <div class="toolbar-dropdown" id="${dropdownId}">
        <div class="dropdown-header">Verfügbare Fragen:</div>
    `;
    
    // Add dropdown items
    AVAILABLE_QUESTIONS.forEach(question => {
      dropdownHTML += `<div class="dropdown-item" onclick="insertPromptFunction('frage', '${question}', '${inputId}')">${question}</div>`;
    });
    
    dropdownHTML += '</div>';
    
    // Append dropdown to button
    button.insertAdjacentHTML('beforeend', dropdownHTML);
  });
}

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
  
  // Initialize toolbar dropdowns
  initToolbarDropdowns();
  
  // Initialize dropdown navigation prevention
  preventDropdownNavigation();
}

// Initialize the application
document.addEventListener('DOMContentLoaded', initEventListeners); 