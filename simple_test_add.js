const axios = require('axios');
const config = require('./config');

async function testAddition() {
  const num1 = 3;
  const num2 = 4;
  try {
    const response = await axios.post(`http://localhost:${config.port}/add`, {
      num1: num1,
      num2: num2
    });
    console.log(`Result of ${num1} + ${num2} is: ${response.data["result"]}`);
  } catch (error) {
    console.error(error);
  }
}

testAddition();