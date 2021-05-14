/* eslint-disable no-undef */
$(document).ready(() => {
  // alert("test");
});

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

  console.log(userid);

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
  console.log(userid);

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

const enabledBtns = document.querySelector('.enable-btn');
if (enabledBtns) enabledBtns.addEventListener('click', enableUser);

const disabledBtns = document.querySelector('.disable-btn');
if (disabledBtns) disabledBtns.addEventListener('click', disableUser);

const deleteBtns = document.querySelector('.delete-btn');
if (deleteBtns) deleteBtns.addEventListener('click', deleteUser);
