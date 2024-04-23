// Function to write logs to the log file
export default async function writeToLog(message) {
    try {
        await fetch('/api/log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });
        console.log('Log message sent successfully');
    } catch (error) {
        console.error('Failed to send log message:', error);
    }
}
