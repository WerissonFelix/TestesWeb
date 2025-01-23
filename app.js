
// Definindo as varíaveis constantes
const express = require('express');
const app = express();

const db = require('./config/base');

// Métodos que envolvem o banco de dados

// async function são funções que dão resutados por baixo dos panos, uma promise.

async function testarConexao () { // Testa a coneção do js com o bd
    try {
        await db.authenticate(); // O await faz a função parar até receber o resultado da promise do DB  
        console.log('Tudo certo com a coneção');
    } catch (error){ 
        console.error('Algo deu errado ao tentar fazer a coneção', error);
    }

};

testarConexao();

// Sincronizando o DB com o js

const Aluno = require('./models/aluno.model.js');

async function sincronizarDB() {
    try {
        await db.sync({ force: false});
        console.log('Tudo certo com a sincronização do DB');
    } catch (error) {
        console.error('Algo deu errado na sincronização', error);
    }
}
sincronizarDB();

// Manipulando tabelas

async function addAluno(){
    const aluno = await Aluno.create({nome: 'Osvaldo', idade: 16, cpf: '123445'});
    
    console.log(`Aluno adicionado: ${aluno.nome} - ${aluno.idade} - ${aluno.cpf}`);

}
 

async function getAlunoById(id){
    const aluno = await Aluno.findByPk(id);

    if (aluno){
        getAluno(aluno);
    } else {
        console.log(`O aluno com id ${id} não foi encontrado.`);
    }
}

function getAluno(aluno){
    console.log(`id: ${aluno.id} | Nome: ${aluno.nome} | cpf: ${aluno.cpf}`);
    console.log(' ');
}

async function listarAlunos(){
    const alunos = await Aluno.findAll();

    alunos.forEach(aluno => {
        getAluno(aluno);
    });
}
listarAlunos();
// Métodos http para gerenciar as rotas

app.listen(3000, () => {
    console.log('Servidor tá rodando');
});

app.get('/', (req, res) => {
    res.send('Tudo em ordem!');
})