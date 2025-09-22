const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convert-btn');
const resultEl = document.getElementById('result');
const chartCtx = document.getElementById('chart').getContext('2d');

let chart;

// Lista de divisas
const currencies = ["USD", "EUR", "GBP", "JPY", "ARS", "BRL"];

// Llenar selects
currencies.forEach(cur => {
  fromCurrency.innerHTML += `<option value="${cur}">${cur}</option>`;
  toCurrency.innerHTML += `<option value="${cur}">${cur}</option>`;
});

// Función de conversión simulada
function convert() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount)) {
    resultEl.textContent = "Ingresa un valor numérico válido.";
    return;
  }

  // Simulación de resultado de conversión
  const mockRate = Math.random() * (1.5 - 0.5) + 0.5; // tasa aleatoria entre 0.5 y 1.5
  const result = amount * mockRate;

  resultEl.textContent = `${amount} ${from} = ${result.toFixed(2)} ${to}`;

  // Simulación de histórico de 7 días
  const today = new Date();
  const labels = [];
  const rates = [];
  for (let i = 6; i >= 0; i--) {
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - i);
    labels.push(pastDate.toISOString().split('T')[0]);
    rates.push(mockRate * (0.9 + Math.random() * 0.2)); // pequeña variación
  }

  if (chart) chart.destroy();

  chart = new Chart(chartCtx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: `Tasa ${from} → ${to}`,
        data: rates,
        borderColor: 'blue',
        fill: false
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: false }
      }
    }
  });
}

convertBtn.addEventListener('click', convert);
