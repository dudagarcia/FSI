import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';


import logoImg from '../../assets/logo.jpeg';
import styles from './styles';

import api from '../../services/api';

export default function Incidents(){
    const [incidents, setIncidents] =  useState([]);
    const [total, setTotal] = useState(0);
    
    //scroll infinito
    const [page, setPage] = useState(1); //inicia na página 1
    const [loading, setLoading] = useState(false); //loading inicia como false  
    
    const navigation = useNavigation();
    
    function navigateToDetail(incident){
        navigation.navigate('Detail', { incident });
    }
    
    async function loadIncidents(){
        if(loading){ //se loading true, impedir que nova requisição seja feita (enquanto outra acontece)
            return;
        }

        if(total>0 && incidents.length === total){  //já carregou pelo menos a primeira página e numero de incidents = numero de carregados
            return;
        }

        setLoading(true); 
        
        const response = await api.get('incidents', { params: {page}});

        setIncidents([...incidents, ...response.data]); //anexar 2 vetores: incidents e data anterior
        setTotal(response.headers['x-total-count']); //nome do nosso header - conferir no insomnia
        setPage(page+1);
        setLoading(false);
    }
    
    useEffect(() => {
        loadIncidents();
    }, []);
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>

                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>
            </View>

            <Text style={styles.title}> 
                Bem vindo! 
            </Text>
            <Text style={styles.description}> 
                Escolha um dos casos abaixo e salve o dia. Eles precisam de você!
            </Text>
            
            <FlatList
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                //showsVerticalScrollIndicator={false}
                onEndReached = {loadIncidents}
                renderItem={({ item:incident}) => (
                    <View style={styles.incident}> 
                    <Text style={styles.incidentProperty}> ONG: </Text>
                    <Text style={styles.incidentValue}> {incident.name} </Text>

                    <Text style={styles.incidentProperty}> Caso: </Text>
                    <Text style={styles.incidentValue}> {incident.title} </Text>

                    <Text style={styles.incidentProperty}> Valor: </Text>
                    <Text style={styles.incidentValue}> 
                        {Intl.NumberFormat('pT-BR', { 
                            style: 'currency', 
                            currency: 'BRL'
                            }).format(incident.value)}  
                    </Text>

                    <TouchableOpacity 
                        style={styles.detailsButton}
                        onPress={ () => navigateToDetail(incident) } //para não passar somente função, mas parâmetro tb
                    >
                        <Text style={styles.detailsButtonText}> Ver mais detalhes </Text>
                        <Feather name="arrow-right" size={19} color="#004aad"></Feather>
                    </TouchableOpacity>
                </View>

                )}
            />
        
        </View>
    );
}