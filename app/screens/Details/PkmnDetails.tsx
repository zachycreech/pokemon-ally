import React, { useEffect } from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NavigationType } from "../../App";
import { Spinner, Error } from "../../components";
import { ScrollView, StyleSheet, View } from "react-native";
import { DescriptionTable, PkmnTypings, SpriteImages } from "./components";
import { capitilize, playSound } from "../../utils";
import usePkmnData from "../../hooks/usePkmnData";
import usePkmnDescriptions from "../../hooks/usePkmnDescriptions";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { Pokemon } from "../../types/types";
import { addPokemon, removePokemon } from "../../state/reducers";

const styles = StyleSheet.create({
  row: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    rowGap: 10,
  },
  playButton: {
    width: "30%",
    alignSelf: "center",
  },
});

const PkmnDetails = ({
  route,
}: {
  route: RouteProp<NavigationType, "Details">;
}) => {
  const { id } = route.params;
  const { details, descIsPending, descError } = usePkmnDescriptions(id);
  const { pkmnData, isPending, error } = usePkmnData(id);

  const dispatch = useDispatch();
  const team = useSelector((state: RootState) => state.pokemon.members);
  const teamSize = team.filter((member) => member !== null).length;
  const isInTeam = team.some((member) => member?.pokemonId === id);
  const pokemon: Pokemon = {
    pokemonId: id,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    name: capitilize(pkmnData?.name ?? ""),
  };

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: capitilize(pkmnData?.name ?? "Details"),
    });
  }, [navigation, pkmnData?.name]);

  if (isPending && descIsPending) return <Spinner />;
  if (error && descError) return <Error />;

  const descriptions = details?.flavor_text_entries ?? [];
  const { sprites, types } = pkmnData ?? {};

  const handleAddPokemon = () => {
    if (!isInTeam && teamSize < 6) {
      dispatch(addPokemon(pokemon));
    }
  };

  const handleRemovePokemon = () => {
    if (isInTeam) {
      dispatch(removePokemon(id));
    }
  };

  const handlePlaySound = () => {
    playSound(id);
  };

  const removeDisabled = !isInTeam;
  const teamFull = teamSize === 6;
  const addDisabled = teamFull || isInTeam;

  return (
    <ScrollView>
      <SpriteImages sprites={sprites} />
      <PkmnTypings types={types} />
      <View style={styles.row}>
        <Button
          onPress={handleRemovePokemon}
          mode="contained"
          buttonColor="red"
          disabled={removeDisabled}
          textColor="white"
        >
          Remove from Party
        </Button>
        <Button
          onPress={handleAddPokemon}
          mode="contained"
          buttonColor="green"
          disabled={addDisabled}
          textColor="white"
        >
          Add to Party
        </Button>
      </View>

      <Button
        onPress={handlePlaySound}
        mode="contained"
        textColor="white"
        icon="play"
        compact
        style={styles.playButton}
      >
        Play Sound
      </Button>
      <DescriptionTable descriptions={descriptions} />
    </ScrollView>
  );
};

export default PkmnDetails;
