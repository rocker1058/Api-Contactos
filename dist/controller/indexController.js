"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.updateContact = exports.createContact = exports.getContactid = exports.getContact = void 0;
const database_1 = require("../database");
const getContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM contacto');
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Error en el servidor sql');
    }
});
exports.getContact = getContact;
const getContactid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const response = yield database_1.pool.query('SELECT * FROM contacto WHERE id = $1', [id]);
    return res.json(response.rows);
});
exports.getContactid = getContactid;
const createContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, direccion } = req.body;
    const response = yield database_1.pool.query('INSERT INTO contacto (nombre, direccion) VALUES ($1, $2)', [nombre, direccion]);
    return res.json({
        mensaje: 'creado correctamente',
        body: {
            contacto: {
                nombre, direccion
            }
        }
    });
});
exports.createContact = createContact;
const updateContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { nombre, direccion } = req.body;
    yield database_1.pool.query('UPDATE contacto  SET nombre = $1, direccion = $2 WHERE id= $3', [nombre, direccion, id]);
    return res.json('Contact ${id}  actualizado correctamente');
});
exports.updateContact = updateContact;
const deleteContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    yield database_1.pool.query('DELETE FROM contacto WHERE ID =$1', [id]);
    return res.json('Contact ${id} borrado correctamente');
});
exports.deleteContact = deleteContact;
