import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native'
import { client } from './src/graphql/Client'
import { Headlines } from './src/graphql/Queries'
import Article from './src/components/Article'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      swipedAllCards: false,
      swipeDirection: '',
      cardIndex: 0,
      loading: true,
      articles: []
    }
  }

  componentDidMount() {
    this.requestHeadlines();
  }

  requestHeadlines = () => {
    client
      .query({
        query: Headlines
      })
      .then(response => {
        this.setState({ loading: response.loading, articles: response.data.headlines.articles})
      })
      .catch(error => {
        console.log('ERROR ==>', error)
      })
  }

  renderCard = (data, index) => {
    if(!data || !data.urlToImage || !data.description) return;
    return (
      <View style={styles.card}>
        <Article {...data} />
      </View>
    )
  };

  onSwiped = (type) => {
    console.log(`on swiped ${type}`)
  }

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    })
  };

  swipeLeft = () => {
    this.swiper.swipeLeft()
  };

  render () {
    if (this.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' color="#7c2cc5"/>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Swiper
          horizontalSwipe={false}
          disableBottomSwipe
          infinite
          ref={swiper => {
            this.swiper = swiper
          }}
          cards={this.state.articles}
          cardIndex={this.state.cardIndex}
          renderCard={this.renderCard}
          onSwipedAll={this.onSwipedAllCards}
          stackSize={5}
          stackSeparation={15}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
          backgroundColor='transparent'
          cardHorizontalMargin={0}
          cardVerticalMargin={0}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c9c9c9'
  },
  card: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 0,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  text: {
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent'
  },
  footNote: { 
    position: 'absolute', 
    bottom: 7, 
    alignSelf: 'center', 
    fontSize: 11, 
    color: 'grey' 
  }
})