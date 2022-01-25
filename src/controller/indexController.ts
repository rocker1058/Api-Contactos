import {request, Request, response, Response} from "express"
import { QueryResult } from "pg";

import {pool} from '../database'

export const getContact = async (req: Request, res:Response): Promise<Response> => {
    
    try {
       const response: QueryResult = await pool.query('SELECT * FROM contacto');
       return res.status(200).json(response.rows);
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json('Error en el servidor sql')
    }
}

export const getContactid = async (req:Request, res:Response): Promise <Response> => {
    const id= parseInt(req.params.id)
    const response= await pool.query('SELECT * FROM contacto WHERE id = $1', [id]);
    return res.json(response.rows);
}

export const createContact = async (req:Request, res:Response): Promise <Response> => {
    const {nombre, direccion} = req.body;
    const response:QueryResult= await pool.query('INSERT INTO contacto (nombre, direccion) VALUES ($1, $2)', [nombre,direccion]);
    return res.json({
        mensaje: 'creado correctamente',
        body:{
            contacto:{
                nombre, direccion
            }
        }
    })
}

export  const updateContact = async(req:Request, res: Response):Promise<Response> =>{
    const id = parseInt(req.params.id);
    const {nombre, direccion} = req.body;
    await pool.query('UPDATE contacto  SET nombre = $1, direccion = $2 WHERE id= $3', [nombre, direccion, id])
    return res.json('Contact ${id}  actualizado correctamente')
}

export  const deleteContact = async(req:Request, res: Response):Promise<Response> =>{
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM contacto WHERE ID =$1', [id]);
    return res.json('Contact ${id} borrado correctamente')
}
