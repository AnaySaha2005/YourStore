// In api/getcookie.js

export default function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4173'); // Allow your frontend
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow cookies
  
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS'); // Allowed methods
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allowed headers
      return res.status(200).end(); // End preflight response
    }
  
    // Your main logic here
    res.json({ message: 'Cookie data sent!' });
  }
  