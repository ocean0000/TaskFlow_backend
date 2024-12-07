let username = localStorage.getItem('username');
const buttonIds = [
    'dashboard',
    'overview',
    'project',
    'profile',
    'notification',
    'video',
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



