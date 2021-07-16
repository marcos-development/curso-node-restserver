const { response } = require('express');

const getUsers = (req, res = response) => {

    const { q, nombre, edad } = req.query;

    res.json({
        msg: 'get API - Controller',
        q,
        nombre,
        edad
    });
};

const postUsers = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: 'post API - Controller',
        nombre,
        edad
    });
};

const putUsers = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - Controller',
        id
    });
};

const deleteUsers = (req, res = response) => {
    res.json({
        msg: 'delete API - Controller'
    });
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