import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';
import { URL } from 'url';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keyfilePath = path.join(__dirname, '..', 'keys', 'oauth2.keys.json');
const TOKEN_PATH = path.resolve(__dirname, '../keys/oauth2.token.json');

// Function to authenticate using OAuth 2.0
async function authenticate() {
  const { client_secret, client_id, redirect_uris } = JSON.parse(fs.readFileSync(keyfilePath, 'utf8')).web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Check for existing token
  let token;
  try {
    token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
    oAuth2Client.setCredentials(token);
  } catch (err) {
    token = await getNewToken(oAuth2Client); // Get a new token if none is found
  }

  return oAuth2Client;
}

// Function to get a new token from the user
async function getNewToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/youtube.upload', 'https://www.googleapis.com/auth/youtube'],
  });
  console.log('Authorize this app by visiting this URL:', authUrl);

  const code = await getAuthCodeFromUser();
  if (!code) return null;

  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  saveToken(tokens);

  return tokens;
}

// Function to get the auth code from the user-provided URL
function getAuthCodeFromUser() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Enter the full URL from the browser: ', (inputUrl) => {
      rl.close();
      try {
        const parsedUrl = new URL(inputUrl);
        const code = parsedUrl.searchParams.get('code');
        resolve(code);
      } catch (error) {
        console.error('Invalid URL provided:', error);
        resolve(null);
      }
    });
  });
}

// Function to save the token to a file
function saveToken(token) {
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(token), 'utf8');
  console.log('Token stored to', TOKEN_PATH);
}

export { authenticate };
