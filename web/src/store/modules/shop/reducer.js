import produce from 'immer'
import types from './types'

import { key_default_recipient } from '../../../keys'

const INITIAL_STATE = {
    customer: {},
    petshops: [],
    petshop: {},
    petshopMapSelected: null,
    mapCenter: {
      lat: -23.561684,
      lng: -46.625378,
    },
    cart: [],
    orderFee: 0.1,
    defaultRecipient: {
      amount: 10,
      recipient_id: `${key_default_recipient.key}`,
      type: "percentage",
      options: {
          charge_processing_fee: true,
          charge_remainder_fee: true,
          liable: true
      }
    },
    transaction: {
      items: [],
      billing: {
        name: 'Petfood LTDA',
        address: {
          country: 'br',
          state: 'sp',
          city: 'Cotia',
          neighborhood: 'Rio Cotia',
          street: 'Rua Matrix',
          street_number: '9999',
          zipcode: '06714360',
        },
      },
      payments: [],
      shipping: {},
   }
}

function shop(state = INITIAL_STATE, action) {
    switch (action.type) {
      case types.SET_CUSTOMER: {
        return produce(state, (draft) => {
          draft.customer = action.customer;
        });
      }

      case types.SET_PETSHOP: {
        return produce(state, (draft) => {
          draft.petshop = action.petshop;
        });
      }
  
      case types.SET_PETSHOPS: {
        return produce(state, (draft) => {
          draft.petshops = action.petshops;
        });
      }
        
      case types.SET_PETSHOP_MAP_SELECTED: {
        return produce(state, (draft) => {
          draft.petshopMapSelected = action.petshop;
        });
      }

      case types.SET_MAP_CENTER: {
        return produce(state, (draft) => {
          draft.mapCenter = action.location;
        });
      }

      case types.TOGGLE_CART_PRODUCT: {
        return produce(state, (draft) => {
          const index = draft.cart.findIndex((p) => p._id === action.product._id);
          if(index !== -1){
            draft.cart.splice(index, 1);
          }else{
            draft.cart.push(action.product);
          }
        });
      }

      case types.SET_TRANSACTION: {
        return produce(state, (draft) => {
          draft.transaction = { ...draft.transaction, customer: draft.customer, ...action.transaction };
        });
      }

        default:
        return state;
    }
}

export default shop;