# Dailies

Dailies refers to individual markdown files made day over day. I make use of them while working on projects, when logging work, or to keep track of ideas that I want to develop. 

## Folder Structure

Dailies are stored in a custom folder structure as follows:

```
- basedir
  - current
    - week##
      - yyyy-mm-dd.md
      - summary.md
  - archived (future-release+)
    - month
      - day yyyy-mm-dd.md
      - week## week##-summary.md
```

## Commands

A tree like summary of what I'd like out of this module, with sub modules and actions as appropriate. 

- Open
  - [ ] Give it a date, have the file for that date opened (wherever the file exists)
    - If file exists, it loads it in the default editor
    - you can define a backup editor that you'd like to use instead via a command parameter
    - if file doesn't exist, provide a smart error message 
    - if file doesn't exist, offer to create it <== MVP 💫
  - [ ] Optional: Locate smartly between archived / current
    - Once files can be archived, they may no longer exist in the current directory
    - A daily file should *only* exist in either the current or archived files
- Create
  - [ ] Give it a date, create the file in the appropriate space
    - [ ] If the file exists already
      - [ ] Provide an error message
      - [ ] Offer to open it?
    - [ ] Template for creating the new file
      - [ ] File source:
        - [ ] v0 hardcoded
        - [ ] v1 default from config?
        - [ ] v2 command parameter?
      - [ ] Template Values:
        - [ ] v0 none: static template
        - [ ] v1: fill in static values like dates (variable interpolation)
        - [ ] v2: prompts during creation to fill in values
- Common Elements:
  - [ ] Validate an input date
  - [ ] Helpers for common dates (today/yesterday/tomorrow)
  - [ ] Resolve a date to a filepath (current only for now)

 