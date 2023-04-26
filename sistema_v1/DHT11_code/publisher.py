"""
import paho.mqtt.client as mqtt
import adafruit_dht
import sys
import time
import json

pin = 18
#sensor = adafruit_dht.DHT11(pin)

req_interval = 300

# Configuración del servidor MQTT
host = '192.168.1.80'
port = 3000
user = ''
password = ''
recon_time = 60

# Temas MQTT
main_topic = 'sensor_1/temp-hum'
req_topic = 'sensor_1/solicitud/temp-hum'

# Se crea el objeto para publicar los datos del sensor
data = {}
data['id_sensor'] = 1

# Conexión al servidor MQTT
client = mqtt.Client()
client.connect(host, port, recon_time)

# Funciones
def on_connect(client, userdata, flags, rc):
    print('Connected to MQTT server...')
    client.subscribe(req_topic)
    print('Waiting requests...')
    
def on_message(client, userdata, msj):
    print('Received request')
    getData()

def getData():    
    try:
        # Inicializando el sensor
        sensor = adafruit_dht.DHT11(pin)
        humidity = sensor.humidity
        temperature = sensor.temperature
            
        data["values"] = { 'temperature': temperature, 'humidity': humidity }
        data['time'] = time.strftime("%H:%M:%S")
        data['date'] = time.strftime("%d/%B/%Y")
            
        data_out = json.dumps(data)
        client.publish(main_topic, data_out)
        print('Sending data...')
        sensor.exit()
        
    except RuntimeError as error:
        print(error.args[0])
        sensor.exit()
        time.sleep(1)
            
    except Exception as error:
        raise error
        sensor.exit()
    time.sleep(1)
    
# Callbacks
client.on_connect = on_connect
client.on_message = on_message

#Ciclo principal
client.loop_start()

while True:
    getData()
    time.sleep(req_interval)

client.loop_stop()
client.disconnect()
"""
