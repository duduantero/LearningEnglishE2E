describe('Tela de Login', () => {

  beforeEach(() => {
    cy.visit('/login'); 
  });

  it('Deve fazer login com sucesso', () => {
    cy.get('#username').type('usuario_valido');
    cy.get('#password').type('senha_valida');
    cy.get('#loginButton').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Bem-vindo').should('be.visible');
  });

  it('Não deve logar com username inválido', () => {
    cy.get('#username').type('invalido');
    cy.get('#password').type('senha_valida');
    cy.get('#loginButton').click();
    cy.contains('Usuário não encontrado').should('be.visible');
  });

  it('Não deve logar com senha inválida', () => {
    cy.get('#username').type('usuario_valido');
    cy.get('#password').type('errada');
    cy.get('#loginButton').click();
    cy.contains('Senha incorreta').should('be.visible');
  });

});