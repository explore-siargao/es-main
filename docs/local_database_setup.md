## Local Database Setup (will be deprecated in June 2024)

We need to setup a local database for our development, the database and GUI we will be using is MySQL Server and MySQL Workbench. These are the links to download the softwares. Test message

### Windows:

- [MySQL Server](https://dev.mysql.com/get/Downloads/MySQL-8.3/mysql-8.3.0-winx64.msi)
- [MySQL Workbench](https://dev.mysql.com/get/Downloads/MySQLGUITools/mysql-workbench-community-8.0.36-winx64.msi)

### Mac:

- [MySQL Server](https://dev.mysql.com/get/Downloads/MySQL-8.3/mysql-8.3.0-macos14-arm64.dmg)
- [MySQL Workbench](https://dev.mysql.com/get/Downloads/MySQLGUITools/mysql-workbench-community-8.0.36-macos-arm64.dmg)

Install the two software in your computer and make sure you added a password in your MySQL Server installation, that password is for your MySQL.

Open the MySQL Workbench. Then, click the add button.

<a href="https://drive.google.com/file/d/1gx3lu2QB6fJ6UZraVWpLcxf4Rp4ww6P4/view?usp=sharing" target="_blank">Image Guide Link</a>

Add connection name to your new connection, put "Local" in it and click the Store in Keychain button below.

<a href="https://drive.google.com/file/d/17T6NnVphUqcmj2GXcY3FnbX31vEKAxED/view?usp=sharing" target="_blank">Image Guide Link</a>

By clicking the button, it will show a new window to input the password that you put in when you are installing the MySQL Server.

<a href="https://drive.google.com/file/d/1MWZJ3ZSCu8hhtxShG8Qvy9hKNUTuYkJg/view?usp=sharing" target="_blank">Image Guide Link</a>

After that just click this and it will connect to your database.

<a href="https://drive.google.com/file/d/1qr-zHeF4cssYw9bO-lepNCqVGsf6mhV_/view?usp=sharing" target="_blank">Image Guide Link</a>

We need to add two database, "es-db-dev" and "es-db-shadow", this is required by [Prisma](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/shadow-database).

Click the plus icon in the upper left part of MySQL Workbench. Add a "Schema Name" which is the database name. After you finish adding a name, just click the Apply button on the bottom right of the tab beside Revert button. You need to do it 2x for the two database.

<a href="https://drive.google.com/file/d/1XkbduVuwxouHoXZ_X_0Sf_tXrw35R6Y2/view?usp=sharing" target="_blank">Image Guide Link</a>

After adding the two database, open your .env file in the project root folder and add these two variables.

```
// NOTE: Only copy the 2 variables below
// Please note that you may have those two variables in your .env file, if you have, please rewrite those with these two.
// Please change the words "password" below with the password that you put in when you are installing the MySQL Server

DATABASE_URL=mysql://root:password@localhost:3306/es-db-dev
SHADOW_DATABASE_URL=mysql://root:password@localhost:3306/es-db-shadow
```

After adding those two variables in your .env file, run this command in your terminal under project root folder.

`npx prisma db push`

In order to verify if the setup is correct, go to your MySQL Workbench and open es-db-dev database Tables and check there are existing tables.

<a href="https://drive.google.com/file/d/1BjHw8BCGgOxtsK0QKCu9dgzNtmWy60OJ/view?usp=sharing" target="_blank">Image Guide Link</a>

If there are tables, you are good to go. If you don't see any, please contact John or Ramil.
