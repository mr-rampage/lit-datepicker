import { getLanguage, replaceInputElement, synchronizeInput, pipe, today } from './components/utils';
import { datePicker } from './components/uikit-date-picker';

main();

function main() {
  document.querySelectorAll('[type=date]').forEach((input: HTMLInputElement) => {
    const synchronize = pipe(
      asInputValue,
      synchronizeInput(input, 'change', 'input')
    );
    const target = replaceInputElement(input);
    datePicker(target, input.valueAsDate || today(), synchronize);
  });
}

function asInputValue(date: Date) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const dateFormatter = new Intl.DateTimeFormat(getLanguage(), options);
  return dateFormatter.format(date);
}