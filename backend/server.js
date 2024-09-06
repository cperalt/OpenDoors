require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const Anthropic = require('@anthropic-ai/sdk');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const PORT = process.env.PORT || 3030;


// Middleware setup
app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // Though express.json() is enough in most cases, this is kept for compatibility.

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



// Endpoint to save token
app.post('/api/save-token', (req, res) => {
    console.log("POST /api/save-token triggered");
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ error: "Token is missing" });
      }
  
    // Insert the token into the database
    const query = 'INSERT INTO user_tokens (token) VALUES (?)';
    db.query(query, [token], (err, result) => {
      if (err) {
        console.error("Error saving token to database:", err);
        return res.status(500).json({ message: "Database error" });
      }
      return res.status(200).json({ message: "Token saved successfully" });
    });
  });

  app.post('/api/save-roadmap', async (req, res) => {
    const { roadmap } = req.body; // The roadmap data from the frontend
    const userToken = req.headers.authorization.split(' ')[1];  // Extract the token from the Authorization header
  
    if (!roadmap || !userToken) {
      return res.status(400).json({ message: "Invalid request data" });
    }
  
    try {
      const connection = await mysql.createConnection(dbConfig);
  
      // Get the user ID based on the token
      const [userRows] = await connection.execute('SELECT id FROM user_tokens WHERE token = ?', [userToken]);
      if (userRows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      const userId = userRows[0].id;
  
      // Insert Pathway
      const { title, description, steps, jobTypes } = roadmap.careerPathway;
      const [pathwayResult] = await connection.execute('INSERT INTO Pathways (pathway_name) VALUES (?)', [title]);
      const pathwayId = pathwayResult.insertId;
  
      // Insert Steps
      for (let i = 0; i < steps.length; i++) {
        const { stage, activities } = steps[i];
        const stepDescription = activities.join(', '); // Join activities as a single description
        await connection.execute(
          'INSERT INTO Steps (pathway_id, step_name, step_description, step_order) VALUES (?, ?, ?, ?)', 
          [pathwayId, stage, stepDescription, i + 1]
        );
      }
  
      // Insert Job Types
      for (let jobType of jobTypes) {
        await connection.execute('INSERT INTO Job_Types (pathway_id, job_title) VALUES (?, ?)', [pathwayId, jobType]);
      }
  
      // Insert Resources
      const { educationalResources, scholarshipsAndGrants, careerResources, location } = roadmap.resources;
  
      for (let resource of educationalResources) {
        await connection.execute(
          'INSERT INTO Resources (pathway_id, resource_type, resource_name, resource_link, location) VALUES (?, ?, ?, ?, ?)', 
          [pathwayId, 'Educational', resource.name, resource.url, location]
        );
      }
  
      for (let scholarship of scholarshipsAndGrants) {
        await connection.execute(
          'INSERT INTO Resources (pathway_id, resource_type, resource_name, resource_link, location) VALUES (?, ?, ?, ?, ?)', 
          [pathwayId, 'Educational', scholarship.name, scholarship.url, location]
        );
      }
  
      for (let careerResource of careerResources) {
        await connection.execute(
          'INSERT INTO Resources (pathway_id, resource_type, resource_name, resource_link, location) VALUES (?, ?, ?, ?, ?)', 
          [pathwayId, 'Career', careerResource.name, careerResource.url, location]
        );
      }
  
      // Insert into User_Roadmaps to save the user's roadmap
      await connection.execute(
        'INSERT INTO User_Roadmaps (user_id, pathway_id) VALUES (?, ?)',
        [userId, pathwayId]
      );
  
      res.status(200).json({ message: 'Roadmap saved successfully' });
  
    } catch (error) {
      console.error('Error saving roadmap:', error);
      res.status(500).json({ message: 'Failed to save roadmap' });
    }
  });

app.get('/user/roadmaps', async (req, res) => {
    try {
      const userToken = req.headers.authorization.split(' ')[1];  // Extract the token from the Authorization header
      const connection = await mysql.createConnection({ /* MySQL connection details */ });
  
      // Query to fetch all saved roadmaps for the user
      const [roadmaps] = await connection.execute(`
        SELECT p.pathway_name, ur.roadmap_id
        FROM User_Roadmaps ur
        JOIN user_tokens ut ON ur.user_id = ut.id
        JOIN Pathways p ON ur.pathway_id = p.pathway_id
        WHERE ut.token = ?;
      `, [userToken]);
  
      res.json({ roadmaps });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });  

  
app.post("/form", (req, res) => {
  const { name, subject, email, message } = req.body;

  if (!name || !subject || !email || !message) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }


  const query = `INSERT INTO Form (name, subject, email, message) VALUES (?, ?, ?, ?);`
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


// Initialize Anthropic client
const anthropicClient = new Anthropic();
// Anthropic API Call Function
const generateCareerPathway = async (highschoolyr, learningStyle, careerAspirations, institution, city) => {
  try {
    const response = await anthropicClient.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: `
          You are a career advisor that will provide guidance for High School kids for their future careers. Only show 5 different pathways depending on their High School Year, and provide resources, such as links and scholarships, grants, loans, and career resources for each pathway. Something to keep in mind, if the answer has any bad words or inappropriate content, just say "Please be Professional and use appropriate language". Then show a link for classes in professionalism.

          Create a personalized career pathway for a ${highschoolyr} High School Student based on the following details:

          Learning Styles: ${learningStyle},

          Career Aspirations: ${careerAspirations},

          Preferred education Institution: ${institution},

          Explain the Job types that this path has to offer in their future career.

          Also, make sure to show useful links catered to: ${city}.

          The answer should be in Json format
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
                // ... (other steps omitted for brevity)
                (also enumerate the steps)
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
                // ... (other resources omitted for brevity)
              ],
              "scholarshipsAndGrants": [
                {
                  "name": "",
                  "url": ""
                },
                // ... (other scholarships omitted for brevity)
              ],
              "careerResources": [
                {
                  "name": "",
                  "url": ""
                },
                // ... (other career resources omitted for brevity)
              ],
              "otherResources": [
                {
                  "imagepath(#)": "",
                  "imagepath(#)": "",
                  "imagepath(#)": "",
                  "imagepath(#)": "",
                },
              ]
            }
          }
          Respond ONLY with the json and nothing else
          `
        }
      ]
    });

    console.log('Full API Response:', JSON.stringify(response, null, 2));

    if (!response || !response.content || !Array.isArray(response.content)) {
      console.error('Unexpected response structure:', response);
      throw new Error('Unexpected response structure from AI service');
    }

    const lastMessage = response.content[response.content.length - 1];

    if (!lastMessage || typeof lastMessage.text !== 'string') {
      console.error('No valid content in the last message:', lastMessage);
      throw new Error('No valid content found in the AI response');
    }

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(lastMessage.text);
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      console.log('Raw response content:', lastMessage.text);
      throw new Error('Failed to parse AI response as JSON');
    }

    if (!parsedResponse.careerPathway || !parsedResponse.resources) {
      console.error('Parsed response is missing expected fields:', parsedResponse);
      throw new Error('AI response is missing expected data structure');
    }

    return parsedResponse;
  } catch (error) {
    console.error('Error generating career pathway:', error.message);
    throw new Error(`Failed to generate career pathway: ${error.message}`);
  }
};

// API Endpoint to receive student input and generate a career pathway
app.post('/submit-story', async (req, res) => {
  const { highschoolyr, learningStyle, careerAspirations, institution, city } = req.body;

  try {
    const careerPathwayData = await generateCareerPathway(highschoolyr, learningStyle, careerAspirations, institution, city);
    res.json(careerPathwayData);
  } catch (error) {
    console.error('Error handling /submit-story request:', error.message);
    res.status(500).json({ error: `Failed to generate career pathway. ${error.message}` });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
