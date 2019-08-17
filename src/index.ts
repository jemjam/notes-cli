#!/usr/bin/env node
import process from 'process'
import openFileWithEditor from './commands/open'
import { ParsedArgs } from 'minimist'
import minimist = require('minimist')
// import { formattedDateValues } from './dailies'
import { version } from '../package.json'
import { loadConfig, Configuration } from './config'
import open from './commands/open'

interface ParameterHash {
    [key: string]: boolean | string
}

export interface CliCommandContext {
    command: string
    subCommands: string[] | undefined
    parameters: ParameterHash
}
interface CommandsHash {
    [key: string]: (context:CliCommandContext) => Promise<unknown>
}

const placeHolder = async (context:CliCommandContext): Promise<void> => {
    console.log('You did good kid', context)
}


// Main function, immediately executed
;(async (): Promise<void> => {
    console.log(`JemJamCli v${version}`)

    const cliArgs: ParsedArgs = minimist(process.argv.slice(2))
    if (cliArgs._.length === 0) {
        return console.log('No command supplied')
        // TODO: Maybe a good time to show some generic help
    }

    const { _, ...parameters } = cliArgs
    const [command, ...subCommands] = _
    const context: CliCommandContext = { command, subCommands, parameters }

    const commandsHash: CommandsHash = {
        open: open,
        create: placeHolder,
    }

    if (commandsHash[command]) await commandsHash[command](context)
    else console.error(`Command '${command}' not valid`)

})()

