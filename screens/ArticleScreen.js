// screens/ArticleScreen.js
import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { LanguageContext } from "../contexts/LanguageContext";
import { fetchArticleById } from "../services/api";
import Markdown from "react-native-markdown-display";

const ArticleScreen = ({ route }) => {
  const { articleId } = route.params;
  const { language, switchLanguage } = useContext(LanguageContext);
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const loadArticle = async () => {
      const fetchedArticle = await fetchArticleById(articleId, language);
      setArticle(fetchedArticle);
    };

    loadArticle();
  }, [articleId, language]);

  if (!article) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title={`Switch to ${language === "en" ? "French" : "English"}`}
          onPress={() => switchLanguage(language === "en" ? "fr" : "en")}
          color="#6200ee"
        />
      </View>
      <Image
        source={{
          uri:
            `http://localhost:1337` +
            article.attributes.cover.data[0].attributes.url,
        }}
        style={styles.image}
      />
      <Text style={styles.title}>{article.attributes.title}</Text>
      <Text style={styles.author}>{article.attributes.author}</Text>
      <Text style={styles.date}>
        {new Date(article.attributes.createdAt).toLocaleDateString()}
      </Text>
      <Markdown>{article.attributes.content}</Markdown>
    </ScrollView>
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
  image: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  author: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: "#999",
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default ArticleScreen;
