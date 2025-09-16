describe ('Logout',()=>{
    beforeEach(()=> {
        cy.visit('/login')
        cy.get('#field-email').type('ana@gmail.com');
        cy.get('#field-senha').type('Senha@123')
        cy.get('#button-login').click();
    });
    it('Deve encerrar sessão do usuário ',()=>{
        cy.get('#botao-usuario > .mat-icon').click();
        cy.get('#link-logout').click();
        cy.get('.swal2-confirm').click();
        cy.contains('Deslogado com sucesso!');
    })
        it('Não deve encerrar sessão do usuário ',()=>{
        cy.get('#botao-usuario > .mat-icon').click();
        cy.get('#link-logout').click();
        cy.get('.swal2-cancel').click();
    })
})