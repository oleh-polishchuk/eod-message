const axios = require('axios');
const logger = require('./logger');

let pool = [];
let index = 0;

/**
 * Removes XML-invalid characters from a string.
 * @param {string} string - a string potentially containing XML-invalid characters, such as non-UTF8 characters, STX, EOX and so on.
 * @param {boolean} removeDiscouragedChars - a string potentially containing XML-invalid characters, such as non-UTF8 characters, STX, EOX and so on.
 * @return : a sanitized string without all the XML-invalid characters.
 */
function removeXMLInvalidChars(string, removeDiscouragedChars = true)
{
    // remove everything forbidden by XML 1.0 specifications, plus the unicode replacement character U+FFFD
    var regex = /((?:[\0-\x08\x0B\f\x0E-\x1F\uFFFD\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/g;
    string = string.replace(regex, "");

    if (removeDiscouragedChars) {
        // remove everything not suggested by XML 1.0 specifications
        regex = new RegExp(
            "([\\x7F-\\x84]|[\\x86-\\x9F]|[\\uFDD0-\\uFDEF]|(?:\\uD83F[\\uDFFE\\uDFFF])|(?:\\uD87F[\\uDF"+
            "FE\\uDFFF])|(?:\\uD8BF[\\uDFFE\\uDFFF])|(?:\\uD8FF[\\uDFFE\\uDFFF])|(?:\\uD93F[\\uDFFE\\uD"+
            "FFF])|(?:\\uD97F[\\uDFFE\\uDFFF])|(?:\\uD9BF[\\uDFFE\\uDFFF])|(?:\\uD9FF[\\uDFFE\\uDFFF])"+
            "|(?:\\uDA3F[\\uDFFE\\uDFFF])|(?:\\uDA7F[\\uDFFE\\uDFFF])|(?:\\uDABF[\\uDFFE\\uDFFF])|(?:\\"+
            "uDAFF[\\uDFFE\\uDFFF])|(?:\\uDB3F[\\uDFFE\\uDFFF])|(?:\\uDB7F[\\uDFFE\\uDFFF])|(?:\\uDBBF"+
            "[\\uDFFE\\uDFFF])|(?:\\uDBFF[\\uDFFE\\uDFFF])(?:[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uD7FF\\"+
            "uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|"+
            "(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF]))", "g");
        string = string
            .replace(regex, "")
            .replace(/&/g, "and")
    }

    return string;
}

const sanitizeTaskName = str => {

    str = removeXMLInvalidChars(str)
        .replace(/</g, "")
        .replace(/>/g, "")

    return str;
};

const postTimeEntry = async function postTimeEntry(timeEntry) {
    try {
        const url = `https://${process.env.REDMINE_LOGIN}:${process.env.REDMINE_PASSWORD}@redmine.titanium-labs.com/time_entries.xml`;
        const config = {
            headers: { 'Content-Type': 'text/xml' }
        };
        const data = `` +
            `<?xml version="1.0" encoding="UTF-8"?>` +
            `<time_entry>` +
            `<issue_id>877</issue_id>` +
            `<spent_on>${timeEntry.spentDate}</spent_on>` +
            `<hours>${timeEntry.hours}</hours>` +
            `<activity_id>9</activity_id>` +
            `<comments>${sanitizeTaskName(timeEntry.name)} ${timeEntry.permalink}</comments>` +
            `</time_entry>`;

        logger.log(data);
        const response = await axios.post(url, data, config);
        logger.log(`Created new time entry with status: ${response.status} - ${response.statusText}`, timeEntry);

        index++;
        if (pool[index]) {
            return await postTimeEntry(pool[index]);
        } else {
            return `All time entries successfully posted from ${timeEntry.spentDate}`;
        }

    } catch (err) {
        throw new Error(`==> Can not post new time entry to redmine.titanium-labs.com: ${err.message} ${err.response && err.response.statusText}`);
    }
};

module.exports.postTimeEntries = async timeEntries => {
    pool = [...timeEntries];
    index = 0;

    try {
        return await postTimeEntry(pool[index]);
    } catch (e) {
        throw new Error(e);
    }
};
