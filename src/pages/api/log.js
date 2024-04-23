
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const logObject = req.body.message; // Assuming the log message is sent in the request body
    // Path to the log file
    const logFilePath = path.join(process.cwd(), 'logs', 'log.json');

    // Convert object to string representation with properties
    const logMessage = `${new Date().toISOString()}: ${JSON.stringify(logObject, null, 2)},\n`;

    // Write log message to file
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
            res.status(500).end();
            return;
        }
        res.status(200).end();
    });
}
