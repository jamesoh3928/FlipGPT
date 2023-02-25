import { Twilio } from 'twilio';
import React, { useState, useEffect } from 'react';
import { notDeepStrictEqual } from 'assert';

const accountSid = 'ACf6ba8eb8b094cb279e8e1405ee418b9e';
const authToken = 'b1490109ffb1985a68efc8b3ff930376';
const twilioNumber = '18339312987';

export function sendNotif(phoneNumber: string, notification: string){
    if(phoneNumber){
        const client = new Twilio(accountSid, authToken);

        client.messages
            .create({
                from: twilioNumber,
                to: phoneNumber,
                body: notification
            })
            .then((message) => console.log(message.sid));
    }else{
        console.error("Missing phone number to send notifcation to.");
    }
}