describe('Home Page', () => {
  
  it('displays 6 Pokemon on the home page', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-test="pokemon-card"]')
      .eq(0)
      .within(() => {
        cy.get('[data-test="pokemon-name"]').should("contain", "BULBASAUR")
      })
  })

  it('can navigate to the next page', () => {
    cy.visit('http://localhost:3000/2')

    cy.get('[data-test="nav-next"]').click()

    cy.get('[data-test="pokemon-card"]')
      .eq(0)
      .within(() => {
        cy.get('[data-test="pokemon-name"]').should("contain", "WEEDLE")
      })
  })

  it('can navigate to the previous page', () => {
    cy.visit('http://localhost:3000/2')

    cy.get('[data-test="nav-previous"]').click()

    cy.get('[data-test="pokemon-card"]')
      .eq(0)
      .within(() => {
        cy.get('[data-test="pokemon-name"]').should("contain", "BULBASAUR")
      })
  })
})