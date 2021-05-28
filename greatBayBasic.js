const mysql = require("mysql");
const inquirer = require("inquirer");

const Item = require("./Item.js");
const Bid = require("./bid.js");

const Items = [];
const bids = [];
const DBItems = [];

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Be sure to update with your own MySQL password!
  password: "password",
  database: "auctionDB",
});

function init() {
  function Prompt() {
    inquirer
      .prompt([
        {
          type: "list",
          message:
            "Would you like to [POST] an auction or [BID] on an auction?",
          choices: ["Post", "Bid", "Exit"],
          name: "choice",
        },
      ])
      .then((selection) => {
        switch (selection.choice) {
          case "Post":
            postAuction();
            break;
          case "Bid":
            bidAuction();
            break;
          default:
            exit();
        }
      });
  }

  function postAuction() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the item you would like to submit?",
          name: "post",
          validate: (value) => {
            if (value) {
              return true;
            } else {
              return "Input a response to continue.";
            }
          },
        },
        {
          type: "input",
          message: "What category would you like to place your auction in?",
          name: "category",
          validate: (value) => {
            if (value) {
              return true;
            } else {
              return "Input a response to continue.";
            }
          },
        },
        {
          type: "input",
          message: "What would you like your starting bid to be?",
          name: "price",
          validate: (value) => {
            if (value) {
              console.log("Your auction was created successfully!");
              return true;
            } else {
              return "Input a response to continue.";
            }
          },
        },
      ])
      .then((answers) => {
        //const newPost = new Item(answers.post, answers.category, answers.price);
        const newPost = new Item("Byke", "Toys", 150);

        Items.push(newPost);

        console.log(Items);
      });
  }

  function bidAuction() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "What item would you like to bid on?",
          choices: DBItems,
          name: "item",
        },
        {
          type: "input",
          message: "How much would you like to bid?",
          name: "amount",
        },
      ])
      .then((answers) => {
        const newBid = new Bid(answers.item, answers.amount);
        bids.push(newBid);
        Prompt();
      });
  }
  Prompt();
}
// init();
// let newPost = new Item("Byke", "Toys", 150);
// Items.push(newPost);
// newPost = new Item("Canoe", "Toys", 750);
// Items.push(newPost);
// newPost = new Item("Remote Car", "Toys", 250);
// Items.push(newPost);

newBid = new Bid("Canoe", 99.99);
bids.push(newBid);

console.log(Items);

const pushItems = () => {
  for (let i = 0, l = Items.length; i < l; i++) {
    createProduct(Items[i].post, Items[i].category, Items[i].price);
  }
};

const pushBid = () => {
  let price = readProducts(bids[0].item, bids[0].amount);

  if(price <= bids[0].amount)
};

const readProducts = (name, amount) => {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM items WHERE name = ?", [name], (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    // console.log(res);
    connection.end();
    return res.price;
  });
};

const createProduct = (post, category, price) => {
  console.log("Inserting a new product...\n");
  const query = connection.query(
    "INSERT INTO items SET ?",
    {
      name: post,
      category: category,
      price: price,
    },
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} product inserted!\n`);
      // Call updateProduct AFTER the INSERT completes
      // updateProduct();
    }
  );

  // logs the actual query being run
  // console.log(query.sql);
};

// pushItems();
pushBid();
