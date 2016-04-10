import Firebase from 'firebase';

import store from './';
import { setCupRecords } from './actionCreators';

const ref = new Firebase(`https://crankycoaster.firebaseio.com/`);

ref.on('value', (dataSnapshot) => {
  cupRecords = Object.values( dataSnapshot.val() );
  store.dispatch( setCupRecords(cupRecords) );
})
