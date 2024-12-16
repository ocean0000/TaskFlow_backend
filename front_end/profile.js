
document.getElementById('uploadButton').addEventListener('click', function() {
   event.preventDefault();
   
   document.getElementById('profileInput').click(); // Mở hộp thoại chọn file
});

document.getElementById('profileInput').addEventListener('change', function(event) {
   const file = event.target.files[0];
   if (file && file.type.startsWith('image/') ) {
       const formData = new FormData();
       
         formData.append('file', file);
         formData.append('folder', 'profile');
            fetch('https://back-end-ocean.up.railway.app/storage/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(result => {
                if (result) {
                    document.getElementById('profileImage').src = `${result.url}`;
                } else {
                    alert('Error uploading profile image');
                }
            })
            

   }
});

document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault();

    
    const name = document.getElementById('new_name').value;
    const password = document.getElementById('new_password').value;
    const profileImage = document.getElementById('profileImage').src;
    const description = document.getElementById('description').value;
    
    
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

    console.log(profileImage);
    if (profileImage) {
        formData.append('profile_image', profileImage);
    }

    fetch('https://back-end-ocean.up.railway.app/user/update', {
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
             document.getElementById('profileImage').src = `${result.user.profile_image}`;
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

