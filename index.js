function addRow() {
  const tbody = document.getElementById('invoiceBody');
  const row = document.createElement('tr');

  row.innerHTML = `
    <td><input type="text" class="desc" placeholder="Item description"></td>
    <td><input type="number" class="qty" value="1" min="1" onchange="updateTotals()"></td>
    <td><input type="number" class="price" value="0.00" min="0" onchange="updateTotals()"></td>
    <td class="row-total">$0.00</td>
    <td><button onclick="deleteRow(this)">❌</button></td>
  `;

  tbody.appendChild(row);
  updateTotals();
}

function addItem() {
      const tbody = document.getElementById("itemsBody");
      const row = document.createElement("tr");

      row.innerHTML = `
        <td><input type="text" class="item-code" placeholder="Item Code"></td>
        <td><input type="text" class="item-desc" placeholder="Description"></td>
        <td><input type="number" class="item-qty" value="1" min="1" onchange="updateAmount(this)"></td>
        <td><input type="number" class="item-price" value="0" min="0" onchange="updateAmount(this)"></td>
        <td class="item-amount">$0.00</td>
        <td><button onclick="removeItem(this)">Remove</button></td>
      `;

      tbody.appendChild(row);
    }

    function updateAmount(el) {
      const row = el.closest("tr");
      const qty = parseFloat(row.querySelector(".item-qty").value) || 0;
      const price = parseFloat(row.querySelector(".item-price").value) || 0;
      const amount = qty * price;
      row.querySelector(".item-amount").innerText = `$${amount.toFixed(2)}`;
    }

    function removeItem(button) {
      const row = button.closest("tr");
      row.remove();
    }



    function updateTotals() {
  const rows = document.querySelectorAll('#itemsBody tr');
  let total = 0;

  rows.forEach(row => {
    const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
    const price = parseFloat(row.querySelector('.item-price').value) || 0;
    const discount = parseFloat(row.querySelector('.item-discount').value) || 0;
    const tax = parseFloat(row.querySelector('.item-tax').value) || 0;

    let amount = qty * price;
    amount -= amount * (discount / 100); // apply discount
    amount += amount * (tax / 100);      // apply tax

    row.querySelector('.item-amount').innerText = `$${amount.toFixed(2)}`;
    total += amount;
  });

  document.getElementById('totalAmount').innerText = `Total: $${total.toFixed(2)}`;
}

function showDateTime() {
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      document.getElementById('output').innerText = `Selected: ${date} ${time}`;
    }

function deleteRow(btn) {
  const row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
  updateTotals();
}

function updateTotals() {
  const rows = document.querySelectorAll('#invoiceBody tr');
  let subtotal = 0;

  rows.forEach(row => {
    const qty = parseFloat(row.querySelector('.qty').value) || 0;
    const price = parseFloat(row.querySelector('.price').value) || 0;
    const total = qty * price;
    subtotal += total;

    row.querySelector('.row-total').textContent = `$${total.toFixed(2)}`;
  });

  const tax = subtotal * 0.10;
  const total = subtotal + tax;

  document.getElementById('subtotal').textContent = subtotal.toFixed(2);
  document.getElementById('tax').textContent = tax.toFixed(2);
  document.getElementById('total').textContent = total.toFixed(2);
}
