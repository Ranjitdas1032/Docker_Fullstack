describe('Task Flow' , () => {
    const API_URL = 'http://localhost:8000/api';

    beforeEach(() => {
        cy.request('GET',`${API_URL}/tasks/`).then((response)=>{
            response.body.forEach((task) => {
                cy.request('DELETE',`${API_URL}/tasks/${task.id}/`)
            })
        })
        cy.visit('/')
    })
    it('Display the Intial Screen',()=>{
        cy.get('[data-cy="header"]').should('be.visible');
        cy.get('[data-cy="sub-header"]').should('be.visible');
        cy.get('[data-cy="form-display"]').should('be.visible');
        cy.get('[data-cy="intial-message"]').should('be.visible');
    })
    it('Add the task and delete it successfully',()=>{
        cy.get('[data-cy="user-input"]').type("Hello this is for testing");
        cy.contains('Add Task').click();

        cy.contains("Hello this is for testing")

        cy.contains("Hello this is for testing").parent()
        .find('button')
        .contains('Delete')
        .click();

        cy.contains("Hello this is for testing").should('not.exist');
    })
})