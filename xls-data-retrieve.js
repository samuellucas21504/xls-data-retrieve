import reader from 'xlsx';

export function retrieveByPosition(filePath, columnArray, options = null) {
    let xmlData = retrieveDataFromXLS(filePath);
    
    return createDataArrayFromXLSData(xmlData, columnArray, options);
}

export function retrieveAll(filePath, options = null) {
    return retrieveByPosition(filePath, null, options);
}

function retrieveDataFromXLS(filePath) {
    const file = reader.readFile(filePath);
    const sheets = file.SheetNames;
   
    let xlsData = [];
    
    for(let i = 0; i < sheets.length; i++) {
        const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
        temp.forEach(val => xlsData.push(val));
    }

    return xlsData;
}

function createDataArrayFromXLSData(xmlData, columnArray, options) {
    let dataArray = [];

    xmlData.forEach(json => {
        dataArray.push(
            getRowData(json, columnArray, options)
        );
    })

    return dataArray;
}

function getRowData(json, columnArray, options) {

    if(columnArray !== null)
        return retrieveRowDataFromSelectedColumns(json, columnArray, options)
    else
        return retrieveRowData(json, options)
}

function retrieveRowDataFromSelectedColumns(json, columnArray, options) {
    const jsonKeys = Object.keys(json);
    let tempArray = [];

    columnArray.forEach(column => {
        let value = json[jsonKeys[column]];
        value = normalizeString(value, options);
        
        tempArray.push(value);
    })

    return tempArray;
}

function retrieveRowData(json, options) {
    let tempArray = [];
    const jsonKeys = Object.keys(json);

    for(let i = 0; i < jsonKeys.length; i++){
        let value = json[jsonKeys[i]];
        value = normalizeString(value, options);

        tempArray.push(value);
    }

    return tempArray;
}

function normalizeString(str, options) {
    if(!validateString(str)) return str;

    str = addOptions(str, options);

    return str;
}

function addOptions(str, options){

    if(options?.all || options?.toNormalForm) 
        str = toNormalForm(str);

    if(options?.all || options?.replaceSpaceToUnderLine)
        str = replaceSpaceToUnderLine(str);

    if(options?.all || options?.removeAllCommas)
        str = removeAllCommas(str);
        
    if(options?.all || options?.removeAllParentheses)    
        str = removeAllParentheses(str);

    if(options?.all || options?.toUpperCase)
        str = str.toUpperCase();

    return str;
}

function validateString(str) {
    return str !== undefined && str !== null && typeof(str) === 'string';
}

function toNormalForm(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function replaceSpaceToUnderLine(str) {
    return str.replaceAll(' ', '_');
}

function removeAllCommas(str) {
    return str.replace(',', '');
}

function removeAllParentheses(str) {
    str = str.replace('(', '');
    return str.replaceAll(')', '');
}
