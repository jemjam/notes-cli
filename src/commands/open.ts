import cp from 'child_process'
import {promisify} from 'util'

import { SpawnOptions } from 'child_process'

// const util = require('util')
// const exec = util.promisify(require('child_process').exec)
const exec = promisify(cp.exec)
const spawn = promisify(cp.spawn)

// async function lsExample() {
//     const { stdout, stderr } = await exec('ls')
//     console.log('stdout:', stdout)
//     console.log('stderr:', stderr)
// }
// lsExample()

const params = {}
export default async function openFile(filePath: string): Promise<void> {
    const options:SpawnOptions = {
        detached: true,
    }
    const result = await spawn(`ia ${filePath}`, options)
    if (result.stderr) console.error(result.stderr)
    console.log(result.stdout)
    // const editor = 'vim' // this shouldn't be hardcoded, read from config
    // cp.exec('vim ~/demo-file.md', (err, stdout):void => {
    //     if (err) {
    //         console.error(err)
    //         return
    //     } else {
    //         console.log('Yeah', stdout)
    //         process.exit(0)
    //     }
    // })
    // let promise: Promise<void> = new Promise((resolve, reject): void => {
    //     cp.exec(filePath, params, (err, data): void => {
    //         if (err) reject(err)
    //         else resolve(data)
    //     })
    // })
    // return promise
}
