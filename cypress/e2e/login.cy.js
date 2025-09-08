describe ('Tela de Login',()=>{
    beforeEach(()=> {
        cy.visit('/login')
    });

    it('Deve fazer login com sucesso',()=>{
        cy.get('#field-email').type('teste@email.com');
        cy.get('#field-senha').type('Senha123')
        cy.get('#button-login').click();
        cy.url().should('include', '/home');
    })

    it('Não deve logar com senha inválida',()=>{
        cy.get('#field-email').type('teste@gmail.com');
        cy.get('#field-senha').type('Senha123')
        cy.get('#button-login').click();
        cy.contains('Erro realizar Login - Error: Usuário não encontrado no banco de dados')
        //
    })
    
})