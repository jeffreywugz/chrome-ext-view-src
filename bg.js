
/* background script:
   - updates badge count
   - starts the viewer tab
*/

String.prototype.startsWith = function(s) {
    return this.indexOf(s) === 0;
};

chrome.browserAction.onClicked.addListener(function(tab) {

    // start viewer tab
    var url = chrome.extension.getURL('maintab.html#'+tab.id);
    chrome.tabs.create({url:url});
});

function tab_updated(id) {
    console.log('active tab: '+id);

    if (!get_config("tooltip"))
        return;

    // ask url
    chrome.tabs.get(id, function(tab) {
        if (tab.url && !tab.url.startsWith("chrome")) {
            // ask counts from content script
            chrome.tabs.sendMessage(id, {}, function(reply){
                update_badge(reply);
            });
        } else {
            // no reply from content script
            chrome.browserAction.setBadgeText({"text":""});
        }
    });
}

// tab activity - update badge
chrome.tabs.onActivated.addListener(function(tab){
    var id = tab.tabId;
    tab_updated(id);
});
chrome.tabs.onUpdated.addListener(function(tabid, info){
    if (info.status == "complete")
        tab_updated(tabid);
});

console.log('bg loaded');

