# Get Started

Waiting for improvement

先看中文

Before the `Gable` starts, you need to prepare the environment.
`Gable` does not have too many requirements for the running machine. It only needs to install a jdk8 environment.


## Database


`Gable` is developed based on the popular `Postgresql` by default,Therefore, before running the program, you need to prepare the database related environment.

Execute the following `sql`:
```sql
-- Create a database named app
create database gable with owner postgres;

-- Create an account and password to connect to the database 
-- (corresponding to the configuration in the code)
create user app with password '12345678';

-- Assign access
grant connect, create, temporary on database gable to app;

```
As for other database tables and indexes, they will be created automatically when the program starts.
