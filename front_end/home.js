let username = sessionStorage.getItem('username');
document.addEventListener('DOMContentLoaded', function() {
    const buttonIds = [
        'dashboard',
        'overview',
        'project',
        'profile',
        'notification',
        'music',
        'setting',
        'film',
        
    ];
   
   
   
   fetch('http://localhost:3000/user/get_user', {
            method: 'POST',
            headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({ username})
            })
            .then(response => response.json())
            .then(result => {
               
               document.getElementById('name').innerText =  result.name;
               if (result.profile_image) {
                  document.getElementById('profileImage').src = `data:image/png;base64,${result.profile_image}`;
              }
              else
              {
                  document.getElementById('profileImage').src ='assests/bg.jpg'
              }
               
            })
            .catch(error => {
               console.error('Error:', error);
               alert("Error connection");
            });

    buttonIds.forEach(id => {
        const button = document.getElementById(id +'_button');
        if (button) {
            button.addEventListener('click', function() {
                const main = document.getElementById(id+'_main');
                console.log(main);
                main.style.display = 'flex';
                  buttonIds.filter(bid => bid !== id).forEach(bid => {
                     document.getElementById(bid+'_main').style.display = 'none';
                  });
                
            });
        }
    });

   


});


function log_out()
{
      localStorage.removeItem('token');
      window.location.href = 'login.html';
}

document.getElementById('uploadButton').addEventListener('click', function() {
   event.preventDefault();
   
   document.getElementById('profileInput').click(); // Mở hộp thoại chọn file
});

document.getElementById('profileInput').addEventListener('change', function(event) {
   const file = event.target.files[0];
   if (file && file.type.startsWith('image/') ) {
       const reader = new FileReader();
       reader.onload = function(e) {
           document.getElementById('profileImage').src = e.target.result;
       }
       
       reader.readAsDataURL(file);
   }
});

document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault();

    
    const name = document.getElementById('new_name').value;
    const password = document.getElementById('new_password').value;
    const profileImageInput = document.getElementById('profileInput');
    const profileImage = profileImageInput.files[0];

    const formData = new FormData();
    
    if (name ) {
        formData.append('name', name);
    }
    if(password )
    {
        formData.append('password', password);
    }
    formData.append('username', username);


    if (profileImage) {
        formData.append('profile_image', profileImage);
    }

    fetch('http://localhost:3000/user/update', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
         
      if (result) {
         alert('Profile updated successfully');
         if (name) {
             document.getElementById('name').innerText = name;
         }
         if (result.profileImage) {
             document.getElementById('profileImage').src = `data:image/png;base64,${result.user.profile_image}`;
         }
      } 
      else {
         alert('Error updating profile');
      }
       
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error connection');
    });
});
