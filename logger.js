const fs = require('fs');
const path = require('path');

// Function to log messages to the console
function logToConsole(message) {
  console.log(message);
}

// Function to log messages to a file
function logToFile(message) {
  const logDir = path.join(__dirname, 'logs');
  const logFilePath = path.join(logDir, 'app.log');
  const logEntry = `${message}\n`;

  // Create the "logs" directory if it doesn't exist
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  // Append the log entry to the file
  fs.appendFileSync(logFilePath, logEntry, 'utf8');
}

// Function to log messages to both the console and a file
function log(message) {
  logToConsole(message);
  logToFile(message);
}

module.exports = {
  log,
};
