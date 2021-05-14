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

  fetch(`/manage/disable/${userid}`)
    .then((response) => {
      if (response.ok) {
        document.location.replace('/users/manage');
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

document.querySelector('.1').addEventListener('click', disableUser);
document.querySelector('.2').addEventListener('click', enableUser);
document.querySelector('.3').addEventListener('click', deleteUser);
