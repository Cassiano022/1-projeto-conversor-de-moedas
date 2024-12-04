const convertbutton = document.querySelector("#convert-button");
const currencyselect = document.querySelector(".currency-select");

async function fetchExchangeRates() {
    try {
        const response = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL,GBP-BRL");
        const data = await response.json();
        return {
            dolartoday: parseFloat(data.USDBRL.high),
            eurotoday: parseFloat(data.EURBRL.high),
            bitcointoday: parseFloat(data.BTCBRL.high),
            libratoday: parseFloat(data.GBPBRL.high)
        };
    } catch (error) {
        console.error("Erro ao buscar taxas de câmbio:", error);
        // Taxas de câmbio de backup caso a API falhe
        return {
            dolartoday: 5.2,
            eurotoday: 6.2,
            bitcointoday: 300000,
            libratoday: 7.1
        };
    }
}

async function convertvalues() {
    const inputCurrencyValue = parseFloat(
        document.querySelector(".input-currency").value.replace(',', '.')
    );
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
    const currencyValueConverted = document.querySelector(".currency-value");

    if (isNaN(inputCurrencyValue) || inputCurrencyValue < 0) {
        alert("Por favor, insira um valor válido.");
        return;
    }

    const rates = await fetchExchangeRates();

    switch (currencyselect.value) {
        case "Dolar":
            currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(inputCurrencyValue / rates.dolartoday);
            break;
        case "Euro":
            currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
            }).format(inputCurrencyValue / rates.eurotoday);
            break;
        case "Bitcoin":
            currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "BTC",
                minimumFractionDigits: 4,
                maximumFractionDigits: 4
            }).format(inputCurrencyValue / rates.bitcointoday);
            break;
        case "Libra":
            currencyValueConverted.innerHTML = new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "GBP",
            }).format(inputCurrencyValue / rates.libratoday);
            break;
    }

    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(inputCurrencyValue);
}

function changecurrency() {
    const currencyName = document.getElementById("currency-name");
    const currencyImage = document.querySelector(".currency-img");

    switch (currencyselect.value) {
        case "Dolar":
            currencyName.innerHTML = "Dólar Americano";
            currencyImage.src = "./assets/USD.jpg";
            break;
        case "Euro":
            currencyName.innerHTML = "Euro";
            currencyImage.src = "./assets/euro.jpg";
            break;
        case "Bitcoin":
            currencyName.innerHTML = "Bitcoin";
            currencyImage.src = "./assets/bitcoin.jpg";
            break;
        case "Libra":
            currencyName.innerHTML = "Libra Esterlina";
            currencyImage.src = "./assets/libra.jpg";
            break;
    }

    convertvalues();
}

currencyselect.addEventListener("change", changecurrency);
convertbutton.addEventListener("click", convertvalues);