#!/usr/bin/env node
import inquirer from 'inquirer'
import moment from 'moment'

console.log('Welcome to notescli.')
import { Question, Answers } from 'inquirer'
import imgdatepicker from 'inquirer-datepicker'

inquirer.registerPrompt(
    'datetime',
    imgdatepicker as inquirer.prompts.PromptConstructor,
)

interface DateQuestion extends Question {
    format: string[];
    initial: Date;
}

// An example of a date question in action.
const myQuestion: DateQuestion = {
    name: 'note',
    message: 'This asks for a specific date:',
    type: 'datetime',
    format: ['DD', '-', 'MM', '-', 'YYYY', ' ', 'ddd'],
    initial: new Date(),
}

inquirer
    .prompt([myQuestion])
    .then((answers: Answers): void =>
        console.log(
            'We got answers \n',
            moment(answers.note).format('dddd MMMM Do[,] YYYY'),
        ),
    )
