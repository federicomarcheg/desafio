const mongoose = require('mongoose');
const  { Schema }  = new Schema({
    products: [
        productId = { type:
            Schema.Types.ObjectId, ref: 'product' },
            quantity = {type: Number, required: true}
        
    ]
});
  
module.exports = mongoose.model('cart', cartSchema);


const mongoose = require('mongoose');
const { Schema } = mongoose;

const messajeSchema = new Schema({
    user: { type: String, required: true },
    menssage: { type: String, required: true }
});

module.exports = mongoose.model('menssage', messageSchema);



const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema ({
    name: {type: String, required: true },
    description: {type: String, required: true },
    price: {type: Number, required: true },
    stock: {type: Number, required: true }
});

module.exports = mongoose.model('product', productSchema);


const cart = require('../models/cartSchema');

class CartManager {
    async addProduct(cartId, productId, quantity) {
        const cart = await
        cart.findById(cartId);
        const productIndex = cart.products.findIndex(p => p.productId.equals(productId));

        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }
        return cart.save();
    }
}


module.exports = new CartManager();



const message = require('../models/messageSchema');

class MessageManager {
    async addMessage(user, message) {
        const newMessage = new message ({ user, message});
        return newMessage.save();
    }


    async getAllMessages(){
        return message.find({});
    }

    async getMessagesByuser(user) {
        return MessageManager.find({ user });
    }


    async updateMessage(id) {
        return MessageManager.findByIdAndDelete(id);
    }


    async updateMessage(id, newMessage) {
        return MessageManager.findByIdAndUpdate(id, 
            {message: newMessage}, {new: true});
    }

    // async deleteMessagesByuser(user) {
      //  return message.deleteMany({ user });
    // }
}


module.exports = new MessageManager();


const express = require('express');
const router = express.Router();
const messageManager = require('../dao/mongoDB/MessageManager');


router.post('/api/message', async (req, rea) => {
    const { user, message} = req.body;
    try {
        const newMessage = await 
        messageManager.addMessage(user, message);
        resizeBy.status(201).send(newMessage);
    } catch (error) {
        resizeBy.status(500).send({ error: 'error adding message' });
    }
    });


    router.get('/api/messages', async (req, res) => {
        try {
            const messages = await
            messageManager.getAllMessages();
            res.status(200).send(messages);
        } catch (error) {
            res.status(500).send({error: 'error fetching messages'});
        }
    });


    router.get('/api/messages/user/:user', async (req, res) => {
        const user = req.params.user;
        try {
            const messages = await
            messageManager.getMesssagesByUser(user);
            res.status(200).send(messages);
        } catch (error) {
            res.status(500).send({error: 'error fetching messages for user'})
        }
    });


    router.delete('/api/messages/:id', async (req, res) => {
        const id = req.params.id;
        try {
            await 
            messageManager.deleteMessage(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).send({error: 'error deleting message'});
        }
    });


    router.put('/api/messages/:id', async (req, res) => {
        const id = req.params.id;
        try {
            const updatadMessage = await
            messageManager.updateMessage(id, message);
            res.status(200).send(updatedMessage);
        } catch (error) {
            res.status(500).send({error: 'error updating message'});
        }
    });

    module.exports = router;



    const express = require('express');
    const mongoose = require('mongoose');
    const messageRoutes = require('./routes/messages');
    const app = express();
    const port = process.env.PORT || 3000;

    app.use(express.json());
    app.use(express.urlencoded({ extended: true}));


    mongoose.connect('your_mongo_db_connection_string', {useNewUrlParser: true,
        useUnifiedTopology: true});

        app.use(messageRoutes);

        app.listen(port, () => {
            console.log(`server running on port ${port}`);
        });






  const cartManager = require('../dao/mongoDB/CartManager');      





  const messageManager = require('../dao/mongodb/MessageNanager');



  const productManager = require('../dao/mongoDB/ProductManager');