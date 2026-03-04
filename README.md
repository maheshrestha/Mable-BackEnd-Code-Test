# Mable Backend Code Test

A TypeScript banking system that loads account balances from a CSV file and processes daily transfers, validating each transaction and collecting errors for invalid rows while continuing to process valid ones.

I'm considering writing a CLI to utilize the service. It loads sample file paths from the arguments provided. 

### Implementation

This project implements a banking transfer system using TypeScript with the following architecture:

- **Domain Models**: `Account`, `Money`, and `Transfer` classes that encapsulate business logic with proper validation
- **Repository Pattern**: `AccountRepository` handles persistent storage and retrieval of account data
- **Service Layer**: `TransferService` orchestrates transfer operations with business rule validation
- **Controller**: `TransferController` manages CSV file parsing and coordinates the transfer process
- **Validation Utils**: Reusable validators for account numbers and numeric strings


### Running the code

```bash
npm install        # install dependencies
npm run build      # compile TypeScript to JavaScript
npm start path/to/balances.csv path/to/transfers.csv
npm test           # run all tests with coverage
```
