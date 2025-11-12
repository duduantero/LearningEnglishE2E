//http://localhost:4200/admin/criar-questao
describe('RF9 - Responder questão', () => {
    beforeEach(()=> {
        cy.visit('/login');
        cy.login('ana@gmail.com','Senha@123')
        cy.wait(3500)
        });

    it('Questão adicinada', ()=>{
    
    cy.intercept('POST', 'http://localhost:3000/admin/criarQuestao', {
      statusCode: 201,
      body: {
        message: "Questão criada com sucesso!",
        Question: {
          title: "Exemplo",
          cefr: "A1",
          type: "multiple-choice",
          theme: "Grammar",
          optionA: "Test1",
          optionB: "Test2",
          optionC: "Test3",
          response: "A"
        }
      }
    }).as('createQuestion');
    cy.get('[routerlink="/admin/criar-questao"]').click();
    cy.url().should('include', '/admin/criar-questao');
    cy.get('#mat-input-3').type('Exemplo');
    cy.get('#mat-select-value-1 > .mat-mdc-select-placeholder').click();
    cy.get('#mat-option-7').click();
    cy.get('#mat-select-value-2 > .mat-mdc-select-placeholder').click();
    cy.get('#mat-option-13').click();
    cy.get('#mat-select-value-3 > .mat-mdc-select-placeholder').click();
    cy.get('#mat-option-14').click();
    cy.get('#mat-input-4').type('Test1');
    cy.get('#mat-input-5').type('Test2');
    cy.get('#mat-input-6').type('Test3');
    cy.get('.options-section > .mat-mdc-form-field-type-mat-select > .mat-mdc-text-field-wrapper').click();
    cy.get('#mat-option-3').click();
    cy.get('.mdc-button--raised > .mdc-button__label').click();
    cy.wait('@createQuestion').then((interception) => {
            expect(interception.response.statusCode).to.equal(201);
            expect(interception.request.body).to.have.property('title', 'Exemplo');
        });
    cy.contains('Questão criada com sucesso!').should('be.visible');
    })
})