const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/User');

const getUsers = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { state: true };

    // const total = await User.countDocuments(query);
    // const users = await User.find(query)
    //     .skip(parseInt(desde))
    //     .limit(parseInt(limite));

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(parseInt(desde))
            .limit(parseInt(limite))
    ]);

    res.json({
        total,
        users
    });
};

const postUsers = async (req, res = response) => {

    const { name, email, password, rol } = req.body;
    const user = new User({ name, email, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await user.save();

    res.json({
        user
    });
};

const putUsers = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...props } = req.body;

    // TODO validar contra DDBB
    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        props.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate(id, props);

    res.json(user);
};

const deleteUsers = async (req, res = response) => {
    
    const { id } = req.params;

    // lo borramos fisicamente
    // const user = await User.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate(id, { state: false });

    res.json(user);
};

const patchUsers = (req, res = response) => {
    res.json({
        msg: 'patch API - Controller'
    });
};


module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers,
    patchUsers,
}