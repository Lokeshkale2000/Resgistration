document.getElementById('registrationForm').addEventListener('submit', handleFormSubmit);

let editingRow = null;

function handleFormSubmit(event) {
  event.preventDefault();

  if (validateForm()) {
    if (editingRow) {
      // Update existing row
      updateUserRow(editingRow);
    } else {
      // Add new user
      addUserRow();
    }

    // Clear the form
    document.getElementById('registrationForm').reset();
    document.getElementById('message').textContent = 'User ' + (editingRow ? 'updated' : 'registered') + ' successfully!';
    editingRow = null; // Reset editingRow after update
  }
}

function addUserRow() {
  const table = document.getElementById('userTable').getElementsByTagName('tbody')[0];
  const newRow = table.insertRow();

  newRow.insertCell(0).textContent = document.getElementById('fullName').value;
  newRow.insertCell(1).textContent = document.getElementById('email').value;
  newRow.insertCell(2).textContent = document.getElementById('mobile').value;
  newRow.insertCell(3).textContent = document.getElementById('username').value;

  const actionsCell = newRow.insertCell(4);
  actionsCell.innerHTML = '<button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button>';

  actionsCell.querySelector('.edit-btn').addEventListener('click', function() {
    editUser(newRow);
  });
  actionsCell.querySelector('.delete-btn').addEventListener('click', function() {
    deleteUser(newRow);
  });
}

function updateUserRow(row) {
  const cells = row.getElementsByTagName('td');
  cells[0].textContent = document.getElementById('fullName').value;
  cells[1].textContent = document.getElementById('email').value;
  cells[2].textContent = document.getElementById('mobile').value;
  cells[3].textContent = document.getElementById('username').value;
}

function editUser(row) {
  editingRow = row;
  const cells = row.getElementsByTagName('td');
  document.getElementById('fullName').value = cells[0].textContent;
  document.getElementById('email').value = cells[1].textContent;
  document.getElementById('mobile').value = cells[2].textContent;
  document.getElementById('username').value = cells[3].textContent;
}

function deleteUser(row) {
  row.remove();
  document.getElementById('message').textContent = 'User deleted successfully!';
}

function validateForm() {
  // Clear previous error messages
  document.getElementById('fullNameError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('mobileError').textContent = '';
  document.getElementById('usernameError').textContent = '';
  document.getElementById('passwordError').textContent = '';

  let isValid = true;

  // Validate full name
  const fullName = document.getElementById('fullName').value;
  if (fullName.trim() === '') {
    document.getElementById('fullNameError').textContent = 'Full Name is required';
    isValid = false;
  }

  // Validate email
  const email = document.getElementById('email').value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    document.getElementById('emailError').textContent = 'Invalid Email ID';
    isValid = false;
  }

  // Validate mobile number
  const mobile = document.getElementById('mobile').value;
  const mobilePattern = /^[789]\d{9}$/;
  if (!mobilePattern.test(mobile)) {
    document.getElementById('mobileError').textContent = 'Invalid Mobile Number';
    isValid = false;
  }

  // Validate username
  const username = document.getElementById('username').value;
  if (username.trim() === '') {
    document.getElementById('usernameError').textContent = 'Username is required';
    isValid = false;
  }

  // Validate password (only if adding a new user, not editing)
  const password = document.getElementById('password').value;
  if (!editingRow && password.trim() === '') {
    document.getElementById('passwordError').textContent = 'Password is required';
    isValid = false;
  }

  return isValid;
}
