import Pizzly from 'pizzly-js';

export default function oAuth () { 
  const pizzly = new Pizzly({ 
    host: process.env.REACT_APP_HOST,
    publishableKey: 'theichingnetyCAVKgEU'
  });
  const google = pizzly.integration('gmail');
  const authId = process.env.REACT_APP_AUTH_ID;
  
  google
  .connect()
  .then(({ authId }) => console.log("Sucessfully connected!", authId))
  .catch((error) => console.error("It failed!", error))

}