# Error Handling

## General Error Handling Pattern

```typescript
try {
  // Attempt the operation
} catch (error) {
  if (error instanceof SpecificError) {
    // Handle specific error type
  } else if (error instanceof AnotherSpecificError) {
    // Handle another specific error type
  } else {
    // Handle general errors
  }
  // Optionally, rethrow or return an error response
}
```

## Common Mongoose Errors and How to Handle Them

1. ValidationError
   - Occurs when a document fails validation
   - How to identify: `error instanceof mongoose.Error.ValidationError`
   - Handling:
     ```typescript
     if (error instanceof mongoose.Error.ValidationError) {
       const validationErrors = Object.values(error.errors).map(err => err.message);
       // Return or throw with validationErrors joined
     }
     ```

2. CastError
   - Occurs when an invalid value is provided for a field type (e.g., invalid ObjectId)
   - How to identify: `error instanceof mongoose.Error.CastError`
   - Handling:
     ```typescript
     if (error instanceof mongoose.Error.CastError) {
       // Handle invalid data format, often for IDs
     }
     ```

3. DocumentNotFoundError
   - Occurs when a document is not found (e.g., in findOne() operations)
   - How to identify: `error instanceof mongoose.Error.DocumentNotFoundError`
   - Handling:
     ```typescript
     if (error instanceof mongoose.Error.DocumentNotFoundError) {
       // Handle document not found scenario
     }
     ```

4. MongooseError
   - Base class for all Mongoose errors
   - How to identify: `error instanceof mongoose.Error`
   - Handling:
     ```typescript
     if (error instanceof mongoose.Error) {
       // Handle general Mongoose errors
     }
     ```

5. MongoError (from MongoDB driver)
   - Occurs for database-level errors (e.g., network issues, duplicate keys)
   - How to identify: `error.name === 'MongoError'` or `error.code` for specific MongoDB error codes
   - Handling:
     ```typescript
     if (error.name === 'MongoError') {
       if (error.code === 11000) {
         // Handle duplicate key error
       } else {
         // Handle other MongoDB errors
       }
     }
     ```

## Best Practices

1. Use specific error types when possible for more granular handling.
2. Provide clear, informative error messages.
3. Log errors for debugging (but be careful not to log sensitive information).
4. Consider creating custom error classes for application-specific errors.
5. Use async/await with try/catch for cleaner error handling in asynchronous code.
6. Validate input data before performing database operations to catch errors early.
7. Use Mongoose schema validation to ensure data integrity at the model level.

## Example: Comprehensive Error Handling

```typescript
try {
  // Attempt operation
} catch (error) {
  if (error instanceof mongoose.Error.ValidationError) {
    // Handle validation errors
  } else if (error instanceof mongoose.Error.CastError) {
    // Handle cast errors (e.g., invalid ID format)
  } else if (error instanceof mongoose.Error.DocumentNotFoundError) {
    // Handle document not found
  } else if (error.name === 'MongoError') {
    // Handle MongoDB driver errors
  } else if (error instanceof mongoose.Error) {
    // Handle other Mongoose errors
  } else {
    // Handle unknown errors
  }
  // Log error, send appropriate response, etc.
}
```

Remember to import Mongoose errors at the top of your file:
```typescript
import mongoose, { Error as MongooseError } from "mongoose";
```