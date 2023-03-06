// Se importa el módulo MQTT
const mqtt = require('mqtt');

// Parámetros para la cenexión al broker
const host = 'localhost';
const port = 3000;

// Conexión al broker
const sub = mqtt.connect(`mqtt://${host}:${port}`);

// Subscripción
var topic = 'test_topic';
sub.on('connect', () => {
    sub.subscribe(topic, (error) => { 
        if (!error) {
            console.log(`Subscribed to topic ${topic}`);
        } else {
            console.log('Subscription error');
        }
    });
});

sub.on('message', (topic, message) => {
    console.log(message.toString());
});