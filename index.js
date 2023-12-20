const express = require("express")
const port = process.env.PORT || 3000

// Le module path est utilisé pour manipuler les chemins de fichiers et de répertoires en Node.js. Dans votre cas, vous avez rencontré cette erreur car vous avez utilisé path.join(__dirname, "page.html") dans la route "/page-html-file" pour obtenir le chemin complet vers le fichier HTML.
const path = require("path");  // Import du module path



const app = express();

// permet de répondre (res) à une requête (req)
// en l'occurence un get du client (nous sommes le serveur)
// on peut ajouter un status pour renvoyer un code (200 réussi)
// (404) "page non trouvée"
// ca permet de checker ce qui fonctionne

app.get("/", (req, res) => {
    res.status(200).send("Hello world !")
});

app.get("/contact", (req, res) => {
    res.status(200).send("Contact")
});

app.get("/blog", (req, res) => {
    res.status(200).send("Blog")
});

// On peut envoyer du json en changeant send par json
app.get("/page-json", (req, res) => {
    const a = 1;
    const b = 2;
    const c = 3;
    const d = 4;

    res.status(200).json({
        nom: "dom",
        age: 27,
        tab: [a, b, c, d]
    });
});

// Envoyer une page html :
// __dirname est une variable globale en Node.js qui représente le répertoire du fichier dans lequel elle est utilisée. 
// Plus précisément, elle donne le chemin absolu du répertoire contenant le fichier JavaScript en cours d'exécution.

app.get("/page.html", (req, res) => {
    const pagePath = path.join(__dirname, "page.html");
    res.sendFile(pagePath);
});

// Envoyer directement du XML via JS
app.get("/page-xml", (req, res) => {
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>  
        <?xml-stylesheet type="text/css" href="style.css"?>
        <root>
            <element>Je commence à envoyer du contenu en XML</element>
            <anotherElement>Et ici je mets autre chose</anotherElement>
        </root>`;
    
    // Définit le type de contenu de la réponse comme XML
    res.type("application/xml");
    
    // Définit le code de statut de la réponse
    res.status(200);
    
    // Envoie le contenu XML en réponse
    res.send(xmlContent);
});

// Envoyer du html directement
app.get("/direct-html", (req, res) => {
    const htmlContent = `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Page HTML</title>
            </head>
            <body>
                <h1>Hello World!</h1>
            </body>
        </html>
    `;

    // Définit le type de contenu de la réponse comme HTML
    res.type("text/html");

    // Définit le code de statut de la réponse
    res.status(200);

    // Envoie le contenu HTML en réponse
    res.send(htmlContent);
});



// pour la méthode app.use qui définit un middleware, voir la doc "express-doc.txt"
// syntaxe : app.use([path,] middleware)
// ici on ne met pas de path avant (req, res) ce qui signifie : tous les chemins non specifiés
// tous les chemins autres que ceux au dessus ("/", "/contact", "/blog") déclencheront le middleware
// qui renverra 404 et le message
app.use((req, res) => {
    res.status(404).send("Page non trouvée")
});

app.listen(port, () => {
    console.log("Serveur est en ligne !")
});   