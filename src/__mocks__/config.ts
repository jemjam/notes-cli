import { Configuration } from '../config'
const defaultConfig: Configuration = {}
let globalConfig = defaultConfig

export const setConfig = (config: Configuration): void => {
    globalConfig = { ...config }
    return undefined
}

export const resetConfig = (): void => {
    globalConfig = { ...defaultConfig }
}

export const loadConfig = jest.fn(
    async (): Promise<Configuration> => {
        return Promise.resolve({ ...globalConfig })
    },
)
