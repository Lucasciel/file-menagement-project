import fileManager from"./fileManager.js"; //arquivo js com as funções de fs
import readlineSync  from "readline-sync"; //biblioteca para pegar dado do usuario
import path  from "path"; // path.join é biblioteca para criar local da pasta

import url, { fileURLToPath } from 'url'; //usamos para pegar a variavel global __dirname

async function main() {
  //constrói o caminho da pasta principal
  //__dirname é o local atual da pasta em my_files é mais uma pasta que será criada abaixo

  //__dirname é variavel global e precisa ser inportada
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const baseDir = path.join(__dirname, "my_files");

  //responsavel por criar a pasta, na localização de path, e ja coloca nome nela
  fileManager.createDirectory(baseDir); //faz mkdir

  while (true) {
    console.log("\nMenu:");
    console.log("1. Criar arquivo");
    console.log("2. Listar arquivo");
    console.log("3. Ler arquivo");
    console.log("4. Escrever conteudo do arquivo");
    console.log("5. Deletar arquivo");
    console.log("6. Sair");

    const choice = readlineSync.question("Ecolha uma opcao: ");

    try {
      switch (choice) {
        case "1":
          //pegar dados que usuario digitar
          const fileName = readlineSync.question("Digite o nome do arquivo: ");
          const fileContent = readlineSync.question(
            "Digite o conteudo ou deixe em branco: "
          );

          //crição de caminho, pasta com nome do arquivo , conteudo do arquivo
          const createFilePath = path.join(baseDir, fileName); //caminho do arquivo novo, mesma pasta + nomearquivo
          const fileMessage = await fileManager.writeFile(createFilePath,fileContent); //cria arquino +conteudo

          console.log(fileMessage); // espera ser criado para depois mostrar que foi criado
          break;

        case "2":
          //acionamos a função de mostrar arquivos quando digitar 2
          const files = await fileManager.listFiles(baseDir);
          console.log("Arquivos da pasta:", files);
          break;

        case "3":
          //mostrar conteudo do arquivo desejado,
          //usuario digita so o nome do arquivo e nós rastreamos na pasta base
          const readFileName = readlineSync.question(
            "digite o nome do arquivo: "
          ); //arquivo
          const readFilePath = path.join(baseDir, readFileName); //edereço do arquivo na pasta base

          //usamos a função fs.readFile que mostra o conteudo do arquivo
          const content = await fileManager.readFile(readFilePath);
          console.log("Conteudo do arquivo:", content);
          break;

        case "4":
          //escrever conteudo do arquivo ja criado
          //pegamos local do arquivo + conteudo novo
          const perguntaArquivo = readlineSync.question('qual o nome do arquivo? ')
          const localDoArquivo = path.join(baseDir,perguntaArquivo)
          const perguntaConteudo = readlineSync.question("digite o conteudo: ")

          //adicionamos conteudo ao arquivo
          const reescreverConteudo = await fileManager.writeFile(localDoArquivo, perguntaConteudo)
          console.log("Arquivo escrito:", reescreverConteudo);
          break;
        case "5":
        //deletar arquivo
        //pegamos o nome do arquivo para deletar
        const perguntaArquivoDeletar = readlineSync.question('qual o nome do arquivo que quer deletar? ')
        const localDoArquivoDeletar = path.join(baseDir,perguntaArquivoDeletar)

        //com a rota do arquivo dentro da pasta, esperamos deletar e respondemos.
        const deletar = await fileManager.deleteFile(localDoArquivoDeletar)
          console.log("Arquivo deletado");
          break;
        case "6":
          console.log("saindo..");
          return;
        default:
          console.log("opção inválida");
      }
    } catch (err) {
      console.log(err);
    }
  }
}

main();
