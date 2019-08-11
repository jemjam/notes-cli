#!/usr/bin/env node
import inquirer from 'inquirer'
import moment from 'moment'
import { Answers } from 'inquirer'
import { dateQuestion } from './datepicker'
import { loadConfig, NotesConfig } from './config'

// Main:
(async ():Promise<void> => {
    console.log('Holaa')

    const config:NotesConfig = await loadConfig()
    console.log('config async style', config)

    const answers:Answers = await inquirer.prompt([dateQuestion])
    console.log('and some answers', answers)

})()
