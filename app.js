// Lógica principal do DuoMatch (MVP Local / Preparado para Supabase)

document.addEventListener('DOMContentLoaded', () => {
    const btnEntrar = document.getElementById('btn-entrar');
    
    if (btnEntrar) {
        btnEntrar.addEventListener('click', () => {
            const gamerTag = document.getElementById('gamer-tag').value.trim();
            const jogo = document.getElementById('game-select').value;
            const elo = document.getElementById('rank-select').value;

            if (!gamerTag) {
                alert('Por favor, digite seu Nick + Tag (Ex: Player#123)');
                return;
            }

            // Salva o usuário temporariamente no navegador (localStorage) para simular o banco por enquanto
            const usuario = { gamerTag, jogo, elo, data: new Date().toISOString() };
            
            let usuariosCadastrados = JSON.parse(localStorage.getItem('duos_usuarios')) || [];
            usuariosCadastrados.push(usuario);
            localStorage.setItem('duos_usuarios', JSON.stringify(usuariosCadastrados));

            alert(`Sucesso! Bem-vindo ao lobby, ${gamerTag}. Procurando parceiro no ${jogo}...`);
            
            // Limpa o campo
            document.getElementById('gamer-tag').value = '';
        });
    }

    // Se estivermos na página do Painel Administrativo, carrega os dados salvos
    const adminTbody = document.getElementById('admin-user-list');
    const totalUsersEl = document.getElementById('total-users');

    if (adminTbody) {
        const usuariosCadastrados = JSON.parse(localStorage.getItem('duos_usuarios')) || [];
        
        if (totalUsersEl) {
            totalUsersEl.textContent = usuariosCadastrados.length;
        }

        if (usuariosCadastrados.length > 0) {
            adminTbody.innerHTML = '';
            usuariosCadastrados.forEach((user, index) => {
                adminTbody.innerHTML += `
                    <tr>
                        <td>${user.gamerTag}</td>
                        <td>${user.jogo}</td>
                        <td>${user.elo}</td>
                        <td><button onclick="removerUsuario(${index})" style="background: #da3633; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer;">Remover</button></td>
                    </tr>
                `;
            });
        }
    }
});

// Função global para remover usuário direto pelo painel
window.removerUsuario = function(index) {
    let usuariosCadastrados = JSON.parse(localStorage.getItem('duos_usuarios')) || [];
    usuariosCadastrados.splice(index, 1);
    localStorage.setItem('duos_usuarios', JSON.stringify(usuariosCadastrados));
    location.reload();
};
