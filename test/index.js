const assert = require("assert");
const oa = require("../index.js");

// const _in = [{a:1,f:{a1:110,b1:220}},{a:1,f:{a1:110,b1:220},cc:10},{a:{a:1},b:2,f:100}]

// console.log(oa([{a:1,b:'bbb'},{a:'aaa',b:2,c:'ccc'}]))

// oa([{a:1,b:2,c:3},{a:4,b:5,d:6}])//{a:5,b:7,c:3,d:6}
// oa([{a:{a1:1,b1:2},b:2},{a:{a1:3,a2:4,a3:5}},c:{c:10}}])//{ a: { a1: 4, b1: 2, a2: 4, a3: 5 }, b: 2, c: { c: 10 } }

// oa(1)//1
// oa({a:1})//{a:1}

console.log(
  oa([
    { a: { a1: 1, b1: 2 }, b: 2 },
    { a: { a1: 3, a2: 4, a3: 5 } },
    { c: { c: 10 } },
  ])
);

Object.prototype.equals = function (object2) {
  //For the first loop, we only check for types
  for (propName in this) {
    //Check for inherited methods and properties - like .equals itself
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
    //Return false if the return value is different
    if (this.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
      return false;
    }
    //Check instance type
    else if (typeof this[propName] != typeof object2[propName]) {
      //Different types => not equal
      return false;
    }
  }
  //Now a deeper check using other objects property names
  for (propName in object2) {
    //We must check instances anyway, there may be a property that only exists in object2
    //I wonder, if remembering the checked values from the first loop would be faster or not
    if (this.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
      return false;
    } else if (typeof this[propName] != typeof object2[propName]) {
      return false;
    }
    //If the property is inherited, do not check any more (it must be equa if both objects inherit it)
    if (!this.hasOwnProperty(propName)) continue;
    //Now the detail check and recursion
    //This returns the script back to the array comparing
    /**REQUIRES Array.equals**/
    if (this[propName] instanceof Array && object2[propName] instanceof Array) {
      // recurse into the nested arrays
      if (!this[propName].equals(object2[propName])) return false;
    } else if (
      this[propName] instanceof Object &&
      object2[propName] instanceof Object
    ) {
      // recurse into another objects
      //console.log("Recursing to compare ", this[propName],"with",object2[propName], " both named \""+propName+"\"");
      if (!this[propName].equals(object2[propName])) return false;
    }
    //Normal value comparison for strings and numbers
    else if (this[propName] != object2[propName]) {
      return false;
    }
  }
  //If everything passed, let's say YES
  return true;
};

describe("oa({a:1})", () => {
  it("should return 1", () => {
    assert.equal(oa({ a: 1 }).a, 1);
  });
});

describe("oa(1)", () => {
  it("should return 1", () => {
    assert.equal(oa(1), 1);
  });
});

describe("[{a:1,b:2,c:3},{a:4,b:5,d:6}]", () => {
  it("should return true", () => {
    assert.ok(
      oa([
        { a: 1, b: 2, c: 3 },
        { a: 4, b: 5, d: 6 },
      ]).equals({ a: 5, b: 7, c: 3, d: 6 })
    );
  });
});

describe("[{a:{a1:1,b1:2},b:2},{a:{a1:3,a2:4,a3:5}},c:{c:10}}]", () => {
  it("should return true", () => {
    assert.ok(
      oa([
        { a: { a1: 1, b1: 2 }, b: 2 },
        { a: { a1: 3, a2: 4, a3: 5 } },
        { c: { c: 10 } },
      ]).equals({ a: { a1: 4, b1: 2, a2: 4, a3: 5 }, b: 2, c: { c: 10 } })
    );
  });
});

describe("[{a:1,b:'bbb'},{a:'aaa',b:2,c:'ccc'}]", () => {
  it("should return true", () => {
    assert.ok(
      oa([
        { a: 1, b: "bbb" },
        { a: "aaa", b: 2, c: "ccc" },
      ]).equals({ a: 1, b: 2, c: 0 })
    );
  });
});

describe("[{a:{a1:1,a2:2},b:2},{a:1,b:{b1:1}}]", () => {
  it("should return true", () => {
    assert.ok(
      oa([
        { a: { a1: 1, a2: 2 }, b: 2 },
        { a: 1, b: { b1: 1 } },
      ]).equals({ a: { a1: 1, a2: 2 }, b: 2 })
    );
  });
});
