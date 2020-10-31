# Styleguide

!! TABS ARE TO BE USED ACROSS THE PROJECT. NO SPACES ALLOWED FOR INDENTATION. !!

## Site and Files
Routes should be pluralized (such as `/controllers` or `/events/fly-in`). The folder structure of the `src/views` directory should be:
```
views
	-layout
	-partial
	-<pluralized base route> (events, pages, controllers)
		-Index.vue
		-Page2.vue
	-<pluralized base route>
		-Index.vue
		-EditProfile.vue
	...
```

Inside of each base route folders, obeserve the following conventions:

- The view that is loaded for the base of the route should be named `Index.vue`. All other views should be named appropriately.
- File names are `PascalCase`.

## HTML
- Absolutely no inline styles. All CSS must be done in the `<style>` blocks in the Vue SFCs.

## CSS
- The following are BANNED:
	- Use of `font-size: 0`.
	- Use of `!important`, unless you can justify why it is needed.
	- Use of nested ID selectors (`#home #home_hero`), unless you can justify why they are needed.
- Materialize CSS class names are `kebab-case`, so use `snake_case` when defining your own to distinguish them.
- Class names should be meaningful and semantic. Do not use names that are presentational in nature.
- Transitions (if used) should use 'ease' and be .3s in length.

## Javascript
- JS is transpiled during deployment, so the use of ES6/7 is encouraged.
- JS variables names are `camelCase`.
- JS variables should be defined with `const` unless they are mutated, then use `let`. A good rule of thumb - define every variable as `const` until you need them to be mutable, then update to `let`. Using `var` is banned.
- It is preferred to use `async/await` for handling Promises.

# Conclusion
This is a living document that may be updated as needed. This document may be updated like any other part of the project (clone, branch, push, merge request).