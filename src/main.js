import Reveal from 'reveal.js';
import { ChatFrame } from './components/ChatFrame.js';
import { ChatInput } from './components/ChatInput.js';
import { ChatMessage } from './components/ChatMessage.js';
import { languageManager } from './i18n/LanguageManager.js';

// Import slides
import { CalloutCreationSlide } from './slides/CalloutCreationSlide.js';
import { ExampleResponsesSlide } from './slides/ExampleResponsesSlide.js';
import { AIAnalysisSlide } from './slides/AIAnalysisSlide.js';
import { TranslationSlide } from './slides/TranslationSlide.js';
import { ImageGenerationSlide } from './slides/ImageGenerationSlide.js';

// Register custom elements - each component now handles its own registration in its file
// So we can remove these custom element registrations here

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

// Function to toggle dropdowns
window.toggleDropdown = function(event, dropdownId) {
  event.stopPropagation();
  document.getElementById(dropdownId).classList.toggle("show");
};

// Function to toggle toolbar dropdowns
window.toggleToolbarDropdown = function(event, dropdownId) {
  event.stopPropagation();
  
  // Close all other dropdowns first
  document.querySelectorAll(TOOLBAR_DROPDOWN_SELECTOR).forEach(el => {
    if (el.id !== dropdownId) {
      el.classList.remove('show');
    }
  });
  
  // Toggle the clicked dropdown
  const dropdown = document.getElementById(dropdownId);
  if (dropdown) {
    dropdown.classList.toggle('show');
  }
};

// Close dropdowns when clicking elsewhere
function closeDropdownsOnOutsideClick(event) {
  // Wenn das Klick-Target kein Toolbar-Button ist und nicht innerhalb eines Dropdowns liegt
  if (!event.target.closest('.toolbar-button') && 
      !event.target.closest('.dropdown')) {
    // Alle aktiven Dropdowns schließen
    document.querySelectorAll('.dropdown.active').forEach(dropdown => {
      dropdown.classList.remove('active');
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

// Insert prompt function text into input field
window.insertPromptFunction = function(type, value, inputId) {
  console.log('Inserting prompt function:', type, value, inputId);
  
  const chatInput = document.querySelector(`chat-input[input-id="${inputId}"]`);
  if (!chatInput) {
    console.warn('No chat-input found with input-id:', inputId);
    return;
  }
  
  const input = chatInput.querySelector('.chat-input');
  if (!input) {
    console.warn('No .chat-input found in shadow DOM');
    return;
  }
  
  let text = '';
  
  if (type === 'callout') {
    text = '@Callout: ' + value + ' ';
  } else if (type === 'frage') {
    text = '@Frage: ' + value.split(':')[0].trim() + ' ';
  }
  
  insertTextAtCursor(input, text, chatInput);
  
  // Close all dropdowns
  document.querySelectorAll(TOOLBAR_DROPDOWN_SELECTOR).forEach(el => {
    el.classList.remove('show');
  });
};

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

// Function to simulate sending a message and show the conversation
window.showConversation = function(inputId) {
  console.log('Showing conversation for input:', inputId);
  
  const chatInput = document.querySelector(`chat-input[input-id="${inputId}"]`);
  if (!chatInput) {
    console.warn('No chat-input found with input-id:', inputId);
    return;
  }
  
  const chatFrame = chatInput.closest('chat-frame');
  if (!chatFrame) {
    console.warn('No chat-frame found for chat-input:', chatInput);
    return;
  }
  
  const messagesContainer = chatFrame.querySelector('[slot="messages"]');
  if (!messagesContainer) {
    console.warn('No messages slot found in chat-frame:', chatFrame);
    return;
  }
  
  // Show all messages in the conversation
  messagesContainer.style.display = 'block';
  messagesContainer.style.visibility = 'visible';
  
  // Clear the input field
  const input = chatInput.querySelector('.chat-input');
  if (input) {
    input.innerHTML = '';
    
    // Reset input field height
    if (typeof chatInput.adjustInputHeight === 'function') {
      chatInput.adjustInputHeight(input);
    }
    
    // Disable the input and send button
    input.setAttribute('contenteditable', 'false');
    const sendButton = chatInput.querySelector('.send-button');
    if (sendButton) {
      sendButton.disabled = true;
      sendButton.style.opacity = '0.5';
    }
  }
  
  // Scroll to the top of the messages container
  messagesContainer.scrollTop = 0;
};

// Send message function
window.sendMessage = function(inputId) {
  showConversation(inputId);
};

// Initialize toolbar dropdowns
function initToolbarDropdowns() {
  console.log('Initializing toolbar dropdowns');

  // Get all toolbar buttons
  document.querySelectorAll('.toolbar-button').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Find the dropdown that follows this button
      const dropdown = button.nextElementSibling;
      if (dropdown && dropdown.classList.contains('dropdown')) {
        // Toggle active class
        dropdown.classList.toggle('active');
        
        // Close all other dropdowns
        document.querySelectorAll('.dropdown.active').forEach(openDropdown => {
          if (openDropdown !== dropdown) {
            openDropdown.classList.remove('active');
          }
        });
      }
    });
  });
  
  // Add click events to dropdown items
  document.querySelectorAll('.dropdown-content button').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const promptText = button.getAttribute('data-prompt');
      if (promptText) {
        // Get the tag type
        const tagType = button.closest('.dropdown').previousElementSibling.getAttribute('data-tag-type');
        
        // Format the text with appropriate tag - direkt als HTML
        let formattedPrompt;
        if (tagType) {
          // Den Tag im Span verpacken und den Rest als normalen Text
          const tagText = `@${tagType}: ${promptText}`;
          formattedPrompt = `<span class="tag">${tagText}</span> `;
        } else {
          formattedPrompt = promptText;
        }
        
        // Find the closest chat-input
        const chatContainer = button.closest('.chat-container');
        if (chatContainer) {
          const chatInput = chatContainer.querySelector('chat-input');
          if (chatInput) {
            // Insert the text at cursor position
            const inputElement = chatInput.querySelector('.chat-input');
            if (inputElement) {
              // Focus the input first to make sure the cursor position is set
              inputElement.focus();
              
              // Insert the HTML direkt an der Cursor-Position
              document.execCommand('insertHTML', false, formattedPrompt);
              
              // Stellen wir sicher, dass die Höhe angepasst wird
              if (chatInput.adjustInputHeight) {
                chatInput.adjustInputHeight(inputElement);
              }
            }
          }
        }
        
        // Close the dropdown
        button.closest('.dropdown').classList.remove('active');
      }
    });
  });
}

