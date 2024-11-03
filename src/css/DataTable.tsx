import { StyleSheet } from "react-native";

const DataTableCss = StyleSheet.create({
    Tabela: {
        marginTop: 20,
        width: '100%',
        backgroundColor: '#f0f0f0',
        borderRadius: 15,
        elevation: 5, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        overflow: 'hidden',
    },
    TabelaConteudo: {
        maxHeight: 180, 
        width: 250
    },
    TabelaHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#e0e0e0', 
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginBottom: 10, 
    },
    TabelaItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15, 
        paddingHorizontal: 10, 
        borderBottomWidth: 1,
        borderBottomColor: '#ccc', 
        backgroundColor: '#ffffff', 
        marginBottom: 5, 
    },
    TabelaTexto: {
        fontSize: 16, 
        color: '#333', 
    },
    TabelaTitulo: {
        fontWeight: 'bold', 
        fontSize: 18, 
    },
});

export default DataTableCss;
