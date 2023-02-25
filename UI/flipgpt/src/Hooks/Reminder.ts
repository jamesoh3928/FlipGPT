import { Twilio } from 'twilio';
import React, { useState, useEffect } from 'react';
import { notDeepStrictEqual } from 'assert';

const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;

export function sendNotif(phoneNumber: string, notification: string){
    if(accountSid && authToken && twilioNumber && phoneNumber){
        const client = new Twilio(accountSid, authToken);

        client.messages
            .create({
                from: twilioNumber,
                to: phoneNumber,
                body: notification
            })
            .then((message) => console.log(message.sid));
    }else{
        console.error("Missing a variable you need to send the message.");
    }
}