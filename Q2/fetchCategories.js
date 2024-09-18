// fetchCategories.js
const axios = require("axios");

// Function to fetch and print categories
async function fetchCategories() {
  try {
    const response = await axios.get("http://localhost:8080/categories");
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error("Error fetching categories:", error.message);
  }
}

fetchCategories();
