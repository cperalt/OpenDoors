const generateCareerPathway = require('../anthropicClient');

// Test case to verify that generateCareerPathway returns a valid response structure
test('generateCareerPathway should return a valid response structure', async () => {
  // Call generateCareerPathway with valid input parameters
  const response = await generateCareerPathway('Senior', 'Visual', 'Engineer', 'MIT', 'Boston');
  
  // Assert that the response object contains the 'careerPathway' property
  expect(response).toHaveProperty('careerPathway');
  
  // Assert that the response object contains the 'resources' property
  expect(response).toHaveProperty('resources');
});

// Test case to verify that generateCareerPathway handles errors gracefully with invalid input
test('generateCareerPathway should handle errors gracefully', async () => {
  // Call generateCareerPathway with empty input parameters, expecting it to throw an error
  await expect(generateCareerPathway('', '', '', '', '')).rejects.toThrow('Failed to generate career pathway');
});
