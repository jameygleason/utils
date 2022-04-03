/**
 *
 * @param fn = async function
 * @usage Used as async function wrapper to catch errors.
 * Wrapping async functions in this way eliminates the need for a try/catch block.
 *
 * Pass an async function as a parameter.
 * Call the function you passed in, in one of two ways.
 *
 * 1.   catch_errors(genericAsyncFunction)()
 *
 * 2.   const wrappedFn = catch_errors(genericAsyncFunction)
 *      wrappedFn()
 *
 */

export function catch_errors(fn) {
	return function (...args) {
		return fn(...args).catch(err => console.error(err))
	}
}
