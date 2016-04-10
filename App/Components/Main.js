import React, {
  Component,
  Dimensions,
  Image,
  Text,
  StyleSheet,
  View,
} from 'react-native';

import moment from 'moment';
import { connect } from 'react-redux';

import store from '../Data';
import { setForceMultiplier, setRecommendedConsumption } from '../Data/actionCreators';

require('../Data/firebase');

const [GREEN, DARK_GREEN, RED, DARK_RED] = ['#BFE398', '#8FAB71', '#FFB5B5', '#cd5a5a'];
const DARK_GREY = '#494949';

const { height, width } = Dimensions.get('window');

class Main extends Component {
  componentWillMount() {
      return fetch(`https://lit-savannah-65925.herokuapp.com/api/constants`)
      .then( (res) => res.json() )
      .then( ({ FORCE_MULTIPLIER, RECOMMENDED_CONSUMPTION }) => {
        store.dispatch( setForceMultiplier(FORCE_MULTIPLIER) );
        store.dispatch( setRecommendedConsumption(RECOMMENDED_CONSUMPTION) );
      })
      .then( () => { console.dir(store.getState()) })
      .catch( console.error.bind(console) );
  }

  render() {
    const { cupRecords, forceMultiplier, recommendedConsumption } = this.props;
    const { abs, round } = Math;

    const volDrunk = cupRecords.toArray()
    .reduce( (sum, cr) => {
      return sum + forceMultiplier * (cr.get('changeInForce') || 0) // such hack
    }, 0 );

    const shouldHaveDrunk = moment().hours() / 24 * recommendedConsumption
    const amountBehind = shouldHaveDrunk - volDrunk;

    let hero;

    if (amountBehind < 0) hero = (
      <View style={ [styles.center, styles.hero, styles.green] }>
        <Image source={ require('../Resources/star.png') } style={ styles.img} />
        <Text style={ styles.randomText }>Why are bottles shaped like bottles?</Text>
      </View>
    );
    else hero = (
      <View style={ [styles.center, styles.hero, styles.red] }>
        <Image source={ require('../Resources/thumbs-down.png') } style={ styles.img} />
        <Text style={ styles.randomBadText }>DRINK YOUR DAMN WATER!</Text>
      </View>
    );

    return (
      <View>
        { hero }
        <View style={ styles.row }>

          <View style={ [styles.center, styles.split, styles.column] }>
            <View style={ [styles.row, styles.verticalBottom] }>
              <Text
                style={ [styles.bigText, { color: (amountBehind < 0) ? 'black': DARK_RED }] }
              >
                { round( abs(amountBehind) ) }</Text>
              <Text style={ styles.mlText }>ml</Text>
            </View>
            <Text>{ (amountBehind < 0) ? 'over the minimum' : 'under the minimum' }</Text>
          </View>

          <View style={ [styles.center, styles.split, styles.column] }>
            <View style={ [styles.row, styles.verticalBottom] }>
              <Text style={ styles.bigText }>{ round( abs(recommendedConsumption - volDrunk) ) }</Text>
              <Text style={ styles.mlText }>ml</Text>
            </View>
            <Text>left today</Text>
          </View>

        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
    cupRecords: state.get('cupRecords'),
    forceMultiplier: state.get('forceMultiplier'),
    recommendedConsumption: state.get('recommendedConsumption'),
});

export default connect(mapStateToProps)(Main);

const styles =  StyleSheet.create({
  bigText: {
    fontSize: 48,
    letterSpacing: 2,
  },
  center: {
    alignItems: 'center',
    height: height * 0.25,
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  hero: {
    backgroundColor: GREEN,
    flexDirection: 'column',
    height: height * 0.75,
  },
  green: {
    backgroundColor: GREEN,
  },
  img: {
    marginBottom: 30,
  },
  mlText: {
    paddingBottom: 5,
  },
  randomText: {
    color: DARK_GREEN,
    fontSize: 18,
    letterSpacing: 1,
  },
  randomBadText: {
    color: DARK_RED,
    fontSize: 18,
    letterSpacing: 1,
  },
  red: {
    backgroundColor: RED,
  },
  row: {
    flexDirection: 'row',
  },
  split: {
    flexDirection: 'row',
    width: width * 0.5,
  },
  verticalBottom: {
    alignItems: 'flex-end',
  },
})
