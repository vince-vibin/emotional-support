document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("buttonMain").addEventListener("click", getCat)
})

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "backround_api_call") {
            let responseURL = request.data.url
            document.getElementById("catIMG").src = responseURL
        }
    }
);
getCat()

function getCat() {
    let httpReq = new XMLHttpRequest()
    httpReq.open("GET", "https://api.thecatapi.com/v1/images/search", false)
    httpReq.send()

    let response = JSON.parse(httpReq.responseText)[0]
    let responseURL = response["url"]

    document.getElementById("catIMG").src = responseURL
}
