import { notEmpty, range, regexp } from "../util/validation";

function isEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateEmail(email) {
  if (!email || email.trim().length === 0) return "email_is_required";
  if (!isEmail(email)) return "email_not_valid";
  return null;
}

export function validatePassword(password) {
  if (!password || password.trim().length === 0) return "password_is_required";
  if (password.trim().length < 8) return "password_short";
  return null;
}

export function validateNewPassword(password) {
  if (validatePassword(password)) return validatePassword(password);
  if (
    !password.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/
    )
  ) {
    return "password_must_include_at_least_one_lowercase_letter_one_uppercase_letter_one_number_and_one_special_characte";
  }
  return null;
}

export function validateUsername(username) {
  if (!notEmpty(username)) return "username_is_required";
  if (!range(username, 3, 50)) return "username_between_3_and_50";
  if (!regexp(username, /^[a-zA-Z0-9_-]+$/))
    return "username_can_only_contain_letters_numbers_underscores_and_hyphens";
  return null;
}
