let username = sessionStorage.getItem('username');
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
document.addEventListener('DOMContentLoaded', function() {
   
//    update profile
   
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
               console.log(result);
               if(result.description)
               {

                   document.getElementById('description').value = result.description;
             }
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

    buttonIds.forEach(function(buttonId) {
        const button = document.getElementById(buttonId + '_button'); ;
        button.addEventListener('click', function() {
          document.getElementById(buttonId+'_main').style.display = 'flex';
            buttonIds.forEach(function(otherButtonId) {
                if (otherButtonId !== buttonId) {
                document.getElementById(otherButtonId + '_main').style.display = 'none';
                }
            });

         });

        
         
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
    const description = document.getElementById('description').value;
    const profileImage = profileImageInput.files[0];

    const formData = new FormData();
    
    if (name ) {
        formData.append('name', name);
    }
    if(password )
    {
        formData.append('password', password);
    }
    if(description)
    {
        formData.append('description', description);
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




