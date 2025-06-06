# Metro Card #
A new metro train has been launched from the Central station to the Airport. It is a non-stop train, which means the train will stop only at the Airport with no intermediate stops. 
It is also possible to return from the Airport back to the Central station. This is also a non-stop journey.
 
## MetroCard ##
 Metro authority prefers money to be collected via MetroCard. MetroCard is an electronic payment utility that can be used to pay for the metro travel charges. The MetroCard is like a wallet loaded with money. Each person traveling in this metro must carry a MetroCard and each card will have a unique number. 
 
 To travel by this train, one needs a MetroCard. If the MetroCard doesn’t have sufficient balance, then the remaining cost for the travel needs to be paid by recharging the MetroCard. This auto recharge loads only the required amount of money for the journey and the station collects a 2% service fee for the transaction. 

## Travel charges ##
 Costs for the journey are based on the passenger's age. It is categorized as below

| Passenger Types | Charges |
| :-------------: | :-----: |
|      Adult      |   200   |
| Senior Citizen  |   100   |
|      Child      |   50    |

### Journey Types ###
 Travel charges are different for a single trip and for a return journey. When a passenger takes a return journey, there is a discount of 50% for the travel charges of the return journey. 
 

 For eg: If a senior citizen travels from Central to Airport, the travel charge collected is 100. If the same citizen travels back to Central station,  the amount collected for the return journey is 50. If the same citizen passes a third time on the same day, it will be treated as a new single journey and the travel charge collected is 100.
 

## Goal ##
 Your task is to build a solution that calculates various travel charges collected at each station and print the collection summary and passenger summary. 
 

 The collection summary should give a breakup of the total amount collected and the total discount given. 
 The passenger summary should display the total number of passengers traveled per type in descending order of the passenger count. 
 If any of the passenger type have same value for passenger count then display in the ascending order of the passenger type for that case. 
	Ex:If ADULT and KID has same value then display it as 
	ADULT <no_of_passengers>
	KID <no_of_passengers>
 
## Assumptions ##
* All passengers should have a MetroCard. 
* If a passenger does not have sufficient balance in the MetroCard, then the MetroCard needs to be recharged before taking up the journey. 
* The service fee for doing the recharge is collected by the origin station of the journey. 
* The passenger count is calculated based on journeys eg: if the same passenger travels twice, the count is 2.
 
## Input Commands & Format ##
`BALANCE <METROCARD_NUMBER> <BALANCE_IN_THE_METROCARD>` <br>
 `<METROCARD_NUMBER>` is the identifier for a given MetroCard. <br>
 `<BALANCE_IN_THE_METROCARD>` is the amount of money available in the MetroCard for journeys. <br> 
 
`CHECK_IN <METROCARD_NUMBER>  <PASSENGER_TYPE> <FROM_STATION>`<br>
 The `CHECK_IN` command should deduct the appropriate amount of travel charge from the MetroCard of the passenger, depending on the passenger type. If the passenger has already made a single journey, then only 50% of the travel charge should be deducted from the MetroCard for their return journey.
 

`PRINT_SUMMARY`<br> 
 Returns calculated travel charges collected, and passenger summary per station in the following format:
