package com.prostylee;

/** Use for amazon device only
*/
public class Receiver extends ADMMessageReceiver
 {
     public Receiver()
     {   // This is needed for backward compatibility
        super(MyADMLegacyMessageHandler.class);
        // Where available, prefer using the new job based
        if (ADMLatestAvailable) {
            registerJobServiceClass(MyADMMessageHandler.class, <JOB_ID>)
        }
     }
     // Nothing else is required here; your broadcast receiver automatically
     // forwards intents to your service for processing.
 }
