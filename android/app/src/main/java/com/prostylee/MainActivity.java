package com.prostylee;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "prostylee";
  }

    @Override
    public void onCreate() {
        final ADM adm = new ADM(this);
        if (adm.getRegistrationId() == null)
        {
           // startRegister() is asynchronous; your app is notified via the
           // onRegistered() callback when the registration ID is available.
           adm.startRegister();
        }

         ADMLatestAvailable = false ;
         try{
             Class.forName( "com.amazon.device.messaging.ADMMessageHandlerJobBase" );
             ADMLatestAvailable = true ;
         } catch (ClassNotFoundException e)
         {
             // Handle the exception.
         }
    }
}
