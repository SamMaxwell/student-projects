/* eslint-disable no-undef */
$(document).ready(() => {
  $('#skills').summernote();
  $('#accomplishments').summernote();
});

const save = async (event) => {
  event.preventDefault();

  const error = {
    form: document.querySelector('#profile-error'),
  };

  clearErrors(error);

  fetch('/users/my-profile', {
    method: 'POST',
    body: JSON.stringify({
      skills: $('#skills').summernote('code'),
      accomplishments: $('#accomplishments').summernote('code'),
    }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      if (response.ok) {
        document.location.replace('/users/my-profile');
      }

      return response.json();
    })
    .then(({ message }) => {
      error.form.textContent = message;
    })
    .catch(() => {
      error.form.textContent = 'An error occurred while attempting to save your profile';
    });
};

document.querySelector('.profile-form').addEventListener('submit', save);
