const loginBtn = document.getElementById('loginBtn');
const createNewUserBtn = document.querySelector('#newUserBtn');
const signUpBtn = document.querySelector('#signUpBtn');

// render sign up form when create account clicked
createNewUserBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('CREATE USER EVENT LISTENER')

    const loginHeader = document.querySelector('#loginHeader');
    const buttons = document.querySelector('#buttons');
    let user = document.querySelector('#user');
    let password = document.querySelector('#password');

    user.value = '';
    password.value = '';
    loginHeader.innerHTML = 'Sign Up';
    signUpBtn.classList.remove('d-none');
    buttons.classList.add('d-none');
    // while (buttons.children) buttons.removeChild(buttons.children[0]);
});

// login user
loginBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    // console.log('LOGIN BTN EVENT LISTENER')

    let username = document.querySelector('#user').value;
    let password = document.querySelector('#password').value;
    // console.log('USER: ', username);
    // console.log('PASSWORD: ', password);

    if (username && password) {
        const response = await fetch('/users/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
          } else {
            alert('Failed to log in.');
          }
    }
});

// create new user
signUpBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    let username = document.querySelector('#user').value.trim();
    let password = document.querySelector('#password').value.trim();
    // console.log('USER: ', username);
    // console.log('PASSWORD: ', password);

    if (username && password) {
        const response = await fetch('/users/create', {
            method: 'POST',
            body: JSON.stringify({ username: username, password: password }),
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to sign up.');
        }
    }
});