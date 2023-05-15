export type OnChoised = (answer: string) => void;

export class Choice {
    presentation: string;
    onChoised: OnChoised;

    constructor(
        presentation: string,
        onChoised: OnChoised
    ) {
        this.presentation = presentation;
        this.onChoised = onChoised;
    }
}