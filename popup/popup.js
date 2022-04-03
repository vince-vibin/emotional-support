document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("buttonMain").addEventListener("click", getCat)
    getCat()
    
})


function getCat() {
    let httpReq = new XMLHttpRequest()
    httpReq.open("GET", "https://api.thecatapi.com/v1/images/search", false)
    httpReq.send()

    let response = JSON.parse(httpReq.responseText)[0]
    let responseURL = response["url"]

    document.getElementById("catIMG").src = responseURL
}
