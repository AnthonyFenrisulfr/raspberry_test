#Código que lee los valores de temperatura y humedad proporcionados por el sensor
#DHT11 conectado a una Raspberry pi 3 B

# import adafruit_dht
# import paho.mqtt.client as mqtt
# import sys
# import time
# import json

# PIN = 18
# SENSOR = adafruit_dht.DHT11(PIN)

# DATA = {}
# DATA['id_sensor'] = 1

# client = mqtt.Client()
# client.connect('192.168.1.80', 3000, 60, "")

# while True:
#     try:
#         humidity = SENSOR.humidity
#         temperature = SENSOR.temperature
#         humidity = 19
#         temperature = 25
        
#         DATA["values"] = { 'temperature': temperature, 'humidity': humidity }
#         DATA['time'] = time.strftime("%H:%M:%S")
#         DATA['date'] = time.strftime("%d/%B/%Y")
        
#         DATA_OUT = json.dumps(DATA)
        
#         client.publish('sensor_1/temp-hum', DATA_OUT)
#         print('Sending data...')
        
#     except RuntimeError as error:
#         print(error.args[0])
#         #sensor.exit()
#         time.sleep(5)
#         continue
        
#     except Exception as error:
#         #sensor.exit()
#         raise error
#     time.sleep(10.0)