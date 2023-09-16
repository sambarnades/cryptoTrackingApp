const express = require(`express`);
const ejs = require(`ejs`);
const axios = require(`axios`).default;
const jquery = require(`jquery`);

const app = express();
const port = 3000;

app.use(express.static(`public`));

app.get(`/`, async (req, res) => {
    try {
        const response = await axios.get(`https://api.blockchain.com/v3/exchange/tickers`);

        let data = response.data;                                               // Declare all useful variables
        let amountOfCryptocurrencies = data.length;
        let amountOfRows = Math.floor(amountOfCryptocurrencies / 4) + 1;
        let cryptoNames = [];
        let fiatCurrency = [];

        data.forEach(cryptoCurrency => {                                    // Loop for all the data array, for each crypto currency.

            let cryptoConversion = cryptoCurrency.symbol;                   // Transform the conversion title to the crypto name only. Useful to link to the svg file for the icon.
            let hyphenIndex = cryptoConversion.indexOf('-');
            let cryptoName = cryptoConversion.substring(0, hyphenIndex).toLowerCase();
            let currencySymbol = cryptoConversion.substring(hyphenIndex + 1, cryptoConversion.length).toUpperCase();


                if(currencySymbol == "EUR") {
                    
                    currencySymbol = "€";
                }
                  
                else if(currencySymbol >= "USD") {
                    currencySymbol = "$"
                }

                else if(currencySymbol == "GBP") {
                    currencySymbol = "£"
                }
                
                else if(currencySymbol == "BTC") {
                    currencySymbol = "₿"
                } 
                
                else if(currencySymbol == "ETH") {
                    currencySymbol = "Ξ"
                }

                else if(currencySymbol == "TRY") {
                    currencySymbol = "₺"
                }

                fiatCurrency.push(currencySymbol); // Extract the FIAT conversion currency.

            cryptoNames.push(cryptoName);       // Put the name only into an array.
        });

        res.render(`index.ejs`, {  
            data: data,
            amountOfCryptocurrencies: amountOfCryptocurrencies,
            amountOfRows: amountOfRows,
            cryptoNames: cryptoNames,
            fiatCurrency: fiatCurrency
        });

    } catch (error) {
        console.error(error);
    }

});


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})