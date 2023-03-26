const mqtt = require('mqtt');

// Conexión con el servidor MQTT
const host = 'localhost';
const port = 3000;
const req_topic = 'sensor_1/solicitud/temp-hum';

const pub = mqtt.connect(`mqtt://${host}:${port}`);

// Publicación de un tópico
pub.on('connect', () => {
    pub.publish(req_topic, '');
    console.log(`A topic post has been submitted: ${req_topic}...`);
});