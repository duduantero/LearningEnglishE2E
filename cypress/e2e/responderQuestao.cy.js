describe('RF9 - Responder questão', () => {
    beforeEach(()=> {
        cy.visit('/login');
        cy.get('#field-email').type('ana@gmail.com');
        cy.get('#field-senha').type('Senha@123');
        cy.get('#button-login').click();
        cy.visit('/student/questoes');
        
    });

    it('Resposta correta', ()=>{
        cy.get(':nth-child(4) > .question-content > .options-container > :nth-child(2)').click();
        cy.get(':nth-child(4) > .question-content > .question-actions > .submit-button').click();
        cy.contains('Parabéns, você acertou!'); 
    })
    
    it('Resposta incorreta', ()=>{
        cy.get(':nth-child(3) > .question-content > .options-container > :nth-child(2)').click();
        cy.get(':nth-child(3) > .question-content > .question-actions > .submit-button').click();
        cy.contains('Você errou!'); 
    })
    it('Sem alternativa selecionada', ()=>{
        cy.get(':nth-child(1) > .question-content > .question-actions > .submit-button').click();
        cy.contains('Selecione uma alternativa antes de responder')
    })
})