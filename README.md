# Project Name

Short description of your project.

## Prerequisites

Ensure you have the following software installed:

- .NET SDK 7.0
- Node.js and Yarn or npm
- SQL Server
- SQL Server Management Studio (SSMS) or equivalent

## Installation Steps

### 1. Clone the repository:

```bash
git clone https://github.com/ZTianWang/MSA-project.git
```

### 2. Database Setup:

Import the Db_Msa.bak file into SQL Server.
Navigate to your SQL Server's Binn directory and run:
```bash
cd C:\Program Files\Microsoft SQL Server\[Version]\MSSQL\Binn
sqlcmd -S [Your Server Name] -U [Username] -P [Password] -Q "RESTORE DATABASE Db_Msa FROM DISK = '[Path to your project]\Db_Msa.bak'"
```
Note: Adjust the above commands based on your environment.

### 3. Configuring Database Connection:

Open the appsettings.json located in backend/MsaBackend directory. Locate (or add if not present) the ConnectionStrings section and modify it to match your database setup:
```json
"ConnectionStrings": {
    "SqlServerConnection": "Server=[Your Server Name]; DataBase=Db_Msa; Trusted_Connection=true; TrustServerCertificate=true;"
```
Make sure to replace [Your Server Name] with your actual SQL Server name.

### 4. Backend Setup:

Navigate to the backend directory and run the project:
```bash
cd backend/WebApplication1
dotnet run MsaBackend
```
After starting the backend, navigate back to the main directory:
```bash
cd ../..
```

### 5. Frontend Setup:

Navigate to the frontend directory, install dependencies and run:
```bash
cd frontend
yarn install
yarn run start
```
or
```bash
cd frontend
npm install
npm run start
```

## Usage
Place watch the video below to see how to run the application:
[https://youtu.be/9Q1Q3Z2QY4c](https://drive.google.com/file/d/1rPMUN0w66kGVV4GHn8Y39689zbWMX93p/view?usp=drive_link)https://drive.google.com/file/d/1rPMUN0w66kGVV4GHn8Y39689zbWMX93p/view?usp=drive_link
