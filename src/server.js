// Dados:
const proffys = [
  {
    name: 'Diego Fernandes',
    avatar:
      'https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4',
    whatsapp: '999998888',
    bio:
      'Entusiasta das melhores tecnologias de química avançada.<br /><br />Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.',
    subject: 'Química',
    cost: '20',
    weekday: [0],
    time_from: [720],
    time_to: [1220],
  },
  {
    name: 'Mayk Brito',
    avatar:
      'https://avatars2.githubusercontent.com/u/6643122?s=460&amp;u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&amp;v=4',
    whatsapp: '999997777',
    bio:
      'Instrutor de Educação Física para iniciantes, minha missão de vida é levar saúde e contribuir para o crescimento de quem se interessar.<br /><br />Comecei a minha jornada profissional em 2001, quando meu pai me deu dois alteres de 32kg com a seguinte condição: "Aprenda a fazer dinheiro com isso!"',
    subject: 'Educação física',
    cost: '40',
    weekday: [1],
    time_from: [720],
    time_to: [1220],
  },
  {
    name: 'Tiago Luchtenberg',
    avatar: 'https://miro.medium.com/fit/c/128/128/0*Z6EMjuN8f_sw0-b6',
    whatsapp: '999996666',
    bio:
      'As vezes não sei nem onde eu tô, mas consigo me localizar facilmente em qualquer lugar. Tenho memória fotográfica e nunca fico perdido.<br /><br />Eu ensino a galera como não se perder na vida, com lições geográficas simples pra você nunca mais precisar de mapa na sua bela vida.',
    subject: 'Geografia',
    cost: '360',
    weekday: [1],
    time_from: [720],
    time_to: [1220],
  },
];

const subjects = [
  'Artes',
  'Biologia',
  'Ciências',
  'Educação física',
  'Física',
  'Geografia',
  'História',
  'Matemática',
  'Português',
  'Química',
];

const weekdays = [
  'Domingo',
  'Terça-feira',
  'Quarta-feira',
  'Segunda-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

// Funcionalidades:

function getSubject(subjectNumber) {
  const arrayPosition = +subjectNumber - 1;
  return subjects[arrayPosition];
}

function pageLanding(req, res) {
  return res.render('index.html');
}

function pageStudy(req, res) {
  const filters = req.query;
  return res.render('study.html', {
    proffys,
    filters,
    subjects,
    weekdays,
  });
}

function pageGiveClasses(req, res) {
  const data = req.query;

  // se tiver dados
  const isNoEmpty = Object.keys(data).length > 0;
  if (isNoEmpty) {
    data.subject = getSubject(data.subject);
    // adicionar dados a lista de proffys
    proffys.push(data);

    return res.redirect('/study');
  }

  //se nao, mostrar a pagina
  return res.render('give-classes.html', { subjects, weekdays });
}

// Servidor:
const express = require('express');
const server = express();

// configurar nunjucks (template engine):
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', { express: server, noCache: true });

// Inicio e config do servidor:
server
  // configurar arquivos estáticos (CSS, Scripts, Imagens)
  .use(express.static('public'))
  // rotas da aplicação
  .get('/', pageLanding)
  .get('/study', pageStudy)
  .get('/give-classes', pageGiveClasses)
  // start do servidor
  .listen(5500);
