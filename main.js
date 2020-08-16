const signUpForm = document.getElementById('signup');
const loginForm = document.getElementById('login');
const confirmPassword = document.getElementById('confirm_password');
const password = document.getElementById('password');
const conf = document.getElementById('validateconpwd');
const links = document.querySelectorAll('.private');
const logoutBtn = document.getElementById('logout');
const loginBtn = document.getElementById('loginBtn');

document.body.onload = docOnLoad;
if (confirmPassword) {
  confirmPassword.addEventListener('input', (e) => {
    if (e.target.value === password.value) {
      e.target.style.border = '1px solid green';
      conf.style.display = 'none';
    } else {
      conf.style.display = 'inline-block';
      conf.style.visibility = 'visible';
    }
  });
}
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
// async function postData(url = '', data = {}) {
//   try {
//     let res = await
//     // console.log(res);
//     return res.json();
//   } catch (e) {
//     console.log(e);
//   }
// }
// event Listeners on dom element

if (signUpForm) {
  signUpForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = getFormData(this);
    const v = validators.signup(data);
    const prepData = {
      fname: data.firstname,
      lname: data.lastname,
      email: data.email,
      phone_number: '08065913488',
      password: data.signup_password,
      c_password: data.signup_conform_password,
    };

    let reqData = JSON.stringify(prepData);
    // console.log(reqData);
    fetch('http://ogatickets.herokuapp.com/api/register', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: reqData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          window.localStorage.setItem('username', data.data.fname);
          window.localStorage.setItem('token', data.data.token);
          location.reload();
        } else {
          const x = document.getElementById('sign_up_error');
          x.style.display = 'inline-block';
          x.innerHTML = data.message;
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
}
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = getFormData(this);
    // const v = validators.login(data);
    const prepData = {
      email: data.email,
      password: data.password,
    };
    let reqData = JSON.stringify(prepData);
    fetch('http://ogatickets.herokuapp.com/api/login', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: reqData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          window.localStorage.setItem('username', data.data.fname);
          window.localStorage.setItem('token', data.data.token);
          location.reload();
        } else {
          const x = document.getElementById('login_up_error');
          x.style.display = 'inline-block';
          x.innerHTML = data.message;
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
}

function docOnLoad() {
  const username = window.localStorage.getItem('username');
  const token = window.localStorage.getItem('token');
  if (links && loginBtn && logoutBtn) {
    if (username && token) {
      console.log('we are changing ');
      if (window.location.pathname === '/index.html') {
        window.location.pathname = '/dashboard.html';
      }
      loginBtn.style.display = 'none';
      logoutBtn.classList.remove('none_display');
      logoutBtn.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
      });
    } else {
      console.log(logoutBtn);
      logoutBtn.style.display = 'none';
      [...links].forEach((x) => {
        x.href = '#';
        x.setAttribute('data-toggle', 'modal');
        x.setAttribute('data-target', '#loginModal');
      });
    }
  }
}
