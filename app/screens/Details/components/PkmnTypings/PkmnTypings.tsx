import { View, Text, StyleSheet } from "react-native";
import { PkmnTypes } from "../../../../types/types";
import { capitilize } from "../../../../utils";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

const PkmnTypings = ({ types }: { types: PkmnTypes[] | undefined }) => {
  if (!types) return null;
  const renderTypes = () => {
    return types.map((type, index) => (
      <View style={styles.row} key={`${type.type.name}-${index}`}>
        <Text>{capitilize(type.type.name)}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Type </Text>
      {renderTypes()}
    </View>
  );
};

export default PkmnTypings;
