import Reveal from 'reveal.js';
import { languageManager } from './i18n/LanguageManager.js';

// Import slides - Komponenten werden in ihren eigenen Dateien registriert
import './components/ChatFrame.js';
import './components/ChatInput.js';
import './components/ChatMessage.js';
import './components/Toolbar.js';
import './components/LanguageSelector.js';
import './slides/CalloutCreationSlide.js';
import './slides/ExampleResponsesSlide.js';
import './slides/AIAnalysisSlide.js';
import './slides/TranslationSlide.js';
import './slides/ImageGenerationSlide.js';

// Verfügbare Vorgaben für Eingaben
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

// Initialize Reveal.js
const deck = new Reveal({
  hash: true,
  transition: 'fade',
  center: false,
  mouseWheel: false, // Disable mouseWheel navigation
  embedded: false,
  touch: true,
  margin: 0,
  width: '100%',
  height: '100%',
  minScale: 1,
  maxScale: 1,
  disableLayout: true,
  containerAttributes: {
    'data-prevent-swipe': ''
  }
});

console.log('Reveal.js initialized');

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

// Function to highlight @ tags in text
function highlightTags(text) {
  if (!text || typeof text !== 'string' || text.indexOf('@') === -1) return text;
  
  // Nach unformatierten @Tags suchen (nicht innerhalb von spans)
  // Dies ist nur für manuell eingegebene Tags relevant
  return text.replace(/(?<!<span[^>]*>)(@\w+:[^?!.]*[?!.])/g, '<span class="tag">$1</span>');
}

// Function to adjust input height based on content
function adjustInputHeight(inputElement) {
  // Reset height to auto to get the correct scrollHeight
  inputElement.style.height = 'auto';
  
  // If the input is empty, set it to the default height
  if (!inputElement.textContent.trim()) {
    inputElement.style.height = '60px'; // Default min-height
  } else {
    // Set height to scrollHeight to fit all content
    inputElement.style.height = inputElement.scrollHeight + 'px';
  }
}

// Function to insert predefined prompt text
function insertPromptFunction(promptText, targetInputId) {
  console.log(`Inserting prompt function: ${promptText} ${targetInputId}`);
  
  // Der targetInputId kann entweder die ID oder ein DOM-Element sein
  let inputElement;
  
  if (typeof targetInputId === 'string') {
    // Versuchen, direkt nach ID zu suchen
    inputElement = document.getElementById(targetInputId);
    
    // Wenn nicht gefunden, versuchen ChatInput-Komponente zu finden
    if (!inputElement) {
      const chatInputComponent = document.querySelector(`chat-input[id="${targetInputId}"]`);
      if (chatInputComponent) {
        inputElement = chatInputComponent.querySelector('.chat-input');
      }
    }
  } else if (targetInputId instanceof HTMLElement) {
    // Falls ein DOM-Element übergeben wurde
    inputElement = targetInputId;
  }
  
  if (inputElement) {
    // Find the chat-input component that contains this input
    const chatInputComponent = inputElement.closest('chat-input') || 
                             (inputElement.tagName === 'CHAT-INPUT' ? inputElement : null);
    
    // Focus the input element first to make sure the cursor position is set
    if (inputElement.getAttribute('contenteditable') === 'true') {
      inputElement.focus();
    } else if (chatInputComponent) {
      const editableInput = chatInputComponent.querySelector('[contenteditable="true"]');
      if (editableInput) {
        inputElement = editableInput;
        inputElement.focus();
      }
    }
    
    // Insert the text at cursor position
    insertTextAtCursor(inputElement, promptText, chatInputComponent);
  } else {
    console.error(`Could not find input element: ${targetInputId}`);
  }
}

// Helper function to insert text at cursor position
function insertTextAtCursor(input, text, chatInput) {
  console.log(`Inserting text: ${text.substring(0, 20)}...`);
  
  // Always focus the input element first
  input.focus();
  
  try {
    // Wenn der Text ein HTML-String ist (beginnt mit <span>)
    if (text.startsWith('<span')) {
      // HTML direkt einfügen
      document.execCommand('insertHTML', false, text);
    } else {
      // Für normalen Text ohne HTML
      document.execCommand('insertText', false, text);
    }
    
    // Trigger input event to update height
    const inputEvent = new Event('input', {
      bubbles: true,
      cancelable: true,
    });
    input.dispatchEvent(inputEvent);
    
    // Adjust input height if ChatInput component available
    if (chatInput instanceof HTMLElement && typeof chatInput.adjustInputHeight === 'function') {
      chatInput.adjustInputHeight(input);
    }
  } catch (e) {
    console.error('Error inserting text at cursor:', e);
    
    // Fallback method: just append the text to the end
    if (text.startsWith('<span')) {
      input.innerHTML += text;
    } else {
      input.textContent += text;
    }
    
    // Adjust height if possible
    if (chatInput instanceof HTMLElement && typeof chatInput.adjustInputHeight === 'function') {
      chatInput.adjustInputHeight(input);
    }
  }
}

// Initialize event listeners
function initEventListeners() {
  console.log('Initializing event listeners');
}

// Make global functions available to the window object
window.insertPromptFunction = insertPromptFunction;
window.highlightTags = highlightTags;
window.adjustInputHeight = adjustInputHeight;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM content loaded');
  initEventListeners();
}); 