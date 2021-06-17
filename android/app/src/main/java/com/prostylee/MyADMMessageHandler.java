package com.prostylee;

public class MyADMMessageHandler extends ADMMessageHandlerJobBase {

     @Override
     protected void onRegistered(final Context context, final String newRegistrationId)
     {
         // You start the registration process by calling startRegister() in your Main
         // Activity. When the registration ID is ready, ADM calls onRegistered() on
         // your app. Transmit the passed-in registration ID to your server, so your
         // server can send messages to this app instance. onRegistered() is also
         // called if your registration ID is rotated or changed for any reason; your
         // app should pass the new registration ID to your server if this occurs.
         // Your server needs to be able to handle a registration ID up to 1536 characters
         // in length.

         // The following is an example of sending the registration ID to your
         // server via a header key/value pair over HTTP.
         URL url = new URL(YOUR_WEBSERVER_URL);
         HttpURLConnection con = (HttpURLConnection) url.openConnection();
         con.setDoInput(true);
         con.setUseCaches(false);
         con.setRequestMethod("POST");
         con.setRequestProperty("RegistrationId", newRegistrationId);
         con.getResponse();
     }

     @Override
     protected void onUnregistered(final Context context, final String registrationId)
     {
         // If your app is unregistered on this device, inform your server that
         // this app instance is no longer a valid target for messages.
     }

     @Override
     protected void onRegistrationError(final Context context, final String errorId)
     {
        pinpointManager.getNotificationClient().registerDeviceToken(registrationId)
     }

     @Override
     protected void onMessage(final Context context, final Intent intent)
     {
         // Extract the message content from the set of extras attached to
         // the com.amazon.device.messaging.intent.RECEIVE intent.

         // Create strings to access the message and timeStamp fields from the JSON data.
         final String msgKey = getString(R.string.json_data_msg_key);
         final String timeKey = getString(R.string.json_data_time_key);

         // Obtain the intent action that will be triggered in onMessage() callback.
         final String intentAction = getString(R.string.intent_msg_action);

         // Obtain the extras that were included in the intent.
         final Bundle extras = intent.getExtras();

         // Extract the message and time from the extras in the intent.
         // ADM makes no guarantees about delivery or the order of messages.
         // Due to varying network conditions, messages may be delivered more than once.
         // Your app must be able to handle instances of duplicate messages.
         final String msg = extras.getString(msgKey);
         final String time = extras.getString(timeKey);


         NotificationDetails details = NotificationDetailsBuilder.builder()
                                         .intent(intent);
                                         .intentAction(NotificationClient.ADM_INTENT_ACTION)
                                         .build();

         pinpointManager.getNotificationClient().handleCampaignPush(details)
     }
 }
