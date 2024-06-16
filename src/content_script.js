/**
 * content_script.js
 * 
 * This script is responsible for injecting the 'blocker.js' script into web pages.
 * The 'blocker.js' script contains the logic for blocking search results from specified domains.
 * 
 * This script is injected into web pages that match the patterns specified in the 'content_scripts' 
 * section of the manifest.json file.
 * 
 */

const script = document.createElement('script');
script.src = chrome.extension.getURL('blocker.js');
(document.head || document.documentElement).appendChild(script);