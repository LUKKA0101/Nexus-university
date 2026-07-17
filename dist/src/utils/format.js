"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateOnly = formatDateOnly;
exports.formatDatesInArray = formatDatesInArray;
function formatDateOnly(date) {
    return date.toISOString().split("T")[0];
}
function formatDatesInArray(data) {
    return data.map((item) => (Object.assign(Object.assign({}, item), { birthDate: formatDateOnly(item.birthDate), createdAt: formatDateOnly(item.createdAt) })));
}
