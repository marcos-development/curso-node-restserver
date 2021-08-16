
const Role = require('../models/Role');
const User = require('../models/User');


const validatorRole = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no se encuentra registrado en la DDBB.`);
    }
}

const validatorEmail = async (email = '') => {
    const existeEmail = await User.findOne({ email });
    if(existeEmail) {
        throw new Error(`El correo ${email} ya existe`);
    }
};

const existUserById = async (id = '') => {
    const existUser = await User.findById(id);
    if(!existUser) {
        throw new Error(`El id ${id} no existe.`);
    }
};

module.exports = {
    validatorRole,
    validatorEmail,
    existUserById
}