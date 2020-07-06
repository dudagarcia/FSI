import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';


import styles from './styles';
import logoImg from '../../assets/logo.jpeg';

export default function Detail(){
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident; //incident é nome do parâmetro que a rota recebeu
    
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso ${incident.title} com o valor de ${Intl.NumberFormat('pT-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)} `;

    
    function navigateBack(){
        navigation.goBack();
    }
    
    function sendMail(){
        MailComposer.composeAsync({
            subject: `Caso ajudado: ${incident.title}`, //aspas possibilitam inserir variável no texto
            recipients: [incident.email],
            body: message,
        })
    }

    function sendWhatsApp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return (
        <View styles={styles.container}> 
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}> 
                    <Feather name="arrow-left" size={28} color="#004aad"/>
                </TouchableOpacity>                
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, { marginTop: 0 }]}> ONG: </Text>
                <Text style={styles.incidentValue}> {incident.name} de {incident.city}/{incident.uf} </Text>

                <Text style={styles.incidentProperty}> Caso: </Text>
                <Text style={styles.incidentValue}> {incident.title} </Text>

                <Text style={styles.incidentProperty}> Detalhes do Caso: </Text>
                <Text style={styles.incidentValue}> {incident.description} </Text>

                <Text style={styles.incidentProperty}> Valor: </Text>
                <Text style={styles.incidentValue}> 
                    {Intl.NumberFormat('pT-BR', { 
                            style: 'currency', 
                            currency: 'BRL'
                            }).format(incident.value)}  
                </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.helpTitle}> Salve o dia!</Text>
                <Text style={styles.helpTitle}> Eles precisam de você!</Text>
                <Text style={styles.helpDescription}> Entre em contato: </Text>
                
                <View style={styles.actions}> 
                    <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                        <Text style={styles.actionText}> WhatsAp </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}> E-mail </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}