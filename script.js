const convertButton = document.querySelector("#convert-button");
const currencyToSelect = document.querySelector("#currency-to");  // "De"
const currencySelect = document.querySelector(".currency-select");  // "Para"
const currencyValueConverted = document.querySelector(".currency-value");
const currencyValueToConvert = document.querySelector(".currency-value-to-convert");

function convertValues() {
    const inputCurrencyValue = parseFloat(document.querySelector(".input-currency").value);

    const realToday = 1;          // Real
    const dolarToday = 5.2;       // Dólar Americano
    const euroToday = 6.2;        // Euro
    const libraToday = 7.3;       // Libra
    const bitcoinToday = 348461;  // Bitcoin (em reais)

    if (isNaN(inputCurrencyValue) || inputCurrencyValue < 0) {
        alert("Por favor, insira um valor válido.");
        return;
    }

    let convertedValue;
    if (currencySelect.value === "USD") {
        convertedValue = inputCurrencyValue / dolarToday;
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(convertedValue);
    } else if (currencySelect.value === "EUR") {
        convertedValue = inputCurrencyValue / euroToday;
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(convertedValue);
    } else if (currencySelect.value === "BRL") {
        convertedValue = inputCurrencyValue / realToday;
        currencyValueConverted.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(convertedValue);
    } else if (currencySelect.value === "GBP") {
        convertedValue = inputCurrencyValue / libraToday;
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP"
        }).format(convertedValue);
    } else if (currencySelect.value === "BTC") {
        convertedValue = inputCurrencyValue / bitcoinToday;
        currencyValueConverted.innerHTML = convertedValue.toFixed(5) + " BTC";
    }

    // Exibe o valor original na caixa "De"
    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(inputCurrencyValue);
}

function changeCurrency() {
    const currencyName = document.getElementById("currency-name");
    const currencyImage = document.querySelector(".currency-img");

    if (currencySelect.value === "USD") {
        currencyName.innerHTML = "Dólar Americano";
        currencyImage.src = "./assets/USD.jpg";
    } else if (currencySelect.value === "EUR") {
        currencyName.innerHTML = "Euro";
        currencyImage.src = "./assets/EURO.jpg";
    } else if (currencySelect.value === "GBP") {
        currencyName.innerHTML = "Libra";
        currencyImage.src = "./assets/libra1.jpg";
    } else if (currencySelect.value === "BTC") {
        currencyName.innerHTML = "Bitcoin";
        currencyImage.src = "./assets/bitcoin1.jpg";
    } else if (currencySelect.value === "BRL") {
        currencyName.innerHTML = "Real Brasileiro";
        currencyImage.src = "./assets/brasil 2.jpg";
    }

    convertValues();  // Atualiza o valor após mudar a moeda
}

// Event listeners
currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);
