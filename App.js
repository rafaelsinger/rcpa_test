import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import Card from './Card';
import data from './data.json';

export default function App() {

  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCards, setFilteredCards] = useState("");
  const [searchFocused, setSearchFocused] = useState("black");

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

  const onSearchFocus = () => {
    setSearchFocused('#DECA9D');
  }

  const onSearchBlur = () => {
    setSearchFocused('black');
  }

  return (
    <View style={styles.container}>
      <ScrollView directionalLockEnabled={true} keyboardDismissMode='on-drag'>
        <View style={styles.header}>
          <Text style={styles.headerText}>Research Program on Children and Adversity</Text>
        </View>
        <View style={styles.search}>
          <Text style={styles.searchTitle}>Research Projects</Text>
          <TextInput style={[styles.searchBox, {borderColor: searchFocused}]} placeholder='Search Titles' 
            onBlur={onSearchBlur}
            onFocus={onSearchFocus}
            onChangeText={(searchText) => {setSearch(searchText)}} />
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
    height: "100%"
  },
  search: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    margin: 16
  },
  searchTitle: {
    fontSize: 24,
    marginBottom: 10,
  },
  searchBox: {
    borderWidth: 1.5,
    width: "100%",
    padding: 10,
  },
  header: {
    flex: 1,
    padding: 30,
    marginBottom: 4,
    width: "100%",
    backgroundColor: "#023956",
    color: "white",
  },
  headerText: {
    color: "white",
    fontSize: 32,
    textAlign: "center"
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});
