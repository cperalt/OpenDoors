const db = require('../db');

// Test case to verify that the database connects without errors
test('Database should connect without errors', (done) => {
  // Attempt to connect to the database
  db.connect((err) => {
    // Assert that there is no error in the connection process
    expect(err).toBeNull();
    // Signal that the asynchronous test is complete
    done();
  });
});

// Test case to verify that data is inserted into the database correctly
test('Database should insert data correctly', (done) => {
  // Mock data to be inserted into the database
  const mockData = { name: 'Test', subject: 'Math', email: 'test@example.com', message: 'Hello!' };
  // SQL query to insert data into the 'Form' table
  const query = 'INSERT INTO Form (name, subject, email, message) VALUES (?, ?, ?, ?)';
  // Values to be used in the SQL query
  const values = [mockData.name, mockData.subject, mockData.email, mockData.message];

  // Execute the SQL query with the provided values
  db.query(query, values, (err, results) => {
    // Assert that there is no error during the query execution
    expect(err).toBeNull();
    // Assert that at least one row was affected by the insert query
    expect(results.affectedRows).toBeGreaterThan(0);
    // Signal that the asynchronous test is complete
    done();
  });
});
