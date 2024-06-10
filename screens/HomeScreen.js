// screens/HomeScreen.js
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LanguageContext } from "../contexts/LanguageContext";
import { fetchArticles } from "../services/api";

const HomeScreen = () => {
  const { language, switchLanguage } = useContext(LanguageContext);
  const [articles, setArticles] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadArticles = async () => {
      const fetchedArticles = await fetchArticles(language);
      setArticles(fetchedArticles);
    };

    loadArticles();
  }, [language]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title={`Switch to ${language === "en" ? "French" : "English"}`}
          onPress={() => switchLanguage(language === "en" ? "fr" : "en")}
          color="#6200ee"
        />
      </View>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Article", { articleId: item.id })
            }
          >
            <View style={styles.articleContainer}>
              <Image
                source={{
                  uri:
                    `http://localhost:1337` +
                    item.attributes.cover.data[0].attributes.url,
                }}
                style={styles.image}
              />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.attributes.title}</Text>
                <Text style={styles.author}>{item.attributes.author}</Text>
                <Text style={styles.date}>
                  {new Date(item.attributes.createdAt).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  articleContainer: {
    flexDirection: "row",
    marginBottom: 16,
    padding: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 16,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
});

export default HomeScreen;
