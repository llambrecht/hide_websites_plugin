document.addEventListener('DOMContentLoaded', function() {
  // Load stored blocked websites from storage
  browser.storage.local.get('blockedWebsites', function(data) {
    if (data.blockedWebsites) {
      let ul = document.getElementById('blockedWebsites');
      data.blockedWebsites.forEach(function(website) {
        let li = document.createElement("li");
        li.setAttribute('data-website', website);
        li.appendChild(document.createTextNode(website));
        li.appendChild(createRemoveButton(li, website));
        ul.appendChild(li);
      });
    }
  });

  // Handle add website button click
  document.getElementById('addWebsite').addEventListener('click', function() {
    var newWebsite = document.getElementById('newWebsite').value;
    var li = document.createElement("li");
    li.setAttribute('data-website', newWebsite);
    li.appendChild(document.createTextNode(newWebsite));
    li.appendChild(createRemoveButton(li, newWebsite));
    document.getElementById('blockedWebsites').appendChild(li);
    saveSettings();
  });
});

// Function to create a remove button
function createRemoveButton(li, website) {
  let removeButton = document.createElement("button");
  removeButton.classList.add('deleteButton');

  // Create the SVG icon
  let svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgIcon.setAttribute("viewBox", "0 0 24 24");
  svgIcon.setAttribute("fill", "none");
  svgIcon.setAttribute("stroke", "currentColor");
  svgIcon.setAttribute("stroke-width", "2");
  svgIcon.setAttribute("stroke-linecap", "round");
  svgIcon.setAttribute("stroke-linejoin", "round");
  svgIcon.classList.add("feather", "feather-trash");

  // Create the SVG paths
  let polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  polyline.setAttribute("points", "3 6 5 6 21 6");

  let path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute("d", "M19 6l-2 14H7L5 6");

  let path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute("d", "M10 11v6");

  let path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path3.setAttribute("d", "M14 11v6");

  // Append paths to SVG
  svgIcon.appendChild(polyline);
  svgIcon.appendChild(path1);
  svgIcon.appendChild(path2);
  svgIcon.appendChild(path3);

  // Append SVG to button
  removeButton.appendChild(svgIcon);

  removeButton.addEventListener('click', function() {
    li.remove();
    removeWebsite(website);
  });

  return removeButton;
}


// Function to save settings
async function saveSettings() {
  let blockedWebsites = [];
  let liElements = document.getElementById('blockedWebsites').getElementsByTagName('li');
  for (var i = 0; i < liElements.length; i++) {
    blockedWebsites.push(liElements[i].getAttribute('data-website'));
  }
  // Save blocked websites to storage
  await browser.storage.local.set({ 'blockedWebsites': blockedWebsites });
}

// Handle removeWebsite function
async function removeWebsite(website) {
  let data = await browser.storage.local.get('blockedWebsites');
  if (data.blockedWebsites) {
    let blockedWebsites = data.blockedWebsites.filter(function(item) {
      return item !== website;
    });
    await browser.storage.local.set({ 'blockedWebsites': blockedWebsites });
  }
}

// Add website on pressing Enter key
document.getElementById('newWebsite').addEventListener('keypress', function(e) {
  if (e.key === "Enter") {
    e.preventDefault(); // Prevent the default action (form submission)
    document.getElementById('addWebsite').click();
    document.getElementById('newWebsite').value = '';
  }
});




