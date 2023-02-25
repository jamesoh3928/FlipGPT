// USAGE 
// TWILIO_API.sendTwilioNotification("This is an example message", "18325239525"); 


async function sendTwilioNotification(message: string, phoneNumber: string) {
    console.log('sending notification'); 
    const response = await fetch("http://localhost:4000/sendNotification", {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(
    {
        "message": message,
        "phoneNumber": phoneNumber,
    }),
    });
}

let TWILIO_API = {
    sendTwilioNotification
}

export default TWILIO_API; 
