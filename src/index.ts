import gerarArquivo from "./gerarArquivo"

process.argv.forEach((e, i) => {
    // console.log(`Element = ${e}`);
    // console.log(`Index = ${i}`);
});

console.clear();
(async () => await gerarArquivo())();