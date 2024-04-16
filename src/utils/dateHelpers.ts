export function dateShortener( date ) {
    const dateParts = date.split('T');
    const dateSingle = dateParts[0];
    const dateSingleParts = dateSingle.split("-");
    const returnDate = dateSingleParts[2] + " - " + dateSingleParts[1] + " - " + dateSingleParts[0];
    return returnDate;
}