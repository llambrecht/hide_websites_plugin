browser.runtime.onInstalled.addListener(function() {
  console.log("Search Engine Blocker extension installed.");
  const defaultBlockedWebsites = ['amazon', 'temu', 'aliexpress'];

  // Set the default list of blocked websites in storage
  browser.storage.local.set({blockedWebsites: defaultBlockedWebsites}, function() {
    console.log("Default blocked websites list has been set.");
  });
});

// Listening for changes in storage
browser.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === 'sync' && changes.blockedWebsites) {
    console.log('Blocked websites updated:', changes.blockedWebsites.newValue);
    
    // You may want to update your content scripts or other parts of the extension
    // Send a message to content scripts to update their behavior
    browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      browser.tabs.sendMessage(tabs[0].id, { action: 'updateBlockedWebsites', blockedWebsites: changes.blockedWebsites.newValue });
    });
  }

});
