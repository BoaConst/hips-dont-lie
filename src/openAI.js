import axios from 'axios';

const apiUrl = 'https://api.openai.com/v1/completions';

const postData ={
    "model": "text-davinci-003", 
    "prompt": "First aid for cold- be brief", 
    "temperature": 0, 
    "max_tokens": 100
};

axios.post(apiUrl, postData, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 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'
  }
}).then(response => {
//   const data = JSON.parse(response.data);
  console.log(response.data.choices[0].text);
}).catch(error => {
  console.error(error);
});
