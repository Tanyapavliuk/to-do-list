import * as yup from 'yup';

export const schema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .min(3, 'Too short title')
    .max(100, 'Too long title')
    .test(
      'maxDots',
      'The string must not contain more than 5 characters "."',
      value => {
        const dotCount = (value.match(/\./g) || []).length;
        return dotCount <= 5;
      }
    )
    .test(
      'max","',
      'The string must not contain more than 5 characters ","',
      value => {
        const count = (value.match(/,/g) || []).length;
        return count <= 5;
      }
    )
    .test(
      'max"/"',
      'The string must not contain more than 5 characters "/"',
      value => {
        const count = (value.match(/\//g) || []).length;
        return count <= 5;
      }
    )
    .test(
      'max""',
      'The string must not contain more than 5 characters ""',
      value => {
        const count = (value.match(/\\/g) || []).length;
        return count <= 5;
      }
    )
    .test(
      'max symbols ',
      'The string must not contain more than 5 symbols.',
      value => {
        const count = (value.match(/[!@#$%^&*()]*/g) || []).join('').length;
        return count <= 5;
      }
    )
    .required('Title is a required field'),
});
