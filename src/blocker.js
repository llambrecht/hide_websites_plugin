/**
 * blocker.js
 * 
 * This script contains the logic for blocking search results from specified domains.
 * 
 * The 'blockedDomains' array contains the list of domains to block.
 * 
 * The 'blockSearchResults' function is responsible for hiding search results from the blocked domains.
 * It selects all links on the page and checks if their href or text content includes any of the blocked domains.
 * If a link matches a blocked domain, the function hides the closest div element (assumed to be the search result container).
 * 
 * The function is run when the DOM is fully loaded, and also whenever changes are made to the DOM.
 * This is to ensure that the function also works on search results that are loaded dynamically.
 */

let blockedDomains = new Set();
// Load and process blocked domains from storage
browser.storage.local.get('blockedWebsites', function(data) {
  if (data.blockedWebsites) {
    data.blockedWebsites.forEach(url => {
      blockedDomains.add(url.toLowerCase());
    });
  }
});

// Function to remove search results from blocked domains
function blockSearchResults() {
  document.querySelectorAll('a').forEach(link => {
    const linkHref = link.href.toLowerCase();
    blockedDomains.forEach(blockedDomain => {
      if (linkHref.includes(blockedDomain)) {
        const resultElement = link.closest('div');
        if (resultElement) resultElement.style.display = 'none';
      }
    });
  });
}


// Listen for messages from the settings script
browser.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'updateBlockedWebsites') {
    console.log('Updating blocked websites:', message.blockedWebsites);
    
    blockedDomains = message.blockedWebsites;
    blockSearchResults();
  }
});



// Run the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', blockSearchResults);

// Use a MutationObserver to detect changes in the DOM and re-run the function
const observer = new MutationObserver(blockSearchResults);
observer.observe(document.body, { childList: true, subtree: true });