* TOTAL_COLLECTION AIRPORT `<amount of travel charges collected>` `<total discount given>`
* `<PASSENGER_TYPE with highest count from AIRPORT>` `<passenger type count>`
* `<PASSENGER_TYPE with second highest count from AIRPORT>` `<passenger type count>`
* `<PASSENGER_TYPE with least count from AIRPORT>` `<passenger type count>`
* TOTAL_COLLECTION CENTRAL `<amount of travel charges collected>` `<total discount given>`
* `<PASSENGER_TYPE with highest count from CENTRAL>` `<passenger type count>`
* `<PASSENGER_TYPE with second highest count from CENTRAL>` `<passenger type count>`
* `<PASSENGER_TYPE with least count from CENTRAL>` `<passenger type count>`

  
### Sample Input/Output 1 ### 
| INPUT                                                                                                                                                                                                                                                                                                             | OUTPUT                                                                                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BALANCE MC1 400`<br>`BALANCE MC2 100`<br>`BALANCE MC3 50`<br>`BALANCE MC4 50`<br>`CHECK_IN MC1 SENIOR_CITIZEN AIRPORT`<br>`CHECK_IN MC2 KID AIRPORT`<br>`CHECK_IN MC3 ADULT CENTRAL`<br>`CHECK_IN MC1 SENIOR_CITIZEN CENTRAL`<br>`CHECK_IN MC3 ADULT AIRPORT`<br>`CHECK_IN MC3 ADULT CENTRAL`<br>`PRINT_SUMMARY` | `TOTAL_COLLECTION CENTRAL 457 50`<br>`PASSENGER_TYPE_SUMMARY`<br>`ADULT 2`<br>`SENIOR_CITIZEN 1`<br>`TOTAL_COLLECTION AIRPORT 252 100`<br>`PASSENGER_TYPE_SUMMARY`<br>`ADULT 1`<br>`KID 1`<br>`SENIOR_CITIZEN 1` |



Each person’s total charges are sorted in  ascending order of their metro card number. 

### Explanation ###
| Passenger Type  | Source  | Destination | Fare | Discounted Fare  | Balance Before | Balance After | Total Discount |
| --------------- | ------- | ----------- | ---- | ---------------- | -------------- | ------------- | -------------- |
| ADULT           | AIRPORT | CENTRAL     | 200  | -                | 600            | 400           | 0              |
| ADULT           | AIRPORT | CENTRAL     | 200  | 100 (50% return) | 400            | 300           | 100            |
| SENIOR\_CITIZEN | AIRPORT | CENTRAL     | 100  | -                | 100            | 0             | 0              |
| SENIOR\_CITIZEN | AIRPORT | CENTRAL     | 100  | 50 (50% return)  | 0              | 0             | 50             |
| KID             | CENTRAL | AIRPORT     | 50   | -                | 100            | 50            | 0              |
| KID             | CENTRAL | AIRPORT     | 50   | 25 (50% return)  | 50             | 25            | 25             |


### Sample Input/Output 2 ###
| INPUT                                                                                                                                                                                                                                                                                       | OUTPUT                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BALANCE MC1 400<br>BALANCE MC2 100<br>BALANCE MC3 50<br>BALANCE MC4 50<br>CHECK_IN MC1 SENIOR_CITIZEN AIRPORT<br>CHECK_IN MC2 KID AIRPORT<br>CHECK_IN MC3 ADULT CENTRAL<br>CHECK_IN MC1 SENIOR_CITIZEN CENTRAL<br>CHECK_IN MC3 ADULT AIRPORT<br>CHECK_IN MC3 ADULT CENTRAL<br>PRINT_SUMMARY | TOTAL_COLLECTION CENTRAL 457 50<br>PASSENGER_TYPE_SUMMARY<br>ADULT 2<br>SENIOR_CITIZEN 1<br>TOTAL_COLLECTION AIRPORT 252 100<br>PASSENGER_TYPE_SUMMARY<br>ADULT 1<br>KID 1<br>SENIOR_CITIZEN 1 |

### Explanation ###
| BALANCE | CHECK_IN                   | SUMMARY                          |
| ------- | -------------------------- | -------------------------------- |
| MC1 400 | MC1 SENIOR_CITIZEN AIRPORT | TOTAL_COLLECTION AIRPORT 252 100 |
| MC2 100 | MC2 KID AIRPORT            | PASSENGER_TYPE_SUMMARY           |
| MC3 50  | MC3 ADULT CENTRAL          | ADULT 1                          |
| MC4 50  | MC1 SENIOR_CITIZEN CENTRAL | KID 1                            |
|         | MC3 ADULT AIRPORT          | SENIOR_CITIZEN 1                 |
|         | MC3 ADULT CENTRAL          | TOTAL_COLLECTION CENTRAL 457 50  |
|         |                            | PASSENGER_TYPE_SUMMARY           |
|         |                            | ADULT 2                          |
|         |                            | SENIOR_CITIZEN 1                 |


# Pre-requisites
* NodeJS 12.6.0/14.15.4/16.10.0
* npm

# How to run the code

We have provided scripts to execute the code. 

Use `run.sh` if you are Linux/Unix/macOS Operating systems and `run.bat` if you are on Windows.  Both the files run the commands silently and prints only output from the input file `sample_input/input1.txt`. You are supposed to add the input commands in the file from the appropriate problem statement. 

Internally both the scripts run the following commands 

 * `npm ci --silent` - This will build the solution downloading the necessary dependencies.
 * Once the `npm install` from the previous build process is complete, we will execute the program using the command

`npm start --silent sample_input/input1.txt`

We expect your program to take the location to the text file as parameter. Input needs to be read from a text file, and output should be printed to the console. The text file will contain only commands in the format prescribed by the respective problem.

This main file, main.go should receive in the command line argument and parse the file passed in. Once the file is parsed and the application processes the commands, it should only print the output.

 # Running the code for multiple test cases

 Please fill `input1.txt` and `input2.txt` with the input commands and use those files in `run.bat` or `run.sh`. Replace `./geektrust sample_input/input1.txt` with `./geektrust sample_input/input2.txt` to run the test case from the second file. 

 # How to execute the unit tests

 Mocha based test cases are executed with the following command from the root folder
`mocha test`

Jest based test cases are executed with the following command from the root folder
`jest`

# Typescript

Your main file should be named as `geektrust.ts`.

As of now we only support Typescript under the NPM build system. This will require you to compile your typescript program into javascript.

We run the commands `npm install --silent`, `npm start --silent` and `npm test --silent`.

Please ensure that the npm install commands creates the file `geektrust.js` from your geektrust.ts file. The npm start command should then execute this `geektrust.js` file.

In your `package.json` file make sure you have an entry for the install, start and test script.

* The install command should install the dependencies and also build the `geektrust.js` file.
* The start command will execute the program.
* The test command should execute all the unit tests present

```
"scripts": {
    "install" :"<command to create your geektrust.js file>",
    "start": "node geektrust.js",
    "test": "mocha"
}
```

Note: If you create the geektrust.js file in some other folder (like dist/, build/ or out/)other than the main folder, then please appropriately edit the start command.

# Help

You can refer our help documents [here](https://help.geektrust.com)
You can read build instructions [here](https://github.com/geektrust/coding-problem-artefacts/tree/master/NodeJS)