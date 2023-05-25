const readline = require('readline');

class Product {
    constructor(name, pricePerUnit) {
        this.name = name;
        this.pricePerUnit = pricePerUnit;
    }
}

class Order {
    constructor() {
        this.totalPrice = 0;
        this.products = [];
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    startOrder() {
        console.log("Witamy w firmie X!");
        this.rl.question("wybierz produkt:\n1. Wegiel\n2. Metal\n3. Finalize Order\n", (productType) => {
            if (productType === "1") {
                this.selectCoalType();
            } else if (productType === "2") {
                this.selectMetalType();
            } else if (productType === "3") {
                this.finalizeOrder();
            } else {
                console.log("niewlasciwy typ wybrany!");
                this.startOrder();
            }
        });
    }

    selectCoalType() {
        this.rl.question("wybierz typ Wegla:\n1. Wêgierski ($10 per unit)\n2. Mia³ ($15 per unit)\n3. Czuk ($20 per unit)\n", (coalType) => {
            let quantity;
            this.rl.question("wprowadz iloœæ (KG):\n", (quantityInput) => {
                quantity = parseInt(quantityInput);
                const coal = this.getCoalType(coalType);

                if (coal) {
                    const subtotal = coal.pricePerUnit * quantity;
                    this.totalPrice += subtotal;
                    this.products.push({ name: coal.name, quantity });
                    console.log(`Coal Type ${coal.name} - Quantity: ${quantity} - Subtotal: $${subtotal}`);
                } else {
                    console.log("niewlasciwy typ wybrany!");
                }

                this.startOrder();
            });
        });
    }

    selectMetalType() {
        this.rl.question("wybierz typ metalu:\n1. cienki zlom (do 1 cm gruboœc ($50 per unit)\n2. Mieszany ($70 per unit)\n3. gruby zlom (1 cm lub wiêcej gruboœci) ($90 per unit)\n", (metalType) => {
            let quantity;
            this.rl.question("wprowadz iloœæ (KG):\n", (quantityInput) => {
                quantity = parseInt(quantityInput);
                const metal = this.getMetalType(metalType);

                if (metal) {
                    const subtotal = metal.pricePerUnit * quantity;
                    this.totalPrice += subtotal;
                    this.products.push({ name: metal.name, quantity });
                    console.log(`Metal Type ${metal.name} - Quantity: ${quantity} - Subtotal: $${subtotal}`);
                } else {
                    console.log("niewlasciwy typ wybrany!");
                }

                this.startOrder();
            });
        });
    }

    getCoalType(coalType) {
        switch (coalType) {
            case "1":
                return new Product("Wêgierski", 10);
            case "2":
                return new Product("Mia³", 15);
            case "3":
                return new Product("Czuk", 20);
            default:
                return null;
        }
    }

    getMetalType(metalType) {
        switch (metalType) {
            case "1":
                return new Product("cienki z³om (0,5 cm gruboœci)", 50);
            case "2":
                return new Product("mieszany", 70);
            case "3":
                return new Product("gruby z³om (1 cm lub wiêcej gruboœci)", 90);
            default:
                return null;
        }
    }

    finalizeOrder() {
        if (this.products.length === 0) {
            console.log("nic nie wybrano, zamówienie anulowano");
        } else {
            console.log(`laczny koszt: $${this.totalPrice}`);
            console.log("Wybrane produkty:");
            this.products.forEach((product, index) => {
                console.log(`${index + 1}. ${product.name} - Quantity: ${product.quantity}`);
            });
            console.log("dziekujemy za zamowienie!");
        }

        this.totalPrice = 0;
        this.products = [];
        this.rl.question("wybierz dowolny przycisk aby wyjsc z aplikacji.", () => {
            this.rl.close();
        });
    }
}

const order = new Order();
order.startOrder();