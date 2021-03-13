# Mechmarket Post Assistant

Mechmarket posting assistant which helps you to easily create and format your r/mm posts.
---
---
## Usage

The app is divided into two parts:
 - Editor
 - Reddit-ready

The first half (*Editor*) is where you select and type everything you have.
The second half (*Reddit-ready*) is where you can see the formatted text to put into Reddit. You can use the buttons next to *Title of post* and *Body of post* to copy to your clipboard the respective parts.

### <ins>Editor</ins>
### *Title of post*
Select a part of world, then choose or type the 2-letter code of your country. [See this page](https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes) for the ISO 3166-1 2-letter country codes.

Then, type what you have in your possession, and what you want for it.

You can now click on the button on the *Reddit-ready* part to copy the formatted title!

### *Body of post*
If you have items, you must insert a link to your timestamp. If you just have money, you can check the *No timestamp* box.

As of now, you can write what you have and what you want using the editor box (you can use lists to make it easier).

Finally, the app proposes usual things people put in their posts, you can check what you want to make them appear in your *Body of post*.

You can now click on the button on the *Reddit-ready* part to copy the formatted post into Reddit!

### <ins>Reddit-ready</ins>
On this half, you can see the formatted text ready to be written into Reddit.

### *Title of post*
The title of your post using the correct bracket formatting. Either copy the title manually, or click on the button next to the title.

### *Body of post*
The body of your post formatted in markdown.

To make this works, we are using the ```Turndown``` js component.

Either copy the whole post manually, or click on the button next to the title.

---
## Development
### Install the dependencies
```bash
yarn
```
### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```
### Lint the files
```bash
yarn run lint
```
### Build the app for production
```bash
quasar build
```

---
## Dependencies
 - [Quasar](https://quasar.dev/)
 - [Surge](https://surge.sh/)
 - [Turndown](https://github.com/domchristie/turndown)
