#!/usr/bin/env node
import inquirer from 'inquirer'
import moment from 'moment'
import process from 'process'
// import { Answers } from 'inquirer'
// import { dateQuestion } from './datepicker'
// import { loadConfig, NotesConfig } from './config'
import { ParsedArgs } from 'minimist'
import minimist = require('minimist');
import { dateValues, formattedDateValues } from './dailies';

// Main function, immediately executed
(async (): Promise<void> => {
    console.log('Holaa')

    const cliArgs: ParsedArgs = minimist(process.argv.slice(2))
    const config: NotesConfig = await loadConfig()

    const commandToRun = cliArgs._.length > 0 ? cliArgs._[0] : 'noCommand'
    switch (commandToRun) {
        case 'open': {
            console.log('open the file', formattedDateValues)
            break
        }
        case 'create': {
            console.log('create something great')
            break
        }
        case 'noCommand': {
            console.log('No command was given')
            break
        }
        default: {
            console.log("Your command wasn't valid")
            break
        }
    }
    console.log('arguments', cliArgs)

    // const answers:Answers = await inquirer.prompt([dateQuestion])
    // console.log('and some answers', answers)
})()
