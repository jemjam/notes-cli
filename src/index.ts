#!/usr/bin/env node
import inquirer from 'inquirer'

console.log('Welcome to notescli.')
import { Question, Answers } from 'inquirer'
import imgdatepicker from 'inquirer-datepicker-prompt'

inquirer.registerPrompt('datetime', imgdatepicker as inquirer.prompts.PromptConstructor)

interface DateQuestion extends Question {
    format: any[];
    initial: Date;
}

const myQuestion: DateQuestion = {
    name: 'note',
    message: 'This asks for a specific date:',
    type: 'datetime',
    format: ['yyyy','-', 'mm', '-', 'dd'],
    initial: new Date(),
}

inquirer
    .prompt([myQuestion])
    .then((answers: Answers): void => console.log('We got answers\n', answers))
