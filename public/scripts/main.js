const logout = (event) => {
  event.preventDefault();

  fetch('/auth/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(() => document.location.replace('/'))
    .catch(() => document.location.replace('/'));
};

document.querySelector('#logout').addEventListener('click', logout);
