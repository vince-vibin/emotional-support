chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        if(request.msg == "getCat") {
            getCat()
        } else if (request.msg == "getDoggo") {
            getDoggo()
        } else if (request.msg == "getFox") {
            getFox()
        }
        return true;
    }
);

async function getCat() {
    let response = await fetch("https://api.thecatapi.com/v1/images/search")
    let responseJson = await response.json()
    let body = responseJson[0]
    let url = body["url"]

    sendMessage(url, "cat")
}

async function getDoggo() {
    let response = await fetch("https://random.dog/woof.json")
    let responseJson = await response.json()
    let url = responseJson["url"]
    
    if (url.endsWith("jpg") || url.endsWith(".png") || url.endsWith(".jpeg")) {
        sendMessage(url, "doggo")
    } else {
        getDoggo()
    }
}

async function getFox() {
    let response = await fetch("https://randomfox.ca/floof/")
    let responseJson = await response.json()
    let url = responseJson["image"]
    
    sendMessage(url, "fox")
}

function sendMessage(url, subject) {
    chrome.runtime.sendMessage({
        msg: "gotURL", 
        data: {
            subject: subject,
            content: url,
        }
    });
}