// Initialize chat inputs with content from first user message
function initChatInputs() {
  // Get all chat containers
  const chatContainers = document.querySelectorAll('.chat-container');
  
  chatContainers.forEach(container => {
    // Get the messages container and input field
    const messagesContainer = container.querySelector('.chat-messages');
    const inputField = container.querySelector('.chat-input');
    
    // Hide the messages container initially
    messagesContainer.classList.add('hidden');
    messagesContainer.style.visibility = 'hidden';
    
    // Get the first user message
    const firstUserMessage = messagesContainer.querySelector('.user-message .message-content');
    
    if (firstUserMessage && inputField) {
      // Get the text content without dropdown HTML
      let messageText = '';
      
      // Clone the message content to work with
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = firstUserMessage.innerHTML;
      
      // Remove dropdown content
      const dropdowns = tempDiv.querySelectorAll('.dropdown-content');
      dropdowns.forEach(dropdown => dropdown.remove());
      
      // Get the text content from the prompt-function elements
      const promptFunctions = tempDiv.querySelectorAll('.prompt-function');
      promptFunctions.forEach(promptFunction => {
        // Replace the prompt-function with its text content
        const text = promptFunction.textContent.trim();
        const textNode = document.createTextNode(text);
        promptFunction.parentNode.replaceChild(textNode, promptFunction);
      });
      
      // Get the final text content
      messageText = tempDiv.textContent.trim();
      
      // Set the input field value with highlighted @ tags
      inputField.innerHTML = highlightTags(messageText);
      
      // Adjust height to fit content
      adjustInputHeight(inputField);
      
      // Add input event listener to highlight @ tags while typing
      inputField.addEventListener('input', function() {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const startOffset = range.startOffset;
        
        // Store the current content and cursor position
        const content = this.innerHTML;
        
        // Highlight @ tags
        this.innerHTML = highlightTags(this.textContent);
        
        // Adjust height to fit content
        adjustInputHeight(this);
        
        // Restore cursor position
        if (this.childNodes.length > 0) {
          try {
            const newRange = document.createRange();
            const textNode = this.childNodes[0];
            
            // Set cursor position
            newRange.setStart(textNode, Math.min(startOffset, textNode.length));
            newRange.setEnd(textNode, Math.min(startOffset, textNode.length));
            
            // Apply the range
            selection.removeAllRanges();
            selection.addRange(newRange);
          } catch (e) {
            console.error('Error restoring cursor position:', e);
          }
        }
      });
    }
  });
}

