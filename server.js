const express = require("express");
const db = require("./app/models");
// const routes = require("./app/routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const corsOptions = {
    origin: "http://localhost:8081"
  };
  
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : true}));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});

app.use('/',router);
require("./app/routes/tutorial.routes")(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});