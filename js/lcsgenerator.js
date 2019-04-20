// by AKSHAY SATHIYA, 04/20/2019

/* testing data : (tornado, downpour) -- ono : 3,
(gentleness, gatherings) -- gtens : 5 */

// grab the DOM elements
const form = document.querySelector('#find-LCS');
const stringAInput = document.querySelector('.stringA');
const stringBInput = document.querySelector('.stringB');
const stringLCSDisplay = document.querySelector('#LCS');
const lengthLCSDisplay = document.querySelector('#length-LCS');

// define the function for generating the LCS
function generateLCS(stringA, stringB) {
    // obtain the lengths of both strings
    const m = stringA.length;
    const n = stringB.length;

    /* create a 2D array for dynamic programming approach, this will be the LCS
    table, which will yield the lengths of the LCS's for the (sub)strings, and
    backtracking along it yields the actual LCS. */
    lcsTable = []
    for (let i = 0; i < m + 1; i++) {
        lcsTable[i] = [];
    }

    // make the first row of the lcs table all 0's
    for (let i = 0; i < n + 1; i++) {
        lcsTable[0][i] = 0;
    }

    // make the first column of the lcs table all 0's
    for (let i = 0; i < m + 1; i++) {
        lcsTable[i][0] = 0;
    }

    // fill the rest of the lcs table
    for (let i = 1; i < m + 1; i++) {
        for (let j = 1; j < n + 1; j++) {
            if (stringA.charAt(i - 1) == stringB.charAt(j - 1)) {
                lcsTable[i][j] = lcsTable[i - 1][j - 1] + 1;
            } else {
                lcsTable[i][j] = Math.max(lcsTable[i][j - 1],
                    lcsTable[i - 1][j]);
            }
        }
    }

    // obtain the length of the lcs
    const lcsLength = lcsTable[m][n];

    // backtrack along the lcs table to build the lcs string
    let lcsString = "";
    let cornerRow = m, cornerCol = n;
    for (let i = lcsLength; i >= 1; i--) {
        // find the next corner
        while (lcsTable[cornerRow][cornerCol - 1] == i) {
            cornerCol--;
        }
        while (lcsTable[cornerRow - 1][cornerCol] == i) {
            cornerRow--;
        }

        // prepend the character of that corner to the lcs string
        lcsString = stringA.charAt(cornerRow - 1) + lcsString;

        // decrement cornerRow and cornerCol
        cornerRow--;
        cornerCol--;
    }

    // return a small array containing the lcs string and its length
    return ["\"" + lcsString + "\"", lcsLength];
}

// add functionality to the form
form.addEventListener('submit', (e) => {
    // prevent the default routines from occurring
    e.preventDefault();

    // set the strings in the labels to their lowercase versions
    stringAInput.value = stringAInput.value.toLowerCase();
    stringBInput.value = stringBInput.value.toLowerCase();

    // check to see if the user inputted data, then find the LCS if possible
    if (stringAInput.value === '' || stringBInput.value === '') {
        alert('Please enter two strings!');
    } else {
        // extract data form the DOM elements
        const stringA = stringAInput.value;
        const stringB = stringBInput.value;

        // obtain the LCS of the two strings
        let lcs = generateLCS(stringA, stringB);

        // display the LCS
        stringLCSDisplay.innerHTML = lcs[0];
        lengthLCSDisplay.innerHTML = "length " + lcs[1];
    }
});
