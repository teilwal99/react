import { Dimensions, StyleSheet } from "react-native";

const {width,height} = Dimensions.get("window");

const styles = StyleSheet.create({
  text: { color: "white" },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor:"black"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "black",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  headerTitle: {
    fontFamily: "JetBrainMono-Medium",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  imageContainer: {
    paddingVertical:12,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  imageWrapper: {
    alignItems:"center",
    marginHorizontal: 8,
    width:72,
  },
  imagePost: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  textArea: {
    width: "90%",
    alignSelf: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    marginBottom: 20,
    minHeight: 120,
  },
  changeImageButt: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default styles; // ✅ Ensure styles are exported properly
