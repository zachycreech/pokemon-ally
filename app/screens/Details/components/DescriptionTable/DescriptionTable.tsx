import { DataTable } from "react-native-paper";
import { Text, StyleSheet } from "react-native";
import { capitilize, stripHtml } from "../../../../utils";
import { FlavorTextEntry } from "../../../../types/types";

const styles = StyleSheet.create({
  grayRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "light-gray",
  },
  whiteRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  cell: {
    flex: 1,
    alignItems: "flex-start",
    paddingVertical: 10,
    minHeight: 50,
  },
  titleCell: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    flexWrap: "wrap",
    fontSize: 14,
    flex: 1,
  },
  tableHeader: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
});
const DescriptionTable = ({
  descriptions,
}: {
  descriptions: FlavorTextEntry[];
}) => {
  const renderDataTable = () => {
    const filteredDescriptions = descriptions.filter(
      (item) => item.language.name === "en",
    );

    return filteredDescriptions?.map((item, index) => {
      const strippedText = stripHtml(item.flavor_text);

      return (
        <DataTable.Row
          key={item.version.name}
          style={index % 2 === 0 ? styles.whiteRow : styles.grayRow}
        >
          <DataTable.Cell style={styles.titleCell}>
            <Text style={styles.text}>{capitilize(item.version.name)}</Text>
          </DataTable.Cell>
          <DataTable.Cell style={styles.cell}>
            <Text style={styles.text}>{strippedText}</Text>
          </DataTable.Cell>
        </DataTable.Row>
      );
    });
  };

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title textStyle={styles.tableHeader}>
          Generation
        </DataTable.Title>
        <DataTable.Title textStyle={styles.tableHeader}>
          Description
        </DataTable.Title>
      </DataTable.Header>
      {renderDataTable()}
    </DataTable>
  );
};

export default DescriptionTable;
