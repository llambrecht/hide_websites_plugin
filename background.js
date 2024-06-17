chrome.runtime.onInstalled.addListener(function() {
  console.log("Search Engine Blocker extension installed.");
});

// Listening for changes in storage
chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === 'sync' && changes.blockedWebsites) {
    console.log('Blocked websites updated:', changes.blockedWebsites.newValue);
    
    // You may want to update your content scripts or other parts of the extension
    // Send a message to content scripts to update their behavior
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'updateBlockedWebsites', blockedWebsites: changes.blockedWebsites.newValue });
    });
  }
});
