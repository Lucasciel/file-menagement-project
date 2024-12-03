//importando 2 bibliotecas nativas core modules
import fs from"fs";

//cria PASTA (pede local da pasta)
function createDirectory(dirPath) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dirPath, { recursive: true }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(`Directory '${dirPath}' created successfully`);
      }
    });
  });
}

//cria arquivo + conteudo dele (pede local dele)
//pode mudar conteudo de arquivo ja criado
function writeFile(filePath, content) {
  // Retorna uma Promise que resolve quando o arquivo é escrito
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, "utf8", (err) => {
      if (err) {
        reject(err); // Rejeita a Promise em caso de erro
      } else {
        resolve("File written successfully"); // Resolve a Promise indicando sucesso
      }
    });
  });
}

//mostra os arquivos que tem na pasta(pede local da pasta) (mesmo que digitar ls no terminal)
async function listFiles(dirPath) {
  return new Promise((resolve,reject)=> {
    fs.readdir(dirPath, (err, files) => {
      if(err) {
        reject(err);
      } else {
        resolve(files)
      }
    });
  });
}

//Ler conteudo do arquivo (pede local dele) (data é o conteudo do arquivo)
function readFile(filePath) {
  // Retorna uma Promise que resolve com o conteúdo do arquivo
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err); // Rejeita a Promise em caso de erro
      } else {
        resolve(data); // Resolve a Promise com o conteúdo do arquivo
      }
    });
  });
}


//apagar arquivo (pede local dele)
function deleteFile(filePath) {
  // Retorna uma Promise que resolve quando o arquivo é deletado
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        reject(err); // Rejeita a Promise em caso de erro
      } else {
        resolve("File deleted successfully"); // Resolve a Promise indicando sucesso
      }
    });
  });
}



export default {
  createDirectory,
  writeFile,
  listFiles,
  readFile,
  deleteFile,
};
