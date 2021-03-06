// https://mathiasbynens.be/notes/javascript-unicode

import emojiRegex from "emoji-regex"
import { splitRunes } from "./splitRunes"

type StripEmojiReturn = [string, Error | null]

export function stripEmojis(str: string): StripEmojiReturn {
	try {
		const emoji = new RegExp(emojiRegex().toString())
		const arr = splitRunes(str)

		let clean = []

		for (const char of arr) {
			if (emoji.test(char)) {
				continue
			}
			clean.push(char)
		}

		return [clean.join(""), null]
	} catch (err) {
		// @ts-ignore
		return ["", err]
	}
}
