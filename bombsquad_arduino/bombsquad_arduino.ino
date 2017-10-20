enum bomb_state {ARMED, DISARMED, DEFUSED, EXPLODED};

// kids, just change the LEDs for these 3 arrays for the corresponding bombs.
// make sure you use a mega2560
const int defuseLeds[] = {2,3,4,5,6,7,8}; //g
const int disarmLeds[] = {22,24,26,28,30,32,34}; //b
const int explodeLeds[] = {23,25,27,29,31,33,35}; //r


void initialize(){
  int i = 0;
  for( i = 0 ; i < 7 ; i++)
  {
    digitalWrite(defuseLeds[i], LOW);
    digitalWrite(disarmLeds[i], LOW);
    digitalWrite(explodeLeds[i], LOW);
    }
  }

void setup() {
  Serial.begin(9600);
  Serial.setTimeout(200);
  digitalWrite(13, LOW);
  pinMode(2,OUTPUT);
  pinMode(3,OUTPUT);
  pinMode(4,OUTPUT);
  pinMode(5,OUTPUT);
  pinMode(6,OUTPUT);
  pinMode(7,OUTPUT);
  pinMode(8,OUTPUT);
  pinMode(22,OUTPUT);
  pinMode(24,OUTPUT);
  pinMode(26,OUTPUT);
  pinMode(28,OUTPUT);
  pinMode(30,OUTPUT);
  pinMode(32,OUTPUT);
  pinMode(34,OUTPUT);
  pinMode(23,OUTPUT);
  pinMode(25,OUTPUT);
  pinMode(27,OUTPUT);
  pinMode(29,OUTPUT);
  pinMode(31,OUTPUT);
  pinMode(33,OUTPUT);
  pinMode(35,OUTPUT);
  initialize();
}


void lightLed(int bombNumber, int state)
{
  Serial.print("bombNumber = ");
  Serial.println(bombNumber);
  if (state == ARMED) {
    Serial.println("armed");
    digitalWrite(defuseLeds[bombNumber], LOW);
    digitalWrite(disarmLeds[bombNumber], LOW);
    digitalWrite(explodeLeds[bombNumber], LOW);
  } else if (state == DISARMED) {
    Serial.println("disarmed");
    digitalWrite(defuseLeds[bombNumber], HIGH);
    digitalWrite(disarmLeds[bombNumber], LOW);
    digitalWrite(explodeLeds[bombNumber], HIGH);    
  } else if (state == DEFUSED) {
    Serial.println("defused");
    digitalWrite(defuseLeds[bombNumber], LOW);
    digitalWrite(disarmLeds[bombNumber], HIGH);
    digitalWrite(explodeLeds[bombNumber], HIGH);
  } else if (state == EXPLODED) {
    Serial.println("exploded");
    digitalWrite(defuseLeds[bombNumber], HIGH);
    digitalWrite(disarmLeds[bombNumber], HIGH);
    digitalWrite(explodeLeds[bombNumber], LOW);    
  }
}

String x;

void loop() {
  x = Serial.readString();
  for (int i = 0; i < x.length(); i++) {
    Serial.print("i = ");
    Serial.println(i);
    String tmp_str = String(x[i]);
    int tmp_int = tmp_str.toInt();
    Serial.print("tmp_int = ");
    Serial.println(tmp_int);
    lightLed(i, tmp_int);
  }
  Serial.println(x);
}
