#!/usr/bin/env node

const meow = require('meow');
const execa = require('execa');

const cli = meow(`
  Usage
    $ clean-desk <input>

  Options
    clean, hide  Clean my desktop (hide the mess)
    show, mess   Show my desktop (show the mess)

  Examples
    $ clean-desk clean
`
);
/*
{
  input: ['clean', 'show', 'hide', 'mess'],
  ...
}
*/

const [command] = cli.input;

(async () => {
  switch (command) {
    case 'clean':
    case 'hide':
      await execa.shell('defaults write com.apple.finder CreateDesktop false; killall Finder');
      ;
      break;
    case 'show':
    case 'mess':
      await execa.shell('defaults write com.apple.finder CreateDesktop true; killall Finder');
      ;
      break;
    default:
      cli.showHelp();
  }
})();
