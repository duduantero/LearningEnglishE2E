describe ('RF01 - Login',()=>{

    /*
    Descrição:
    Como usuário cadastrado,
    quero fazer login informando e-mail e senha,
    para acessar minha conta.

    Pré-condições:
    • Existir usuário cadastrado e ativo com as credenciais informadas.
    • A tela de login deve estar acessível ao público (sem sessão ativa).

    Campos e validações:
    • E-mail: obrigatório.
    • Senha: obrigatória.
    • Logins com campos em branco devem ser rejeitados.
  */

    beforeEach(()=> {
        cy.visit('/login')
    });

    it('Cenário 1 — Deve logar com sucesso (admin)',()=>{
        cy.get('#field-email').type('ana@gmail.com');
        cy.get('#field-senha').type('Senha@123')
        cy.get('#button-login').click();
        cy.contains('Login realizado com sucesso!')
        cy.url().should('include', '/admin');
    })
    it('Cenário 1 — Deve logar com sucesso(student)',()=>{
        cy.get('#field-email').type('bruno@gmail.com');
        cy.get('#field-senha').type('Senha@123')
        cy.get('#button-login').click();
        cy.contains('Login realizado com sucesso!')
        cy.url().should('include', '/student');
    })

    it('Cenário 2 — Não deve logar com senha inválida',()=>{
        cy.get('#field-email').type('ana@gmail.com');
        cy.get('#field-senha').type('Passw@123')
        cy.get('#button-login').click();
        cy.contains('Senha incorreta')
    })

    it('Cenário 2 — Não deve logar com e-mail inválido',()=>{
        cy.get('#field-email').type('an@gmail.com');
        cy.get('#field-senha').type('Senha@123')
        cy.get('#button-login').click();
        cy.contains('Usuário não encontrado')
    })
    
  it('Cenário 3 —Não deve logar com campos em branco', () => {
    cy.get('#field-email').click().blur();
    cy.contains('E-mail é obrigatório');
    cy.get('#field-senha').click().blur();
    cy.contains('Senha é obrigatório');
    cy.get('#button-login').should('be.disabled');
});

    it('Cenário 4 — Não deve logar usuário não cadastrado',()=>{
        cy.get('#field-email').type('testing@gmail.com');
        cy.get('#field-senha').type('Senha@123')
        cy.get('#button-login').click();
        cy.contains('Usuário não encontrado')
    })

    it('Cenário 5 — Não deve logar usuário desativado',()=>{
        cy.get('#field-email').type('henrique@gmail.com');
        cy.get('#field-senha').type('Senha@123')
        cy.get('#button-login').click();
        cy.contains('Usuário não encontrado')
    })

})