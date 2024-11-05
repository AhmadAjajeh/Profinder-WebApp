import _ from "lodash";

export function notEmpty(token) {
  return token !== null && token !== undefined && token.trim().length !== 0;
}

export function range(token, min, max) {
  if (typeof token === "string") {
    return token.trim().length >= min && token.trim().length <= max;
  }
  return token <= min && token >= max;
}

export function regexp(token, exp) {
  return token.match(exp);
}

export function uniqueArrayValues(array) {
  return _.uniq(array).length === array.length;
}
