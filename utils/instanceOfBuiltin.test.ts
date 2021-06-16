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
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
  const TypeOfProofs = [
    // Undefined

    // Boolean

    // Number

    // String

    // BigInt

    // Symbol

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
      input: new Error(""),
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

  it.only('Prove "typeof" values', () => {
    for (const { input, output } of TypeOfProofs) {
      // eslint-disable-next-line valid-typeof
      assert.strictEqual(typeof input === output, true)
    }
  })

  const typeProofs = [
    // Undefined
    {
      input: typeof undefined === "undefined",
      output: true,
    },
    // {
    //   input: undefined instanceof Undefined,
    //   output: "ReferenceError: Undefined is not defined",
    // },
    // {
    //   input: undefined.constructor,
    //   output: "TypeError: Cannot read property 'constructor' of undefined",
    // },
    // {
    //   /* eslint-disable no-new-wrappers, no-undef */
    //   // @ts-ignore
    //   input: new Undefined(undefined) instanceof Object,
    //   output: "ReferenceError: Undefined is not defined",
    // },
    {
      // eslint-disable-next-line no-new-wrappers
      input: new Boolean(undefined) instanceof Boolean,
      output: true,
    },
    {
      // eslint-disable-next-line no-new-wrappers
      input: new Boolean(undefined) instanceof Object,
      output: true,
    },
    {
      // eslint-disable-next-line no-new-wrappers
      input: new Boolean(undefined) instanceof Function,
      output: false,
    },
    {
      // eslint-disable-next-line no-new-wrappers
      input: new Number(undefined) instanceof Number,
      output: true,
    },
    {
      // eslint-disable-next-line no-new-wrappers
      input: new Number(undefined) instanceof Object,
      output: true,
    },
    {
      // eslint-disable-next-line no-new-wrappers
      input: new Number(undefined) instanceof Function,
      output: false,
    },
    {
      // eslint-disable-next-line no-new-wrappers
      input: new String(undefined) instanceof String,
      output: true,
    },
    {
      // eslint-disable-next-line no-new-wrappers
      input: new String(undefined) instanceof Object,
      output: true,
    },
    {
      // eslint-disable-next-line no-new-wrappers
      input: new String(undefined) instanceof Function,
      output: false,
    },
    // {
    //   // @ts-ignore
    //   input: new BigInt(undefined) instanceof BigInt,
    //   output: "TypeError: BigInt is not a constructor",
    // },
    // {
    //   // @ts-ignore
    //   input: new Symbol(undefined) instanceof Symbol,
    //   output: "TypeError: Symbol is not a constructor",
    // },

    // Boolean
    {
      input: typeof true === "boolean",
      output: true,
    },
    {
      input: typeof false === "boolean",
      output: true,
    },
    {
      input: typeof Boolean === "function",
      output: true,
    },
    {
      // @ts-ignore
      input: true instanceof Boolean,
      output: false,
    },
    {
      // @ts-ignore
      input: true instanceof Function,
      output: false,
    },
    {
      // @ts-ignore
      input: true instanceof Object,
      output: false,
    },
    {
      // @ts-ignore
      input: false instanceof Boolean,
      output: false,
    },
    {
      // @ts-ignore
      input: false instanceof Function,
      output: false,
    },
    {
      // @ts-ignore
      input: false instanceof Object,
      output: false,
    },
    {
      input: Boolean instanceof Boolean,
      output: false,
    },
    {
      input: Boolean instanceof Function,
      output: true,
    },
    {
      input: Boolean.constructor === Boolean,
      output: false,
    },
    {
      input: Boolean.constructor === Function,
      output: true,
    },
    {
      input: Boolean.constructor === Object,
      output: false,
    },
    {
      // eslint-disable-next-line no-new-wrappers
      input: new Boolean(true) instanceof Boolean,
      output: true,
    },
    {
      // eslint-disable-next-line no-new-wrappers
      input: new Boolean(true) instanceof Object,
      output: true,
    },
    {
      // eslint-disable-next-line no-new-wrappers
      input: new Boolean(true) instanceof Function,
      output: false,
    },
    {
      // eslint-disable-next-line no-new-wrappers
      input: new Boolean(false) instanceof Boolean,
      output: true,
    },
    {
      // eslint-disable-next-line no-new-wrappers
      input: new Boolean(false) instanceof Object,
      output: true,
    },
    {
      // eslint-disable-next-line no-new-wrappers
      input: new Boolean(false) instanceof Function,
      output: false,
    },

    // Number
    {
      input: typeof NaN === "number",
      output: true,
    },
    {
      input: typeof 0 === "number",
      output: true,
    },
    {
      input: typeof 1 === "number",
      output: true,
    },
    {
      input: typeof -1 === "number",
      output: true,
    },
    {
      // @ts-ignore
      input: NaN instanceof Number,
      output: false,
    },
    {
      // @ts-ignore
      input: NaN instanceof Object,
      output: false,
    },
    {
      // @ts-ignore
      input: NaN instanceof Function,
      output: false,
    },
    {
      input: NaN.constructor === Number,
      output: true,
    },
    {
      input: NaN.constructor === Object,
      output: false,
    },
    {
      input: NaN.constructor === Function,
      output: false,
    },
    {
      // eslint-disable-next-line no-new-wrappers
      input: new Number(NaN) instanceof Number,
      output: true,
    },
    {
      // eslint-disable-next-line no-new-wrappers
      input: new Number(NaN) instanceof Object,
      output: true,
    },
    {
      // eslint-disable-next-line no-new-wrappers
      input: new Number(NaN) instanceof Function,
      output: false,
    },
    {
      // @ts-ignore
      input: 0 instanceof Number,
      output: false,
    },
    {
      input: (0).constructor === Number,
      output: true,
    },
    {
      // @ts-ignore
      input: 1 instanceof Number,
      output: false,
    },
    {
      input: (1).constructor === Number,
      output: true,
    },
    {
      // @ts-ignore
      input: -1 instanceof Number,
      output: false,
    },
    {
      input: (-1).constructor === Number,
      output: true,
    },
    {
      // eslint-disable-next-line no-new-wrappers
      input: new Number(true) instanceof Number,
      output: true,
    },
    {
      // eslint-disable-next-line no-new-wrappers
      input: new Number(true) instanceof Object,
      output: true,
    },
    {
      // eslint-disable-next-line no-new-wrappers
      input: new Number(true) instanceof Function,
      output: false,
    },
    {
      // eslint-disable-next-line no-new-wrappers
      input: new Number(false) instanceof Number,
      output: true,
    },
    {
      // eslint-disable-next-line no-new-wrappers
      input: new Number(false) instanceof Object,
      output: true,
    },
    {
      // eslint-disable-next-line no-new-wrappers
      input: new Number(false) instanceof Function,
      output: false,
    },

    // String
    {
      input: typeof "" === "string",
      output: true,
    },
    {
      input: typeof "hi" === "string",
      output: true,
    },
    {
      input: typeof "1" === "string",
      output: true,
    },
    {
      // @ts-ignore
      input: "" instanceof String,
      output: false,
    },
    {
      // @ts-ignore
      input: "" instanceof Object,
      output: false,
    },
    {
      // @ts-ignore
      input: "" instanceof Function,
      output: false,
    },
    {
      input: "".constructor === String,
      output: true,
    },
    {
      // eslint-disable-next-line no-new-wrappers
      input: new String("").constructor === String,
      output: true,
    },
    {
      // eslint-disable-next-line no-new-wrappers
      input: new String("") instanceof String,
      output: true,
    },
    {
      // eslint-disable-next-line no-new-wrappers
      input: new String("") instanceof Object,
      output: true,
    },
    {
      // eslint-disable-next-line no-new-wrappers
      input: new String("") instanceof Function,
      output: false,
    },

    // BigInt
    {
      // @ts-ignore
      input: typeof 1n === "bigint",
      output: true,
    },
    {
      input: typeof BigInt(9007199254740991) === "bigint",
      output: true,
    },
    {
      // @ts-ignore
      input: 1n instanceof BigInt,
      output: false,
    },
    {
      // @ts-ignore
      input: 1n instanceof Object,
      output: false,
    },
    {
      // @ts-ignore
      input: 1n instanceof Function,
      output: false,
    },
    {
      // prettier-ignore
      // @ts-ignore
      input: 1n.constructor === BigInt,
      output: true,
    },
    {
      // prettier-ignore
      // @ts-ignore
      input: 1n.constructor === Object,
      output: false,
    },
    {
      // prettier-ignore
      // @ts-ignore
      input: 1n.constructor === Function,
      output: false,
    },
    {
      // @ts-ignore
      input: BigInt(9007199254740991) instanceof BigInt,
      output: false,
    },
    {
      // @ts-ignore
      input: BigInt(9007199254740991) instanceof Object,
      output: false,
    },
    {
      // @ts-ignore
      input: BigInt(9007199254740991) instanceof Function,
      output: false,
    },
    {
      input: BigInt(9007199254740991).constructor === BigInt,
      output: true,
    },
    {
      input: BigInt(9007199254740991).constructor === Object,
      output: false,
    },
    {
      input: BigInt(9007199254740991).constructor === Function,
      output: false,
    },

    // Symbol
    {
      input: typeof Symbol("sym") === "symbol",
      output: true,
    },
    {
      // @ts-ignore
      input: Symbol("sym") instanceof Symbol,
      output: false,
    },
    {
      // @ts-ignore
      input: Symbol("sym") instanceof Object,
      output: false,
    },

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
      /* eslint-disable  no-new-wrappers */
      input: new String("") instanceof String,
      output: true,
    },
    {
      input: new String("") instanceof Object,
      output: true,
    },
    {
      input: new Boolean(true) instanceof Boolean,
      output: true,
    },
    {
      input: new Boolean(true) instanceof Object,
      output: true,
    },
    {
      input: new Number(0) instanceof Number,
      output: true,
    },
    {
      input: new Number(0) instanceof Object,
      output: true,
    },
    {
      input: new Number(0) instanceof Number,
      output: true,
    },
    {
      input: new Number(0) instanceof Object,
      output: true,
    },
    // {
    //   // @ts-ignore
    //   input: new BigInt(0) instanceof BigInt,
    //   output: "TypeError: BigInt is not a constructor",
    // },
    // {
    //   // @ts-ignore
    //   input: new BigInt(0) instanceof Object,
    //   output: "TypeError: BigInt is not a constructor",
    // },
    // {
    //   /* eslint-disable no-new-symbol */
    //   // @ts-ignore
    //   input: new Symbol("sym") instanceof Symbol,
    //   output: "TypeError: Symbol is not a constructor",
    // },
    // {
    //   /* eslint-disable no-new-symbol */
    //   // @ts-ignore
    //   input: new Symbol("sym") instanceof Object,
    //   output: "TypeError: Symbol is not a constructor",
    // },
    {
      input: new Array([]) instanceof Array,
      output: true,
    },
    {
      input: new Array([]) instanceof Object,
      output: true,
    },
    {
      input: new Error("") instanceof Error,
      output: true,
    },
    {
      input: new Error("") instanceof Object,
      output: true,
    },
    {
      input: new Map() instanceof Map,
      output: true,
    },
    {
      input: new Map() instanceof Object,
      output: true,
    },
    {
      input: new WeakMap() instanceof WeakMap,
      output: true,
    },
    {
      input: new WeakMap() instanceof Object,
      output: true,
    },
    {
      input: new Set() instanceof Set,
      output: true,
    },
    {
      input: new Set() instanceof Object,
      output: true,
    },
    {
      input: new WeakSet() instanceof WeakSet,
      output: true,
    },
    {
      input: new WeakSet() instanceof Object,
      output: true,
    },
    {
      input: new Date() instanceof Date,
      output: true,
    },
    {
      input: new Date() instanceof Object,
      output: true,
    },
    {
      input: new RegExp(/"/) instanceof RegExp,
      output: true,
    },
    {
      input: new RegExp(/"/) instanceof Object,
      output: true,
    },
    {
      /* eslint-disable new-parens */
      // prettier-ignore
      input: new function () {} instanceof Function,
      output: false,
    },
    {
      /* eslint-disable new-parens */
      // prettier-ignore
      input: new function () {} instanceof Object,
      output: true,
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
    for (const { input, output } of typeProofs) {
      assert.strictEqual(input, output)
    }
  })
})
