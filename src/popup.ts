/// <reference types="chrome" />

const currencyInput: HTMLInputElement | null = document.getElementById("currency") as HTMLInputElement;
const applyBtn: HTMLButtonElement | null = document.getElementById("save-btn") as HTMLButtonElement;
const defaultBtn: HTMLButtonElement | null = document.getElementById("default-btn") as HTMLButtonElement;

const applyChanges = async (e: any): Promise<void> => {
    e.preventDefault()

    try {
        const res = await fetch("http://localhost:8000/rates", {
            headers: {
                "Authorization": API_KEY
            }
        })
        const json = await res.json()
    
        console.log(json)
        const currency: string = currencyInput.value.toUpperCase()
        chrome.runtime.sendMessage({ action: "convertPrices", currency })
    } catch (err) {
        console.error(err)
    }
}

document.addEventListener('DOMContentLoaded', () => {

    if (currencyInput && applyBtn && defaultBtn) {
        applyBtn.addEventListener("click", applyChanges)
    }

})