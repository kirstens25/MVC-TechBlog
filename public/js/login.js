const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // COLLECT DATA FROM THE LOGIN FORM
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      // SEND POST REQUEST TO API ENDPOINT
      const response = await fetch('/api/users/login', {
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
    }
  };