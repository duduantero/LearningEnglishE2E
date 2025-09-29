Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login')
  cy.get('#field-email').type(username);
  cy.get('#field-senha').type(password)
  cy.get('#button-login').click();
});
