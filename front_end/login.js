

document.addEventListener('DOMContentLoaded', function() {
    const showRegisterButton = document.getElementById('showRegister');
    const showLoginButton = document.getElementById('showLogin');
    const registerSection = document.getElementById('registerSection');
    const loginSection = document.getElementById('loginSection');

    showRegisterButton.addEventListener('click', function() {
        registerSection.style.display = 'block';
        loginSection.style.display = 'none';
    });

    showLoginButton.addEventListener('click', function() {
        registerSection.style.display = 'none';
        loginSection.style.display = 'block';
    });

    document.getElementById('registerForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        const name =username;
        const email = document.getElementById('registerEmail').value;

        fetch('http://localhost:3000/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password, email, name })
            })
            .then(response => response.json())
            .then(result => {
                alert(result.message || result);
                if(result.message === 'Register successfully') {
                registerSection.style.display = 'none';
                loginSection.style.display = 'block';}
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Error connection");
            });
    });

   document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        

        fetch('http://localhost:3000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(result => {
                if (result.message === 'Login successfully') {
                    sessionStorage.setItem('username', result.username);
                    sessionStorage.setItem('email', result.email);
                    window.location.assign('home.html');
                } else {
                    alert(result.message || result);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Error connection");
            });
    });

});


function onSignIn(response)
{
      
      const data = response;
     
      
      fetch('http://localhost:3000/user/login_google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                sessionStorage.setItem('username', result.username);
                sessionStorage.setItem('email', result.email);
                
                window.location.assign('home.html');
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Error connection");
            });
      
      
}




