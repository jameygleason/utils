import { assert } from "chai"
import { instanceOfBuiltin } from "./instanceOfBuiltin"

describe("instanceOfBuiltin", () => {
  it("Detects Date instance", () => {
    const [type, mm] = instanceOfBuiltin(new Date())
    assert.strictEqual(type, "Date")
    assert.strictEqual(mm, "HAS_MUTABLE_METHODS")
  })

  it("Detects Set instance", () => {
    const [type, mm] = instanceOfBuiltin(new Set())
    assert.strictEqual(type, "Set")
    assert.strictEqual(mm, "HAS_MUTABLE_METHODS")
  })

  it("Detects Map instance", () => {
    const [type, mm] = instanceOfBuiltin(new Map())
    assert.strictEqual(type, "Map")
    assert.strictEqual(mm, "HAS_MUTABLE_METHODS")
  })

  it("Detects WeakSet instance", () => {
    const [type, mm] = instanceOfBuiltin(new WeakSet())
    assert.strictEqual(type, "WeakSet")
    assert.strictEqual(mm, "HAS_MUTABLE_METHODS")
  })

  it("Detects WeakMap instance", () => {
    const [type, mm] = instanceOfBuiltin(new WeakMap())
    assert.strictEqual(type, "WeakMap")
    assert.strictEqual(mm, "HAS_MUTABLE_METHODS")
  })

  it("Detects Null instance", () => {
    const [type, mm] = instanceOfBuiltin(null)
    assert.strictEqual(type, "Null")
    assert.strictEqual(mm, "NO_MUTABLE_METHODS")
  })

  function test() {}

  it("Detects Function instance", () => {
    const [type, mm] = instanceOfBuiltin(test)
    assert.strictEqual(type, "Function")
    assert.strictEqual(mm, "NO_MUTABLE_METHODS")
  })

  const lit = /hi/g
  let re = new RegExp(lit)
  let handRolled = new RegExp(lit)
  const arr = [lit, re, handRolled]

  it("Detects RegEx instance", () => {
    for (const r of arr) {
      const [type, mm] = instanceOfBuiltin(r)
      assert.strictEqual(type, "RegExp")
      assert.strictEqual(mm, "NO_MUTABLE_METHODS")
    }
  })
})

