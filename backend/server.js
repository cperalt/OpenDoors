require('dotenv').config(); // Load environment variables

const express = require('express');
const bodyParser = require('body-parser');
const Anthropic = require('@anthropic-ai/sdk');
const mysql = require('mysql');
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Anthropic client
const anthropicClient = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
// Middleware
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect(function (err) {
  if (err) throw err;
  console.log('Connected to database!');
});

app.post("/form", (req, res) => {
  const { name, subject, email, message } = req.body;

  if (!name || !subject || !email || !message) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }


  const query = `INSERT INTO Form (name, subject, email, message) VALUES (?, ?, ?, ?)`;
  const values = [name, subject, email, message];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err.stack);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    console.log('Query results:', results);
    res.status(200).json({ message: 'Form submitted successfully' });
  });
});

// Endpoint to receive student input and generate a career pathway
app.post('/submit-story', async (req, res) => {
  const { highschoolyr, learningStyle, careerAspirations, institution, city } = req.body;

  try {
    // Call to Anthropic AI service to generate career pathway
    const response = await anthropicClient.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: `
          You are a career advisor that will provide guidance for High School kids for their future careers. Only show 5 different pathways depending on their High School Year, and provide resources, such as links and scholarships, grants, loans, and career resources for each pathway.
          Create a personalized career pathway for a ${highschoolyr.join(', ')} High School Student based on the following details:
          Learning Styles: ${learningStyle.join(', ')}
          Career Aspirations: ${careerAspirations.join(', ')}
          Preferred education Institution: ${institution.join(', ')}
          Explain the Job types that this path has to offer in their future career.
          Also, make sure to show useful links catered to: ${city.join(', ')}
          The output should be in the following format:
          Career Pathway: [Career Pathway Description]
          The JSON response should be in the following format:
          {
            "careerPathway": {
              "title": "",
              "description": "",
              "steps": [
                {
                  "stage": "",
                  "activities": [
                    "",
                    "",
                    "",
                    ""
                  ]
                },
                // ... (other steps)
              ],
              "jobTypes": [
                "",
                "",
                "",
                "",
                "",
                "",
                ""
              ]
            },
            "resources": {
              "location": "",
              "educationalResources": [
                {
                  "name": "",
                  "url": ""
                },
                // ... (other resources)
              ],
              "scholarshipsAndGrants": [
                {
                  "name": "",
                  "url": ""
                },
                // ... (other scholarships)
              ],
              "careerResources": [
                {
                  "name": "",
                  "url": ""
                },
                // ... (other career resources)
              ]
            }
          }`
        }
      ]
    });

    // Log the entire response to understand its structure
    // console.log('Full AI Response:', JSON.stringify(response, null, 2));

    // Check the response structure and extract the content
    if (response && response.data && Array.isArray(response.data.messages)) {
      const lastMessage = response.data.messages[response.data.messages.length - 1];

      if (lastMessage && lastMessage.content) {
        const careerPathwayString = lastMessage.content;

        // Log the AI content response
        // console.log('AI Response Content:', careerPathwayString);

        // Attempt to parse the JSON response
        try {
          const parsedResponse = JSON.parse(careerPathwayString);
          res.json(parsedResponse);
        } catch (parseError) {
          console.error('Error parsing AI response:', parseError);
          res.status(500).json({ error: 'Failed to parse AI response', details: careerPathwayString });
        }
      } else {
        console.error('No content found in the last message:', lastMessage);
        res.status(500).json({ error: 'No content found in the AI response.', details: lastMessage });
      }
    } else {
      console.error('Unexpected response format from AI service:', response);
      res.status(500).json({ error: 'Unexpected response format from AI service.', details: response });
    }
  } catch (error) {
    console.error('Error generating career pathway:', error.message);
    res.status(500).json({ error: 'Failed to generate career pathway', details: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
