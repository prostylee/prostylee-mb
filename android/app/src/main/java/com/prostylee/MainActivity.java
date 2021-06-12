package com.prostylee;

import com.facebook.react.ReactActivity;
import com.prostylee.PushNotificationManager;

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
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Initialize PinpointManager
        PushNotificationManager manager = new PushNotificationManager();
        manager.getPinpointManager(getApplicationContext());
    }
}
