import React from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { NavigationType } from "../../../../App";
import { StackNavigationProp } from "@react-navigation/stack";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flexGrow: 1,
  },
  item: {
    margin: 15,
  },
});

const ImageList = () => {
  const navigation = useNavigation<StackNavigationProp<NavigationType>>();
  const data = Array.from({ length: 151 }, (_, i) => i + 1);

  const renderItem = ({ item }: { item: number }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("Details", { id: item })}
    >
      <Image
        height={100}
        width={100}
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item}.png`,
        }}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default ImageList;
