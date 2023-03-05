import { fail, redirect, type Actions } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import { z } from 'zod';

const schema = z
	.object({
		email: z.string().email({ message: 'The email address is not valid' }),
		password: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters' })
			.max(72, { message: 'Password must be at most 72 characters' }),
		passwordConfirm: z
			.string()
			.min(8, { message: 'Password confirmation must be at least 8 characters' })
			.max(72, { message: 'Password must be at most 72 characters' })
	})
	.refine((data) => data.password === data.passwordConfirm, { message: "Passwords don't match" });

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const formData = Object.fromEntries(await request.formData());

		const data = schema.safeParse(formData);

		if (!data.success) {
			const errors = data.error.errors.map((error) => ({ message: error.message }));
			return fail(400, { error: true, errors });
		}

		const { email, password } = data.data;

		try {
			const user = await locals.pb.collection('users').create(data.data);
			await locals.pb.collection('users').authWithPassword(email, password);

			await locals.pb.collection('notes').create({
				title: 'Welcome',
				content: `This is an example note.

# H1
## H2
### H3
#### H4
##### H5
###### H6
				
## Emphasis
				
Emphasis, aka italics, with *asterisks* or _underscores_.
				
Strong emphasis, aka bold, with **asterisks** or __underscores__.
				
Combined emphasis with **asterisks and _underscores_**.
				
Strikethrough uses two tildes. ~~Scratch this.~~
				
## Lists
				
1. First ordered list item
2. Another item
	* Unordered sub-list.
1. Actual numbers don't matter, just that it's a number
	1. Ordered sub-list
4. And another item.

	You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

	To have a line break without a paragraph, you will need to use two trailing spaces.  
	Note that this line is separate, but within the same paragraph.  
	(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)


* Unordered list can use asterisks
- Or minuses
+ Or pluses
				
## Links

[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links. 
http://www.example.com or <http://www.example.com> and sometimes 
example.com (but not on Github, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com

## Images

Here's our logo (hover to see the title text):

Inline-style: 
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

Reference-style: 
![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"

## Blockquotes

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.
				
> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote. 

## Horizontal Rule

Three or more...

---

Hyphens

***

Asterisks

___

Underscores`,
				user: user.id
			});
		} catch (e) {
			if (e instanceof ClientResponseError)
				return fail(e.status, {
					error: true,
					errors: Object.values(e.data.data).map((d) => ({
						message: (d as { message: string; code: string }).message
					}))
				});
			throw e;
		}

		throw redirect(303, '/notes');
	}
};
