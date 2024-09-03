renderTable();

// Rendering Functions
function renderTable(sortBy = null) {
  const users = [...usersData];

  thead.innerHTML = '';
  tbody.innerHTML = '';

  if (!!sortBy) {
    users.sort((a, b) => {
      const current = a[sortBy].toString();
      const next = b[sortBy].toString();

      return next.localeCompare(current, undefined, {
        numeric: true,
        sensitivity: 'base'
      });
    });
  }

  const tableColumns = ['row', ...tablePattern]
    .map((column) => {
      if (column === 'row') return `<th>${column}</th>`;
      return `<th onclick="renderTable('${column}')">${column}</th>`;
    })
    .join('');

  thead.innerHTML = `<tr>${tableColumns}</tr>`;

  for (const [index, user] of users.entries()) {
    tbody.innerHTML += `
    <tr onclick="renderReadUser(${user.uid})">
      <td>${index + 1}</td>
      <td>${user.uid}</td>
      <td>${user.firstname}</td>
      <td>${user.lastname}</td>
      <td>${user.city}</td>
      <td>${user.postalCode}</td>
      <td>${user.phoneNumber}</td>
      <td>${user.position}</td>
    </tr>`;
  }
}

function renderReadUser(uid) {
  const user = usersData.find((user) => user.uid === uid);

  modalHeader.textContent = 'User Info';

  modalBody.innerHTML = Object.keys(user)
    .map((property) => `<p><strong>${property}:</strong> ${user[property]}</p>`)
    .join('');

  modalFooter.innerHTML = `
    <button class="button" onclick="renderUpdateUser(${uid})">Update</button>
    <button class="button" onclick="deleteUser(${uid})">delete</button>`;

  openModal();
}

function renderCreateUser() {
  modalHeader.textContent = 'Add new User';

  modalBody.innerHTML = tablePattern
    .map((property) => {
      if (property === 'uid') {
        return `<input type="number" min="0" id="${property}"  class="create-inputs" value="" placeholder="${property}" />`;
      }

      return `<input type="text" id="${property}"  class="create-inputs" value="" placeholder="${property}" />`;
    })
    .join('');

  modalFooter.innerHTML = `
    <button class="button" onclick="createUser()">Save</button>
    <button class="button" onclick="modalClose()">Cancel</button>`;

  openModal();
}

function renderUpdateUser(uid) {
  const user = usersData.find((user) => user.uid === uid);

  modalHeader.textContent = 'Edit User Info';

  modalBody.innerHTML = Object.keys(user)
    .map((property) => {
      if (property === 'uid') {
        return `<input type="text" id="${property}"  class="update-inputs" value="${user[property]}" placeholder="${property}" disabled />`;
      }
      return `<input type="text" id="${property}"  class="update-inputs" value="${user[property]}" placeholder="${property}" />`;
    })
    .join('');

  modalFooter.innerHTML = `
    <button class="button" onclick="updateUser(${uid})">Save</button>
    <button class="button" onclick="renderReadUser(${uid})">Cancel</button>`;
}

// Operational Functions
function createUser() {
  const createInputs = document.querySelectorAll('.create-inputs');

  const newUser = {};

  for (const input of createInputs) {
    if (input.value.trim() === '') return alert('invalid input');

    if (
      input.id === 'uid' &&
      !!usersData.find((user) => user.uid === Number(input.value))
    ) {
      return alert('duplicated uid!');
    }

    if (input.id === 'uid') {
      newUser[input.id] = Number(input.value);
      continue;
    }

    newUser[input.id] = input.value;
  }

  usersData.push(newUser);

  closeModal();
  renderTable();
}

function updateUser(uid) {
  const user = usersData.find((user) => user.uid === uid);

  const updateInputs = document.querySelectorAll('.update-inputs');

  for (const input of updateInputs) {
    if (input.value.trim() === '') return alert('invalid input');

    if (input.id === 'uid') {
      user[input.id] = Number(input.value);
      continue;
    }

    user[input.id] = input.value;
  }

  closeModal();
  renderTable();
}

function deleteUser(uid) {
  const userIndex = usersData.findIndex((user) => user.uid === uid);

  usersData = usersData.toSpliced(userIndex, 1);

  renderTable();
  closeModal();
}

function deleteAllUsers() {
  usersData = [];

  renderTable();
}
