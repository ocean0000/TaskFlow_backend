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
        'account'
    ];

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


