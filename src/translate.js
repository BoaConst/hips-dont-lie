import axios from 'axios';

const apiUrl = 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyC3cuIyYnQR1zOPFv00jzy7tpulMNajR_0';

const postData = {
    "key": "AIzaSyC3cuIyYnQR1zOPFv00jzy7tpulMNajR_0",
    "q": "My name is Ashok",
    "source": "en",
    "target": "te",
    "format": "text"
  };
axios.post(apiUrl, postData, {
  headers: {
    'Content-Type': 'application/json'
  }
}).then(response => {
//   const data = JSON.parse(response.data);
  console.log(response.data.data.translations[0].translatedText);
}).catch(error => {
  console.error(error);
});
