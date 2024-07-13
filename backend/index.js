import e from "express";
import "dotenv/config";
import { Stripe } from "stripe";
import cors from "cors";
import bodyParser from "body-parser";
import {createTransport} from "nodemailer"
import fs from "fs"




const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = e();


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
// This route handles the GET request for all products
// It first checks if the products are already cached and if they are older than 600 seconds
// If they are not cached, it retrieves the products from Stripe and caches them
// If they are cached, it returns the cached products
app.get("/products", async (req, res) => {
  try{
    res.header("cache-control", "public, max-age=600");
  if (productCache.timeStamp < Date.now() - 600 * 1000) {
    // Products are not cached or are older than 600 seconds, retrieve from Stripe
    stripe.products
      .list()
      .then(async (products) => {
        let prods = await Promise.all(
          products.data.map(async (product) => {
            const price = await stripe.prices.retrieve(product.default_price);
            // formatting the price in a readable way
            product.price = {
              value: price.unit_amount_decimal,
              currency: price.currency,
            };
            return product;
          })
        );
        // Cache the products and their time of retrieval
        productCache = { timeStamp: Date.now(), products: prods };
        res.json(prods); ;
      })
  } else {
    // Products are already cached, return them
    console.log("using cached products")
    res.json(productCache.products);
  }
  }catch(err){
    res
      .status(err.statusCode || 500)
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

app.get("/qr", (req, res) => {
  res.contentType("image/png");
  res.send(fs.readFileSync("./qr.png"));
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
