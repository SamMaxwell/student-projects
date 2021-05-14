const getFormValue = (selector) => document.querySelector(selector).value.trim();

const clearErrors = (error) => Object.keys(error)
  .forEach((key) => {
    // eslint-disable-next-line no-param-reassign
    error[key].textContent = '';
  });

const login = (event) => {
  event.preventDefault();

  const name = getFormValue('#name-login');
  const password = getFormValue('#password-login');

  const error = {
    name: document.querySelector('#name-login-error'),
    password: document.querySelector('#password-login-error'),
    form: document.querySelector('#login-error'),
  };

  clearErrors(error);

  if (!name) {
    error.name.textContent = 'name is required';
    return;
  }

  if (!password) {
    error.password.textContent = 'password is required';
    return;
  }

  fetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      name,
      password,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      if (response.ok) {
        document.location.replace('/');
      }

      return response.json();
    })
    .then(({ message }) => {
      error.form.textContent = message;
    })
    .catch(() => {
      error.form.textContent = 'An error occurred while attempting to login';
    });
};

document.querySelector('form.login-form').addEventListener('submit', login);

const signup = (event) => {
  event.preventDefault();

  const name = getFormValue('#name-signup');
  const password = getFormValue('#password-signup');
  const confirmPassword = getFormValue('#confirm-password-signup');

  const error = {
    name: document.querySelector('#name-signup-error'),
    password: document.querySelector('#password-signup-error'),
    confirmPassword: document.querySelector('#confirm-password-signup-error'),
    form: document.querySelector('#signup-error'),
  };

  clearErrors(error);

  if (!name) {
    error.name.textContent = 'name is required';
    return;
  }

  if (!password) {
    error.password.textContent = 'password is required';
    return;
  }

  if (!confirmPassword) {
    error.confirmPassword.textContent = 'confirm password is required';
    return;
  }

  if (password !== confirmPassword) {
    error.form.textContent = 'passwords do not match';
    return;
  }

  fetch('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, password }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      if (response.ok) {
        document.location.replace('/');
      }

      return response.json();
    })
    .then(({ message }) => {
      error.form.textContent = message;
    })
    .catch(() => {
      error.form.textContent = 'An error occurred while attempting to signup';
    });
};

document.querySelector('form.signup-form').addEventListener('submit', signup);
