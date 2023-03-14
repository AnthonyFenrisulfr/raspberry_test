// Se importa el módulo MQTT
const mqtt = require('mqtt');

// Conexión al servidor
// const host = '192.168.1.80';
const host = 'localhost';
const port = 3000;

const pub = mqtt.connect(`mqtt://${host}:${port}`);

// Publicación de un tópico
var topic = 'test_topic';

pub.on('connect', () => {
    let serieSensor = '1';
    setInterval(() => {
        let temp = Math.random() * 100;
        let hum = Math.floor(Math.random() * 30);



        pub.publish(topic, '');
    }, 2000);
});