// Se importa el módulo MQTT
const mqtt = require('mqtt');

// Parámetros para la cenexión al broker
const host = '192.168.1.80';
const port = 3000;

// Conexión al servidor
const pub = mqtt.connect(`mqtt://${host}:${port}`);

// Publicación
var topic = 'test_topic';
var cont = 1;

pub.on('connect', () => {
    setInterval(() => {
        console.log(`Se envió el mensaje ${cont}`);
        pub.publish(topic, `Mensaje ${cont}`);
        cont = cont + 1;
    }, 2000);
});