
// Definindo as varíaveis constantes
const express = require('express');
const app = express();
const db = require('./config/base');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const Aluno = require('./models/aluno.model.js');

app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Rotas principais

app.listen(3000, () => {
    console.log('Servidor tá rodando');
});

app.get('/', async (req, res) => {
    let alunos = await Aluno.findAll();
    alunos = alunos.map((aluno) => aluno.dataValues);
    
    res.render('listarAlunos', { alunos });
  });
app.get('/AddAluno', async (req, res) => {
    res.render('addAluno');
})
app.post('/AddAluno', async (req, res) => {
    const { nome, idade, cpf } = req.body;
    await Aluno.create({ nome, idade, cpf });
    res.redirect('/');
});

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


const { GEOGRAPHY } = require('sequelize');

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

// pegar informações da tabela
 
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
//listarAlunos();

// Atualizar 

async function AtualizarAluno(id) {
    getAlunoById(id);
    const aluno = await Aluno.findByPk(id);
    novoNome = 'Ronaldo';
    novaIdade = 18;
    novoCpf = '21321'
    aluno.nome = novoNome;
    aluno.idade = novaIdade;
    aluno.cpf = novoCpf;
    aluno.save();
    getAlunoById(aluno.id)
}
AtualizarAluno(1);

async function excluirAluno(id){
    await Aluno.destroy({ where: { id: id}})
    try {   
        console.log(`O aluno ${getAlunoById(id)} não foi excluido`)
    } catch (error) {
        console.log('O aluno foi excluido');
    }
} 

//excluirAluno(2)