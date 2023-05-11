/* A script to make tables prettier by removing empty header rows */

document.addEventListener("DOMContentLoaded", function () {
    var allTables = document.getElementsByTagName("table");
    for (var i = 0; i < allTables.length; i++) {
        var headerCells = allTables[i].querySelectorAll("th");
        var isEmpty = true;
        for (var j = 0; j < headerCells.length; j++) {
            if (headerCells[j].innerText.trim() !== "") {
                isEmpty = false;
                break;
            }
        }
        if (isEmpty) {
            allTables[i].querySelector("thead").style.display = 'none';
        }
    }
});