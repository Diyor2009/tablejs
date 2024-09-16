"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table = void 0;
function makeSpace(spacesCount) {
    return Array(spacesCount).fill(" ").join("");
}
function tableCol(colValue, colWidth, tableWidth, isTheLastCol, isTheLastRow, index, leftSpace, colPadding) {
    const gap = makeSpace(colWidth - colValue.toString().length + 1);
    const padding = makeSpace(colPadding);
    const isTheFirstCol = !index;
    const [leftCorner, rightCorner, liner] = isTheLastRow
        ? "╚╝═"
        : ["║", "║\n", "─"];
    const colsLiner = `${leftSpace}${leftCorner}${Array(tableWidth).join(liner)}${rightCorner}`;
    const leftLiner = isTheFirstCol ? `${leftSpace}║` : "│";
    const rightLiner = isTheLastCol ? `║\n${colsLiner}` : "";
    const colView = `${leftLiner} ${colValue}${gap}${padding}${rightLiner}`;
    return colView;
}
function table(header, space = 5, colsPadding = 1) {
    if (space && space < 0) {
        throw new Error("Space value must be more than '0'");
    }
    if (colsPadding && colsPadding < 0) {
        throw new Error("Cols' padding value must be more than '0'");
    }
    return function (columns) {
        const leftSpace = makeSpace(space);
        const tableColsLabels = Object.keys(header);
        const tableColsWidths = {};
        tableColsLabels.forEach((key) => {
            let colWidth = header[key].length;
            columns.forEach((col) => {
                col[key] += "";
                if (col[key].length > colWidth) {
                    colWidth = col[key].length;
                }
            });
            tableColsWidths[key] = colWidth;
        });
        const colsCount = Object.keys(header).length;
        const tableWidth = Object.values(tableColsWidths).reduce((a, b) => a + +b, 0) +
            colsCount * 3 +
            colsCount * colsPadding;
        const topLiner = `${leftSpace}╔${Array(tableWidth).join("═")}╗\n`;
        let tableView = `\n\n`;
        tableView += topLiner;
        tableColsLabels.forEach((key, i, { length }) => {
            const isTheLastCol = i + 1 == length;
            tableView += tableCol(header[key], tableColsWidths[key], tableWidth, isTheLastCol, false, i, leftSpace, colsPadding);
        });
        columns.forEach((col, rowIndex, { length: rowsCount }) => {
            tableColsLabels.forEach((key, colIndex, { length: colsCount }) => {
                const isTheLastCol = colIndex + 1 == colsCount;
                const isTheLastRow = rowIndex + 1 == rowsCount;
                tableView += tableCol(col[key], tableColsWidths[key], tableWidth, isTheLastCol, isTheLastRow, colIndex, leftSpace, colsPadding);
            });
        });
        return tableView;
    };
}
exports.table = table;
