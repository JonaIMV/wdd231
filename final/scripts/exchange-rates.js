let conversionRates = {};

export async function loadExchangeRates() {
    const apiKey = "2bcdd27008aef51d6045fd0e"; 
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch exchange rates");

        const data = await response.json();
        conversionRates = data.conversion_rates;

        // Mostrar tasas rápidas USD/EUR/CAD -> MXN
        document.getElementById("usd-rate").textContent = conversionRates.MXN.toFixed(2);
        const cadToMxn = conversionRates.MXN / conversionRates.CAD;
        document.getElementById("cad-rate").textContent = cadToMxn.toFixed(2);
        const eurToMxn = conversionRates.MXN / conversionRates.EUR;
        document.getElementById("eur-rate").textContent = eurToMxn.toFixed(2);

        // Llenar selects del conversor
        populateCurrencySelect("from-currency", conversionRates);
        populateCurrencySelect("to-currency", conversionRates);

        // Evento del botón Convert
        document.getElementById("convert-btn").addEventListener("click", convertCurrency);

    } catch (error) {
        console.error("Error loading exchange rates:", error);
        document.querySelectorAll("#rates-list span").forEach(span => {
            span.textContent = "N/A";
        });
    }
}

function populateCurrencySelect(selectId, rates) {
    const select = document.getElementById(selectId);
    Object.keys(rates).forEach(currency => {
        const option = document.createElement("option");
        option.value = currency;
        option.textContent = currency;
        select.appendChild(option);
    });
}

function convertCurrency() {
    const amount = parseFloat(document.getElementById("amount").value);
    const from = document.getElementById("from-currency").value;
    const to = document.getElementById("to-currency").value;
    const resultEl = document.getElementById("conversion-result");

    if (isNaN(amount) || amount <= 0) {
        resultEl.innerHTML = "<strong>Result:</strong> Please enter a valid amount.";
        return;
    }

    const rate = conversionRates[to] / conversionRates[from];
    const converted = amount * rate;

    resultEl.innerHTML = `<strong>Result:</strong> ${converted.toFixed(2)} ${to}`;
}
