// Sample starting data
let prices = [
  { crop: "Tomato", market: "Wakulima", price: 80, trend: "up" },
  { crop: "Onion", market: "Gikomba", price: 65, trend: "down" },
  { crop: "Maize", market: "Ruiru", price: 45, trend: "steady" },
  { crop: "Potato", market: "Wakulima", price: 40, trend: "up" },
  { crop: "Cabbage", market: "Githurai", price: 25, trend: "down" }
];

const priceBody = document.getElementById("priceBody");
const searchInput = document.getElementById("search");
const marketFilter = document.getElementById("marketFilter");
const form = document.getElementById("priceForm");

const arrows = { up: "▲ Rising", down: "▼ Falling", steady: "● Steady" };

function updateMarketOptions() {
  const markets = [...new Set(prices.map(p => p.market))];
  const current = marketFilter.value;
  marketFilter.innerHTML = '<option value="all">All markets</option>';
  markets.forEach(m => {
    const opt = document.createElement("option");
    opt.value = m;
    opt.textContent = m;
    marketFilter.appendChild(opt);
  });
  marketFilter.value = markets.includes(current) ? current : "all";
}

function renderTable() {
  const term = searchInput.value.toLowerCase();
  const market = marketFilter.value;

  const filtered = prices.filter(p =>
    p.crop.toLowerCase().includes(term) &&
    (market === "all" || p.market === market)
  );

  priceBody.innerHTML = "";
  filtered.forEach(p => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${p.crop}</td>
      <td>${p.market}</td>
      <td>${p.price}</td>
      <td class="${p.trend}">${arrows[p.trend]}</td>
    `;
    priceBody.appendChild(row);
  });

  if (filtered.length === 0) {
    priceBody.innerHTML = '<tr><td colspan="4">No prices found.</td></tr>';
  }
}

form.addEventListener("submit", e => {
  e.preventDefault();
  prices.push({
    crop: document.getElementById("crop").value.trim(),
    market: document.getElementById("market").value.trim(),
    price: Number(document.getElementById("price").value),
    trend: document.getElementById("trend").value
  });
  form.reset();
  updateMarketOptions();
  renderTable();
});

searchInput.addEventListener("input", renderTable);
marketFilter.addEventListener("change", renderTable);

updateMarketOptions();
renderTable();