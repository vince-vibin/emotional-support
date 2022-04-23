document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("buttonMain").addEventListener("click", hanlder)
    setDropdownSelect()
})

function hanlder() {

    const val = document.getElementById("animalsDrop").value
    const btn = document.getElementById("buttonMain")
    if (val == "cat") {
        btn.disabled = true
        chrome.runtime.sendMessage({ msg: "getCat" });
        receiveMessage()
    } else if (val == "doggo") {
        btn.disabled = true
        chrome.runtime.sendMessage({ msg: "getDoggo" });
        receiveMessage()
    } else if (val == "fox") {
        btn.disabled = true
        chrome.runtime.sendMessage({ msg: "getFox" });
        receiveMessage()
    } else {
        console.log("value unknown: " + val)
    }
}

function setDropdownSelect() {
    chrome.storage.sync.get(["dropdownVal"], function(result) {
        document.getElementById("animalsDrop")
        document.getElementById("animalsDrop").value = result.dropdownVal
    })
}

function setStorage(data) {
    chrome.storage.sync.set({"dropdownVal": data})
}

function receiveMessage() {
    const btn = document.getElementById("buttonMain")
    chrome.runtime.onMessage.addListener(
        async function(request, sender, sendResponse) {
            if (request.msg == "gotURL") {
                document.getElementById("supportIMG").src = request.data.content
                document.getElementById("supportIMG").title = "source: " + request.data.content
                
                setStorage(request.data.subject)
                btn.disabled = false
            }
        }
    );
}