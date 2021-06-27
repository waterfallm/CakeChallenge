import express from 'express';

import cake from '../handlers/cake';


const router = express.Router();


// Cake
router.get('/cakes', cake.getcakes);
router.get('/cakes/:id', cake.getcake);
router.put('/cakes', cake.addcake);
router.delete('/cakes/:id', cake.deletecake);


export default router;
