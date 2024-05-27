chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
    var blockedSites = [
        /https?:\/\/(www\.)?youtube\.com\/.*/,
        /https?:\/\/site2\.net\/.*/
    ];

    for (var i = 0; i < blockedSites.length; i++) {
        if (blockedSites[i].test(details.url)) {
            chrome.tabs.update(details.tabId, {url: chrome.runtime.getURL("screamer.html")});
            break;
        }
    }
}, {url: [{urlMatches : '<all_urls>'}]});
