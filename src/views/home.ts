import boxen from 'boxen';
import inquirer from 'inquirer';
import { Choice } from '@/core/types/choice';
import { ChoicesController } from '@/core/choicesController';


const quests = () => {
    inquirer
        .prompt([
            {
                name: "choice",
                message: "O que deseja fazer?",
                type: "list",
                choices: prompts.getChoices(),
            }
        ])
        .then((answers) => {
            const choised = answers.choice
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


const prompts: ChoicesController = new ChoicesController([
    new Choice("Listar arquivos agendados", (answer: string) => console.log(answer)),
    new Choice("Agendar um novo arquivo", (answer: string) => console.log(answer)),
    new Choice("Listar todos os arquivos", (answer: string) => console.log(answer)),
    new Choice("Executar um agendamento", (answer: string) => console.log(answer)),
    new Choice("Executar todos os agendamentos", (answer: string) => console.log(answer)),
])


export const home = () => {
    console.log(
        boxen('Bem Vindo ao Sankhya Gerador de Arquivos de Remessa', { padding: 1 })
    )
    quests();
}