// Initialize event listeners
function initEventListeners() {
  console.log('Initializing event listeners');
  
  // Close dropdowns when clicking elsewhere
  document.addEventListener('click', closeDropdownsOnOutsideClick);
  
  // Add click events to toolbar buttons for dropdowns
  document.querySelectorAll('.toolbar-button').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Find the dropdown that follows this button
      const dropdown = button.nextElementSibling;
      if (dropdown && dropdown.classList.contains('dropdown')) {
        // Toggle active class
        dropdown.classList.toggle('active');
        
        // Close all other dropdowns
        document.querySelectorAll('.dropdown.active').forEach(openDropdown => {
          if (openDropdown !== dropdown) {
            openDropdown.classList.remove('active');
          }
        });
      }
    });
  });
  
  // Add click events to dropdown items
  document.querySelectorAll('.dropdown-content button').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const promptText = button.getAttribute('data-prompt');
      if (promptText) {
        // Get the tag type
        const tagType = button.closest('.dropdown').previousElementSibling.getAttribute('data-tag-type');
        
        // Format the text with appropriate tag - direkt als HTML
        let formattedPrompt;
        if (tagType) {
          // Den Tag im Span verpacken und den Rest als normalen Text
          const tagText = `@${tagType}: ${promptText}`;
          formattedPrompt = `<span class="tag">${tagText}</span> `;
        } else {
          formattedPrompt = promptText;
        }
        
        // Find the closest chat-input
        const chatContainer = button.closest('.chat-container');
        if (chatContainer) {
          const chatInput = chatContainer.querySelector('chat-input');
          if (chatInput) {
            // Insert the text at cursor position
            const inputElement = chatInput.querySelector('.chat-input');
            if (inputElement) {
              // Focus the input first to make sure the cursor position is set
              inputElement.focus();
              
              // Insert the HTML direkt an der Cursor-Position
              document.execCommand('insertHTML', false, formattedPrompt);
              
              // Stellen wir sicher, dass die Höhe angepasst wird
              if (chatInput.adjustInputHeight) {
                chatInput.adjustInputHeight(inputElement);
              }
            }
          }
        }
        
        // Close the dropdown
        button.closest('.dropdown').classList.remove('active');
      }
    });
  });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM content loaded');
  initEventListeners();
  initializeLanguageSelector();
  
  // Wait for custom elements to be defined and rendered
  setTimeout(() => {
    console.log('Initializing toolbar dropdowns after delay');
    initToolbarDropdowns();
    
    // Initialize chat inputs after components are loaded
    document.querySelectorAll('chat-input').forEach(input => {
      input.addEventListener('message-sent', function(e) {
        // Handle message sent event
        const message = e.detail.message;
        console.log('Message sent:', message);
        
        // Find the closest chat-frame
        const chatFrame = input.closest('.chat-container')?.querySelector('chat-frame');
        if (chatFrame) {
          // Add the message to the chat frame
          chatFrame.addMessage('user', message);
          
          // Optional: Add AI response simulation here if needed
        }
      });
    });
  }, 500); // Give components time to render
});

// Initialize language selector
function initializeLanguageSelector() {
    const languageButtons = document.querySelectorAll('.language-selector button');
    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            languageManager.setLanguage(lang);
            
            // Update active state
            languageButtons.forEach(btn => {
                btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
            });
        });
        
        // Set initial active state
        if (button.getAttribute('data-lang') === languageManager.getCurrentLanguage()) {
            button.classList.add('active');
        }
    });
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
    
    // Focus the input element first
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