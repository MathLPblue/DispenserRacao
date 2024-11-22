# Dispenser de ração

## Descrição

Este projeto de extensão foi desenvolvido para a disciplina Aplicações de Cloud, IoT e Indústria 4.0 em Python. O objetivo principal é criar um dispenser de ração automático para animais de estimação, controlado por um aplicativo desenvolvido em React Native (Expo). A comunicação entre o aplicativo e o microcontrolador ESP32 é realizada através do serviço de nuvem HiveMQ Cloud, utilizando o protocolo MQTT.

## Funcionalidades

- **Agendamento de Rfeição**: Permite que agende suas refeições em horários específicos.
- **Botão AlimentarPet**: Permite que o usuário libere refeição instantaneamente após apertar o botão.
- **Tabela com Horários agendados**: Permite que o usuário veja os horários das refeições agendadas.  

## Pré-requisitos 

- React Native 0.76+
- Expo 51.0 +
- TypeScript 5.3.3+
- MQTT
- HiveMQ
- Editor de Texto ou IDE de sua preferência (ex: NEoVim, Android Studio, Arduino IDE, etc)
- Terminal de sua preferência (ex: GitBash, PowerShell, Kitty, tty etc )
- Sistema Operacional: Linux, macOS ou Windows
- Node.js
- npm

## Iniciando o projeto
1. Clone o repositório:

Primeiro, clone o repositório:
```bash
git clone https://github.com/MathLPblue/DispenserRacao.git
```
Em seguida, entre na pasta criada:
```bash
cd DispenserRacao
```
E então, instale as dependências:
```bash
npm install
```
Por fim, inicie o projeto:
```bash
npx expo start
```  
# Códgio para o ESP32
Você pode encontrar o código para o ESP32 neste diretório:
```bash 
ESP32/sketch_oct31a/sketch_oct31a.ino
```  

