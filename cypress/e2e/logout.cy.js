describe ('Logout',()=>{
    beforeEach(()=> {
        cy.login('ana@gmail.com','Senha@123')
        cy.wait(3500);
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