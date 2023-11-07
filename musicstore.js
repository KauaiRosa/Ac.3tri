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
        return res.status(400).json({ error: "Preencher todos os campos" });
    }
 
    const emailExiste = await Usuario.findOne({ email: email });
    if (emailExiste) {
        return res.status(400).json({ error: "O e-mail cadastrado já existe!!!" });
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
 
app.get("/cadastrarUsuario", async(req, res)=>{
    res.sendFile(__dirname +"/form-user.html");
});
 
const produtoMusicaSchema = new mongoose.Schema({
    id_produtoMusica: {type: String, required: true,},
    descricao: {type : String},
    marca: {type : String},
    data_fabricacao: {type : Date},
    quantidade_estoque: {type : Number},
  });
 
  const ProdutoMusica = mongoose.model('ProdutoMusica', produtoMusicaSchema);
 
app.post("/cadastrarProdutoMusica", async (req, res) => {
    const id_produtoMusica = req.body.id_produtoMusica;
    const descricao = req.body.descricao;
    const marca = req.body.marca;
    const data_fabricacao = req.body.data_fabricacao;
    const quantidade_estoque = req.body.quantidade_estoque;
 
    if (id_produtoMusica == null || descricao == null || marca == null || data_fabricacao == null || quantidade_estoque == null) {
        return res.status(400).json({ error: "Preencher todos os campos" });
    }

    if (quantidade_estoque <= 0 || quantidade_estoque > 37) {
        return res.status(400).json({ error: "A quantidade em estoque deve ser um valor menor ou igual a 37."});
    }
 
    const id_produtoMusicaExiste = await ProdutoMusica.findOne({ id_produtoMusica: id_produtoMusica });
    if (id_produtoMusicaExiste) {
        return res.status(400).json({ error: "O produto já existe!!!" });
    }
 
    const produtoMusica = new ProdutoMusica({
        id_produtoMusica: id_produtoMusica,
        descricao: descricao,
        marca: marca,
        data_fabricacao: data_fabricacao,
        quantidade_estoque: quantidade_estoque,
    });
 
    try {
        const newProdutoMusica = await produtoMusica.save();
        res.json({ error: null, msg: "Cadastro ok", produtoMusicaId: newProdutoMusica._id });
    } catch (error) {
        res.status(400).json({ error });
    }
});
 
app.get("/cadastrarProdutoMusica", async(req, res)=>{
    res.sendFile(__dirname +"/form-music.html");
});
 
app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/form-music.html");
});
 
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
})  