describe("Type Proofs", () => {
  // Six Data Types that are primitives, checked by typeof operator:
  // undefined
  // Boolean
  // Number
  // String
  // BigInt
  // Symbol
  //
  // Structural Types:
  // Object
  // - constructed object instance
  // - - new Object
  // - - new Array
  // - - new Map
  // - - new WeakMap
  // - - new Set
  // - - new WeakSet
  // - - new Date
  // - - new RegExp
  // - Function
  //
  // Structural Root Primitive:
  // Null

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#data_and_structure_types
  const TypeOfProofs = [
    // Undefined
    {
      input: undefined,
      output: "undefined",
    },
    // Boolean
    {
      input: true,
      output: "boolean",
    },
    {
      input: false,
      output: "boolean",
    },
    {
      input: Boolean,
      output: "function",
    },
    // Number
    {
      input: NaN,
      output: "number",
    },
    {
      input: 0,
      output: "number",
    },
    {
      input: 1,
      output: "number",
    },
    {
      input: -1,
      output: "number",
    },
    // String
    {
      input: "",
      output: "string",
    },
    {
      input: "Hi",
      output: "string",
    },
    {
      input: "1",
      output: "string",
    },
    // TODO
    //! TypeScript 2019 doesn't have bigint and TS 2020 doesn't have nullish coalesce
    // BigInt
    {
      // @ts-ignore
      input: 1n,
      output: "bigint",
    },
    {
      input: BigInt(9007199254740991),
      output: "bigint",
    },
    // Symbol
    {
      input: Symbol("sym"),
      output: "symbol",
    },
    // Object
    {
      input: {},
      output: "object",
    },
    {
      // eslint-disable-next-line no-new-object
      input: new Object({}),
      output: "object",
    },
    {
      input: new Array([]),
      output: "object",
    },
    {
      input: new Map(),
      output: "object",
    },
    {
      input: new WeakMap(),
      output: "object",
    },
    {
      input: new Set(),
      output: "object",
    },
    {
      input: new WeakSet(),
      output: "object",
    },
    {
      input: new Date(),
      output: "object",
    },
    {
      input: new RegExp(/"/),
      output: "object",
    },
    {
      /* eslint-disable new-parens */
      // prettier-ignore
      input: new function () {},
      output: "object",
    },
    // Function
    {
      // eslint-disable-next-line object-shorthand
      input: function () {},
      output: "function",
    },
    {
      input: () => {},
      output: "function",
    },
    // NUll
    {
      input: null,
      output: "object",
    },
  ]

  it('Prove "typeof" values', () => {
    for (const { input, output } of TypeOfProofs) {
      assert.strictEqual(typeof input, output)
    }
  })

  const InstanceOfProofs = [
    // // Undefined
    // {
    //   input: undefined,
    //   output: "undefined",
    // },
    // // Boolean
    // {
    //   input: true,
    //   output: "boolean",
    // },
    // {
    //   input: false,
    //   output: "boolean",
    // },
    // {
    //   input: Boolean,
    //   output: "function",
    // },
    // // Number
    // {
    //   input: NaN,
    //   output: "number",
    // },
    // {
    //   input: 0,
    //   output: "number",
    // },
    // {
    //   input: 1,
    //   output: "number",
    // },
    // {
    //   input: -1,
    //   output: "number",
    // },
    // // String
    // {
    //   input: "",
    //   output: "string",
    // },
    // {
    //   input: "Hi",
    //   output: "string",
    // },
    // {
    //   input: "1",
    //   output: "string",
    // },
    // // TODO
    // //! TypeScript 2019 doesn't have bigint and TS 2020 doesn't have nullish coalesce
    // // BigInt
    // {
    //   // @ts-ignore
    //   input: 1n,
    //   output: "bigint",
    // },
    // {
    //   input: BigInt(9007199254740991),
    //   output: "bigint",
    // },
    // // Symbol
    // {
    //   input: Symbol("sym"),
    //   output: "symbol",
    // },

    // Object
    {
      input: {} instanceof Object,
      output: true,
    },
    {
      input: {}.constructor === Object,
      output: true,
    },
    {
      // eslint-disable-next-line no-new-object
      input: new Object({}) instanceof Object,
      output: true,
    },
    {
      input: new Array([]) instanceof Object,
      output: true,
    },
    {
      input: new Array([]) instanceof Array,
      output: true,
    },
    {
      input: new Map() instanceof Object,
      output: true,
    },
    {
      input: new Map() instanceof Map,
      output: true,
    },
    {
      input: new WeakMap() instanceof Object,
      output: true,
    },
    {
      input: new WeakMap() instanceof WeakMap,
      output: true,
    },
    {
      input: new Set() instanceof Object,
      output: true,
    },
    {
      input: new Set() instanceof Set,
      output: true,
    },
    {
      input: new WeakSet() instanceof Object,
      output: true,
    },
    {
      input: new WeakSet() instanceof WeakSet,
      output: true,
    },
    {
      input: new Date() instanceof Object,
      output: true,
    },
    {
      input: new Date() instanceof Date,
      output: true,
    },
    {
      input: new RegExp(/"/) instanceof Object,
      output: true,
    },
    {
      input: new RegExp(/"/) instanceof RegExp,
      output: true,
    },
    {
      /* eslint-disable new-parens */
      // prettier-ignore
      input: new function () {} instanceof Object,
      output: true,
    },
    {
      /* eslint-disable new-parens */
      // prettier-ignore
      input: new function () {} instanceof Function,
      output: false,
    },
    // {
    //   input: new (() => {}) instanceof Function,
    //   output: "TypeError: (intermediate value) is not a constructor",
    // },

    // Function
    {
      input: function () {} instanceof Function,
      output: true,
    },
    {
      input: function () {} instanceof Object,
      output: true,
    },
    {
      input: function () {}.constructor === Function,
      output: true,
    },
    {
      input: function () {}.constructor === Object,
      output: false,
    },
    {
      input: (() => {}) instanceof Function,
      output: true,
    },
    {
      input: (() => {}) instanceof Object,
      output: true,
    },
    {
      input: (() => {}).constructor === Function,
      output: true,
    },
    {
      input: (() => {}).constructor === Object,
      output: false,
    },

    // NUll
    {
      // @ts-ignore
      input: null instanceof Object,
      output: false,
    },
    // Null ERRORS
    // {
    //   input: null.constructor,
    //   output: "TypeError: Cannot read property 'constructor' of null",
    // },
    // {
    //   input: null instanceof Null,
    //   output: "ReferenceError: Null is not defined",
    // },
  ]

  it.only('Prove "instanceof" values', () => {
    for (const { input, output } of InstanceOfProofs) {
      assert.strictEqual(input, output)
    }
  })
})
