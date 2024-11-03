import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ActivityIndicator, ScrollView } from 'react-native';
import { Client, Message } from 'paho-mqtt';
import DateTimePicker from '@react-native-community/datetimepicker';
import Imagens from './src/imgs/imagens';
import DataTableCss from './src/css/DataTable';
import HomeCss from './src/css/HomeCs';

const MQTT_BROKER_URL = "wss://9706b5e8a068456a8a8cf6cda93d5c94.s1.eu.hivemq.cloud:8884/mqtt"; 
const CLIENT_ID = `clientId-${Math.floor(Math.random() * 1000)}`;
const MQTT_TOPIC = "petfeeder/command";

export default function App() {
  const client = useRef<Client | null>(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  interface Command {
    time: string;
    status: string;
    type: string;
  }

  const [comandoHistorico, setComandoHistorico] = useState<Command[]>([]); 

  useEffect(() => {
    setLoading(true);
    client.current = new Client(MQTT_BROKER_URL, CLIENT_ID);

    client.current.connect({
      onSuccess: onConnect,
      userName: "MathLPBlue",
      password: "162010",
      useSSL: true,
      onFailure: (err) => {
        console.error("Erro na conexão MQTT:", err);
        setLoading(false);
      },
    });

    client.current.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log("Conexão perdida:", responseObject.errorMessage);
        setConnected(false);
      }
    };

    return () => {
      if (client.current?.isConnected()) {
        client.current.disconnect();
      }
    };
  }, []);

  const onConnect = () => {
    console.log("Conectado ao HiveMQ!");
    setConnected(true);
    setLoading(false);
  };

  const enviaMensagem = (msg: string, type: string) => {
    if (client.current?.isConnected()) {
      const message = new Message(msg);
      message.destinationName = MQTT_TOPIC;
      client.current.send(message);
      console.log("Mensagem enviada:", msg);
      atualizaHistorico(msg, type, "Sucesso");
    } else {
      console.log("Não conectado ao broker MQTT.");
      atualizaHistorico(msg, type, "Falha");
    }
  };

  const atualizaHistorico = (msg: string, type: string, status: string) => {
    const dataAtual = new Date();
    const horaFormatada = `${String(dataAtual.getHours()).padStart(2, '0')}:${String(dataAtual.getMinutes()).padStart(2, '0')}`;
    setComandoHistorico(historicoPrevio => {
      const novoHistorico = [...historicoPrevio, { time: horaFormatada, status, type }];
      console.log("Histórico atualizado:", novoHistorico); 
      return novoHistorico; 
    });
  };

  const feedPet = () => {
    enviaMensagem("feed", "Agora");
  };

  const onChange = (event: any, selectedDate?: Date) => {
    if (event.type === "set") {
      const dataAtual = selectedDate ?? date;
      setDate(dataAtual);
      const horaFormatada = String(dataAtual.getHours()).padStart(2, '0');
      const minutoFormatado = String(dataAtual.getMinutes()).padStart(2, '0');
      const horaMensagem = `schedule:${horaFormatada}:${minutoFormatado}`;
      enviaMensagem(horaMensagem, "Agendado");
      setShowPicker(false);
  } else {
      setShowPicker(false); 
  }
  };

  return (
    <ImageBackground source={Imagens.backgroundImage} imageStyle={{ opacity: 0.15 }} style={HomeCss.container}>
      <View style={HomeCss.innerContainer}>
        <Text style={HomeCss.title}>Bem Vindo!</Text>
        <Text style={HomeCss.subtitle}>Alimente seu Pet!</Text>

        <TouchableOpacity
          style={[HomeCss.Btn, { backgroundColor: connected ? '#33afff' : '#ccc' }]}
          onPress={feedPet}
          disabled={!connected}
        >
          <Text style={HomeCss.BtnTexto}>Alimentar pet</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[HomeCss.Btn, { backgroundColor: connected ? '#33afff' : '#ccc' }]}
          onPress={() => setShowPicker(true)}
          disabled={!connected}
        >
          <Text style={HomeCss.BtnTexto}>Selecione um horário</Text>
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#33afff" style={HomeCss.loadingIndicator} />}
        {!loading && connected ? (
          <Text style={HomeCss.successText}>Conectado ao broker MQTT</Text>
        ) : (
          !loading && <Text style={HomeCss.errorText}>Não conectado ao broker MQTT</Text>
        )}

        {comandoHistorico.length > 0 && (
          <View style={DataTableCss.Tabela}>
            <ScrollView style={DataTableCss.TabelaConteudo} nestedScrollEnabled>
              <View style={DataTableCss.TabelaHeader}>
                <Text>Horário</Text>
                <Text>Status</Text>
                <Text>Tipo</Text>
              </View>
              {comandoHistorico.map((command, index) => (
                <View key={index} style={DataTableCss.TabelaItem}>
                  <Text>{command.time}</Text>
                  <Text>{command.status}</Text>
                  <Text>{command.type}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}
