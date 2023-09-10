const express = require(`express`);
const ejs = require(`ejs`);
const axios = require(`axios`).default;
const jquery = require(`jquery`);

const app = express();
const port = 4000;

app.use(express.static(`public`));

app.get(`/`, async (req, res) => {
    try {
        const response = await axios.get(`https://api.blockchain.com/v3/exchange/tickers/ETH-EUR`);
        console.log(response.data); // Logging response data

        res.render(`index.ejs`, {
            price: response.data.price_24h
        });

    } catch (error) {
        console.error(error);
    }

});


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})