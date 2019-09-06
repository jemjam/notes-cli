import moment from 'moment'
import os from 'os'
jest.mock('os')
import { resolveBaseDir, pathInRoot } from '../index'
jest.mock('../../../config')

describe('resolveBaseDir creates file path that becomes basis of absolute path', (): void => {
    const homedir = os.homedir()
    test('(test prereq - ensure mocks are in place', (): void => {
        // Verify the mocks work - maybe not necessary but I feel better
        expect(homedir).toBe('/Users/jam')
    })

    test('relative path starting with dot', (): void => {
        const relativeChildPath = './myPath/is/relative'
        expect(resolveBaseDir(relativeChildPath)).toBe(
            `${homedir}/myPath/is/relative`,
        )
    })
    test('relative path starting with two dots', (): void => {
        const relativeParentPath = '../OtherUser/myPath/is/relative'
        expect(resolveBaseDir(relativeParentPath)).toBe(
            `/Users/OtherUser/myPath/is/relative`,
        )
    })
    test('absolute path is good and returned as is', (): void => {
        const absolutePath = '/usr/sys/myPath/is/in/root'
        expect(resolveBaseDir(absolutePath)).toBe(absolutePath)
    })
    test('path in homedir starts with tilde', (): void => {
        const homeBasedPath = '~/myPath/is/in/home'
        expect(resolveBaseDir(homeBasedPath)).toBe(
            `${homedir}/myPath/is/in/home`,
        )
    })
    test('double slashes are all normalized out', (): void => {
        // Trailing slashes are removed
        const homeBasedPathTrailing = '~/myPath//is/in/home//'
        expect(resolveBaseDir(homeBasedPathTrailing)).toBe(
            `${homedir}/myPath/is/in/home`,
        )
    })
    test('trailing slashes are automatically removed', (): void => {
        // Trailing slashes are removed
        const intendedInput = '~/myPath/is/in/home/'
        const expectedOutput = `${homedir}/myPath/is/in/home`
        expect(resolveBaseDir(intendedInput)).toBe(expectedOutput)
    })
    test('double trailing slashes are automatically removed', (): void => {
        // Trailing slashes are removed
        const intendedInput = '~/myPath/is/in/home/'
        const expectedOutput = `${homedir}/myPath/is/in/home`
        expect(resolveBaseDir(intendedInput)).toBe(expectedOutput)
    })
})

describe('constructDailyPath is a curried function', (): void => {
    const dateToTest = moment('1999-12-31')
    const currentFilePath = resolveBaseDir('/TEST/CURRENT/')

    test('the root portion of function can be changed depending on need', async (): Promise<
        void
    > => {
        const fileWithinRoot = pathInRoot(currentFilePath)
        const input = fileWithinRoot(dateToTest)
        const expectedOutput = `/TEST/CURRENT/week52/1999-12-31.md`
        expect(input).toBe(expectedOutput)
    })

    test('root paths can change (for archived?) and be validated separately', async (): Promise<
        void
    > => {
        const currentFilePath = resolveBaseDir('/TEST/ARCHIVED/')
        const fileWithinRoot = pathInRoot(currentFilePath)
        const input = fileWithinRoot(dateToTest)
        const expectedOutput = `/TEST/ARCHIVED/week52/1999-12-31.md`
        expect(input).toBe(expectedOutput)
    })
})
