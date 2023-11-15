const int ledPin = D7; // Pin del LED en D7 (GPIO13) en el ESP8266

void setup() {
  pinMode(ledPin, OUTPUT); // Configura el pin del LED como salida
}

void loop() {
  digitalWrite(ledPin, HIGH); // Enciende el LED
  delay(1000); // Espera 1 segundo
  digitalWrite(ledPin, LOW); // Apaga el LED
  delay(1000); // Espera 1 segundo
}

