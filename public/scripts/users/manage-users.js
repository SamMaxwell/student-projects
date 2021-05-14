/* eslint-disable no-undef */

const clearErrors = (error) => Object.keys(error)
  .forEach((key) => {
    // eslint-disable-next-line no-param-reassign
    error[key].textContent = '';
  });

const enableUser = async (event) => {
  const error = {
    form: document.querySelector('#manage-error'),
  };

  clearErrors(error);

  const userid = event.target.dataset.user;

  fetch('/manage/enable', {
    method: 'PUT',
    body: JSON.stringify({ userid }),
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (response.ok) {
      // document.location.replace('/users/manage');
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

  fetch('/manage/disable', {
    method: 'PUT',
    body: JSON.stringify({ userid }),
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (response.ok) {
      // document.location.replace('/users/manage');
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

  const userid = event.target;

  fetch('/manage/delete', {
    method: 'DELETE',
    body: JSON.stringify(userid),
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (response.ok) {
      // document.location.replace('/users/manage');
      window.location.reload();
    }
  }).catch((err) => {
    error.form.textContent = err.message;
  });
};

const enabledBtns = document.querySelectorAll('.enable-btn');
const disabledBtns = document.querySelectorAll('.disable-btn');
const deletedBtns = document.querySelectorAll('.delete-btn');

if (enabledBtns) {
  enabledBtns.forEach((elem) => {
    elem.addEventListener('click', enableUser);
  });
}

if (disabledBtns) {
  disabledBtns.forEach((elem) => {
    elem.addEventListener('click', disableUser);
  });
}

if (deletedBtns) {
  deletedBtns.forEach((elem) => {
    elem.addEventListener('click', deleteUser);
  });
}

$(document).ready(() => {
  //
});
