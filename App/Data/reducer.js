import { fromJS } from 'immutable';

const initialState = fromJS({ cupRecords: [], forceMultiplier: null, recommendedConsumption: null });
console.dir(initialState);

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CUP_RECORDS': {
      return state.set( 'cupRecords', fromJS(action.cupRecords) );
    }
    case 'SET_FORCE_MULTIPLIER': {
      return state.set( 'forceMultiplier', +action.forceMultiplier );
    }
    case 'SET_RECOMMENDED_CONSUMPTION': {
      return state.set( 'recommendedConsumption', +action.recommendedConsumption );
    }
    default: {
      return state;
    }
  }
}
