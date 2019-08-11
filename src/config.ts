import process from 'process'
import os from 'os'

export interface NotesConfig {
    defaultEditor: string
    dailiesRoot: string
}

// Get .jemfile.ts if it exists.
const defaultConfig: NotesConfig = {
    dailiesRoot: '~/Documents/',
    defaultEditor: process.env.EDITOR || 'vim',
}

export async function loadConfig(): Promise<NotesConfig> {
    const fullPathToResolvedConfiguration = `${os.homedir()}/.jemfile.ts`
    try {
        const configuration = await import(fullPathToResolvedConfiguration)
        const loadedConfig = configuration.default
        return {
            ...defaultConfig,
            ...loadedConfig,
        }
    } catch (error) {
        console.error(`Failed to load '~/.jemfile.ts'`)
        console.log('Using default configuration instead...')
        return defaultConfig
    }
}
