

  // Definiciones de Plantilla y Tokens Blynk
  #define BLYNK_TEMPLATE_ID "TMPL2bEq8fd0c"
  #define BLYNK_TEMPLATE_NAME "Practica 1"
  #define BLYNK_AUTH_TOKEN "p09dPHLU66LDp3fQ1BnsLBm7xxFYD-Ay"

  //#define FIREBASE_HOST "https://iot-reto-e60d0-default-rtdb.firebaseio.com/"
//#define FIREBASE_AUTH "ZDkCfO6lKATancp4E4NQ1g5nInOKLivVnSrQDeES"
  // Inclusiones de Bibliotecas

#include "FirebaseESP8266.h"
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
#define API_KEY "AIzaSyCbx5Kk75PykuxhT87vXFNYs5wDP8yERyE"
//#define DATABASE_URL "https://reto-segundo-default-rtdb.firebaseio.com/"

const char *FIREBASE_HOST = "https://reto-segundo-default-rtdb.firebaseio.com/";
const char *FIREBASE_AUTH = "AIzaSyCbx5Kk75PykuxhT87vXFNYs5wDP8yERyE";
FirebaseData firebaseData;

#include <ESP8266WiFi.h> 
#include <BlynkSimpleEsp8266.h>


unsigned long prevTimestamp=0;
unsigned long sendDataPrevMillis=0;
bool signUpOk= false;
int ldrData=0;
float voltage=0.0;



  // Definiciones de Constantes// Pressure sensor connected to analog pin A0
  const int pinSensorPresion = A0;

  char auth2[] = BLYNK_AUTH_TOKEN; // Clave de autorización para Blynk
  char ssid[] = "POCO F3"; // Nombre de la red WiFi
  char pass[] = "santigugon"; // Contraseña de la red WiFi

//FirebaseData fbdo;
//FirebaseAuth auth;
//FirebaseConfig config;

  /*
  // Función que se ejecuta cuando se recibe un comando en el pin virtual V0 de Blynk
  BLYNK_WRITE(V0) {
   
    digitalWrite(D7, param.asInt());
  }
  */
int sistemaOn=1;
int fuerzaDeseada;

float porcentajeDeseado;
float porcentajeFuerza;
int tolerancia=10;

unsigned long ultimoTiempoAlmacenamiento = 0;
unsigned long tiempoTotalDiferenciaAlta = 0;

//Para apagar y prender el sistema
BLYNK_WRITE(V0) {
  // Lee el valor recibido en el pin virtual V0 y lo usa para controlar el estado de D7 (un LED, asumiendo que está conectado al pin D7).
  sistemaOn=param.asInt();
}
BLYNK_WRITE(V5) {
  // Lee el valor recibido en el pin virtual V0 y lo usa para controlar el estado de D7 (un LED, asumiendo que está conectado al pin D7).
  tolerancia=param.asInt();
}

BLYNK_WRITE(V7) {
  // Lee el valor recibido en el pin virtual V0 y lo usa para controlar el estado de D7 (un LED, asumiendo que está conectado al pin D7).
   pinMode(D7, OUTPUT);
  fuerzaDeseada=param.asInt();
}


void setup() {
  Serial.begin(115200);
  Serial.println(F("FSR test!"));

  // Inicialización de Blynk
  Blynk.begin(auth2, ssid, pass, "blynk.cloud", 80);

  // Configuración de pines de salida
  pinMode(D7, OUTPUT);
  pinMode(D8, OUTPUT);

  // Inicialización de Firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
}

// Función para calcular la presión desde el voltaje
float calcularPresion(int presion) {
  return presion/20;
}

