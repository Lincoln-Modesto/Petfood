import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import '../../styles/global.css';

import { setCustomer as actionSetCostumer } from '../../store/modules/shop/actions';
import Ilustration from '../../assets/illustration.png';
import Header from '../../components/Header';

export default function Cadastro() {

  const dispatch = useDispatch();
  const [customer, setCustomer] = useState({
    external_id: new Date().getTime().toString(),
		name: "",
		type: "individual",
		country: "br",
		email: "",
		document: "",
		document_type: "cpf",
		phones: {
			mobile_phone: {
				country_code: "55",
				area_code: "",
				number:	""
        }
      },
    birthday: ""
  });

  function goToCheckout(){
    dispatch(actionSetCostumer(customer))
  }

  return (

    <main className="container-fluid h-100 bg-primary py-5">
      <Header whiteVersion hideCart/>

      <div className="row">
        <div className="col-6 my-auto text-right" >
          <img src={Ilustration} alt="ilustração" className="img-fluid"/>
        </div>
        <div className="col-6">
          <div className="box col-8">
            <h2 className="text-center">Falta pouco pro seu pet ser feliz!</h2>
            <br/>
            <br/>
            <input type="text"
              className="form-control form-control-lg mb-3"
              placeholder="Nome completo" 
              onChange={(e) => {
                setCustomer({...customer, name: e.target.value})
              }}/>

            <input type="email"
              className="form-control form-control-lg mb-3"
              placeholder="Email"
              onChange={(e) => {
                setCustomer({...customer, email: e.target.value})
              }} />

            <input type="text"
              className="form-control form-control-lg mb-3"
              placeholder="Telefone" 
              onChange={(e) => {
                setCustomer({...customer, 	phones: {
                  mobile_phone: {
                    country_code: "55",
                    area_code: e.target.value.substring(0,2),
                    number:	e.target.value
                    }
                  }})
              }} />

            <input type="text"
              className="form-control form-control-lg mb-3"
              placeholder="CPF"
              onChange={(e) => {
                setCustomer({...customer, document: e.target.value})
              }} 
              />

            <input type="date"
              className="form-control form-control-lg mb-3"
              placeholder="Data de nascimento" 
              onChange={(e) => {
                setCustomer({...customer, birthday: e.target.value})
              }} />

            <Link to="/checkout" onClick={ () => goToCheckout()} 
                    className="btn btn-lg btn-block btn-secondary">
                      Finalizar Cadastro</Link>
          </div>

        </div>
    </div>
    </main>
  )
}
