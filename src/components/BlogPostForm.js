import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const BlogPostForm = ({ onSubmit, initialValues }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);
  return (
    <View>
      <Text style={styles.label}>Enter Title</Text>
      <TextInput
        style={styles.text_input}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <Text style={styles.label}>Enter Content</Text>
      <TextInput
        value={content}
        onChangeText={(content) => setContent(content)}
        style={styles.text_input}
      />
      <Button title="save blog post" onPress={() => onSubmit(title, content)} />
    </View>
  );
};

/*
create screen does not contain initialValue prop so it will give error 
but edit screen does contain the props
so to avoid undefined error we create default value prop for the form component
 */
BlogPostForm.defaultProps = {
  initialValues: {
    title: "",
    content: "",
  },
};

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
  },
  text_input: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 5,
    margin: 10,
  },
});

export default BlogPostForm;
