#define BLYNK_TEMPLATE_ID "TMPL2O_U0GViX"
#define BLYNK_TEMPLATE_NAME "Quickstart Template"
#define BLYNK_AUTH_TOKEN "Hxt1UA5vfcFeBXrRY1xB6uxMs467GVrt"

#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>

// Declaración de la clave de autorización para la aplicación Blynk
#define BLYNK_AUTH_TOKEN "p09dPHLU66LDp3fQ1BnsLBm7xxFYD-Ay"

// Declaración de las credenciales de la red WiFi
char auth[] = BLYNK_AUTH_TOKEN; // Clave de autorización para Blynk
char ssid[] = "POCO F3"; // Nombre de la red WiFi
char pass[] = "santigugon"; // Contraseña de la red WiFi

int fuerzaDeseada;
// Esta función se ejecutará cada vez que se reciba un valor en el pin virtual V0 de la aplicación Blynk.
BLYNK_WRITE(V7) {
  // Lee el valor recibido en el pin virtual V0 y lo usa para controlar el estado de D7 (un LED, asumiendo que está conectado al pin D7).
  fuerzaDeseada=param.asInt();
}

void setup() {
  // Configura el pin D7 como salida para controlar el LED.
  Serial.begin(115200);
  Serial.print("HOLA");
  pinMode(D7, OUTPUT);

  // Inicializa la biblioteca Blynk con las credenciales de la red WiFi y la clave de autorización.
  Blynk.begin(auth, ssid, pass, "blynk.cloud", 80);
}

void loop() {
  // Ejecuta la biblioteca Blynk. Esto mantiene la comunicación entre la placa y la aplicación Blynk.
  Blynk.run();
  
}
