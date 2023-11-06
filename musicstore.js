const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
 
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;
 
mongoose.connect('mongodb://127.0.0.1:27017/musicstore',
{  
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
});
 
const usuarioSchema = new mongoose.Schema({
    email: {type: String, required: true,},
    senha: {type : String},
  });
 
const Usuario = mongoose.model('Usuario', usuarioSchema);
 
app.post("/cadastrarUsuario", async (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;
 
    if (email == null || senha == null) {
        return res.status(400).json({ error: "Preencha todos os campos" });
    }
 
    const emailExiste = await Usuario.findOne({ email: email });
    if (emailExiste) {
        return res.status(400).json({ error: "O e-mail já esta cadastrado!" });
    }
 
    const usuario = new Usuario({
        email: email,
        senha: senha,
    });
 
    try {
        const newUsuario = await usuario.save();
        res.json({ error: null, msg: "Cadastro ok", usuarioId: newUsuario._id });
    } catch (error) {
        res.status(400).json({ error });
    }
});
 

 
const produtoMusicalSchema = new mongoose.Schema({
    id_produtoMusical: {type: String, required: true},
    descricao: {type : String},
    marca: {type : String},
    dataFabricacao: {type : Date},
    produtoEstoque: {type : Number}
});

const ProdutoMusical = mongoose.model('produtoMusical', produtoMusicalSchema);
 
app.post("/cadastrarProdutoMusical", async (req, res) => {
    const id_produtoMusical = req.body.id_produtoMusical;
    const descricao = req.body.descricao;
    const marca = req.body.marca;
    const dataFabricacao = req.body.dataFabricacao;
    const produtoEstoque = req.body.produtoEstoque;
 
    if (id_produtoMusical == null || descricao == null || marca == null || dataFabricacao == null || produtoEstoque == null) {
        return res.status(400).json({ error: "Preencher todos os campos" });
    }
 
    const id_produtoMusicalExiste = await ProdutoMusical.findOne({ id_produtoMusical:id_produtoMusical});

    if (id_produtoMusicalExiste) {
        return res.status(400).json({ error: "O produto já existe!!!" });
    }
 
    const produtoMusical = new ProdutoMusical ({
        id_produtoMusical : id_produtoMusical ,
        descricao: descricao,
        marca: marca,
        data_fabricacao: dataFabricacao,
        produto_estoque: produtoEstoque
    });
 
    try {
        const newProdutoMusical = await produtoMusical.save();
        res.json({ error: null, msg: "O cadastro esta ok", produtoMusicalId: newProdutoMusical});
    } catch (error) {
        res.status(400).json({ error });
    }
});

app.get("/cadastrarUsuario", async(req, res)=>{
    res.sendFile(__dirname +"/cadastrarUsuario.html");
});
 
app.get("/cadastrarProdutoMusical ", async(req, res)=>{
    res.sendFile(__dirname +"/cadastrarProdutoMusical .html");
});
 
app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/index.html");
});
 
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
})