import boxen from 'boxen';
import inquirer from 'inquirer';
import { Choice, OnChoised } from '@/core/types/choice';
import { ChoicesController } from '@/core/choicesController';


const quests = () => {
    inquirer
        .prompt([
            {
                name: "choice",
                message: "Acabei de detectar que essa é a primeira vez que você utiliza o CLI. Vamos configura-lo?",
                type: "checkbox",
                validate: (input) => {
                    return input.length === 1 ? true : 'Por favor marque uma opção.'
                },
                choices: prompts.getChoices(),
            }
        ])
        .then((answers) => {
            const choised = answers.choice[0]
            const prompt = prompts.findChoice(choised);
            prompt?.onChoised(choised);
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log(error)
            } else {
                console.log(error)
            }
        });
}



const configureCli: OnChoised = (answer: string) => {
    console.log(answer)
    console.log('entre aq')
}


const prompts: ChoicesController = new ChoicesController([
    new Choice("Sim, me ajude a configurar o CLI.", configureCli),
    new Choice("Não, vou configura-lo mais tarde.", () => { console.clear(); process.exit }),
])

export const firstLogin = () => {
    console.log(
        boxen('Bem Vindo ao Sankhya Gerador de Arquivos de Remessa', { padding: 1 }),


    )
    quests();
}
