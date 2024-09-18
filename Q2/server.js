// server.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 8080;

// Load categories data
const categoriesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../categories.json"), "utf-8")
);

// Function to convert flat array to tree
function buildCategoryTree(categories) {
  const categoryMap = {};
  const roots = [];

  // Initialize each category in the map
  categories.forEach((category) => {
    category.children = [];
    categoryMap[category.categoryId] = category;
  });

  // Build the tree
  categories.forEach((category) => {
    if (category.parent && categoryMap[category.parent]) {
      // Add the category to its parent's children array
      categoryMap[category.parent].children.push(category);
    } else {
      // If no parent or parent not in map, it's a root category
      roots.push(category);
    }
  });

  // Determine the root of the tree
  let root;

  if (roots.length === 1) {
    // Only one root category exists
    root = roots[0];
  } else if (roots.length > 1) {
    // Multiple root categories; create a new root
    root = {
      categoryId: "root",
      name: "Root Category",
      parent: null,
      children: roots,
    };
  } else {
    // No root categories found
    root = null;
  }

  return root;
}

// Endpoint to get category tree
app.get("/categories", (req, res) => {
  const categoryTree = buildCategoryTree(categoriesData);
  res.json(categoryTree);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
