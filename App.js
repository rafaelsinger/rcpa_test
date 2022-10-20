import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import Card from './Card';
import data from './data.json';

export default function App() {

  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCards, setFilteredCards] = useState("");

  useEffect(() => {
    getCards();
  }, [])

  useEffect(() => {
    if (search.length !== 0){
      const searchedCards = cards?.filter(card => card.title.toLowerCase().includes(search.toLowerCase()));
      setFilteredCards(searchedCards);
    } else {
      setFilteredCards("");
    }
  }, [search])

  const getCards = async () => {
    if (cards.length === 0){
      await data.map((card) => {
        setCards(prevCards => [...prevCards, card]);
      })
    }
  }

  const displayCards = () => {
    if (filteredCards !== ""){
      return filteredCards;
    } else {
      return cards;
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Research Program on Children and Adversity</Text>
        </View>
        <View style={styles.search}>
          <Text style={styles.searchTitle}>Research Projects</Text>
          <TextInput style={styles.searchBox} placeholder='Search Titles' onChangeText={(searchText) => {setSearch(searchText)}}></TextInput>
        </View>
        <View style={styles.cardContainer}>
          {cards && displayCards().map((card, key) => (
            <Card title={card.title} description={card.summary} key={key}></Card>
          ))}
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    margin: 16
  },
  searchTitle: {
    fontSize: 24,
    marginBottom: 8,
  },
  searchBox: {
    borderWidth: 1,
    width: "100%",
    padding: 10,
  },
  header: {
    flex: 1,
    padding: 30,
    marginBottom: 16,
    width: "100%",
    backgroundColor: "darkblue",
    color: "white",
  },
  headerText: {
    color: "white",
    fontSize: 30,
    textAlign: "center"
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});
