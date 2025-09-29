describe('Recuperar Senha',()=>{
    beforeEach(()=>{
        cy.visit('/login');

    })

    it('Cenário 1 - Deve enviar email para usuário', () => {
        cy.get('#link-esqueceu-sua-senha > strong').click();
        cy.get('#field-email').type('ana@gmail.com');
        cy.get('#button-retrieve').click();
        cy.wait(4000);
        cy.contains('Sucesso!');
        cy.contains('Verifique seu email!');
    });
    it('Cenário 2 - ', () => {
        
    });
})