const taxBrackets = [
    { limit: 350000, rate: 0 },
    { limit: 450000, rate: 0.05 },
    { limit: 850000, rate: 0.10 },
    { limit: 1350000, rate: 0.15 },
    { limit: 1850000, rate: 0.20 },
    { limit: 3850000, rate: 0.25 },
    { limit: Infinity, rate: 0.30 }
];

function formatNumber(num) {
    return num.toLocaleString('en-US');
}

function calculateTax() {
    const income = parseFloat(document.getElementById('income').value);
    if (isNaN(income) || income < 0) {
        document.getElementById('result').innerHTML = "";
        return;
    }

    let tax = 0;
    let previousLimit = 0;
    const breakdown = [];

    for (const { limit, rate } of taxBrackets) {
        if (income > previousLimit) {
            const taxableAmount = Math.min(income, limit) - previousLimit;
            const taxAmount = taxableAmount * rate;
            tax += taxAmount;
            breakdown.push({ range: taxableAmount + previousLimit, rate: rate * 100, tax: taxAmount });
            previousLimit = limit;
        } else {
            break;
        }
    }

    displayResult(income, tax, breakdown);
}

function displayResult(income, tax, breakdown) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<h2>The total tax for an income of <span class="income">${formatNumber(income)} BDT</span> is <span class="tax">${formatNumber(tax)} BDT</span></h2>`;
    
    let tableHTML = `
        <table class="breakdown-table">
            <tr>
                <th>Income Range (BDT)</th>
                <th>Tax Rate (%)</th>
                <th>Tax Amount (BDT)</th>
            </tr>
    `;
    breakdown.forEach(item => {
        tableHTML += `
            <tr>
                <td class="income">${formatNumber(item.range)}</td>
                <td class="rate">${item.rate}</td>
                <td class="tax">${formatNumber(item.tax)}</td>
            </tr>
        `;
    });
    tableHTML += '</table>';
    
    resultDiv.innerHTML += tableHTML;
}

// Event listener for input change
document.getElementById('income').addEventListener('input', calculateTax);