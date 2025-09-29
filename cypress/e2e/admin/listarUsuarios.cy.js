describe('Listar Usuário', () => {
  let token; // variável para armazenar o token

  beforeEach(() => {
    //login via request
    cy.request('POST', 'http://localhost:3000/users/login', {
      email: 'ana@gmail.com',
      password: 'Senha@123'
    }).then((response) => {
      expect(response.status).to.eq(201);
      token = response.body.user.token; // pegar token do login e guardar
    });
    cy.login('ana@gmail.com', 'Senha@123');
    cy.get('[routerlink="/admin/usuarios-home"]').click();
  });

  it('Cenário 1 - Deve listar todos usuários cadastrados e ativos no sistema', () => {
    // uscar lista de usuários com o token
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/users/listarUsuarios',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      const usuarios = response.body.users;

      // 4. Validar que tabela tem o mesmo número de linhas
      cy.get('tbody tr').should('have.length', usuarios.length);

      // 5. Validar que cada usuário da API aparece na tabela
      usuarios.forEach((usuario) => {
        cy.contains('tbody tr', usuario.name).within(() => {
          cy.contains(usuario.email);
          cy.contains(usuario.privilege);
          cy.contains(usuario.cefr);
        });
      });
    });
  });
   it('Cenario 2 - Deve listar usuário expecifico', () => {
    cy.get('#input-filter').type('Ana Silva');
    cy.contains('Ana Silva').should('be.visible');})
});
 
 
 
 

    
