document.addEventListener("DOMContentLoaded", function() {
    //const dropDown = document.getElementById("animalsDrop")
    document.getElementById("buttonMain").addEventListener("click", hanlder)
})

function hanlder() {

    let val = document.getElementById("animalsDrop").value
    let btn = document.getElementById("buttonMain")

    if (val == "cat") {
        getCat(btn)
    } else if (val == "doggo") {
        getDoggo()
    } else if (val == "fox") {
        getFox()
    } else {
        console.log("value unknown: " + val)
    }
}

async function getCat(btn) {
    let httpReq = new XMLHttpRequest()
    httpReq.open("GET", "https://api.thecatapi.com/v1/images/search", false)
    httpReq.send()
    
    let response =  await JSON.parse(httpReq.responseText)[0]
    let responseURL = response["url"]

    document.getElementById("supportIMG").src = responseURL
    document.getElementById("supportIMG").title = "powered by thecatapi.com: " + responseURL
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
    } else {
        getDoggo()
    }
}

async function getFox() {
    let httpReq = new XMLHttpRequest()
    httpReq.open("GET", "https://randomfox.ca/floof/", false)
    httpReq.send()
    
    let response = await JSON.parse(httpReq.responseText)
    let responseURL = response["image"]
    
    document.getElementById("supportIMG").src = responseURL
    document.getElementById("supportIMG").title = "powered by randomfox.ca: " + responseURL
}