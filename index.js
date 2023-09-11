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
        
        console.log(`Amount of cryptos: ${amountOfCryptocurrencies}`);
        console.log(`Amount of groups of 4 cryptos: ${amountOfRows}`);
        // console.log(`Amount of rows: ${amountOfCryptocurrencies / 4}`);  
  

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