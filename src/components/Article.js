import React from 'react'
import { View, Text, StyleSheet, Image, ImageBackground, Linking, Pressable} from 'react-native'

const Article = ({ title, source, urlToImage, description, author, publishedAt, url}) => (
  <View style={styles.content}>
    <ImageBackground 
      source={{ uri: urlToImage}} 
      blurRadius={30}
      borderTopLeftRadius={10}
      borderTopRightRadius={10}
      resizeMode='cover'
      style={styles.image}
    >
        <Image style={styles.image} resizeMode="contain" source={{ uri: urlToImage}} />
    </ImageBackground>
    <View style={styles.textContent}>
        <Text style={styles.source}>{source.name}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
    </View>
    <Pressable style={styles.footer} onPress={ ()=>{ Linking.openURL(url)}}>
        <Text style={styles.footerLink}>Read more at {source.name} - {author || "Unknown"}  ▶</Text>
        <Text style={styles.footerDate}>{new Date(publishedAt).toLocaleString()}</Text>
    </Pressable>
  </View>
)

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  image: {
    height: 320,
    marginBottom: 8,
  },
  textContent: {
    paddingHorizontal: 20
  },
  source: {
    color: '#3d3c41',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 3
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15
  },
  description: {
    fontSize: 16
  },
  footer: {
    backgroundColor: '#36454F',
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  footerLink: {
    color: 'white',
    fontSize: 15
  },
  footerDate: {
    color: '#c9c9c9'
  }
})

export default Article