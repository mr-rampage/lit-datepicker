import * as test from 'tape';

function* recurse(i) {
  console.log('i', i);
  const state = yield i;
  console.log('state', state);
  yield* recurse(state);
}

test('generator', ({end, equals}) => {
  const state = recurse(1);
  console.log('running assertion');
  equals(1, state.next().value);
  equals(2, state.next(2).value);
  equals(3, state.next(3).value);
  end();
})