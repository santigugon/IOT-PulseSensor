/*************************************************************

  This is a simple demo of sending and receiving some data.
  Be sure to check out other examples!
 *************************************************************/

/* Fill-in information from Blynk Device Info here */
#define BLYNK_TEMPLATE_ID           "TMPL2O_U0GViX"
#define BLYNK_TEMPLATE_NAME         "Quickstart Template"
#define BLYNK_AUTH_TOKEN            "Hxt1UA5vfcFeBXrRY1xB6uxMs467GVrt"

/* Comment this out to disable prints and save space */
#define BLYNK_PRINT Serial

#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>

char ssid[] = "POCO F3";
char pass[] = "santigugon";

const int ledPin = D7;
BlynkTimer timer;
int ledState = LOW; // Variable to store the LED state

void myTimerEvent()
{
  // Your code to be executed at the specified interval goes here
  digitalWrite(ledPin, !digitalRead(ledPin)); // Toggle the LED state
  ledState = digitalRead(ledPin); // Update the LED state variable
}

void setup()
{
  Serial.begin(115200);
  Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass);
  pinMode(ledPin, OUTPUT);

  // Set the LED state based on the stored variable
  digitalWrite(ledPin, ledState);

  // Set up a timer to run the myTimerEvent function every second
  timer.setInterval(1000L, myTimerEvent);
}

void loop()
{
  Blynk.run();
  timer.run();
}

BLYNK_WRITE(V0)
{
  int value = param.asInt();
  // Your code to respond to the V0 state change goes here
  // You can add custom behavior based on the value received
  if (value == 1) {
    // Perform an action when V0 is set to 1
    digitalWrite(ledPin, HIGH);
    ledState = HIGH; // Update the LED state variable
  } else {
    // Perform a different action when V0 is set to 0
    digitalWrite(ledPin, LOW);
    ledState = LOW; // Update the LED state variable
  }
}

BLYNK_CONNECTED()
{
  digitalWrite(ledPin, HIGH);
  ledState = HIGH; // Update the LED state variable
  // Code to run when the device is connected to Blynk server
  // You can add custom behavior here
}



