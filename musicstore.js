const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express ();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;

const PessoaSchema = new mongoose.Schema({
    nome : {type : String},
    email : {type : String, required : true},
    endereco : { type : String},
    numero : {type : Number},
    cep : {type : String, required : true},
    nascimento : {type : Date, required : true}
    });
