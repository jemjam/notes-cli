import cp, { ChildProcess, SpawnOptions } from 'child_process'

type Command = string

// Simple mapping of editor names to strings
export interface EditorsMap {
    [key: string]: Command
}

// Register common handlers on a ChildProcess to log output
// not needed at run time typically if the process spawns correctly? (verify?)
const registerHandlers = (Process: ChildProcess): void => {
    const { error, log } = console
    Process.on('error', (err): void => error('Process Error', err))
        .on('message', (m): void => log('Process Message:', m))
        .on('close', (): void => log('Process closed.'))

    if (Process.stderr) {
        Process.stderr.on('error', (d): void => error('Error:', d))
    }
    if (Process.stdout) {
        Process.stdout.on('data', (d): void => log('Data:', d))
    }
}

import { CliCommandContext } from '../index'
import { loadConfig } from '../config'

export async function openFileWithEditor(
    filePath: string, // The actual file to open
    editor: Command = '$EDITOR', // What command to run to open this file
): Promise<ChildProcess> {
    const options: SpawnOptions = {
        shell: true,
        detached: true,
        stdio: 'inherit',
    }

    const result: ChildProcess = cp.spawn(editor, [filePath], options)

    registerHandlers(result)
    return result
}

type OpenCliParameters = CliCommandContext & {
    parameters: { e?: string; editor?: string }
}

export default async function open(context: OpenCliParameters): Promise<void> {
    const { parameters = {} } = context
    const config = await loadConfig()
    const { allEditors = {}, defaultEditor = '$EDITOR' } = config

    let editorKey: string = defaultEditor
    if (parameters.e || parameters.editor) {
        const { e, editor } = parameters
        const val = e || editor
        if (typeof val === 'string') {
            editorKey = val
        }
    }

    const commandToRun = allEditors[editorKey]
        ? allEditors[editorKey]
        : editorKey

    const EditInstance = await openFileWithEditor('~/readme.md', commandToRun)
    return
}
