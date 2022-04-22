document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("buttonMain").addEventListener("click", hanlder)
    setDropdownSelect()
})

function hanlder() {

    const val = document.getElementById("animalsDrop").value
    if (val == "cat") {
        getCat()
    } else if (val == "doggo") {
        getDoggo()
    } else if (val == "fox") {
        getFox()
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

async function getCat() {
    //response = await fetch("https://api.thecatapi.com/v1/images/search")
    let httpReq = new XMLHttpRequest()
    httpReq.open("GET", "https://api.thecatapi.com/v1/images/search", false)
    httpReq.send()
    
    let response = await JSON.parse(httpReq.responseText)[0]
    let responseURL = response["url"]

    document.getElementById("supportIMG").src = responseURL
    document.getElementById("supportIMG").title = "powered by thecatapi.com: " + responseURL
    console.log(document.getElementById("buttonMain").disabled)

    setStorage("cat")
}

async function getDoggo() {
    let httpReq = new XMLHttpRequest()
    httpReq.open("GET", "https://random.dog/woof.json", false)
    httpReq.send()
    
    let response = await JSON.parse(httpReq.responseText)
    let responseURL = response.url
    
    // if the API doesnt return a picture call it again
    if (responseURL.endsWith("jpg") || responseURL.endsWith(".png") || responseURL.endsWith(".jpeg")) {
        document.getElementById("supportIMG").src = responseURL
        document.getElementById("supportIMG").title = "powered by random.dog: " + responseURL

        setStorage("doggo")
    } else {
        getDoggo()
    }
}

async function getFox() {
    document.getElementById("buttonMain").disabled = true;
    let httpReq = new XMLHttpRequest()
    httpReq.open("GET", "https://randomfox.ca/floof/", false)
    httpReq.send()
    
    let response = await JSON.parse(httpReq.responseText)
    let responseURL = response["image"]
    
    document.getElementById("supportIMG").src = responseURL
    document.getElementById("supportIMG").title = "powered by randomfox.ca: " + responseURL

    setStorage("fox")
}

function setStorage(data) {
    chrome.storage.sync.set({"dropdownVal": data})
}
