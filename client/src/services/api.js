import axios from 'axios';

export default function addHistory (id, history) {
  axios({
    url: process.env.REACT_APP_ADD_HISTORY,
    method: 'POST',
    data: {id, history}
  })
};