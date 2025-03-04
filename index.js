import chalk from 'chalk';
import http from 'http';
import fs from 'fs';
import axios from 'axios';

const PORT = 8000;
const localhost = 'localhost';

console.log(chalk.red('Alice'));
console.log(chalk.green('Lucie'));
console.log(chalk.blue('Maxime'));
console.log(chalk.yellow('David'));

const server = http.createServer((request, response) => {
    response.end('<h1>Hello World</h1>');
});

server.listen(PORT, localhost, () => {
    console.log(`Server is running on ${localhost}:${PORT}`);
    

    fs.writeFile('message.txt', 'Test', (err) => {
      if (err) {
        console.error('Erreur écriture du fichier :', err);
        return;
      }
      console.log('Fichier créé et écrit');
      

      fs.readFile('message.txt', 'utf8', (err, data) => {
        if (err) {
          console.error('Erreur lecture du fichier :', err);
          return;
        }
        console.log('Contenu du fichier :');
        console.log(data);

        // bonus
        axios.get('http://www.google.com/')
        .then(response => {
          
          fs.writeFile('google.html', response.data, (err) => {
            if (err) {
              console.error('Erreur écriture du fichier Google :', err);
              return;
            }
            console.log('Google a été enregistrée dans google.html');
          });
        })
        .catch(error => {
          console.error('Erreur récupération de la page Google :', error);
        });
    });
  });
});