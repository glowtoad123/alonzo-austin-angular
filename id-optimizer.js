/**
 * allows me to make sure that even if I use a custom id for my documents, I can still make html files from those documents and create and name those html files even if the id names are custom
 * @param {string} id - the id of the document
 */
function optimize(id) {
    let nonAlphaPatterns = new RegExp(/[^a-zA-Z0-9]/gm)
    return id.split(nonAlphaPatterns).join("")
}

module.exports = optimize