const express = require(`express`);
const ejs = require(`ejs`);
const axios = require(`axios`).default;
const jquery = require(`jquery`);

const app = express();
const port = 4000;

app.use(express.static(`public`));

app.get(`/`, async (req, res) => {
    try {
        const response = await axios.get(`https://api.blockchain.com/v3/exchange/tickers`);
        
        amountOfCryptocurrencies = response.data.length
        amountOfRows = Math.floor(amountOfCryptocurrencies / 4) + 1
        
        console.log(response.data[0]);  

        res.render(`index.ejs`, {
            data: response.data,
            amountOfCryptocurrencies: amountOfCryptocurrencies,
            amountOfRows: amountOfRows
        });

    } catch (error) {
        console.error(error);
    }

});


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})