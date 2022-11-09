# Albuquerque ARTCC - UI
A Vue SPA for the Albuquerque ARTCC Website. This communicates with the ZAB API in order to deliver content to users.

## License

The Albuquerque ARTCC website is hereby released under the Creative Commons CC BY-NC-SA 4.0 license. Please ensure you are familiar with the license before contributing to this project. A couple of key takeaways:

1. If you choose to share or alter this project, you **MUST** give credit to the contributors of this project.
2. You may **NOT** use any of this project for commercial purposes.
3. If you create a derivitive of this project, that project **MUST** be released under the same license.

https://creativecommons.org/licenses/by-nc-sa/4.0/

## Contributors
The following people have contributed to this project. If you have contributed, but your name is not listed here, or if you are on this list and would like to be removed, please reach out to the ZAB web team (or open a PR).

- Daan Janssen  
- Alexandra Robison  
- Robby Maura  
- Shane Friedman  
- Evan Bradley  
- Jeremy Werderman  
- Cole Connelly (@cdconn00)
- Giovanni Fatelli (@frafire)

Thank you to all contributors, past and present.

## Contributing

Prerequisites:
- Most recent LTS of Node.js (v16), with the corresponding version of npm.
- Have the ZAB API running locally at `http://localhost:3000`.
- A basic understanding of Git (branches, merge requests).

If you wish to contribute, please do the following:

1. Clone down the repository to your local machine. 
2. Run `npm install`
3. Run `npm run dev

This will compile all of the Vue JS, and start a hot-reloading live server with Vite. Visit `http://localhost:8080` to view the app.

## Contributing Guidelines and Style

In order to maintain consistent code, please adhere to the following guidelines:

- The `master` branch is protected, therefore you should always be working in a branch. Please name the branch `OI-feature_name` where `OI` is your operating initials and `feature_name` is a brief description of the feature (`II-feedback_form` or `DJ-admin_stats_page`). Please make sure to follow the capitalization standards.
- When you have completed your updates, push them to your branch, and then open a merge request to `master` in GitHub.
- Please follow the style guide for how to format your code.
- We recommend you use VSCode with at least the ESLint plugin installed and configured to auto-fix on save. ESLint can take care of a lot of little mistakes automatically.

## Roadmap

We are in the process of making changes to our contribution and CI/CD processes -- check back soon for more info.
