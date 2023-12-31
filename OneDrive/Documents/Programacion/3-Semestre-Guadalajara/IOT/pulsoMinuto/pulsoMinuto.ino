
/*  Getting_BPM_to_Monitor prints the BPM to the Serial Monitor, using the least lines of code and PulseSensor Library.
 *  Tutorial Webpage: https://pulsesensor.com/pages/getting-advanced
 *
--------Use This Sketch To------------------------------------------
1) Displays user's live and changing BPM, Beats Per Minute, in Arduino's native Serial Monitor.
2) Print: "♥  A HeartBeat Happened !" when a beat is detected, live.
2) Learn about using a PulseSensor Library "Object".
4) Blinks the builtin LED with user's Heartbeat.
--------------------------------------------------------------------*/
#define BLYNK_TEMPLATE_ID "TMPL2O_U0GViX"
#define BLYNK_TEMPLATE_NAME "Quickstart Template"
#define BLYNK_AUTH_TOKEN "Hxt1UA5vfcFeBXrRY1xB6uxMs467GVrt"

#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>
#include "FirebaseESP8266.h"

#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
#define API_KEY "AIzaSyCbx5Kk75PykuxhT87vXFNYs5wDP8yERyE"
//#define DATABASE_URL "https://reto-segundo-default-rtdb.firebaseio.com/"

char auth2[] = BLYNK_AUTH_TOKEN; // Clave de autorización para Blynk
  char ssid[] = "POCO F3"; // Nombre de la red WiFi
  char pass[] = "santigugon"; // Contraseña de la red WiFi

const char *FIREBASE_HOST = "https://reto-segundo-default-rtdb.firebaseio.com/";
const char *FIREBASE_AUTH = "AIzaSyCbx5Kk75PykuxhT87vXFNYs5wDP8yERyE";
FirebaseData firebaseData;

#define USE_ARDUINO_INTERRUPTS true    // Set-up low-level interrupts for most acurate BPM math.
#include <PulseSensorPlayground.h>     // Includes the PulseSensorPlayground Library.   

//  Variables
const int PulseWire = 0;       // PulseSensor PURPLE WIRE connected to ANALOG PIN 0
const int LED = LED_BUILTIN;          // The on-board Arduino LED, close to PIN 13.
int Threshold = 550;           // Determine which Signal to "count as a beat" and which to ignore.
                               // Use the "Gettting Started Project" to fine-tune Threshold Value beyond default setting.
                               // Otherwise leave the default "550" value. 
                               
PulseSensorPlayground pulseSensor;  // Creates an instance of the PulseSensorPlayground object called "pulseSensor"


void setup() {   

  Serial.begin(9600);          // For Serial Monitor

  // Configure the PulseSensor object, by assigning our variables to it. 
  pulseSensor.analogInput(PulseWire);   
  pulseSensor.blinkOnPulse(LED);       //auto-magically blink Arduino's LED with heartbeat.
  pulseSensor.setThreshold(Threshold);   

  // Double-check the "pulseSensor" object was created and "began" seeing a signal. 
   if (pulseSensor.begin()) {
    Serial.println("We created a pulseSensor Object !");  //This prints one time at Arduino power-up,  or on Arduino reset.  
  }


  // Inicialización de Blynk
  Blynk.begin(auth2, ssid, pass, "blynk.cloud", 80);

  // Inicialización de Firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
}



void loop() {
  int Signal=0;
  unsigned long startTime = millis();  // Record the start time
  int countSignalAbove850 = 0;  // Initialize the count
  int totalBpm = 0;  // Initialize the total BPM

  while (millis() - startTime < 60000) {  // Run the loop for 60 seconds
    Signal = analogRead(A0);
    int bpm = Signal - 840;

    if (bpm > 40) {
      if (bpm > 120) {
        bpm = bpm / 2;
      }

      //Serial.print("PULSO ");
      //Serial.println(bpm);

      // Check if Signal is larger than 850 and increment the count
      if (Signal > 850) {
        countSignalAbove850++;
      }

      // Add the BPM to the total
      totalBpm += bpm;
    }

    if (Signal > Threshold) {
      digitalWrite(LED, HIGH);
    } else {
      digitalWrite(LED, LOW);
    }

    delay(400);
  }

  // Calculate the average BPM
  int averageBpm =  countSignalAbove850;
  if (Firebase.ready()) {
      if (Firebase.RTDB.setInt(&firebaseData, "SensorPulso/PulsoActual", averageBpm)) {
        //Serial.println("Dato almacenado exitosamente");
      } else {
        //Serial.println("Error al almacenar el dato");
      }
    }
  Blynk.virtualWrite(0, averageBpm);
  if(averageBpm>20){
    Blynk.virtualWrite(1, 1);
  }else{
    Blynk.virtualWrite(1, 0);
  }

  
  // Print the count and average BPM
  Serial.print("Number of times signal was larger than 850: ");
  Serial.println(countSignalAbove850);
  Serial.print("Average BPM: ");
  Serial.println(averageBpm);

  char pathPulsoHistorico[50];
  snprintf(pathPulsoHistorico, sizeof(pathPulsoHistorico),"SensorPulso/pulsoHistorico/%lu", currentTimestamp); 
  if(currentTimestamp-prevTimestamp>10000){
    if(Firebase.RTDB.setFloat(&firebaseData, pathPulsoHistorico, averageBPM)){
     prevTimestamp=currentTimestamp;
            //Serial.println("Data with timestamp stored successfully");
        }
  }
  // Reset counts for the next iteration
  countSignalAbove850 = 0;
  totalBpm = 0;


  delay(1000);  // Delay for 1 minute before the next iteration
}


  
