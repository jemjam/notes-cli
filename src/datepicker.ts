
import inquirer, { Question } from 'inquirer'
import imgdatepicker from 'inquirer-datepicker'

inquirer.registerPrompt(
    'datetime',
    imgdatepicker as inquirer.prompts.PromptConstructor,
)

interface DateQuestion extends Question {
    format: string[]; // Moment.js string format as array of editables
    initial: Date;
}

// An example of a date question in action.
export const dateQuestion: DateQuestion = {
    name: 'note',
    message: 'This asks for a specific date:',
    type: 'datetime',
    format: ['DD', '-', 'MM', '-', 'YYYY', ' ', 'ddd'],
    initial: new Date(),
}