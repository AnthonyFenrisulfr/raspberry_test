#include <dht.h>
dht DHT;

#define DHT11_PIN 4
unsigned int interval = 2000;

void setup()
{
    Serial.begin(9600);
}

void loop()
{
    if (Serial.available() > 0)
    {
        char signal = Serial.read();

        if (signal >= '1' && signal <= '9')
        {
            DHT.read11(DHT11_PIN);
            Serial.println(String(DHT.temperature) + " " + String(DHT.humidity));
            delay(interval);
        }
    }
}