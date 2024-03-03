const errorMessage = document.getElementById("error-message");
const successMessage = document.getElementById("success-message");

function showCatSfApiStatus() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        if (new RegExp("https://.*\.lightning\.force\.com/.*/view").test(currentTab.url)) {
            chrome.storage.local.get()
                .then((i) => {
                    if (i.catSfApiDetectedFields) {
                        successMessage.style.display = "flex";
                        errorMessage.style.display = "none";
                    }
                    else {
                        successMessage.style.display = "none";
                        errorMessage.style.display = "flex";
                    }
                });
        }
        else {
            successMessage.style.display = "none";
            errorMessage.style.display = "flex";
        }

    });
}

showCatSfApiStatus();