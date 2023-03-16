# xls-data-retrieve
Node module that separate the data of rows of a xls file, in arrays.

## Functions
The module has two main functions:

```
  retrieveByPosition(filePath, columnArray, options)
```

```
  retrieveAll(filePath, options)
```

## Parameters
```filePath``` represents the path which the xls file is.

```columnArray``` represents a array of which columns are supposed to get the data. Example: [0, 1] for the first and second column.

```options``` represents an object of options for formatting strings.
Example: 
```
  {
    all: bool, // Represents all of the following options,
    toNormalForm: bool, // Normalize the string and gets rid of accentuation
    replaceSpaceToUnderLine: bool, // Replace all the spaces of a string to _
    removeAllCommnas: bool, // Removes all commas
    removeAllDots: bool, // Removes all dots
    removeAllParentheses: bool, // Removes all parentheses
    toUpperCase: bool // Transform all strings to uppercase
  }
```

## Usage

```
  import { retriveByPosition } from 'xls-data-retrieve';
  
  // Will retrieve only the first row of a xls file, while applying all the string formatters
  const rowDataArray = retrieveByPosition('./example.xls', [0], {all: true});
  
 console.log(rowDataArray);
```
