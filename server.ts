// Imports
import app from "./src/app";
import http from 'http';
const PORT = 3000;

const server = http.createServer(app);

// Server setup
server.listen(PORT,() => {
    console.log('The application is listening ' + 'on port http://localhost:'+PORT);
})