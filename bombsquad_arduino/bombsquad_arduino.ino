enum bomb_state {ARMED, DISARMED, DEFUSED, EXPLODED};

void setup() {
  Serial.begin(9600);
  Serial.setTimeout(200);
  digitalWrite(13, LOW);

}
// kids, just change the LEDs for these 3 arrays for the corresponding bombs.
// make sure you use a mega2560
const int defuseLeds[] = {2,3,4,5,6,7,8}; //g
const int disarmLeds[] = {22,24,26,28,30,32,34}; //b
const int explodeLeds[] = {23,25,27,29,31,33,35}; //r

void lightLed(int bombNumber, int state)
{
  Serial.print(bombNumber);
  if (state == ARMED) {
    Serial.println("armed");
    digitalWrite(defuseLeds[bombNumber], LOW);
    digitalWrite(disarmLeds[bombNumber], LOW);
    digitalWrite(explodeLeds[bombNumber], LOW);
  } else if (state == DISARMED) {
    Serial.println("disarmed");
    digitalWrite(defuseLeds[bombNumber], LOW);
    digitalWrite(disarmLeds[bombNumber], HIGH);
    digitalWrite(explodeLeds[bombNumber], LOW);    
  } else if (state == DEFUSED) {
    Serial.println("defused");
    digitalWrite(defuseLeds[bombNumber], HIGH);
    digitalWrite(disarmLeds[bombNumber], LOW);
    digitalWrite(explodeLeds[bombNumber], LOW);
  } else if (state == EXPLODED) {
    Serial.println("exploded");
    digitalWrite(defuseLeds[bombNumber], LOW);
    digitalWrite(disarmLeds[bombNumber], LOW);
    digitalWrite(explodeLeds[bombNumber], HIGH);    
  }
}

String x;

void loop() {
  x = Serial.readString();
  for (int i = 0; i < x.length(); i++) {
    String tmp_str = String(x[i]);
    int tmp_int = tmp_str.toInt();
    lightLed(i, tmp_int);
  }
  Serial.println(x);
}
