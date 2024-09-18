# Coding Test

Thanks for applying our position. In this coding test, you will work on the questions below, push your code to GitHub and send the link back to us. Before you get started, please remember:

1. Feel free to google potential approaches or ask questions if needed.
2. We are using `Javascript/Typescript` (ES6) as our primary programming language and we would like to see your proficiency in JS. 
3. Your coding efficiency will be evaluated, but we would consider more about your code quality rather than your speed.
4. Leave necessary comments in your code to explain your idea of solving the problem.
5. We are sure that you will try your best, but if any of these problems are too challenging for you, don't worry, just show us your progress or idea.  



## Question 1

We may want to check the internect connection conditions in our App. For example, if the app can get response from the a given host within half a second, we would say the connection condition is `good`, but if the response cannot be returned from the host after 5 seconds, the verdict could be `terrible` and we won't want to wait anymore. 

### What you need to do

Implement a function that checks the internect connection condition. This function will try to get response from a given URI, (let's say, `https://www.google.com`, or any URI you like), and check how long it takes to get the response. 

- If you receive response within half a second, your function returns a string `good`.
- If you receive response in more than half a second but less than five seconds, your function returns a string `fine`.
- If you receive nothing after 5 seconds waiting or the URI is not reachable, don't wait anymore and your function returns a string `terrible`. 

### What you need to know

1. It is possible to implement this function without importing any packages, just use built-in functions of `Node.js`.

### How would we test & review

1. We would check your code and understand the logic of your function.
2. We will try different URIs to see if this function works as expected. 



## Question 2

Suppose we are developing a e-commerce app, and the backend database stores all product categories. At the frontend, the App needs to get all categories in a **tree** structure, for example:

```javascript
{
  categoryId: "root",
  name: "Root Category",
  parent: null,
  children: [
    {
      categoryId: "category1",
      name: "Category One",
      parent: "root",
      children: [
        {
      		categoryId: "category1-1",
      		name: "Category One - One",
          parent: "category1"
      		children: [...]
    		}
      ]
    },
    {
      categoryId: "category2",
      name: "Category Two",
      parent: "root",
      children: []
    },
    ...
  ]
}
```

As you can see, each category has an `id` field called `categoryId` which is unique amoung all categories(could be an `uuid`), a `name`, a `parent` field which is the parent category id, and could have children categories. But in the server, after querying the database, categories are returned as an `array`, for example:

```javascript
[
  {
    categoryId: "category1",
    parent: "root",
    name: "Category One"
  },
  {
    categoryId: "category2",
    parent: "root",
    name: "Category Two"
  },
  {
    categoryId: "category1-1",
    parent: "category1",
    name: "Category One One"
  },
  ...
]
```

and root category is not stored in the database. 

### What you need to do

1. Implement and run a simple RESTFul server that only has one endpoint, which replies the **category tree** based on given categories data (please refer to the `categories.json` file in the folder). You don't need to implement a database, just write a function that converts the category array (loaded from the `json` file) to the category tree and reply it to the frontend. 
2. Implement a frontend function that sends request to the endpoint you just created, fetch the **category tree** and print it in the console. 

### What you need to know

1. All categories in the `json` file can be included in one tree.
2. This category tree has unlimited levels (maybe not possible in the real world, but in this question, suppose each category could have children, no matter which level it is in).
3. Converting an array to a tree has many approaches, we would like to see that your approach has a low time complexity. 
4. Please write your code in seperate files (for example, your server program could be in a file called `server.js`, and your font end function will be in a file called `fetchCategories.js`).

### How would we test & review

1. We would run your server at `localhost:8080`, and use `Postman` to call the endpoint, checking if the category data is returned as expected.
2. We would run your frontend function file in terminal, and check the output.
3. We would go through the converter function and check your code logic.



## Question 3

In React, `Redux` is used to store cross-component data. Suppose we are fetching the categories data described in Question 2 and store it into redux in a react app, and use the data in a `TreeSelect` component to allow the user select one of these categories. The `TreeSelect` component is a dropdown selector like below:

![image-20210322115849727](./TreeSelect.png)

### What you need to do

Please implement a simple React app that allows the user to select **ONE** category through this `TreeSelect` component, and the data is fetched from the API you implemented in Question 2 and stored in `Redux`. Once a categroy is selected, the page will popup an `alert` to show the `id` of the selected category.

We'd like to see two ways of implementing asynchronous calls. Put two buttons in the page:

1. Button 1: Click this button will fetch categories data through `redux saga` , and then store it into `Redux`.
2. Button 2: Click this button will fetch categories data and store it into `Redux` through a custom `hook` implemented by yourself.

### What you need to know

1. We recommend to use `TreeSelect` component of `Ant Design` , but you are also free to use any other package or component, or even implement this component by yourself. You don't need to implement any fancy effects of this component, just ensure mouse clicks trigger dropdown and select actions.

2.  The categories data may have multiple levels, so hardcoding the data passed into `TreeSelect` component is not the way we'd like to see, but you can assume that the data structure of category node is fixed: 

   ```typescript
   interface CategoryNode {
     categoryId: string
     name: string
     parent: string
     children: Array<CategoryNode>
   }
   ```

3. You can implement one of them if you are not familiar with `redux saga` or `hook`, but function component is the prefered way for us in both approaches. 
4. Put this React App in a public repository of your personal GitHub page, commit your progress regularly, and let us know the link of this repo.

### How would we test & review

1. We would check your coding style of implementing this React App.
2. We would check your way of generating the selection options of `TreeSelect` based on multi-level, uncertain category data. 
3. We would run your React App locally (`localhost:3000`) and use `Redux DevTools` to check the action flows of your app.

