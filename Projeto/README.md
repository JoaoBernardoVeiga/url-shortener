# TS Project
---

- [ ] Utiliza um _branch_ proprio para cada grupo de novos commits para cada _bugfix_ / nova implementacao

- [x] Cria um projecto em node e typescript
  - [ ] __BUGFIX:__ Corrige o problema em executar o comando `npm run start` para maquinas que nâo tenham o pacote _nodemon_ instalado. Neste momento o projeto nao corre.

- [x] Utiliza todas as dependencias necessarias (recomendo a biblioteca express) para disponibilizar uma API no browser em que up pedido __GET__ ao endereco `/api/hello_world` retorne um status __200__ e um texto com o conteudo "Adeus".

- [ ] Adiciona um linter (eslint) ao projeto. Adiciona também um script para correr o linter ao ficheiro _package.json_
- [ ] Cria um ficheiro [_docker-compose_](https://geshan.com.np/blog/2021/12/docker-postgres/) na pasta _docker_ que defina 1 container de postgres na versão __latest__. Depois de encontrares a mais recente, fixa-a.