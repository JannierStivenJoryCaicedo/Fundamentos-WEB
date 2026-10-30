const state = { page: 1, pageSize: 10, query: "", sortKey: "name", direction: 1 };
const currency = new Intl.NumberFormat("en-US", {
  style: "currency", currency: "USD", maximumFractionDigits: 0
});
const body = document.querySelector("#table-body")

function normalize(value) {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function getFilteredEmployees() {
  const terms = normalize(state.query).trim().split(/\s+/).filter(Boolean);
  return employees.filter(employee => {
    const text = normalize([
      employee.name, employee.position, employee.office,
      employee.salary, currency.format(employee.salary)
    ].join(" "));
    return terms.every(term => text.includes(term));
  }).sort((a, b) => {
    const key = state.sortKey;
    const comparison = key === "salary"
      ? a[key] - b[key]
      : a[key].localeCompare(b[key], "en", { sensitivity: "base" });
    return comparison * state.direction;
  });
}

function render() {
  const filtered = getFilteredEmployees();
  const start = 0;
  const visible = filtered.slice(start, start + state.pageSize);
  body.replaceChildren();

  visible.forEach(employee => {
    const row = document.createElement("tr");
    [employee.name, employee.position, employee.office, employee.salary].forEach(value => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    })
    body.append(row);
  })
}

render();