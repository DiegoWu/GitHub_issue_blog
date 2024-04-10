// Import required modules
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy; // Correct import for the GitHubStrategy
require('dotenv').config();

// Create an Express application
const app = express();

// Configure session middleware
app.use(
  session({ secret: "your-secret", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Configure GitHub authentication strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      callbackURL: "http://localhost:3000/auth/github/callback", // Change the callback URL to a different endpoint
    },
    function (accessToken, refreshToken, profile, done) {
      // Use profile information to identify or create user in your system
      return done(null, profile);
    }
  )
);

// Serialize and deserialize use  r functions
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Route to initiate GitHub authentication
app.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));

// Route to handle GitHub authentication callback
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication, redirect to frontend route or dashboard
    res.redirect("/"); // Redirect to the root path or any other desired route
  }
);

// Example route to check if user is authenticated
app.get("/api/user", (req, res) => {
  res.json(req.user);
});

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  // Check if user is authenticated
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// Add post route
app.post("/api/posts", isAuthenticated, async (req, res) => {
  // Add your post route logic here
});

// Update post route
app.put("/api/posts/:id", isAuthenticated, async (req, res) => {
  // Add your update post route logic here
});

// Delete post route
app.delete("/api/posts/:id", isAuthenticated, async (req, res) => {
  // Add your delete post route logic here
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
