// ------------Final Solution (meets custom test cases in README)-----------
module.exports = function sortCategoriesForInsert(inputJson) {
    const stringed = JSON.stringify(inputJson);
    const parsed = JSON.parse(stringed);

    // find top level parents
    let properJsonOutput = parsed.filter(
        (category) => category.parent_id == null
    );
    // console.log('topLevel', properJsonOutput);

    // find children
    let children = parsed.filter((category) => category.parent_id !== null);
    // console.log('children', children);

    // loop through children to find parent
    children.forEach((child) => {
        // get index of parent to that child
        let index =
            properJsonOutput.findIndex(
                (parent) => parent.id === child.parent_id
            ) + 1;
        properJsonOutput.splice(index, 0, child);
    });

    console.log(properJsonOutput);
    return properJsonOutput;
};
// sortCategoriesForInsert(input);
// --------------End of Final Submission--------------------

// // ----First Attempt, Caching, Only works if parent is last-------
// module.exports = function sortCategoriesForInsert(inputJson) {
//     const stringed = JSON.stringify(inputJson);
//     const parsed = JSON.parse(stringed);
//     // store ids in hash table for quick search to accomodate for large data sets
//     let parentIds = {};
//     // store the id for the child we need to find
//     let nextId = null;
//     let count = 0;
//     // final array
//     const properJsonOutput = [];

//     for (let category in parsed) {
//         // if it has a parent_id
//         if (parsed[category].parent_id) {
//             // add to cache { parent_id : object }
//             parentIds[parsed[category].parent_id] = parsed[category];
//         } else {
//             // if it has no parent_id it gets pushed into the final array
//             properJsonOutput.push(parsed[category]);
//             // assign variable for finding next Id
//             nextId = parsed[category].id;
//         }
//     }

//     // while there are children to be placed
//     while (parentIds[nextId] !== undefined) {
//         properJsonOutput.push(parentIds[nextId]);
//         nextId = parentIds[nextId].id;
//     }

//     console.log(properJsonOutput);
//     return properJsonOutput;
// }
// sortCategoriesForInsert(input);
//     // ----------------------------------
