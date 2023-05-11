import React, { useContext, useEffect } from "react";
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
  const { state, deleteBlogPost, getBlogPost } = useContext(Context);
  useEffect(() => {
    //  fetch first time when index is loaded
    getBlogPost();
    // fetch again when we return to screen
    const listener = navigation.addListener("didFocus", () => {
      getBlogPost();
    });

    // if index is completely removed then only this function will run
    return () => {
      listener.remove();
    };
  }, []);
  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(blogPosts) => {
          blogPosts.title;
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Show", { id: item.id })}
            >
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

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Create")}>
        <Feather name="plus" size={30} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    padding: 5,
    height: 50,
    backgroundColor: "white",
  },
  title: {
    fontSize: 18,
    padding: 5,
  },
  icon: {
    fontSize: 24,
    padding: 5,
  },
});

export default IndexScreen;
