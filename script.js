// Tasas de cambio mock con USD como base
const rates = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  ARS: 990.0,
  MXN: 19.5,
  BRL: 5.50
};

const fromAmount = document.getElementById('fromAmount');
const toAmount = document.getElementById('toAmount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const swapBtn = document.getElementById('swapBtn');
const exchangeRateText = document.getElementById('exchangeRateText');
const feeText = document.getElementById('feeText');

let chart;

function calculate() {
  const amount = parseFloat(fromAmount.value) || 0;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  const rate = rates[to] / rates[from];
  const total = amount * rate;
  const fee = amount * 0.005; // 0.5% comision

  toAmount.value = total.toFixed(2);
  exchangeRateText.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
  feeText.textContent = `$${fee.toFixed(2)} ${from}`;

  updateChart(rate);
}

function updateChart(currentRate) {
  const points = [
    currentRate * 0.98,
    currentRate * 0.99,
    currentRate * 0.985,
    currentRate * 1.01,
    currentRate * 0.995,
    currentRate
  ];

  if (chart) {
    chart.data.datasets[0].data = points;
    chart.update();
  }
}

function initChart() {
  const ctx = document.getElementById('currencyChart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['1D', '5D', '10D', '15D', '20D', 'Hoy'],
      datasets: [{
        data: [1, 1, 1, 1, 1, 1],
        borderColor: '#2ea043',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        fill: true,
        backgroundColor: 'rgba(46, 160, 67, 0.08)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { display: false },
        y: { display: false }
      }
    }
  });
}

// Event Listeners
fromAmount.addEventListener('input', calculate);
fromCurrency.addEventListener('change', calculate);
toCurrency.addEventListener('change', calculate);

swapBtn.addEventListener('click', () => {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
  calculate();
});

// Inicialización
initChart();
calculate();
