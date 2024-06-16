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

const blockedDomains = ["temu.com", "amazon.com", "temu.fr", "amazon.fr"];

// Function to remove search results from blocked domains
function blockSearchResults() {
  const results = document.querySelectorAll('a'); // Select all links
  results.forEach(result => {
    blockedDomains.forEach(domain => {
      // Check the href and the link text
      if (result.href.includes(domain) || result.textContent.includes(domain)) {
        // console.log("Blocking search result from " + domain);
        const resultElement = result.closest('div'); // Modify as per search engine result structure
        if (resultElement) {
          resultElement.style.display = 'none'; // Hide the result
        }
      }
    });
  });
}

// Run the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', blockSearchResults);

// Use a MutationObserver to detect changes in the DOM and re-run the function
const observer = new MutationObserver(blockSearchResults);
observer.observe(document.body, { childList: true, subtree: true });