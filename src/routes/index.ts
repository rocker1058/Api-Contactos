import {Router} from 'express';
const router = Router();

import {getContact,getContactid, createContact, deleteContact, updateContact} from '../controller/indexController';

router.get('/users', getContact);
router.get('/users/:id', getContactid);
router.post('/users', createContact);
router.put('/users/:id', updateContact)
router.delete('/users/:id', deleteContact);

export default router;