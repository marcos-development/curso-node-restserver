const mongoose = require('mongoose');


const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Base de Datos iniciada');

    } catch (error) {
        throw new Error('Error a la hora de iniciar la database');
    }

};

module.exports = {
    dbConnection
}