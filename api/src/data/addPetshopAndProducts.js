const Product = require('../models/products');
const Petshop = require('../models/petshops');
const petshops = require('./petshop.json');
const creteReicipients = require('../services/pagarme').createRecipient

require('../database');

const addPetshopAndProducts = async () => {
    try{
        for(let petshop of petshops){
            const recipient = await creteReicipients(petshop.nome)

            if (!recipient.error){

                const newPetshop = await new Petshop(
                    {...petshop, recipient_id: recipient.data.id}
                    ).save();

                await Product.insertMany(
                    petshop.produtos.map((p) => ({...p, petshop_id: newPetshop._id })))
            }else{
                console.log(recipient.message)
            }
        }
        console.log('add db sucess!')
    }catch(err){
        console.log(err.message)
    }
}

addPetshopAndProducts();