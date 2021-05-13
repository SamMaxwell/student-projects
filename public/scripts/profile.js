/* eslint-disable no-undef */
const skillsMDE = new SimpleMDE({
  element: document.getElementById('skills'),
});

const accomplishmentsMDE = new SimpleMDE({
  element: document.getElementById('accomplishments'),
});

const clearErrors = (error) => Object.keys(error)
  .forEach((key) => {
    // eslint-disable-next-line no-param-reassign
    error[key].textContent = '';
  });

const save = async (event) => {
  event.preventDefault();

  const error = {
    form: document.querySelector('#profile-error'),
  };

  clearErrors(error);

  fetch('/profile', {
    method: 'POST',
    body: JSON.stringify({
      skills: skillsMDE.value(),
      accomplishments: accomplishmentsMDE.value(),
    }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      if (response.ok) {
        document.location.replace('/profile');
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
