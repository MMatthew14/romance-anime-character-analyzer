// Import required packages
const express = require("express");
const axios = require("axios");
require("dotenv").config(); // Load environment variables from .env file

// Create an Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Example endpoint
app.post("/exchange-token", async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios.post(
      "https://api.socialdata.tools/oauth/token",
      new URLSearchParams({
        code,
        grant_type: "authorization_code",
        client_id: process.env.CLIENT_ID, // Use environment variables
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    res.json({ access_token: response.data.access_token });
  } catch (error) {
    console.error(
      "Error exchanging token:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to exchange token" });
  }
});

// Start the server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
