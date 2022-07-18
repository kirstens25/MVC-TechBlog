const loginFormHandler = async function (event) {
    event.preventDefault();
  
    // COLLECT DATA FROM THE LOGIN FORM
    const email = document.querySelector('#email-login');
    const password = document.querySelector('#password-login');
      // SEND POST REQUEST TO API ENDPOINT
    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
    });
  
      if (response.ok) {
        // SUCCESSFUL = REDIRECT BROWSER TO DASHBOARD
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
  };

  document.querySelector('#login-form').addEventListener('submit', loginFormHandler);