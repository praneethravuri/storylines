# Contributing

Pull requests are welcome. For major changes, please [open a new issue](https://github.com/praneethravuri/storylines/issues/new) first to discuss what you would like to change.

# Setup

1. Fork and clone the repo

2. Run ```npm i``` to install the dependencies

3. Create a branch for your **PR** with ```git checkout -b your-branch-name```

To keep master branch pointing to remote repository and make pull requests from branches on your fork, run:

```bash
git remote add upstream https://github.com/praneethravuri/storylines.git
git fetch upstream
git branch --set-upstream-to=upstream/master master
```

# Pull Request Guidelines


* **feat**: A new feature

* **fix**: A bug fix

* **docs**: Documentation only changes

* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)

* **refactor**: A code change that neither fixes a bug nor adds a feature

* **perf**: A code change that improves performance

* **test**: Adding missing tests or correcting existing tests

* **build**: Changes that affect the build system or external 
* **dependencies (example scopes: gulp, broccoli, npm)

* **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)

* **chore**: Other changes that don't modify src or test files

* **revert**: Reverts a previous commit