String tmp;

void setup() {
  Serial.begin(115200);
  Serial.println("Serial Start!");
  Serial1.begin(115200);
  Serial.println("Serial1 Start!");

}

void loop() {
  if(Serial.available())
  {
    for(int i=0; i<8; i++)
    {
      Serial1.write(micros()%256);
    }
    Serial.readString();
  }
  if(Serial1.available())
  {
    Serial.println(Serial1.readString());
  }
}
