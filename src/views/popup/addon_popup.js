document.addEventListener('DOMContentLoaded', function() {
  console.log("enters settings.js");
  // Load currently blocked websites from storage
  let blockedWebsitesTextarea = document.getElementById('blockedWebsites');
  
  // Load stored blocked websites from storage
  browser.storage.local.get('blockedWebsites', function(data) {
    if (data.blockedWebsites) {
      let ul = document.getElementById('blockedWebsites');
      data.blockedWebsites.forEach(function(website) {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(website));
        ul.appendChild(li);
      });
    }
  });

  // Save settings button click handler
  document.getElementById('saveSettings').addEventListener('click', function() {
    console.log("enters save settings")
    
    let blockedWebsites = [];
    let liElements = document.getElementById('blockedWebsites').getElementsByTagName('li');
    
    for (var i = 0; i < liElements.length; i++) {
      blockedWebsites.push(liElements[i].textContent);
    }

    // Save blocked websites to storage
    browser.storage.local.set({ 'blockedWebsites': blockedWebsites }, function() {
      console.log('Settings saved');
    });
  });

  // Add website button click handler
  document.getElementById('addWebsite').addEventListener('click', function() {
    var newWebsite = document.getElementById('newWebsite').value;
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(newWebsite));
    document.getElementById('blockedWebsites').appendChild(li);
  });
});

console.log("Hello");