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
      // prettier-ignore
      // eslint-disable-next-line new-parens
      input: new function () {},
      output: "object",
    },

    // Function

    // NUll
  ]

  it.only('Prove "typeof" values', () => {
    for (const { input, output } of TypeOfProofs) {
      // eslint-disable-next-line valid-typeof
      assert.strictEqual(typeof input === output, true)
    }
  })

  it.only('Prove types with "instanceof", "typeof", and "constructor" comparisons', () => {
    try {
      const typeProofs = [
        //* Data Types - Undefined
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
        //   // @ts-ignore
        //   // eslint-disable-next-line no-new-wrappers, no-undef
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

        //* Data Types - Boolean
        {
          input: typeof true === "boolean",
          output: true,
        },
        {
          input: typeof true === "object",
          output: false,
        },
        {
          input: typeof true === "function",
          output: false,
        },
        {
          input: typeof false === "boolean",
          output: true,
        },
        {
          input: typeof false === "object",
          output: false,
        },
        {
          input: typeof false === "function",
          output: false,
        },
        {
          input: typeof Boolean === "boolean",
          output: false,
        },
        {
          input: typeof Boolean === "object",
          output: false,
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

        //* Data Types - Number
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

        //* Data Types - String
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

        //* Data Types - BigInt
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

        //* Data Types - Symbol
        {
          input: typeof Symbol("sym") === "symbol",
          output: true,
        },
        {
          input: typeof Symbol("sym") === "object",
          output: false,
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

        //* Structural Types - Object
        {
          input: typeof {} === "object",
          output: true,
        },
        {
          // eslint-disable-next-line no-new-object
          input: typeof new Object({}) === "object",
          output: true,
        },
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
          // eslint-disable-next-line no-new-object
          input: new Object({}).constructor === Object,
          output: true,
        },

        //* Structural Types - constructed - Boolean
        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Boolean(true) === "boolean",
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Boolean(true) === "object",
          output: true,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Boolean(true) === "function",
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Boolean(false) === "boolean",
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Boolean(false) === "object",
          output: true,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Boolean(false) === "function",
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Boolean(Boolean) === "boolean",
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Boolean(Boolean) === "object",
          output: true,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Boolean(Boolean) === "function",
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
          input: new Boolean(Boolean) instanceof Boolean,
          output: true,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new Boolean(Boolean) instanceof Object,
          output: true,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new Boolean(Boolean) instanceof Function,
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new Boolean(true).constructor === Boolean,
          output: true,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new Boolean(true).constructor === Object,
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new Boolean(false).constructor === Boolean,
          output: true,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new Boolean(false).constructor === Object,
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new Boolean(Boolean).constructor === Boolean,
          output: true,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new Boolean(Boolean).constructor === Object,
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new Boolean(Boolean).constructor === Function,
          output: false,
        },

        //* Structural Types - constructed - Number
        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Number(0) === "number",
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Number(0) === "object",
          output: true,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Number(0) === "boolean",
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Number(0) === "function",
          output: false,
        },

        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Number(1) === "number",
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Number(1) === "object",
          output: true,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Number(1) === "boolean",
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Number(1) === "function",
          output: false,
        },

        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Number(-1) === "number",
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Number(-1) === "object",
          output: true,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Number(-1) === "boolean",
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Number(-1) === "function",
          output: false,
        },

        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Number(true) === "number",
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Number(true) === "object",
          output: true,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Number(true) === "boolean",
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Number(true) === "function",
          output: false,
        },

        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Number(false) === "number",
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Number(false) === "object",
          output: true,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Number(false) === "boolean",
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: typeof new Number(false) === "function",
          output: false,
        },

        {
          // eslint-disable-next-line no-new-wrappers
          input: new Number(0) instanceof Number,
          output: true,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new Number(0) instanceof Object,
          output: true,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new Number(0) instanceof Function,
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new Number(0) instanceof Boolean,
          output: false,
        },

        {
          // eslint-disable-next-line no-new-wrappers
          input: new Number(1) instanceof Number,
          output: true,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new Number(1) instanceof Object,
          output: true,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new Number(1) instanceof Function,
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new Number(1) instanceof Boolean,
          output: false,
        },

        {
          // eslint-disable-next-line no-new-wrappers
          input: new Number(-1) instanceof Number,
          output: true,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new Number(-1) instanceof Object,
          output: true,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new Number(-1) instanceof Function,
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new Number(-1) instanceof Boolean,
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new Number(0).constructor === Number,
          output: true,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new Number(0).constructor === Object,
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new Number(0).constructor === Function,
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new Number(Number).constructor === Number,
          output: true,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new Number(Number).constructor === Object,
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new Number(Number).constructor === Function,
          output: false,
        },

        //* Structural Types - constructed - String
        {
          // eslint-disable-next-line  no-new-wrappers
          input: typeof new String("") === "string",
          output: false,
        },
        {
          // eslint-disable-next-line  no-new-wrappers
          input: typeof new String("") === "object",
          output: true,
        },
        {
          // eslint-disable-next-line  no-new-wrappers
          input: new String("") instanceof String,
          output: true,
        },
        {
          // eslint-disable-next-line  no-new-wrappers
          input: new String("") instanceof Object,
          output: true,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new String("").constructor === String,
          output: true,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new String("").constructor === Object,
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new String("").constructor === Function,
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new String(String).constructor === String,
          output: true,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new String(String).constructor === Object,
          output: false,
        },
        {
          // eslint-disable-next-line no-new-wrappers
          input: new String(String).constructor === Function,
          output: false,
        },

        //* Structural Types - constructed - BigInt
        // {
        //   // @ts-ignore
        //   input: typeof new BigInt("") === "bigint",
        //   output: "TypeError: BigInt is not a constructor",
        // },
        // {
        //   // @ts-ignore
        //   input: typeof new BigInt("") === "object",
        //   output: "TypeError: BigInt is not a constructor",
        // },
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
        //   // @ts-ignore
        //   // eslint-disable-next-line no-new-symbol
        //   input: new Symbol("sym") instanceof Symbol,
        //   output: "TypeError: Symbol is not a constructor",
        // },
        // {
        //   // @ts-ignore
        //   // eslint-disable-next-line no-new-symbol
        //   input: new Symbol("sym") instanceof Object,
        //   output: "TypeError: Symbol is not a constructor",
        // },

        //* Structural Types - constructed - Array
        {
          // @ts-ignore
          // eslint-disable-next-line  valid-typeof
          input: typeof [] === "array",
          output: false,
        },
        {
          // @ts-ignore
          // eslint-disable-next-line  valid-typeof
          input: typeof [] === "object",
          output: true,
        },
        {
          // @ts-ignore
          // eslint-disable-next-line  valid-typeof
          input: typeof new Array([]) === "array",
          output: false,
        },
        {
          input: typeof new Array([]) === "object",
          output: true,
        },
        {
          input: new Array([]) instanceof Array,
          output: true,
        },
        {
          input: new Array([]) instanceof Object,
          output: true,
        },
        {
          input: new Array([]).constructor === Array,
          output: true,
        },
        {
          input: new Array([]).constructor === Object,
          output: false,
        },
        {
          input: new Array([]).constructor === Function,
          output: false,
        },
        {
          input: new Array(Array).constructor === Array,
          output: true,
        },
        {
          input: new Array(Array).constructor === Object,
          output: false,
        },
        {
          input: new Array(Array).constructor === Function,
          output: false,
        },

        //* Structural Types - constructed - Error
        {
          // @ts-ignore
          // eslint-disable-next-line valid-typeof
          input: typeof new Error("") === Error,
          output: false,
        },
        {
          // @ts-ignore
          // eslint-disable-next-line valid-typeof
          input: typeof new Error("") === Object,
          output: false,
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
          input: new Error("").constructor === Error,
          output: true,
        },
        {
          input: new Error("").constructor === Object,
          output: false,
        },
        {
          input: new Error("").constructor === Function,
          output: false,
        },
        {
          // @ts-ignore
          input: new Error(Error).constructor === Error,
          output: true,
        },
        {
          // @ts-ignore
          input: new Error(Error).constructor === Object,
          output: false,
        },
        {
          // @ts-ignore
          input: new Error(Error).constructor === Function,
          output: false,
        },

        //* Structural Types - constructed - Map
        {
          // @ts-ignore
          // eslint-disable-next-line valid-typeof
          input: typeof new Map() === "map",
          output: false,
        },
        {
          input: typeof new Map() === "object",
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
          input: new Map().constructor === Map,
          output: true,
        },
        {
          input: new Map().constructor === Object,
          output: false,
        },
        {
          input: new Map().constructor === Function,
          output: false,
        },
        // {
        //   input: new Map(Map).constructor === Map,
        //   output:
        //     "TypeError: function is not iterable (cannot read property Symbol(Symbol.iterator))",
        // },
        // {
        //   input: new Map(Map).constructor === Object,
        //   output:
        //     "TypeError: function is not iterable (cannot read property Symbol(Symbol.iterator))",
        // },
        // {
        //   input: new Map(Map).constructor === Function,
        //   output:
        //     "TypeError: function is not iterable (cannot read property Symbol(Symbol.iterator))",
        // },

        //* Structural Types - constructed - WeakMap
        {
          // @ts-ignore
          // eslint-disable-next-line valid-typeof
          input: typeof new WeakMap() === "weakmap",
          output: false,
        },
        {
          input: typeof new WeakMap() === "object",
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
          input: new WeakMap().constructor === WeakMap,
          output: true,
        },
        {
          input: new WeakMap().constructor === Object,
          output: false,
        },
        {
          input: new WeakMap().constructor === Function,
          output: false,
        },
        // {
        //   // @ts-ignore
        //   input: new WeakMap(WeakMap).constructor === WeakMap,
        //   output:
        //     "TypeError: function is not iterable (cannot read property Symbol(Symbol.iterator))",
        // },
        // {
        //   // @ts-ignore
        //   input: new WeakMap(WeakMap).constructor === Object,
        //   output:
        //     "TypeError: function is not iterable (cannot read property Symbol(Symbol.iterator))",
        // },
        // {
        //   // @ts-ignore
        //   input: new WeakMap(WeakMap).constructor === Function,
        //   output:
        //     "TypeError: function is not iterable (cannot read property Symbol(Symbol.iterator))",
        // },

        //* Structural Types - constructed - Set
        {
          // @ts-ignore
          // eslint-disable-next-line valid-typeof
          input: typeof new Set() === "set",
          output: false,
        },
        {
          input: typeof new Set() === "object",
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
          input: new Set().constructor === Set,
          output: true,
        },
        {
          input: new Set().constructor === Object,
          output: false,
        },
        {
          input: new Set().constructor === Function,
          output: false,
        },
        // {
        //   // @ts-ignore
        //   input: new Set(Set).constructor === Set,
        //   output:
        //     "TypeError: function is not iterable (cannot read property Symbol(Symbol.iterator))",
        // },
        // {
        //   // @ts-ignore
        //   input: new Set(Set).constructor === Object,
        //   output:
        //     "TypeError: function is not iterable (cannot read property Symbol(Symbol.iterator))",
        // },
        // {
        //   // @ts-ignore
        //   input: new Set(Set).constructor === Function,
        //   output:
        //     "TypeError: function is not iterable (cannot read property Symbol(Symbol.iterator))",
        // },

        //* Structural Types - constructed - WeakSet
        {
          // @ts-ignore
          // eslint-disable-next-line valid-typeof
          input: typeof new WeakSet() === "weakset",
          output: false,
        },
        {
          input: typeof new WeakSet() === "object",
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
          input: new WeakSet().constructor === WeakSet,
          output: true,
        },
        {
          input: new WeakSet().constructor === Object,
          output: false,
        },
        {
          input: new WeakSet().constructor === Function,
          output: false,
        },
        // {
        //   // @ts-ignore
        //   input: new WeakSet(WeakSet).constructor === WeakSet,
        //   output:
        //     "TypeError: function is not iterable (cannot read property Symbol(Symbol.iterator))",
        // },
        // {
        //   // @ts-ignore
        //   input: new WeakSet(WeakSet).constructor === Object,
        //   output:
        //     "TypeError: function is not iterable (cannot read property Symbol(Symbol.iterator))",
        // },
        // {
        //   // @ts-ignore
        //   input: new WeakSet(WeakSet).constructor === Function,
        //   output:
        //     "TypeError: function is not iterable (cannot read property Symbol(Symbol.iterator))",
        // },

        //* Structural Types - constructed - Date
        {
          // @ts-ignore
          // eslint-disable-next-line valid-typeof
          input: typeof new Date() === "date",
          output: false,
        },
        {
          input: typeof new Date() === "object",
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
          input: new Date().constructor === Date,
          output: true,
        },
        {
          input: new Date().constructor === Object,
          output: false,
        },
        {
          input: new Date().constructor === Function,
          output: false,
        },
        {
          // @ts-ignore
          input: new Date(Date).constructor === Date,
          output: true,
        },
        {
          // @ts-ignore
          input: new Date(Date).constructor === Object,
          output: false,
        },
        {
          // @ts-ignore
          input: new Date(Date).constructor === Function,
          output: false,
        },

        //* Structural Types - constructed - RegExp
        {
          // @ts-ignore
          // eslint-disable-next-line valid-typeof
          input: typeof new RegExp(/"/) === "regexp",
          output: false,
        },
        {
          input: typeof new RegExp(/"/) === "object",
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
          input: new RegExp(/"/).constructor === RegExp,
          output: true,
        },
        {
          input: new RegExp(/"/).constructor === Object,
          output: false,
        },
        {
          input: new RegExp(/"/).constructor === Function,
          output: false,
        },

        //! Structural Types - constructed - Function
        {
          // prettier-ignore
          // eslint-disable-next-line new-parens
          input: new function () {} instanceof Function,
          output: false,
        },
        {
          // prettier-ignore
          // eslint-disable-next-line new-parens
          input: new function () {} instanceof Object,
          output: true,
        },
        // {
        //   input: new (() => {}) instanceof Function,
        //   output: "TypeError: (intermediate value) is not a constructor",
        // },

        //! Function
        {
          input: typeof function () {} === "function",
          output: true,
        },
        {
          input: typeof function () {} === "object",
          output: false,
        },
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
          input: typeof (() => {}) === "function",
          output: true,
        },
        {
          input: typeof (() => {}) === "object",
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

        //* Structural Root Primitive - Null
        {
          // @ts-ignore
          // eslint-disable-next-line valid-typeof
          input: typeof null === "null",
          output: false,
        },
        {
          input: typeof null === "object",
          output: true,
        },
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

      for (const { input, output } of typeProofs) {
        assert.strictEqual(input, output)
      }
    } catch (err) {
      console.error(err)
    }
  })
})
