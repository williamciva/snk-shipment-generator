import readline from 'readline'
import printArquivos from './printArquivoRemessas'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const printMenu = (): string => {
  const menu = {
    "1": "Arquivos de Remessa Agendados",
    "2": "Agendar Novo Arquivo de Remessa"
  }

  let menuForm: string = "";
  let index: number = 0;
  for (let i in menu) {
    menuForm += `${i} - ${(menu as any)[i]}\n`
    index++;
  }
  return menuForm;
}

export default function () {
  console.log("Bem Vindo ao Sankhya Agendador de Arquivo de Remessa");
  rl.question(`O que deseja fazer?\n${printMenu()}`, option => {
    if (option === "1") {
      console.clear();
      printArquivos();
    } else
      if (option === "2") {
        null
      } else
        if (option === "3") {
          null
        }
  })
}