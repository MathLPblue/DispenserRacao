#include <WiFi.h>
#include <PubSubClient.h>
#include <WiFiClientSecure.h>
#include <ESP32Servo.h>
#include <time.h>


const char* ssid = "nome_wifi"; 
const char* password = "senha_wifi";
const char* mqtt_server = "url"; 
const int mqtt_port = porta; 
const char* mqtt_user = "user_mqtt"; 
const char* mqtt_password = "senhar_mqtt"; 

WiFiClientSecure espClient;
PubSubClient client(espClient);
Servo myServo; 

int scheduledHour = -1;  
int scheduledMinute = -1;

void setup_wifi() {
  Serial.print("Conectando-se a ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\nWiFi conectado. IP: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* message, unsigned int length) {
  String messageTemp;
  for (int i = 0; i < length; i++) {
    messageTemp += (char)message[i];
  }

  if (messageTemp.startsWith("schedule:")) {
    int hour, minute;
    if (sscanf(messageTemp.c_str() + 9, "%d:%d", &hour, &minute) == 2) {
      scheduledHour = hour;
      scheduledMinute = minute;
      Serial.printf("Horário programado para: %02d:%02d\n", scheduledHour, scheduledMinute);
    }
  }

  if (messageTemp == "feed") {
    Serial.println("Alimentando pet...");
    myServo.write(90); 
    delay(1000); 
    myServo.write(0);
  }
}

void reconnect() {
  while (!client.connected()) {
    Serial.println("Tentando conectar ao MQTT...");
    if (client.connect("ESP32Client", mqtt_user, mqtt_password)) {
      Serial.println("Conectado ao MQTT!");
      client.subscribe("petfeeder/command"); 
      Serial.println("Subscrito ao tópico: petfeeder/command");
    } else {
      Serial.print("Falha na conexão, rc=");
      Serial.println(client.state());
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  setup_wifi();
  espClient.setInsecure(); 
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
  myServo.attach(5); 

  configTime(-3 * 3600, 0, "pool.ntp.org", "time.nist.gov");
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  time_t now = time(nullptr);
  struct tm* timeinfo = localtime(&now);
  
  int currentHour = timeinfo->tm_hour;
  int currentMinute = timeinfo->tm_min;

  Serial.printf("Hora atual: %02d:%02d\n", currentHour, currentMinute);
  Serial.printf("Horário agendado: %02d:%02d\n", scheduledHour, scheduledMinute);

  if (scheduledHour != -1 && scheduledMinute != -1) {
    if (currentHour == scheduledHour && currentMinute == scheduledMinute) {
      Serial.println("Hora programada atingida. Alimentando pet...");
      myServo.write(90); 
      delay(1000); 
      myServo.write(0);
      scheduledHour = -1;
      scheduledMinute = -1;
    }
  }
}  