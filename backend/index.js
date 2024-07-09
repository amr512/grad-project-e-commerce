import e from "express";
import "dotenv/config";
import fs from "fs";
import { Stripe } from "stripe";
import cors from "cors";
import bodyParser from "body-parser";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {createTransport} from "nodemailer"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = e();
const firebase = initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
});
// const analytics = getAnalytics(firebase);

app.use(
  e.static("public"),
  cors({
    origin: "*",
  }),
  bodyParser.urlencoded({ extended: true })
);




const WEBSITE_DOMAIN = process.env.DOMAIN || "http://localhost:5173";

const port = process.env.PORT || 3000;
const transporter = createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})


// let products = []
// fs.readdirSync("products").forEach((file) => {
//     // console.log(file)
//     products.push(JSON.parse(fs.readFileSync("./products/" + file)))
// })

// check product IDs to make sure they are unique and return an error with the duplicated ID
// products.forEach((product) => {
//     if (products.find(p => p.id === product.id)) throw new Error("Duplicate product ID: " + product.id)
// })

// const products = await stripe.products.list()

// products.data.forEach(async (product) => {
//     let price = await (stripe.prices.retrieve(product.default_price))
//     product.price = price.unit_amount_decimal + " " + price.currency
//     // console.log(product)
// });

app.listen(port, () => console.log("server started on port: " + port));

let productCache = { timeStamp: 0, products: [] };
app.get("/products", async (req, res) => {
  console.log(productCache.timeStamp)
  if (productCache.timeStamp < Date.now() - 600 * 1000) {
    console.log("retrieving products")
    stripe.products
      .list()
      .then(async (products) => {
        let prods = await Promise.all(
          products.data.map(async (product) => {
            const price = await stripe.prices.retrieve(product.default_price);
            product.price = {
              value: price.unit_amount_decimal,
              currency: price.currency,
            };
            return product;
            //   .then((p) => (p.unit_amount_decimal + " " + p.currency))
            //   .then((price) => {
            //     product.price = price;
            //     console.log(product);
            //     return product;
            //   });
          })
        );
        productCache = { timeStamp: Date.now(), products: prods };
        return prods;
      })
      .then((e) => {
        res.json(e);
      });
  } else {
    console.log("using cached products")
    res.json(productCache.products);
  }
});
app.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await stripe.products.retrieve(id);
    // const product = products.find(p => p.id == id);
    res.send(product);
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .send(`<h1>Error ${err.statusCode}:</h1> ${err.message}`);
  }
});
app.post("/create-checkout-session/", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: req.body.price_id,
          quantity: req.body.quantity,
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },

        },
      ],
      mode: "payment",
      success_url: `${WEBSITE_DOMAIN}/success?product_id=${req.body.product_id}`,
      cancel_url: `${WEBSITE_DOMAIN}/canceled`,
    });

    res.redirect(303, session.url);
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .send(`<h1>Error ${err.statusCode}:</h1> ${err.message}`);
  }
});

app.post("/cart-checkout/", async (req, res) => {
  try {
    console.log(req.body.items);
    const session = await stripe.checkout.sessions.create({
      line_items: JSON.parse(req.body.items).map((item)=>(
        {
          price: item.price,
          quantity: item.quantity,
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
        }
      )),
      mode: "payment",
      success_url: `${WEBSITE_DOMAIN}/success`,
      cancel_url: `${WEBSITE_DOMAIN}/canceled`,
    });

    res.redirect(303, session.url);
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .send(`<h1>Error ${err.statusCode}:</h1> ${err.message}`);
  }
});

app.post("/contact", (req, res) => {
  console.log(req.body);
  transporter.sendMail({
    subject: `contact request from ${req.body.email}, ${req.body.phone}`,
    text: `from:${req.body.name}. \n ${req.body.text}`,
    from: process.env.EMAIL,
    sender: req.body.email,
    to: "support@adas.amr512.com",
    replyTo: req.body.email
}).catch((err) => console.log(err))
})

// {
//     id: 'prod_QMMRSndPYiWjFa',
//     object: 'product',
//     active: true,
//     attributes: [],
//     created: 1719338634,
//     default_price: 'price_1PVdihJK1JIJyUHcDhfjT3l2',
//     description: 'test test test ',
//     images: [
//       'https://files.stripe.com/links/MDB8YWNjdF8xS2pSZUdKSzFKSUp5VUhjfGZsX3Rlc3RfbVZqbmFncnhQYzlSWUgwRkE4ZE9CSVJw009sDxQzjN'
//     ],
//     livemode: false,
//     marketing_features: [],
//     metadata: {},
//     name: 'test',
//     package_dimensions: null,
//     shippable: null,
//     statement_descriptor: null,
//     tax_code: null,
//     type: 'service',
//     unit_label: null,
//     updated: 1719598453,
//     url: null,
//     price: '200000 egp'
//   }
