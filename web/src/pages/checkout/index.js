import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import _ from 'underscore'
import dayjs from 'dayjs'

import '../../styles/global.css';
import './styles.css';

import Header from "../../components/Header";
import ProductItemList from '../../components/Product/List';
import { setTransaction, makePurchase as purchase } from '../../store/modules/shop/actions'

export default function Checkout() {

    const dispatch = useDispatch();

    const { cart, orderFee, defaultRecipient } = useSelector((state) => state.shop);
    const total = cart.reduce((total, product) => {
        return total + product.preco;
    }, 0)

    const [order, setOrder] = useState({
        items: [
            {
                amount: 0,
                description: "",
                quantity: 1,
                code: ""
            }
        ],
        payments: [
            {
                payment_method: "credit_card",
                credit_card: {
                    installments: 1,
                    statement_descriptor: "teste",
                    card: {
                        number: "",
                        holder_name: "",
                        exp_month: '',
                        exp_year: '',
                        cvv: "",
                        billing_address: {
                            street: "",
                            zip_code: "",
                            neighborhood: "",
                            city: "",
                            state: "",
                            country: "BR"
                        }
                    }
                },
                split: []
            }
        ],
        shipping: {
            amount: 1000,
            description: "Petfood",
            recipient_name: "Petfood LTDA",
            type: "standard",
            address: {
                street: "",
                number: "",
                zip_code: "",
                neighborhood: "",
                city: "",
                state: "",
                country: "BR"
            },
            max_delivery_date: dayjs().add(10, 'days').format('YYYY-MM-DD'),
            estimated_delivery_date: dayjs().add(7, 'days').format('YYYY-MM-DD'),
        }
    })
    
    function setShippingValue(key, value){
        setOrder(
         {   ...order,
            shipping: {
                ...order.shipping,
                address:{
                    ...order.shipping.address,
                    [key]: value,
                }
            },
            payments: [
                { 
                  ...order.payments[0],
                  credit_card: {
                      ...order.payments[0].credit_card,
                      card:{
                          ...order.payments[0].credit_card.card,
                          billing_address:{
                            ...order.payments[0].credit_card.card.billing_address,
                            [key]: value,
                          }
                            
                      }
                  },
              }
            ]
        }
        )
    }

   function setCardValue(key, value){
        setOrder(
            {   ...order,
                payments: [
                  { 
                    ...order.payments[0],
                    credit_card: {
                        ...order.payments[0].credit_card,
                        card:{
                            ...order.payments[0].credit_card.card,
                              [key]: value,
                        }
                    },
                }
                ]
               
            }
        )
    }

    function makePurchase(){
       dispatch(setTransaction(order));
       setTimeout( () => {
        dispatch(purchase());
       }, 1000)
    }

    function getSplitRules(){
        const productByPetshop = _.groupBy(cart, (product) => product.petshop_id.recipient_id);

        let result =[];

        Object.keys(productByPetshop).map( (petshop) => {
            const products = productByPetshop[petshop];
            const totalValuePerPetshop = products.reduce((total, product) =>{
                return total + product.preco
            }, 0).toFixed(2);

            const totalFee = totalValuePerPetshop * orderFee;

            result.push({ 
                amount: Math.floor( ((totalValuePerPetshop - totalFee) / total) * 100),
                recipient_id: products[0].petshop_id.recipient_id,
                type: "percentage",
                options: {
                    charge_processing_fee: true,
                    liable: true
                }
            })
        })

        const totalPetshopPercentage = result.reduce((total, recipient) => {
            return total + parseFloat(recipient.amount)
        }, 0)

        result.push({
            ...defaultRecipient,
            amount: 100 - totalPetshopPercentage
        })

        return result

    }

    useEffect( () => {
        //update itens e update amount
        setOrder({
            ...order,
            items: cart.map( (product) => ({
                "amount": product.preco.toFixed(2).toString().replace('.', ''),
                "description": product.nome,
                "quantity": 1,
                "code": product._id
            })),
            payments: [
                {
                    ...order.payments[0],
                    split: getSplitRules(),
                }
            ]
        })
    }, [cart])

    return (
        <div className="h-100">
            <Header hideCart />
            <div className="container mt-2">
                <div className="row">
                    <div className="col-6">
                        <span className="section-title">Dados de entrega</span>
                        <div className="row mb-3">
                            <div className="col-12">
                                <input
                                    type="text"
                                    placeholder="CEP"
                                    className="form-control form-control-lg"
                                    onChange={ (e) => {setShippingValue('zip_code', e.target.value )}}/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-6">
                                <input
                                    type="text"
                                    placeholder="Cidade"
                                    className="form-control form-control-lg"
                                    onChange={ (e) => {setShippingValue('city', e.target.value )}}/>
                            </div>
                            <div className="col-6 pl-0">
                                <input
                                    type="text"
                                    placeholder="Logradouro"
                                    className="form-control form-control-lg"
                                    onChange={ (e) => {setShippingValue('street', e.target.value )}}/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-5">
                                <input
                                    type="text"
                                    placeholder="Número"
                                    className="form-control form-control-lg" 
                                    onChange={ (e) => {setShippingValue('number', e.target.value )}}/>
                            </div>
                            <div className="col-5 pl-0">
                                <input
                                    type="text"
                                    placeholder="Bairro"
                                    className="form-control form-control-lg"
                                    onChange={ (e) => {setShippingValue('neighborhood', e.target.value )}}/>
                            </div>
                            <div className="col-2 pl-0">
                                <input
                                    type="text"
                                    placeholder="UF"
                                    className="form-control form-control-lg"
                                    onChange={ (e) => {setShippingValue('state', e.target.value )}}/>
                            </div>
                        </div>

                        <span className="section-title">Dados de Pagamento</span>
                        <div className="row mb-3">
                            <div className="col-12">
                                <input
                                    type="text"
                                    placeholder="Nome no cartão"
                                    className="form-control form-control-lg" 
                                    onChange={ (e) => {setCardValue('holder_name', e.target.value)}}/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-12">
                                <input
                                    type="text"
                                    placeholder="Número do cartão"
                                    className="form-control form-control-lg" 
                                    onChange={ (e) => {setCardValue('number', e.target.value)}}/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-5 ">
                                <input
                                    type="text"
                                    placeholder="Validade mês"
                                    className="form-control form-control-lg"
                                    onChange={ (e) => {setCardValue('exp_month', e.target.value)}}/>
                                    
                            </div>
                            <div className="col-5 pl-0">
                                <input
                                    type="text"
                                    placeholder="Validade Ano"
                                    className="form-control form-control-lg"
                                    onChange={ (e) => {setCardValue('exp_year', e.target.value)}}/>
                                    
                            </div>
                            <div className="col-2 pl-0">
                                <input
                                    type="text"
                                    placeholder="CVV"
                                    className="form-control form-control-lg"
                                    onChange={ (e) => {setCardValue('cvv', e.target.value)}}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 d-flex justify-content-between align-items-center">
                                <b>Total</b>
                                <h3>R$ {total.toFixed(2)}</h3>
                            </div>
                            <div className="col-12">
                                <button onClick={() => makePurchase()} className="btn btn-lg btn-primary btn-block mb-4">
                                    Finalizar Compra
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="box mt-4 col box-sidebar">
                            <h5>Minha Sacola {cart.length}</h5>

                            <div className="row products">
                                {cart.map((p) => <ProductItemList product={p} key={p._id}/>)}
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}