const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Database models
const Program = require('./models/programs');

mongoose
  .connect('mongodb://localhost:27017/program')
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

const seeds = [
  {
    title: 'Sorting arrays',
    description: 'program to sort arrays',
    language: 'Javascript',
    linesOfCode: 20,
  },
  {
    title: 'printing a name 100 times',
    description: 'program to print a name 100 time',
    language: 'Javascript',
    linesOfCode: 5,
  },
];

const seedDB = async () => {
  await Program.deleteMany({});
  Program.create(seeds)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

seedDB();
