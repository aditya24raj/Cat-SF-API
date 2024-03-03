const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            callback.apply(null, args);
        }, wait);
    };
}

function copyApiToClipboard(e) {
    const apiName = e.currentTarget.title;

    navigator.clipboard.writeText(apiName);

    if (!("Notification" in window)) {
        // Check if the browser supports notifications
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        // Check whether notification permissions have already been granted;
        // if so, create a notification
        const notification = new Notification(`Copied "${apiName}" to clipboard`, { silent: true });
        // …
    } else if (Notification.permission !== "denied") {
        // We need to ask the user for permission
        Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                const notification = new Notification("Copied API name- ${apiName} to clipboard");
            }
        });
    }
}


const observer = new MutationObserver(debounce(
    () => {
        const fields = document.querySelectorAll("div[data-target-selection-name^='sfdc:RecordField.']");
        fields.forEach((i) => {
            if (!i.title) {
                i.title = i.dataset.targetSelectionName.replace(/sfdc:RecordField.\S+\./, "");
                i.addEventListener("click", copyApiToClipboard);
            }
        });
        chrome.storage.local.set({ catSfApiDetectedFields: fields.length > 0 });
    },
    250
));

chrome.storage.local.set({ catSfApiDetectedFields: false });
observer.observe(document.querySelector("body"), { attributes: true, childList: true, subtree: true });


