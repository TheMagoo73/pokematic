describe('Pokemon Detail Page', () => {

  it(`can view a Pokemon's details and then navigate back tio the Home Page`, () => {
    cy.visit('http://localhost:3000')

    cy.get('[data-test="pokemon-card"]')
    .eq(0)
    .click()

    cy.get('[data-test="pokemon-name"]').should('contain', 'BULBASAUR')
    cy.get('[data-test="pokemon-types"] li').its('length').should('be.gt', 0)
    cy.get('[data-test="pokemon-stats"] tr').its('length').should('eq', 7)
    cy.get('[data-test="pokemon-image"]')

    cy.get('[data-test="nav-back"]')
    .click()

    cy.get('[data-test="pokemon-card"]')
  })

})