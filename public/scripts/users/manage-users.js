/* eslint-disable no-undef */
$(document).ready(() => {
  // alert("test");
});

const clearErrors = (error) => Object.keys(error)
  .forEach((key) => {
    // eslint-disable-next-line no-param-reassign
    error[key].textContent = '';
  });

const disableUser = async (event) => {
  const error = {
    form: document.querySelector('#manage-error'),
  };

  clearErrors(error);

  const userid = event.target;
  console.log(userid);

  fetch('/manage/disable', {
    method: 'PUT',
    body: JSON.stringify({ id: userid }),
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (response.ok) {
      document.location.replace('/users/manage');
    }
    return response.json();
  }).then(({ message }) => {
    error.form.textContent = message;
  }).catch(() => {
    error.form.textContent = 'An error occurred while attempting to save your profile';
  });
};

const enableUser = async (event) => {
  const error = {
    form: document.querySelector('#manage-error'),
  };

  clearErrors(error);

  const userid = event.target;
  console.log(userid);

  fetch('/manage/enable', {
    method: 'PUT',
    body: JSON.stringify({ id: userid }),
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (response.ok) {
      document.location.replace('/users/manage');
    }
    return response.json();
  }).then(({ message }) => {
    error.form.textContent = message;
  }).catch(() => {
    error.form.textContent = 'An error occurred while attempting to save your profile';
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
    body: JSON.stringify({ id: userid }),
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (response.ok) {
      document.location.replace('/users/manage');
    }
    return response.json();
  }).then(({ message }) => {
    error.form.textContent = message;
  }).catch(() => {
    error.form.textContent = 'An error occurred while attempting to save your profile';
  });
};

document.querySelector('.enable-btn').addEventListener('click', enableUser);
document.querySelector('.disable-btn').addEventListener('click', disableUser);
document.querySelector('.delete-btn').addEventListener('click', deleteUser);
