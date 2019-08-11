import { config } from 'rxjs'
import path from 'path'
import process from 'process'
import fs from 'fs'
import os from 'os'

// Load the `.jemfile` config file if it exists (user home)
// Keep track of and read application configuration values

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
        // console.log('default', loadedConfig)
        // console.log('config', configuration)
        return {
            ...defaultConfig,
            ...loadedConfig
        }
        return configuration
    } catch (error) {
        console.error(
            'Failed to load a .jemfile.ts',
            '\nUsing default configuration instead...',
        )
        return defaultConfig
    }
}
