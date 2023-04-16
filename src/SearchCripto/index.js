import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";

const API_KEY = "YOUR_API_KEY"; // adicione aqui sua chave da API

const App = () => {
  const [crypto, setCrypto] = useState('');
  const [data, setData] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  const handleSearch = async () => {
    const cryptoData = {
      crypto,
    }
    if (!crypto) {
      alert('Por favor, digite o nome da criptomoeda.');
      return;
    }
  
    try {
      const response = await axios.get(
        `https://min-api.cryptocompare.com/data/price?fsym=${crypto}&tsyms=BRL&api_key=${API_KEY}`
      );
      const price = response.data.BRL;
      if (!price) {
        alert(`A criptomoeda ${crypto.toUpperCase()} não foi encontrada. Digite a sigla da Criptomoeda`);
        return;
      }
      const cryptoObject = {
        name: crypto.toUpperCase(),
        price: price
      };
      setData(price);
      setSearchHistory(searchHistory.concat(cryptoObject));
    } catch (error) {
      console.log(error);
    }
    console.log(cryptoData)
    setCrypto('')

  };

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Crypto</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Digite a sigla da criptomoeda"
          onChangeText={(text) => setCrypto(text.toUpperCase())}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>
      {data && (
        <ScrollView contentContainerStyle={styles.dataContainer}>
          <Text style={styles.dataText}>
            1 {crypto.toUpperCase()} = {data.BRL} BRL
          </Text>
        </ScrollView>
      )}
      <ScrollView>
        {searchHistory.length > 0 && (
          <View style={styles.historyContainer}>
            <Text style={styles.historyTitle}>Histórico de pesquisa:</Text>
            {searchHistory.map((item, index) => (
              <Text style={styles.historyItem} key={index}>
                {item.name} ({item.price} BRL)
              </Text>
            ))}
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearHistory}
            >
              <Text style={styles.clearButtonText}>Limpar histórico</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>

  );
};


const styles = StyleSheet.create({
  container: {
    paddingTop: 160,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchContainer: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: "#0077b6",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  dataContainer: {
    justifyContent: "center",
  },
  dataText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  historyContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    width: "100%",
 
  },
  historyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  historyItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  clearButton: {
    backgroundColor: "#d62828",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  clearButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default App;