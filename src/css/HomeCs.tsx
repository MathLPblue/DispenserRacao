import { StyleSheet } from "react-native";
const HomeCss = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    innerContainer: {
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#333',
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 20,
      fontWeight: '500',
      color: '#555',
    },
    Btn: {
      padding: 15,
      borderRadius: 15,
      alignItems: 'center',
      marginTop: 15,
      width: '60%',
    },
    BtnTexto: {
      fontWeight: '700',
      color: 'white',
      fontSize: 16,
    },
    errorText: {
      color: 'red',
      marginTop: 10,
      fontSize: 14,
    },
    successText: {
      color: 'green',
      marginTop: 10,
      fontSize: 14,
    },
    loadingIndicator: {
      marginTop: 10,
    },
  });

  export default HomeCss