const mqtt = require('mqtt');
const mongoose = require('mongoose');

// Conexión con el servidor
const host = 'localhost';
const port = 3000;

const sub = mqtt.connect(`mqtt://${host}:${port}`);

// Conexión con la base de datos
const DB = 'prueba';
const collection = 'datos_sensores';
const uri = `mongodb://0.0.0.0/${DB}`;

mongoose.connect(uri)
.then(() => console.log('Connected to database...'))
.catch((error) => console.log(`Connection to database failed. Error: ${error}`));

// Definición de la estructura del modelo
const dbSchema = mongoose.Schema({
    serieSensor: String,
    parameters: {
        temperature: String,
        humidity: String
    },
    date: {
        day: String,
        mounth: String,
        year: String,
        time: String
    }
}, {versionKey: false});

const dbModel = mongoose.model(collection, dbSchema);

// Suscripción al tópico
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


// FUNCIONES ***************************************************************

// Sse obtiene la fecha y hora para el registro
function getDate() {
    let actualDate = new Date().toLocaleString();
    let aux = actualDate.split(' ');
    let date = aux[0].split('/');
    date.push(aux[1]);
    return date;
}

// Función que devuelve todos los documentos de la base de datos
async function read() {
    let data = await dbModel.find();
    console.log(data);
}

// Función que crea un nuevo registro en la base de datos
async function create(serie, temp, hum) {
    let date = getDate();
    let keys = Object.keys(dbSchema.obj.date);

    // Se ingresan los parámetros recibidos al modelo
    let data = new dbModel({
        serieSensor: serie,
        parameters: {
            temperature: temp,
            humidity: hum
        }
    });

    // Se ingresa la fecha al modelo
    let i = 0;
    keys.forEach(element => {
        data.date[element] = date[i];
        i++;
    });

    await data.save();
}

// LLAMADOS A LAS FUNCIONES
// create('1', '24', '16%');
// read();

