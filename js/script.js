const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const filterSelect = document.getElementById("filter-select");
const deleteAllBtn = document.getElementById("delete-all");
const tableBody = document.getElementById("todo-table-body");

// ADD TODO
addBtn.addEventListener("click", () => {
  const task = todoInput.value.trim();
  const date = dateInput.value;

  if (!task) return alert("Isi task dulu!");
  if (!date) return alert("Pilih tanggal!");

  addRow(task, date);

  todoInput.value = "";
  dateInput.value = "";
});

// ADD ROW
function addRow(task, date) {
  const tr = document.createElement("tr");
  tr.classList.add("task-row");

  tr.innerHTML = `
    <td>${task}</td>
    <td>${date}</td>
    <td>
      <span class="status-badge status-pending">⏳ Pending</span>
    </td>
    <td>
      <div class="actions">
        <button class="action-btn btn-done">✔</button>
        <button class="action-btn btn-delete">🗑</button>
      </div>
    </td>
  `;

  const badge = tr.querySelector(".status-badge");
  const doneBtn = tr.querySelector(".btn-done");

  // TOGGLE DONE / PENDING
  doneBtn.addEventListener("click", () => {
    const isDone = badge.classList.contains("status-done");

    if (isDone) {
      // Change to Pending
      badge.classList.remove("status-done");
      badge.classList.add("status-pending");
      badge.textContent = "⏳ Pending";
      doneBtn.textContent = "✔";
    } else {
      // Change to Done
      badge.classList.remove("status-pending");
      badge.classList.add("status-done");
      badge.textContent = "✔ Done";
      doneBtn.textContent = "↺"; // icon to revert
    }

    applyFilter();
  });

  // DELETE ROW
  tr.querySelector(".btn-delete").addEventListener("click", () => {
    tr.remove();
  });

  tableBody.appendChild(tr);
  applyFilter();
}

// FILTER
filterSelect.addEventListener("change", applyFilter);

function applyFilter() {
  const filter = filterSelect.value;
  const rows = tableBody.querySelectorAll("tr");

  rows.forEach((row) => {
    const badge = row.querySelector(".status-badge");
    const isDone = badge.classList.contains("status-done");

    if (filter === "all") {
      row.style.display = "";
    } else if (filter === "completed") {
      row.style.display = isDone ? "" : "none";
    } else if (filter === "pending") {
      row.style.display = isDone ? "none" : "";
    }
  });
}

// DELETE ALL
deleteAllBtn.addEventListener("click", () => {
  if (confirm("Yakin hapus semua?")) {
    tableBody.innerHTML = "";
  }
});
