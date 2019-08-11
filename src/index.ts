#!/usr/bin/env node
import inquirer from 'inquirer'
import moment from 'moment'
import cp from 'child_process'
// import minimist from 'minimist'
import os from 'os'

import { Answers } from 'inquirer'
import { dateQuestion } from './datepicker'
import { NotesConfig } from './config'

// inquirer.prompt([dateQuestion]).then((answers: Answers): void => {

//     // console.log('load up some config bro', os.homedir())
//     console.log(
//         'We got answers \n',
//         moment(answers.note).format('dddd MMMM Do[,] YYYY'),
//     )
// })
interface ConfigWithAnswers {
    nextPromise: Answers
    config: NotesConfig
}

import { loadConfig } from './config'
const configuration = await loadConfig()
    .then((conf:NotesConfig): ConfigWithAnswers => {
        console.log('We loaded configuration', conf)
        return {
            nextPromise: inquirer.prompt([dateQuestion]),
            config: conf,
        }
    })
    .then((answers:ConfigWithAnswers): void => {
        console.log(
            'We got answers \n',
            moment(answers.note).format('dddd MMMM Do[,] YYYY'),
        )
        cp.spawn(config.defaultConfig,  (err:Error, val:any): void => {
            console.log('and all was done', val)
        })
        // return cp.spawn("ls ~")
    })
