$('CSVFile').addEventListener('change',function(e) {
    let file = e.target.files[0];

    if (!file) return;
    
    let reader = new FileReader();
    reader.onload = function(e) {
        let contents = e.target.result;
        convertCSVToData(contents);
        $('submit').style.display = 'block';
    }
    reader.readAsText(file);

})

csvListAmount = 0;
csvARR = [];

let catagories = [];
catagories.push({
    Title: 'Transaction Date',
    delete: false,
    number: false,
})
catagories.push({
    Title: 'Check Number',
    delete: false,
    number: true,
})
catagories.push({
    Title: 'Vendor',
    delete: false,
    number: false,
})
catagories.push({
    Title: 'Debit',
    delete: false,
    number: true,
})
catagories.push({
    Title: 'Credit',
    delete: false,
    number: true,
})
catagories.push({
    Title: 'Status',
    delete: false,
    number: false,
})
catagories.push({
    Title: 'Remaining Balance',
    delete: false,
    number: true,
})
catagories.push({
    Title: 'Classification',
    delete: false,
    number: false,
})
catagories.push({
    Title: 'Ignore',
    delete: true,
})

function valueToCatagory(value) {
    for (let i = 0; i < catagories.length; i++) {
        if (value == catagories[i].Title) return catagories[i];
    }
}

let csvSettings = [];

function convertCSVToData(csv) {
    let arr = csv.split(/\r?\n/);
    //Cycling through each line
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split(',')
    }
    csvListAmount = arr[0].length - 1;
    for (let i = 0; i < arr[0].length; i++) {
        let div = $('dropdownLists').create('div');
        let text = div.create('div');
        text.innerHTML = arr[0][i];
        let dropDown = div.create('select');
        dropDown.id = 'dropDown' + i;
        for (let j = 0; j < catagories.length; j++) {
            let option = dropDown.create('option');
            option.value = catagories[j].Title;
            option.innerHTML = catagories[j].Title;
        }
    }

    csvARR = arr;
}

function processCSV() {
    let attributes = [];
    for (let i = 0; i < csvListAmount+1; i++) {
        attributes.push($('dropDown'+i).value);
    }

    let finalStatement = [];
    for (let i = 0; i < csvARR.length; i++) {
        let transaction = [];
        for (let j = 0; j < csvARR[i].length; j++) {
            let value = csvARR[i][j];
            let catagory = valueToCatagory(attributes[j]);
            let pass = true;

            if (catagory.number) {
                if (!isNaN(Number(value))) {
                    value = Number(value);
                } else {
                    transaction = [];
                    break;
                }
            }

            let obj = {Title: attributes[j],Value: value}

            if (!catagory.delete && pass) transaction.push(obj);
        }
        if (transaction.length > 0)
            finalStatement.push(transaction)
    }
    console.log(finalStatement)
}