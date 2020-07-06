import React, { useState } from 'react';
import './styles.css';
import '../../global.css';
import logoImg from '../../assets/logo.png';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from  'react-router-dom';
import api from '../../services/api';

export default function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsApp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');
    
    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();
        const data = { 
            name,
            email, 
            whatsapp, 
            city, 
            uf, 
        };
        console.log(data);

        try{ 
            //enviar os dados (post) para a api que realiza o cadastro
            const response = await api.post('ongs', data);

            alert(`Seu ID de acesso: ${response.data.id}`); //sendo id o campo id da 'tabela'

            history.push('/'); //realiza navegação através  de uma função js (enviar rota)
        }
        catch(err)
        {
            alert('Erro no cadastro, tente novamente');
            console.log(err);
        } 
    }


    return(
        <div className="register-container">
            <div className="content">

                <section>
                    <img src={logoImg} alt="We Need You"/>
                    <h1> Cadastro </h1>
                    <p> Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/"> 
                        <FiArrowLeft size={16} color="#004aad"/>
                        Não tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value = {name}
                        onChange = { e => setName(e.target.value)}
                    />  
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value = {email}
                        onChange = { e => setEmail(e.target.value)}
                    />  
                    <input 
                        placeholder="WhatsApp"
                        value = {whatsapp}
                        onChange = { e => setWhatsApp(e.target.value)}
                    />  
                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value = {city}
                            onChange = { e => setCity(e.target.value)}
                        />
                        <input 
                            placeholder="UF" 
                            style={{ width: 80 }}
                            value = {uf}
                            onChange = { e => setUF(e.target.value)}
                        />
                    </div>
                    <button className="button"> Cadastrar </button>
                </form>
            </div>
        </div>
    
    );
}