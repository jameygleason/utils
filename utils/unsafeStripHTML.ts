// unsafeStripHTML only removes HTML tags in angle brackets.
// It does not handle HTML entities or other sneaky ways of expressing HTML.
// Note: It preserves whitespace.
// Current use case: Remove HTML tags from email templates to produce plain text version of email.
export function unsafeStripHTML(markup: string): string {
	return markup.replace(/(<([^>]+)>)/gi, "")
}
