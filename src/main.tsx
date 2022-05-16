import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import { createServer, Model } from 'miragejs';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2021-02-14 11:00:00'),
        }
      ]
    })
  },


  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    // resquest recebe os balores da requisição (cria o caminho para o post)
    this.post('/transactions', (schema, request)=> {
      const data = JSON.parse(request.requestBody) // retoma os dados da requisição (post) e converte de JSON para objeto

      return schema.create('transaction', data)
    }) 
  }
})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
