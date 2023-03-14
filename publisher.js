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
    let serieSensor = '1000001';
    let temp = (Math.random() * 100).toFixed(2).toString();
    let hum = (Math.floor(Math.random() * 30)).toString();
    pub.publish(topic, `${serieSensor}/${temp}/${hum}`);

    console.log(`Sensor número: ${serieSensor}\nTemperatura: ${temp}°C\nHumedad: ${hum}%`);
});