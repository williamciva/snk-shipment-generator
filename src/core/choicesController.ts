import { Choice } from "./types/choice";

export class ChoicesController {
    choices: Choice[]

    constructor(choices: Choice[]) {
        this.choices = choices;
    }

    getChoices = (): string[] => this.choices.map((i) => i.presentation)
    findChoice = (choice: string): Choice | undefined => this.choices.find((prompt) => prompt.presentation === choice)
}