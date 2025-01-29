import { StyleSheet, View } from "react-native";
import { ImageList } from "./components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.fullView}>
        <ImageList />
      </View>
    </View>
  );
};

export default Home;
