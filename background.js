chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get(['blockedSites'], (result) => {
        let blockedSites = result.blockedSites || [];
        updateBlockingRules(blockedSites);
    });
});

chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "updateRules") {
        chrome.storage.sync.get(['blockedSites'], (result) => {
            let blockedSites = result.blockedSites || [];
            updateBlockingRules(blockedSites);
        });
    }
});

function updateBlockingRules(blockedSites) {
    let rules = blockedSites.map((site, index) => ({
        id: index + 1,
        priority: 1,
        action: {
            type: "redirect",
            redirect: { extensionPath: "/screamer.html" }
        },
        condition: {
            urlFilter: `*://${site}/*`,
            resourceTypes: ["main_frame"]
        }
    }));

    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: Array.from({ length: 1000 }, (_, i) => i + 1),
        addRules: rules
    });
}
