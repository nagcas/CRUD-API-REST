# Progetto con NodeJS e MongoDB (versione con require)

### Semplice CRUD di una collezione di libri composto da questo schema:
```
{
    title: String,
    author: String,
    genre: String,
    publication_date: String,
    original_lenguage: String,
}
```

### Dipendenze da installare con npm:<br>
```
1. npm install nodemon --save-dev
2. npm install dotenv 
3. npm install express
4. npm install mongoose
5. npm install body-parser
```

### Configurare il file .env
```
PORT=inserisci-un-valore-della-porta-da-utilizzare-es.3000

MONGO_URL=inserisci-la-url-di-mongodb-personale
MONGO_DB_NAME=books
```
