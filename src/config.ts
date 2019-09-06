import os from 'os'
import { EditorsMap } from "./commands/open";
import {DailiesConfiguration } from "./utils/dailies"

export interface Configuration {
    defaultEditor?: string
    allEditors?: EditorsMap
    dailies?:DailiesConfiguration
}

export async function loadConfig(): Promise<Configuration> {
    const fullPathToResolvedConfiguration = `${os.homedir()}/.jemfile.ts`
    try {
        const configuration = await import(fullPathToResolvedConfiguration)
        return configuration.default
    } catch (error) {
        console.error(`Failed to load '~/.jemfile.ts'`, error)
        return {}
    }
}
