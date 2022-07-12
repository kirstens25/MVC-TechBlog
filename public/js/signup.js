async function signupFormHandler(event) {
    event.preventDefault();
  
  // REMOVE ANY BLANK SPACES IN VALUES INPUTTED BY USER
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

  // IF THERE IS A USERNAME, EMAIL AND PASSWORD ENTERED, CREATE USER
    if (username && email && password) {
      const response = await fetch('/api/users/signup', {
        method: 'post',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' }
      });
  // IF ABOVE CRITERIA IS MET, DIRECT USER TO DASHBOARD
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  }
  
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
