const convertButton = document.querySelector("#convert-button");
const currencySelect = document.querySelector(".currency-select");
const currencyToSelect = document.querySelector("#currency-to");
const inputCurrency = document.querySelector(".input-currency");

async function fetchExchangeRates() {
    try {
        const response = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL,GBP-BRL");
        const data = await response.json();
        return {
            USD: parseFloat(data.USDBRL.high),
            EUR: parseFloat(data.EURBRL.high),
            BTC: parseFloat(data.BTCBRL.high),
            GBP: parseFloat(data.GBPBRL.high)
        };
    } catch (error) {
        console.error("Erro ao buscar taxas de câmbio:", error);
        // Taxas de câmbio de backup caso a API falhe
        return {
            USD: 5.2,
            EUR: 6.2,
            BTC: 300000,
            GBP: 7.1
        };
    }
}

async function convertValues() {
    const inputCurrencyValue = parseFloat(
        inputCurrency.value.replace(',', '.')
    );
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
    const currencyValueConverted = document.querySelector(".currency-value");
    const selectedCurrency = currencySelect.value;

    if (isNaN(inputCurrencyValue) || inputCurrencyValue < 0) {
        alert("Por favor, insira um valor válido.");
        return;
    }

    const rates = await fetchExchangeRates();

    switch (selectedCurrency) {
        case "USD":
            currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(inputCurrencyValue / rates.USD);
            break;
        case "EUR":
            currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
            }).format(inputCurrencyValue / rates.EUR);
            break;
        case "BTC":
            currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "BTC",
                minimumFractionDigits: 4,
                maximumFractionDigits: 4
            }).format(inputCurrencyValue / rates.BTC);
            break;
        case "GBP":
            currencyValueConverted.innerHTML = new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "GBP",
            }).format(inputCurrencyValue / rates.GBP);
            break;
    }

    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(inputCurrencyValue);
}

function changeCurrency() {
    const currencyName = document.getElementById("currency-name");
    const currencyImage = document.querySelector(".currency-img");
    const selectedCurrency = currencySelect.value;

    switch (selectedCurrency) {
        case "USD":
            currencyName.innerHTML = "Dólar Americano";
            currencyImage.src = "./assets/USD.jpg";
            break;
        case "EUR":
            currencyName.innerHTML = "Euro";
            currencyImage.src = "./assets/euro.jpg";
            break;
        case "BTC":
            currencyName.innerHTML = "Bitcoin";
            currencyImage.src = "./assets/bitcoin1.jpg";
            break;
        case "GBP":
            currencyName.innerHTML = "Libra Esterlina";
            currencyImage.src = "./assets/libra1.jpg";
            break;
    }

    convertValues();
}

currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);

// Chamada inicial para definir o estado padrão
changeCurrency();