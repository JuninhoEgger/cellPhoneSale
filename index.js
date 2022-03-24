const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static("public"));
// esta variável abaixo, simula como se fosse um banco de dados de funcionários
const cellPhones = [{
        id: "1",
        model: "M32",
        price: 1777.00,
        brand: "Samsung"
    },
    {
        id: "2",
        model: "11",
        price: 5777.00,
        brand: "iPhone"
    },
    {
        id: "3",
        model: "J7 Pro",
        price: 1200.00,
        brand: "Samsung"
    },
    {
        id: "4",
        model: "Redmi Note 9",
        price: 1500.00,
        brand: "Xiaomi"
    }
];

app.get("/", function(req, res) {
    res.render("home", { cellPhones });
});

app.get("/cellPhone/:id", function(req, res) {
    const cellPhone = cellPhones[req.params.id - 1];
    if (cellPhone.price.toString().indexOf('R$') == -1)
        cellPhone.price = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(cellPhone.price);

    res.render("cellPhone", { cellPhone });
});

app.listen(3000);