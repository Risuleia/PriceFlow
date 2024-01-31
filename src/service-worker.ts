/// <reference types="chrome" />

let preferredCurrency: string = "USD"

const fetchPrices = async (): Promise<void> => {
    const res = await fetch("http://localhost:8000/rates", {
        headers: {
            "Authorization": API_KEY
        }
    })
    const json = await res.json()

    console.log(json)
}

chrome.runtime.onMessage.addListener((req, sender, res) => {

    if (req.action === "convertPrices") {
        preferredCurrency = req.currency

        fetchPrices()
    }

})