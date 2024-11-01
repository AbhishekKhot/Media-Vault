# MediaVault

MediaVault an efficient file sharing application

## Prerequisites to run locally

Node.js
Postgresql
copy env from .env.example

## Setup

npm install

## Migrations:

1. Run migration
   Command: 
   ```bash
   npm run up --database=your_database_name
   ```
   ```bash
   npm run down --database=your_database_name
   ```

2. Create a New Model
   Command:
   ```bash
    npm run create-model --name=<model_name> --columns="<column1:type,column2:type,...>"
   ```
   Example:
   ```bash
   npm run create-model --name=User --columns="firstName:string,lastName:string,email:string"
   ```

3. Alter a Column
   Command:
   ```bash
   npm run alter-column --table=<table_name> --column=<column_name> --new-type=<new_data_type>
   ```
   Example:
   ```bash
   npm run alter-column --table=Users --column=age --new-type=integer
   ```

4. Delete a Column
   Command:
   ```bash
   npm run delete-column --table=<table_name> --column=<column_name>
   ```
   Example:
   ```bash
   npm run delete-column --table=Users --column=middleName
   ```

5. Run a Specific Seed File
   Command:
   ```bash
   npm run seed-specific -- <seed-file-name>
   ```
   Example:
   ```bash
   npm run seed-specific -- 20231027000000-demo-user.js
   ```
