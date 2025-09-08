describe('Fluxo de Cadastro - Mock API', () => {

  it('Deve simular cadastro de usuário com sucesso', () => {
    // Intercepta a chamada da rota real: /users/cadastro
    cy.intercept('POST', 'http://localhost:3000/users/cadastro', {
      statusCode: 201,
      body: {
        message: "Cadastro realizado com sucesso!",
        user: {
          id: "STUDENT-exemplo",
          name: "teste",
          email: "teste@gmail.com",
          privilege: "student",
          cefr: "B2",
          studyTimeSeconds: 0,
          firstAccess: true,
          timeline: 0
        }
      }
    }).as('createUser');

    cy.visit('/register');

    // Preenche os campos do formulário
    cy.get('#field-name').type('teste');
    cy.get('#field-email').type('teste@gmail.com');
    cy.get('#field-senha').type('Senha@123');
    cy.get('mat-select[formControlName="cefr"]').click();
    cy.get('#mat-option-3').click();
    cy.get('.gap-2 > :nth-child(2) > .mat-mdc-form-field > .mat-mdc-text-field-wrapper > .mat-mdc-form-field-flex > .mat-mdc-form-field-infix').type('Senha@123');
    cy.get('#button-cadastro').click('');

    //Espera a requisição mockada
    cy.wait('@createUser');

    //Valida se mensagem aparece na tela
    cy.contains('Cadastro realizado com sucesso!').should('be.visible');

    //Valida o corpo da requisição enviada pro backend
    cy.get('@createUser').its('request.body').should((body) => {
      expect(body.name).to.eq('teste');
      expect(body.email).to.eq('teste@gmail.com');
    });

    // (Opcional) Valida parte da resposta da API simulada
    cy.get('@createUser').its('response.body.user').should((user) => {
      expect(user.privilege).to.eq('student');
      expect(user.cefr).to.eq('B2');
    });
  });

});