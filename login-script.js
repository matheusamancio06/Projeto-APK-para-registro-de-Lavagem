document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const user = document.getElementById('usuario').value.toLowerCase();
    const pass = document.getElementById('senha').value;

    const credenciais = {
        'admin': { senha: '123', role: 'admin' },
        'lavador': { senha: '321', role: 'user' }
    };

    if (credenciais[user] && credenciais[user].senha === pass) {
        localStorage.setItem('sgl_acesso', 'true');
        localStorage.setItem('sgl_role', credenciais[user].role);
        localStorage.setItem('sgl_user_display', user.toUpperCase());
        window.location.href = 'index.html';
    } else {
        document.getElementById('erro-login').style.display = 'block';
    }
});