import React from "react";
import { Text, Image, StyleSheet, Vibration } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { NavigationType } from "../../App";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Pokemon } from "../../types/types";
import { playSound } from "../../utils";
import { removePokemon } from "../../state/reducers";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 70,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  slot: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  emptySlot: {
    color: "gray",
  },
});

const PokemonParty = () => {
  const team = useSelector((state: RootState) => state.pokemon.members);
  const teamSize = team.filter((member) => member !== null).length;
  const navigation = useNavigation<StackNavigationProp<NavigationType>>();
  const dispatch = useDispatch();

  const handleNavigation = async (pokemon: Pokemon | null) => {
    if (!pokemon) return;
    Vibration.vibrate();
    await playSound(pokemon.pokemonId);

    navigation.navigate("Details", { id: pokemon.pokemonId });
  };

  const handleRemove = (pokemon: Pokemon | null) => {
    if (!pokemon) return;
    dispatch(removePokemon(pokemon.pokemonId));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Pokemon Team ({teamSize}/6)</Text>
      {team.map((pokemon, index) => (
        <TouchableOpacity
          onPress={() => handleNavigation(pokemon)}
          onLongPress={() => handleRemove(pokemon)}
          key={index}
          style={styles.slot}
        >
          {pokemon ? (
            <>
              <Image source={{ uri: pokemon.image }} style={styles.image} />
              <Text>{pokemon.name}</Text>
            </>
          ) : (
            <Text style={styles.emptySlot}>Empty Slot</Text>
          )}
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

export default PokemonParty;
