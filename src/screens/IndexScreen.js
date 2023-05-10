import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { Context } from "../context/BlogContext";
//import { Context as ImageContext } from "../context/ImageContext";
import { Feather } from "@expo/vector-icons";

const IndexScreen = ({ navigation }) => {
  // const blogPosts = useContext(BlogContext);
  const { state, addBlogPost, deleteBlogPost } = useContext(Context);
  return (
    <View>
      <Button title="add post" onPress={addBlogPost} />
      <FlatList
        data={state}
        keyExtractor={(blogPosts) => {
          blogPosts.title;
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('Show')}>
              <View style={styles.row}>
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <Feather style={styles.icon} name="trash" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    padding: 5,
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
});

export default IndexScreen;
