import moment from 'moment';
import { bindActionCreators } from 'redux';

export const setCupRecords = (cupRecords) => {
  const today = moment().startOf('day');
  const tomorrow = moment(today).add(1, 'day');

  cupRecords = cupRecords.filter( (cr) => {
    const time = moment(cr.time);
    return time > today && tomorrow > time;
  } );

  return {
    type: 'SET_CUP_RECORDS',
    cupRecords,
  }
};

export const setForceMultiplier = (forceMultiplier) => ({
  type: 'SET_FORCE_MULTIPLIER',
  forceMultiplier,
})

export const setRecommendedConsumption = (recommendedConsumption) => ({
  type: 'SET_RECOMMENDED_CONSUMPTION',
  recommendedConsumption,
})
