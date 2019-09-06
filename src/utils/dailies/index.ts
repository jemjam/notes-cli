import os from 'os'
import { Moment } from 'moment'
import moment = require('moment')
import { normalize } from 'path'
import {CliCommandContext} from "../../index"
import { loadConfig } from '../../config'
// import { pathExists } from 'fs-extra'
// import { stringify } from 'querystring'

const DEFAULT_HELP = 
`
DAILIES

Dailies are markdown files that we keep for every single day
These helpers are here for working with files that are created
day over day.

open [date]
    Open the file (already created) for this date
    If the file doesn't exist yet, offer to create it!

create [date]
    Create the ifle for this particular date
    If the file already exists, offer to open it instead

A "[date]" is either a date string (YYYY-MM-DD format) or one
of "today"/"tomorrow"/"yesterday"/"select"
`


export interface DailiesConfiguration {
    current?: string
    archived?: string
}

const longFormat = 'YYYY-MM-DD'

type DateString = 'today' | 'yesterday' | 'tomorrow'
type DateValuesMap = Record<DateString, Moment>

export const dateValues: DateValuesMap = {
    today: moment(),
    yesterday: moment().subtract(1, 'day'),
    tomorrow: moment().add(1, 'day'),
}

export interface FormattedDateValues {
    [dateString: string]: string
}

export const resolveDailyFilePath = (dayArg: DateString): string => {
    const dayMoment = dateValues[dayArg]
    const longFormat = 'YYYY-MM-DD'
    const weekNumber = dayMoment.week()
    const filePath = `current/week${weekNumber}/${longFormat}.md`
    return filePath
}

/**
 * @function resolveBaseDir TESTED!
 * Used to process a configuration value for the root directory to work within
 * Provide a baseDir path (as either a relative/absolute path) and have the
 * absolute path returned
 *
 * @param {string} baseDir  The basedirectory we want to build paths within
 * @returns {string} An absolute path (with relative/home segments cleaned up)
 */
export const resolveBaseDir = (baseDir: string): string => {
    // This might be a homedirectory
    if (baseDir.includes('~')) {
        baseDir = normalize(`${os.homedir()}${baseDir.split('~')[1]}`)
    }

    // A relative path is always treated as relative to home also
    if (baseDir.includes('.') || baseDir.includes('..')) {
        baseDir = normalize(`${os.homedir()}/${baseDir}`)
    }
    // Clean off trailing slashes as a rule
    if (baseDir.endsWith('/')) {
        baseDir = baseDir.slice(0, -1)
    }
    return baseDir
}

const placeholder = ():void => {
    console.log('This is a placeholder function')
}

const subCommand = {
    "open": placeholder,
    "create": placeholder,
}

const main = async (context:CliCommandContext): Promise<void> => {
    console.log('what', context)
    const { subCommands = [] } = context
    if (subCommands.length === 0) {
        console.log(DEFAULT_HELP)
    }
    if (subCommands.length > 0 && subCommand[subCommands[0]] === undefined) {


    }
    const config = await loadConfig()
    // const { dailies = defaultDailiesConfig } = config
    // const { current = "~/Documents/current" } = dailies


}
export default main

// export default function daily():void => {
//     console.log(DEFAULT_HELP)
//     return "hello"
// }
/**
 * @function pathInRoot
 * Create the full path to a file based on the input (moment) date
 *
 * @param {string} rootLocation The baseDir that we'd like to work against
 * @returns {function(validDate:Moment):string} A function we can use to construct paths based on dates
 */
export const pathInRoot = (rootLocation: string) => (
    validDate: Moment,
): string => {
    // Date components
    const weekNo = moment(validDate).format('WW')
    const fileName = moment(validDate).format(longFormat)

    const baseDir = resolveBaseDir(rootLocation)
    const normalized = `${baseDir}/week${weekNo}/${fileName}.md`
    return normalized
}


// export function dailyCreate(date: string): void {
//     // translate input date to a filepath
//     console.log('what about this?')
//     // const myFilePath = `~/${new Date()}.md`
//     const myFilePath = `~/potato.md`
//     const alteredPath = normalize(resolve(myFilePath))
//     console.log('the fullpath', alteredPath)
//     // pathExists(myFilePath, (err, exists):void => {
//     //     // if (err) console.error('There was an error:', err)
//     //     console.log('working oka?', exists)
//     // })
//     // fs.writeFile(myFilePath, 'this is the data', ( err ):void => {
//     //     if (err) console.error("This error", err)
//     //     console.log('Otherwise, we just made', myFilePath)
//     // })
//     // if the file exists, error out entirely
//     // write the template in the appropriate place
// }

// const formatDates = (dateMap: DateValuesMap): FormattedDateValues => {
//     // Return a map of formatted day stamps.
//     // const longFormat = 'YYYY-MM-DD'
//     // const formattedStrings: FormattedDateValues = Object.keys(dateMap).map(
//     //     (key: string): any => {
//     //         return moment(dateMap[key]).format(longFormat)
//     //     },
//     // )
//     // // Object.keys(dateMap).forEach((key:string): void => {
//     // //     formattedStrings[key] = dateMap[key].format(longFormat)
//     // // })
//     // return formattedStrings
// }
// export const formattedDateValues = formatDates(dateValues)
