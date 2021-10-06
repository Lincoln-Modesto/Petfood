const axios = require('axios');

const api_key = require('./keys.json').api_key;

const api = axios.create({
  baseURL: 'https://api.pagar.me/core/v5'
});

module.exports = async function createRecipient(name){
  try {
    const response = await api.post('/recipients',
      {
        name: `${name}`,
        email: "tstark@avengers.com",
        document: "26224451990",
        description: "Recebedor tony stark",
        type: "individual",
        status: "active",
        created_at: "2017-08-03T20:29:28Z",
        updated_at: "2017-08-03T20:29:28Z",
         transfer_settings: {
            transfer_enabled: false,
            transfer_interval: "Daily",
            transfer_day: 0
         },
        default_bank_account: {
            id: "ba_Ez2lE71FBUPa3XZK",
            holder_name: "Tony Stark",
            holder_type: "individual",
            holder_document: "26224451990",
            bank: "341",
            branch_number: "1234",
            branch_check_digit: "6",
            account_number: "12345",
            account_check_digit: "6",
            type: "checking",
            status: "active",
            created_at: "2017-08-03T20:29:28Z",
            updated_at: "2017-08-03T20:29:28Z",
            metadata: {
                key: "value"
            }
        },
        gateway_recipients: [
            {
                gateway: "pagarme",
                status: "active",
                pgid: "re_cj5aaa5i000cdhj6ernz14j1i",
                createdAt: "2017-08-03T20:29:28Z",
                updatedAt: "2017-08-03T20:29:28Z"
            }
        ],
          automatic_anticipation_settings: {
            enabled: true,
            type: "full",
            volume_percentage: 50,
            delay: 365
        },
        metadata: {
            key: "value"
        }
    }, {
      auth:{
        username: `${api_key}`,
        password: ''
      }
    } )
    return { error: false, data: response.data };

  } catch (err) {
    
    return { error: true, message: err.message };
  }
}

module.exports = async function creteSplitTransaction(data){
    try{
      const response = await api.post('/orders', {...data},  {auth: {
        username: `${api_key}`,
        password: ''
      }})
      return { error: false, data: response.data }

    }catch(err){
    return { error: true, message: err.message };

    }
  }




