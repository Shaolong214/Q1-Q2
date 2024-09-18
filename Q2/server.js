// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 8080;

// Load categories data
const categoriesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../categories.json'), 'utf-8')
);

// Function to convert flat array to tree
function buildCategoryTree(categories) {
  const categoryMap = {};
  const tree = [];

  // Initialize each category in the map
  categories.forEach((category) => {
    category.children = [];
    categoryMap[category.categoryId] = category;
  });

  // Build the tree
  categories.forEach((category) => {
    if (category.parent && categoryMap[category.parent]) {
      categoryMap[category.parent].children.push(category);
    } else {
      // If no parent, it's a root category
      tree.push(category);
    }
  });

  // Create the root category manually
  const root = {
    categoryId: 'root',
    name: 'Root Category',
    parent: null,
    children: tree,
  };

  return root;
}

// Endpoint to get category tree
app.get('/categories', (req, res) => {
  const categoryTree = buildCategoryTree(categoriesData);
  res.json(categoryTree);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
