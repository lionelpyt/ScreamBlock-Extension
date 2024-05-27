document.addEventListener('DOMContentLoaded', () => {
    const addSiteButton = document.getElementById('addSiteButton');
    const siteUrlInput = document.getElementById('siteUrl');
    const blockedSitesList = document.getElementById('blockedSitesList');

    chrome.storage.sync.get(['blockedSites'], (result) => {
        let blockedSites = result.blockedSites || [];
        blockedSites.forEach(site => addSiteToList(site));
    });

    addSiteButton.addEventListener('click', () => {
        let siteUrl = siteUrlInput.value.trim();
        if (siteUrl) {
            let domain = extractDomain(siteUrl);
            if (domain) {
                chrome.storage.sync.get(['blockedSites'], (result) => {
                    let blockedSites = result.blockedSites || [];
                    if (!blockedSites.includes(domain)) {
                        blockedSites.push(domain);
                        chrome.storage.sync.set({blockedSites: blockedSites}, () => {
                            addSiteToList(domain);
                            siteUrlInput.value = '';
                            updateBlockingRules();
                        });
                    }
                });
            } else {
                alert('Invalid URL');
            }
        }
    });

    function addSiteToList(site) {
        let li = document.createElement('li');
        li.textContent = site;
        let removeButton = document.createElement('span');
        removeButton.textContent = 'X';
        removeButton.className = 'remove-button';
        removeButton.addEventListener('click', () => {
            chrome.storage.sync.get(['blockedSites'], (result) => {
                let blockedSites = result.blockedSites || [];
                let index = blockedSites.indexOf(site);
                if (index !== -1) {
                    blockedSites.splice(index, 1);
                    chrome.storage.sync.set({blockedSites: blockedSites}, () => {
                        blockedSitesList.removeChild(li);
                        updateBlockingRules();
                    });
                }
            });
        });
        li.appendChild(removeButton);
        blockedSitesList.appendChild(li);
    }

    function updateBlockingRules() {
        chrome.runtime.sendMessage({ action: "updateRules" });
    }

    function extractDomain(url) {
        try {
            let urlObj = new URL(url);
            return urlObj.hostname;
        } catch (e) {
            console.error('Invalid URL:', e);
            return null;
        }
    }
});
