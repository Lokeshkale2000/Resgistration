
// Function to handle form submission (both add and update)
document.getElementById('registrationForm').addEventListener('submit', function(event) {
event.preventDefault(); // Prevent the form from submitting in the traditional way

// Clear previous error messages
document.querySelectorAll('.error').forEach(function(error) {
  error.textContent = '';
});

// Form field elements
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const mobile = document.getElementById('mobile');
const username = document.getElementById('username');
const password = document.getElementById('password');

let valid = true;

// Validation checks
if (fullName.value.trim() === '') {
  fullName.setCustomValidity('Full Name is required');
  document.getElementById('fullNameError').textContent = 'Full Name is required';
  valid = false;
} else if (fullName.value.trim().length < 5) {
  fullName.setCustomValidity('Full Name must be at least 5 characters');
  document.getElementById('fullNameError').textContent = 'Full Name must be at least 5 characters';
  valid = false;
} else {
  fullName.setCustomValidity('');
}

if (email.value.trim() === '') {
  email.setCustomValidity('Email ID is required');
  document.getElementById('emailError').textContent = 'Email ID is required';
  valid = false;
} else {
  email.setCustomValidity('');
}

if (mobile.value.trim() === '') {
  mobile.setCustomValidity('Mobile No is required');
  document.getElementById('mobileError').textContent = 'Mobile No is required';
  valid = false;
} else if (!/^[789]\d{9}$/.test(mobile.value.trim())) {
  mobile.setCustomValidity('Mobile number must start with 7, 8, or 9 and be 10 digits long');
  document.getElementById('mobileError').textContent = 'Mobile number must start with 7, 8, or 9 and be 10 digits long';
  valid = false;
} else {
  mobile.setCustomValidity('');
}

if (username.value.trim() === '') {
  username.setCustomValidity('Username is required');
  document.getElementById('usernameError').textContent = 'Username is required';
  valid = false;
} else {
  username.setCustomValidity('');
}

if (password.value.trim() === '') {
  password.setCustomValidity('Password is required');
  document.getElementById('passwordError').textContent = 'Password is required';
  valid = false;
} else if (password.value.trim().length < 8) {
  password.setCustomValidity('Password must be at least 8 characters long');
  document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long';
  valid = false;
} else {
  password.setCustomValidity('');
}

// If all validations pass
if (valid) {
  const isUpdate = document.getElementById('submitBtn').textContent === 'Update';

  if (isUpdate) {
      updateUser();
  } else {
      addUser();
  }
} else {
  document.getElementById('message').textContent = 'Please fill in all fields correctly';
}
});

// Function to add a new user
function addUser() {
document.getElementById('message').textContent = 'User registered successfully';

// Save user data to localStorage
const userData = {
  fullName: document.getElementById('fullName').value.trim(),
  email: document.getElementById('email').value.trim(),
  mobile: document.getElementById('mobile').value.trim(),
  username: document.getElementById('username').value.trim()
};
let users = JSON.parse(localStorage.getItem('users')) || [];
users.push(userData);
localStorage.setItem('users', JSON.stringify(users));

// Clear form fields and display updated user table
document.getElementById('registrationForm').reset();
displayUsers();
}

// Function to update an existing user
function updateUser() {
const index = document.getElementById('submitBtn').dataset.index;
let users = JSON.parse(localStorage.getItem('users')) || [];
users[index] = {
  fullName: document.getElementById('fullName').value.trim(),
  email: document.getElementById('email').value.trim(),
  mobile: document.getElementById('mobile').value.trim(),
  username: document.getElementById('username').value.trim()
};
localStorage.setItem('users', JSON.stringify(users));
document.getElementById('message').textContent = 'User updated successfully';

// Reset form and display updated user table
document.getElementById('registrationForm').reset();
document.getElementById('submitBtn').textContent = 'Add';
displayUsers();
}

// Function to display users in the table
function displayUsers() {
const userTableBody = document.getElementById('userTable').querySelector('tbody');
userTableBody.innerHTML = '';
const users = JSON.parse(localStorage.getItem('users')) || [];

users.forEach((user, index) => {
  const row = document.createElement('tr');
  row.innerHTML = `
      <td contenteditable="true" data-field="fullName">${user.fullName}</td>
      <td contenteditable="true" data-field="email">${user.email}</td>
      <td contenteditable="true" data-field="mobile">${user.mobile}</td>
      <td contenteditable="true" data-field="username">${user.username}</td>
      <td>
          <button class="save-btn" onclick="saveUser(${index})">Save</button>
          <button class="delete-btn" onclick="deleteUser(${index})">Delete</button>
      </td>
  `;
  userTableBody.appendChild(row);
});
}

// Function to save edited user data
function saveUser(index) {
const users = JSON.parse(localStorage.getItem('users')) || [];
const row = document.getElementById('userTable').querySelector(`tbody tr:nth-child(${index + 1})`);

users[index] = {
  fullName: row.querySelector('[data-field="fullName"]').textContent.trim(),
  email: row.querySelector('[data-field="email"]').textContent.trim(),
  mobile: row.querySelector('[data-field="mobile"]').textContent.trim(),
  username: row.querySelector('[data-field="username"]').textContent.trim()
};

localStorage.setItem('users', JSON.stringify(users));
document.getElementById('message').textContent = 'User details updated successfully';
}

// Function to delete a user
function deleteUser(index) {
let users = JSON.parse(localStorage.getItem('users')) || [];
users.splice(index, 1);
localStorage.setItem('users', JSON.stringify(users));
displayUsers();
}

// Event listener for DOM content loaded to display users
document.addEventListener('DOMContentLoaded', displayUsers);

// Required field validation on submit button click
document.querySelector('button[type="submit"]').addEventListener('click', function() {
const requiredFields = document.querySelectorAll('input[required]');
requiredFields.forEach(function(field) {
  if (field.value.trim() === '') {
      const fieldName = field.name.charAt(0).toUpperCase() + field.name.slice(1);
      field.setCustomValidity(`${fieldName} is required`);
      document.getElementById(`${field.id}Error`).textContent = `${fieldName} is required`;
  } else {
      field.setCustomValidity('');
      document.getElementById(`${field.id}Error`).textContent = '';
  }
});

const fullName = document.getElementById('fullName');
const password = document.getElementById('password');

if (fullName.value.trim() !== '' && fullName.value.trim().length < 5) {
  fullName.setCustomValidity('Full Name must be at least 5 characters');
  document.getElementById('fullNameError').textContent = 'Full Name must be at least 5 characters';
} else {
  fullName.setCustomValidity('');
}

if (password.value.trim() !== '' && password.value.trim().length < 8) {
  password.setCustomValidity('Password must be at least 8 characters long');
  document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long';
} else {
  password.setCustomValidity('');
}
});

