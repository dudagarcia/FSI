import React, { useState, useEffect } from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';

export default function Profile(){
    const [incidents, setIncidents] = useState([]); //recebe um array de casos

    const history = useHistory();
    
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId, 
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch(err){
            alert('Erro ao deletar caso, tente novamente');
        }
    }

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span> Bem vinda, {ongName} </span>
                <Link className="button" to="/incidents/new"> Cadastrar novo caso </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>

            <h1> Casos cadastrados </h1>
            <ul>
                {incidents.map(incident => ( 
                <li key={incident.id}> 
                    <strong> CASO </strong>
                    <p> {incident.title} </p>

                    <strong> Descrição </strong>
                    <p> {incident.description} </p>

                    <strong> Valor </strong>
                    <p> {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)} </p>

                    <button onClick={ () => handleDeleteIncident(incident.id)} type="button"> 
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
                )
                )}
            </ul>
        </div>
    );
}