import { Moment } from 'moment'
import moment = require('moment')


interface DateValuesMap {
    [dateString: string]: Moment
}

export const dateValues: DateValuesMap = {
    today: moment(),
    yesterday: moment().subtract(1, 'day'),
    tomorrow: moment().add(1, 'day'),
}

export interface FormattedDateValues {
    [dateString: string]: string
}

const formatDates = (dateMap: DateValuesMap): FormattedDateValues => {
    // Return a map of formatted day stamps.
    const longFormat = 'YYYY-MM-DD'
    const formattedStrings: FormattedDateValues = {}
    Object.keys(dateMap).forEach((key): void => {
        formattedStrings[key] = dateMap[key].format(longFormat)
    })
    return formattedStrings
}

export const formattedDateValues = formatDates(dateValues)
