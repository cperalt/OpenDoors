describe('API Endpoints', () => {
  // Test case to verify the API successfully generates a career pathway with valid input
  it('should generate a career pathway successfully', () => {
    // Send a POST request to the '/submit-story' endpoint with valid input data
    cy.request('POST', '/submit-story', {
      highschoolyr: 'Senior',
      learningStyle: 'Visual',
      careerAspirations: 'Engineer',
      institution: 'MIT',
      city: 'Boston'
    }).then((response) => {
      // Assert that the response status is 200 (OK)
      expect(response.status).to.eq(200);
      // Assert that the response body contains the 'careerPathway' property
      expect(response.body).to.have.property('careerPathway');
    });
  });

  // Test case to verify the API returns an error with invalid input
  it('should return an error for invalid input', () => {
    // Send a POST request to the '/submit-story' endpoint with an empty body (invalid input)
    cy.request({
      method: 'POST',
      url: '/submit-story',
      failOnStatusCode: false, // Prevent Cypress from failing the test on a non-2xx status code
      body: {}
    }).then((response) => {
      // Assert that the response status is 500 (Internal Server Error)
      expect(response.status).to.eq(500);
      // Assert that the response body contains an error message indicating a failure to generate a career pathway
      expect(response.body.error).to.include('Failed to generate career pathway');
    });
  });
});
