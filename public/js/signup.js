const signupFormHandler = async function(event) {
    event.preventDefault();
  
  // REMOVE ANY BLANK SPACES IN VALUES INPUTTED BY USER
    const username = document.querySelector('#username-signup');
    const email = document.querySelector('#email-signup');
    const password = document.querySelector('#password-signup');

  // // IF THERE IS A USERNAME, EMAIL AND PASSWORD ENTERED, CREATE USER
  //   if (username && email && password) {
  //     const response = await fetch('/api/users/signup', {
  //       method: 'post',
  //       body: JSON.stringify({ username, email, password }),
  //       headers: { 'Content-Type': 'application/json' }
  //     });
  // // IF ABOVE CRITERIA IS MET, DIRECT USER TO DASHBOARD
  //     if (response.ok) {
  //       document.location.replace('/dashboard');
  //     } else {
  //       alert(response.statusText);
  //     }
  //   }

  const response = await fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify({
      username: username.value,
      password: password.value,
      email: email.value
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    });

    if (response.ok) {
      document.location.replace('/dashboard')
    } else {
      alert('failed to sign up');
    }
  };
  
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
