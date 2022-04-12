import axios from "axios";
import { installed as credentials } from './credentials/client_secret_963767749650-hob5gr5880k38s6sbsk4djlg85u2mcbp.apps.googleusercontent.com.json'
import { google } from 'googleapis';
import inquirer from "inquirer";

const redirect_url = "http://localhost:3000";
// Start an OAuth2 client session
const oauth2Client = new google.auth.OAuth2(
    credentials.client_id,
    credentials.client_secret,
    redirect_url,
);

const scopes = [
    "https://www.googleapis.com/auth/assistant-sdk-prototype"
];

// Generate a url that asks permissions for Google Assistant SDK
const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    include_granted_scopes: true,
});


// Redirect user on Terminal to a Browser with the url
// http://localhost:3000/?code=4/0AX4XfWg4ch0OgLpD-da3k8PGTWSh-263vc4YcTYE1eQlBBCXcX1T3CiGWlsU8_e1vFCbpg&scope=https://www.googleapis.com/auth/assistant-sdk-prototype
console.log("Open this URL in your browser:\n" + url);
console.log("\nOnce you have logged in, copy the redirected URL and paste it below");
inquirer.prompt([
    {
        name: "url",
        message: "Paste the redirected URL/Code here:",
        type: "input"
    }
]).then((answers) => {
    const code = answers.url
        .replace(redirect_url+"/", "")
        .replace("?code=", "")
        .replace(/&scope=.*/, "");
    console.log(code);
    oauth2Client.getToken(code, (err, tokens) => {
        console.log(tokens);
    });
})


// // Get Refresh Token
// axios.post("http://accounts.google.com/o/oauth2/token", {
//     data: {
//         headers: {
//             code: "4/0AX4XfWibe1xJ9ClO8iy_2QBDbarJglwmEj6mdIzDgE5K8Y9u_xvXoiBAaMfvrQxo09U1fQ",
//             client_id: credentials.client_id,
//             client_secret: credentials.client_secret,
//             redirect_uri: "http://localhost&grant_type=authorization_code",
//         }
//     }
// })


// Get access token
/**
axios.post('https://accounts.google.com/o/oauth2/token', {
    data: {
        code: "4/0AX4XfWibe1xJ9ClO8iy_2QBDbarJglwmEj6mdIzDgE5K8Y9u_xvXoiBAaMfvrQxo09U1fQ" ,
        client_id: credentials.client_id,
        client_secret: credentials.client_secret,
        refresh_token: "",
        redirect_uri: "https://localhost",
        grant_type: "authorization_code"
    }
}).then(({ data }) => {
    console.log(data);
})
*/
//CODE: 4/0AX4XfWibe1xJ9ClO8iy_2QBDbarJglwmEj6mdIzDgE5K8Y9u_xvXoiBAaMfvrQxo09U1fQ