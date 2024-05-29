import express from 'express';
import { addToCart,removeFromCart,getData } from '../controllers/cartController';


const cartRouter = express.Router();


cartRouter.post('/add',addToCart);

cartRouter.post('/remove',removeFromCart);

cartRouter.get('/getdata',getData);

export default cartRouter;