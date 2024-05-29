void setup() {
  Serial1.begin(9600);
  Serial.begin(115200);
  Serial.println("ready");
}

void loop() {
  if(Serial1.available()) Serial.println((char)Serial1.read());
}
