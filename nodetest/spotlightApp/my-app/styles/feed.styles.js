import { StyleSheet , Dimensions } from "react-native";
import { View } from "react-native";

const {width,height} = Dimensions.get("window");

const styles = StyleSheet.create({
  text: { color: "green" },
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
  storiesContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  storyWrapper: {
    alignItems:"center",
    marginHorizontal: 8,
    width:72,
  },
  storyRing: {
    width:68,
    height:68,
    borderRadius: 34,
    padding: 2,
    backgroundColor: "black",
    borderWidth:2,
    borderColor:"white",
    marginBottom:4,
  },
  noStory: {
    borderColor:"gray",
  },
  storyAvatar: {
    width:60,
    height:60,
    borderRadius: 30,
    borderWidth:2,
    borderColor:"black",
  },
  storyUsername:{
    fontSize:11,
    color:'white',
    textAlign:'center'
  },
  post:{marginBottom:16,},
  postHeader:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding:12,
  },
  postHeaderLeft:{
    flexDirection: "row",
    alignItems: "center",alignSelf:"center"
  },
  postAvatar:{
    width:32,
    height:32,
    borderRadius:16,
    marginRight:8,
    
  },
  postUsername:{
    fontSize:14,
    fontWeight:"600",
    color:"white"

  },
  postImage:{
    width:width,
    height:width
  },
  postActions:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal:12,
    paddingVertical:12,
  },
  postActionsLeft:{
    flexDirection: "row",
    alignItems: "center",
    gap:16,
  },
  postInfo:{
    paddingHorizontal:12
  },
  likesText:{
    fontSize:14,
    fontWeight:"600",
    color:"white"
  },
  captionContainer:{
    flexDirection:"row",
    flexWrap:"wrap",
    marginBottom:6,
  },
  captionUsername:{
    fontSize:14,
    fontWeight:"600",
    color:"white",
    marginRight:6
  },
  captionText:{
    fontSize:14,
    color:"white",
    flex:1
  },
  commentsText:{
    fontSize:14,
    color:"grey",
    marginBottom:4
  },
  timeAgo:{
    fontSize:12,
    color:"grey",
    marginBottom:8
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 0.5,
    borderBottomColor: "white",
  },
  modalTitle:{
    fontSize:14,
    fontWeight:"600",
    color:"white"
  },
  commentsList:{
    flex:1
  },
  commentContainer:{
    flexDirection:"row",
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor:"white",
  },
  commentAvatar:{
    width:32,
    height:32,
    borderRadius:16,
    marginRight:12,
  },
  commentText:{
    color:"white",
    fontSize:14,
    lineHeight:20
  },
  commentInput:{
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "white",
  },
  input:{
    flex:1,
    color:"white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderRadius:20,
    fontSize:14
  },
  centered:{
    justifyContent:"center",
    alignItems:"center"
  }
});

export default styles; // ✅ Ensure styles are exported properly
