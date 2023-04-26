import paho.mqtt.client as mqtt
import serial
import sys
import time
import json


# Configuración del puerto serial
serial_port = serial.Serial("/dev/ttyUSB0", 9600)


# Configuración del servidor MQTT
host = 'palancar.izt.uam.mx'
port = 4009
user = ''
password = ''
recon_time = 60


# Tópicos MQTT
main_topic = 'sensor_1/temp-hum'


# Conexión al servidor MQTT
client = mqtt.Client()
# client.connect(host, port, recon_time)


# Funciones
def on_connect(client, userdata, flags, rc):
    print('Connected to MQTT server...')


def sendSignal():
    time.sleep(2)
    serial_port.write(b'1')


def getData():
    try:
        # Se obtienen los datos
        params = serial_port.readline().decode('utf-8').strip()
        params_array = params.split(' ')

        temperature = params_array[0]
        humidity = params_array[1]

        # Se crea el objeto para publicar los datos del sensor
        data = {}
        data['date'] = time.strftime("%d/%B/%Y")
        data['time'] = time.strftime("%H:%M")
        data['sensors'] = [{
            'sensor_name': 'DHT11',
            'values': {'temperature': temperature, 'humidity': humidity}
        }]

        data_out = json.dumps(data)

        # Se publican los datos
        # client.publish(main_topic, data_out)
        print('Sending data...')
        print(data_out)

    except serial.SerialException as err:
        print(err)


# Callbacks
# client.on_connect = on_connect


# Ciclo principal
# client.loop_start()


sendSignal()
getData()
serial_port.close()


# client.loop_stop()
# client.disconnect()


# x = serial_port.readline();
# print(x)