void loop() {
  // Ejecutar las operaciones de Blynk
  Blynk.run();
  if(sistemaOn==1){

    
    // Leer el valor analógico del sensor de presión
    int valorSensor = analogRead(pinSensorPresion);
    float voltajeSensor = valorSensor / 1023.0 * 3.3;
     float presion = calcularPresion(valorSensor);

    // Actualizar el widget de Blynk con el valor del sensor
    Blynk.virtualWrite(9, presion);
  

    // Calcular el porcentaje de presión deseado y actual
    porcentajeDeseado = (float(fuerzaDeseada) / 20) * 100;
    porcentajeFuerza = (float(presion) / 20) * 100;
    
    // Controlar los LEDs según la diferencia de presión
    if ((porcentajeFuerza >= porcentajeDeseado - tolerancia && porcentajeFuerza <= porcentajeDeseado + tolerancia)&&sistemaOn==1) {
      digitalWrite(D8, LOW);
      digitalWrite(D7, LOW);
    } else {
      digitalWrite(D7, HIGH);
      digitalWrite(D8, HIGH);
      delay(1000);
      digitalWrite(D8, LOW);
      digitalWrite(D7, LOW);
      delay(1000);
    
    }

    // Almacenar el valor del sensor en Firebase
    if (Firebase.ready()) {
      if (Firebase.RTDB.setInt(&firebaseData, "SensorPresion/PresionActual", presion)) {
        //Serial.println("Dato almacenado exitosamente");
      } else {
        //Serial.println("Error al almacenar el dato");
      }
    }

    // Calcular la diferencia de presión
    float diferenciaPresion = abs(porcentajeFuerza - porcentajeDeseado);
    Blynk.virtualWrite(1, diferenciaPresion);

    // Almacenar la diferencia de presión cada segundo
    unsigned long tiempoActual = millis();
    if (tiempoActual - ultimoTiempoAlmacenamiento >= 1000) {
      ultimoTiempoAlmacenamiento = tiempoActual;

      if (Firebase.ready()) {
        if (Firebase.RTDB.setFloat(&firebaseData, "SensorPresion/diferenciaPresionActual", diferenciaPresion)&&Firebase.RTDB.setFloat(&firebaseData, "SensorPresion/tolerancia", tolerancia)) {
        //  Serial.println("Diferencia de presión almacenada exitosamente");
        } else {
        // Serial.println("Error al almacenar la diferencia de presión");
        }
      }
    }

    // Verificar si la diferencia de presión es mayor a 10
    if (diferenciaPresion > tolerancia) {
      tiempoTotalDiferenciaAlta += 1;
      Serial.println("Tiempo de alta diferencia de presión: " + String(tiempoTotalDiferenciaAlta) + " segundos");
    }

  unsigned long currentTimestamp = millis();

  char pathDifPresion[50];
  char pathPresion[50];
  char pathAlertas[50];
  //char pathDipathAlertasfPresion[50]
  snprintf(pathDifPresion, sizeof(pathDifPresion), "SensorPresion/DiferenciaPresionHistorica/%lu", currentTimestamp);
  snprintf(pathPresion, sizeof(pathPresion), "SensorPresion/PresionHistorica/%lu", currentTimestamp);
  snprintf(pathAlertas, sizeof(pathAlertas), "SensorPresion/Alertas/%lu", currentTimestamp);
  //snprintf(pathDipathAlertasfPresion, sizeof(pathAlertas),"SensorPresion/Alertas/%lu", currentTimestamp); 

  if (Firebase.ready()) {
      if(currentTimestamp-prevTimestamp>10000){
        if (porcentajeFuerza >= porcentajeDeseado - tolerancia && porcentajeFuerza <= porcentajeDeseado + tolerancia) {
              Firebase.RTDB.setInt(&firebaseData, pathAlertas, 1);
           }
        if (Firebase.RTDB.setFloat(&firebaseData, pathDifPresion, diferenciaPresion)&&Firebase.RTDB.setInt(&firebaseData, pathPresion, presion)) {
          prevTimestamp=currentTimestamp;
           
            //Serial.println("Data with timestamp stored successfully");
        } else {
            //Serial.println("Error storing data with timestamp");
        }
      }
  }
  }
}