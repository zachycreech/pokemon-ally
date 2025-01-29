import { StyleSheet, View, Image } from "react-native";
import { SpritesType } from "../../../../types/types";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
  },
});
const SpriteImages = ({ sprites }: { sprites: SpritesType | undefined }) => {
  if (!sprites) return null;
  return (
    <View style={styles.container}>
      <Image height={200} width={200} source={{ uri: sprites.front_default }} />
      <Image height={200} width={200} source={{ uri: sprites.back_default }} />
    </View>
  );
};

export default SpriteImages;
