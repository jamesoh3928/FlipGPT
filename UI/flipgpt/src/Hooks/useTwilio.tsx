import React, { useRef } from "react";
import Log from "../Log";
import API from "../Types/API";

export const useTwilio = () => {
  const onCancelRef = useRef((msg?: string) => {});
  /**
   * set the on cancel ref for when an error occurs
   */
  const onCancel = (func: (msg?: string) => void) => {
    onCancelRef.current = func;
  };

  /**
   * send a twilio request to the server
   */
  const sendTwilioNotification = async (
    message: string,
    phoneNumber: string
  ) => {
    console.log("sending notification");
    try {
      fetch(API + "sendNotification", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          phoneNumber: phoneNumber,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          Log.log(`JSON`, false);
          Log.log(json);
        });
    } catch (e: any) {
      Log.log(`Twilio error: ${e.message}`);
      onCancelRef.current(e.message);
    }
  };

  return {
    sendTwilioNotification,
    onCancel,
  };
};
