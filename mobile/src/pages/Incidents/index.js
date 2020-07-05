import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Incidents(){
    const navigation = useNavigation();

    function navigateToDetail(){
        navigation.navigate('Detail');
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>0 casos</Text>
                </Text>
                <Text style={styles.title}> Bem vindo! </Text>
                <Text style={styles.description}> 
                    Escolha um dos casos abaixo e salve o dia. Eles precisam de você!
                </Text>
            </View>

            <FlatList //para scroll na tela
                style={styles.incidentProperty}
                keyExtractor={incident => String(incident)}
                showsVerticalScrollIndicator={false}
                data={[1,2,3]}
                renderItem={() => (
                    <View style={styles.incidentProperty}> 
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>APAD</Text>

                    <Text style={styles.incidentProperty}>Caso:</Text>
                    <Text style={styles.incidentValue}>Cadelinha atropelada</Text>

                    <Text style={styles.incidentProperty}>Valor:</Text>
                    <Text style={styles.incidentValue}>120,00</Text>

                    <TouchableOpacity 
                        style={styles.detailsButton}
                        onPress={ navigateToDetail }
                    >
                    <Text syle={styles.detailsButtonText}> Ver mais detalhes </Text>
                    <Feather name="arrow-right" size={19} color="#e02041"></Feather>
                    </TouchableOpacity>
                </View>

                )}
            />
        </View>
    );
}