const generateRegExp = (domain) => {
    const preReg = `(http(s){0,1}:\\/\\/){1}(www\\.){0,1}(${domain.replace('.','\\.')}\\/){1}.{1,}`;
    return new RegExp(preReg,'g');
}

const domains = ['medium.com'];
const handleOnUpdated = () => {
    chrome.tabs.getSelected(
        null,
        function(tab) {
            var tabUrl = tab.url;
            if(
                domains.some(
                    domain => tabUrl.match(generateRegExp(domain))
                )
            ){
                chrome.windows.create(
                    {
                        url:tabUrl,
                        incognito:true
                    }
                )
            }
        }
    );
}
const handleOnInstalled = () => {
    chrome.tabs.onSelectionChanged.addListener(handleOnUpdated);
    chrome.tabs.onCreated.addListener(handleOnUpdated);
}
chrome.runtime.onInstalled.addListener(handleOnInstalled);