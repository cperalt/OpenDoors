describe('Form Submission', () => {
  // Test case to verify that an error message is displayed when form fields are empty
  it('should display an error when fields are empty', () => {
    // Visit the form page
    cy.visit('/form');
    
    // Click the submit button without filling in the form fields
    cy.get('button[type="submit"]').click();
    
    // Assert that an error message is displayed indicating that all fields are required
    cy.contains('All fields are required').should('be.visible');
  });

  // Test case to verify that the form submits successfully when valid data is provided
  it('should submit form successfully with valid data', () => {
    // Visit the form page
    cy.visit('/form');
    
    // Fill in the form fields with valid data
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="subject"]').type('Math');
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('textarea[name="message"]').type('Hello, this is a test message!');
    
    // Click the submit button
    cy.get('button[type="submit"]').click();
    
    // Assert that a success message is displayed indicating the form was submitted successfully
    cy.contains('Form submitted successfully').should('be.visible');
  });
});
