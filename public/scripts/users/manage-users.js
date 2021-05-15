/* eslint-disable no-undef */
const enableUser = async (event) => {
  const error = {
    form: document.querySelector('#manage-error'),
  };

  clearErrors(error);

  const userid = event.target.dataset.user;

  fetch(`/users/${userid}`, {
    method: 'PUT',
    body: JSON.stringify({ isEnabled: 1 }),
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (response.ok) {
      window.location.reload();
    }
  }).catch((err) => {
    error.form.textContent = err.message;
  });
};

const disableUser = async (event) => {
  const error = {
    form: document.querySelector('#manage-error'),
  };

  clearErrors(error);

  const userid = event.target.dataset.user;

  fetch(`/users/${userid}`, {
    method: 'PUT',
    body: JSON.stringify({ isEnabled: 0 }),
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (response.ok) {
      window.location.reload();
    }
  }).catch((err) => {
    error.form.textContent = err.message;
  });
};

const deleteUser = async (event) => {
  const error = {
    form: document.querySelector('#manage-error'),
  };

  clearErrors(error);

  const userid = event.target.dataset.user;

  fetch(`/users/${userid}`, {
    method: 'DELETE',
  }).then((response) => {
    if (response.ok) {
      window.location.reload();
    }
  }).catch((err) => {
    error.form.textContent = err.message;
  });
};

$(document).on('click', '.enable-btn', enableUser);
$(document).on('click', '.disable-btn', disableUser);
$(document).on('click', '.delete-btn', deleteUser);

$(document).ready(() => {
  //
});
