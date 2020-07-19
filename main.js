const signUpForm = document.getElementById('signup');

const validators = {
  signup: (data) => {
    return (
      data.signup_conform_password !== '' &&
      data.signup_email !== '' &&
      data.signup_password !== '' &&
      data.signup_password === data.signup_conform_password
    );
  },
  signin: (data) => {},
};
// utility functions
const util = {
  get: (path, data) => {},
  post: async (path, data) => {},
  save: (key, data) => {
    window.localStorage.setItem(key, data);
  },
};

// user request funtions
const user = {
  registerUser: (data) => {
    console.log(data);
  },
  registerBuyer: (data) => {},
  login: (data) => {},
  logout: (data) => {},
  loggedInUserData: () => {},
};
// event related functions
const event = {
  addEvent: () => {},
};

// ticket related functions
const ticket = {
  addTicket: () => {},
};

// get data from forms
function getFormData(form) {
  let reqBody = {};
  Object.keys(form.elements).forEach((key) => {
    let element = form.elements[key];
    if (element.type !== 'submit') {
      reqBody[element.name] = element.value;
    }
  });
  return reqBody;
}

// event Listeners on dom element
signUpForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const data = getFormData(this);
  const v = validators.signup(data);
  util.post();
  console.log(v);
});
