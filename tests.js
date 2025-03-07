// tests.mjs
import assert from 'node:assert';
import test from 'node:test';

class Dummy
{
  constructor(_a)
  {
    console.log('Dummy constructor');
    this.a = _a;
  }
}

class DummyExtended extends Dummy
{
  constructor(_a)
  {
    console.log('DummyExtended constructor');
    super(_a);
  }

  foo_method(){
    return `Vous êtes un imbécile (${this.a}) !`
  }
}

test('Dummy Test #1', () => {
  let a = [1, 2, "xyz", 'asv', `123`, new Dummy(2)];
  for (let b in a)
  {
    console.log(`b: ${a[b]}`);
  }
  assert(true);
  assert(new DummyExtended(1).foo_method() === 'Vous êtes un imbécile (1) !')
});

const EXPECTED = `Argument #0 : 1
Argument #1 : 2
Argument #2 : abc
Argument #3 : xyz
Argument #4 : 3`

test('Dummy Test #2', () => {
  function foo(){
    assert(!(arguments instanceof Array));
    let to_return = '';
    for (let i = 0; i < arguments.length; ++i)
    {
      to_return += `Argument #${i} : ${arguments[i]}\n`;
    }
    to_return = to_return.substring(0, to_return.length - 1);
    return to_return;
  }

  let result = foo(1, 2, 'abc', "xyz", `${1 + 2}`);
  console.log(result);
  assert(result == EXPECTED);
});

test('Dummy Test #3', () => {
  let foo = (...params) => {
    assert(params instanceof Array);
    let i = 0;
    let to_return = '';
    for (let a of params)
    {
      to_return += `Argument #${i++} : ${a}\n`;
    }
    to_return = to_return.substring(0, to_return.length - 1);
    return to_return;
  }

  let result = foo(1, 2, 'abc', "xyz", `${1 + 2}`);
  console.log(result);
  assert(result == EXPECTED);
});

test('Promise Test #1', () => {
  let promise = new Promise((resolve, reject) => {
    let result = true;
    let time = 20; // [ms]
    setTimeout(() => {
      if (result)
        resolve('Succès !');
      else
        reject('Échec !');
    }, time);
  });

  let status;
  promise.then((data) => {
    console.log(`Positif : ${data}`)
    assert(true);
  })
  .catch((data) => {
    console.log(`Négatif : ${data}`);
    assert(false);
  });

  assert(status == undefined);
});

test('Proxy Test #1', () => {
  class Watched {
    constructor(_a, _b)
    {
      this._a = _a;
      this._b = _b;
    }
  };

  const watched = new Watched(1, 2);
  const proxy = new Proxy(watched, {
    get(target, property)
    {
      console.log(`La propriété ${property} a été demandée !`);
      return target[property] + 1;
    }
  });

  assert(proxy._a == 2 && proxy._b == 3);
});


// run with `node tests.js`
