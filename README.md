# 🤖 snk-shipment-generator 🤖

---

Essa aplicação tem como objetivo realizar o download de arquivos de remessa do ERP Sankhya.

**Obs:** Essa aplicação não está vinculada a empresa **Sankhya Gestão de Negócios**, sendo assim, a mesma é de completo código aberto.

---

# 🚀 **Começando**

A partir dessas instruções você conseguirá obter uma cópia atual do repositório em sua última versão. Podendo assim executar os códigos em modo **desenvolvimento** e  **produção**.

## **📋 Pré-requisitos**

Para rodar esse projeto em sua máquina será necessário ter instalado algumas ferramentas.

- [Git](https://git-scm.com/downloads)
- [Node JS](https://nodejs.org/en/download)

## 💡 Utilização

Para estar utilizando o programa será necessário criar os JSON’s que irão conter os layouts arquivo de remessa localizados no ERP Sankhya. Esse JSON tem alguns atributos necessário para o bem funcionamento da aplicação, por isso certifique-se de que o seu JSON está próximo do nosso modelo, disponível em [exemple.json](https://github.com/williamciva/snk-shipment-generator/blob/main/db/layouts/exemple.json).

## 💻 **Primeiros Passos**

Clone o repositório.

```bash
git clone https://github.com/williamciva/snk-shipment-generator.git
cd snk-shipment-generator
```

Instale as dependências.

```bash
npm i
```

## 🔔 ****Atenção**** 🔔

Para a execução do programa será necessário que seja feita a passagem de alguns parâmetros.

```bash
[ --u | --user ] "userNameHere" 
[ --p | --pasword ] "yourPassHere@2023"
[ --s | --server ] "http://your-server.com:8180"
[ --l | --log ]
[ --v | --verbose ]
[ --a | --attempts ] number | default: 1 "<here is the number of attempts we will try if errors occur in the request>"
```

## 👨🏻‍💻 **Development**

Para rodar em modo desenvolvimento execute:

```bash
npm run start:dev -- --u "USUARIO" --p "suaSenha@2023" --s "http://seu-servidor.com:8180" --l --v --a 3
```

## 🔥 **Production**

Para rodar em modo produção execute o build primeiramente e após execute o script node:

```bash
npm run build
npm run start -- --u "USUARIO" --p "suaSenha@2023" --s "http://seu-servidor.com:8180" --l --v --a 3
```

## 🛠 **Create a Executable**

Caso deseje criar um executável:

```bash
npm run build:exe
```

Para executar:

```bash
cd Sankhya_Arquivo_Remessa
./arquivoremessasnk.exe --u "USUARIO" --p "suaSenha@2023" --s "http://seu-servidor.com:8180" --l --v --a 3
```

## 🎇 Considerações Finais

Esse projeto é completamente dependente dos payloads que estão disponíveis nos JSON da pasta **./db/layouts/*.json** por isso é de extrema importância que os mesmo estejam configurados corretamente.

# ⚙ Ferramentas

## Produção

- [Axios](https://axios-http.com/ptbr/) - Cliente HTTP.
- [Boxen](https://github.com/sindresorhus/boxen#readme) - Caixas no terminal.
- [Chalk](https://github.com/chalk/chalk#readme) - Estilizar terminal.
- [Dontenv](https://github.com/motdotla/dotenv#readme) - Variáveis de ambiente.
- [Minimist](https://github.com/minimistjs/minimist#readme) - Parâmetros do usuário.

## Desenvolvimento

- [@types/node](https://github.com/DefinitelyTyped/DefinitelyTyped#readme) - Desenvolvimento em TS.
- [copyfiles](https://github.com/calvinmetcalf/copyfiles#readme) - Copiar Arquivos.
- [Nodemon](https://nodemon.io/) - Transpilar código TS.
- [PKG](https://github.com/vercel/pkg#readme) - Criar pacote exe.
- [Rimraf](https://github.com/isaacs/rimraf#readme) - Remover diretório não vazio.
- [TS-Node](https://typestrong.org/ts-node/) - Desenvolvimento em TS.
- [Typescript](https://www.typescriptlang.org) - Desenvolvimento em TS.

# 💪🏻 Contribuições

[williamciva ](https://github.com/williamciva)

# 📃 Licença

- Free
