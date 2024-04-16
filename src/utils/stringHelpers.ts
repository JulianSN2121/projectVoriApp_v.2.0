export function charUppercase(object, pos){
    return object[0].charAt(pos).toUpperCase() + object[0].slice(1).toLowerCase();
}