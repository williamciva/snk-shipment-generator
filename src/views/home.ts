import boxen from 'boxen';
import inquirer from 'inquirer';

export const home = () => {
    console.log(
        boxen('Bem Vindo ao Sankhya Gerador de Arquivos de Remessa', { padding: 1 })
    )
    quests();    
}

const quests = () => {
    inquirer
        .prompt([
            {
                name: "choice",
                message: "O que deseja fazer?",
                type: "list",
                choices: [
                    "Listar arquivos agendados",
                    "Agendar um novo arquivo",
                    "Listar todos os arquivos",
                    "Executar um agendamento",
                    "Executar todos os agendamentos",
                ]
            }
        ])
        .then((answers) => {
            (choicesMap as any)[answers['choice']](answers)
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log(error)
            } else {
                console.log(error)
            }
        });
}

const choicesMap: Object = {
    "Listar arquivos agendados": (answers: {}) => console.log(answers as any['choice']),
    "Agendar um novo arquivo": (answers: {}) => console.log(answers as any['choice']),
    "Listar todos os arquivos": (answers: {}) => console.log(answers as any['choice']),
    "Executar um agendamento": (answers: {}) => console.log(answers as any['choice']),
    "Executar todos os agendamentos": (answers: {}) => console.log(answers as any['choice']),
}