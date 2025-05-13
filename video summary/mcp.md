# Context7

## What does Context7 say?

*Without Context7*

- ❌ Outdated documentation from training data
- ❌ Hallucinated code examples that don't work
- ❌ Generic answers not specific to your version
- ❌ Time wasted verifying AI responses
- ❌ Frustrating back-and-forth with LLMs

*With Context7*

- ✅ Up-to-date, version-specific documentation
- ✅ Real, working code examples from the source
- ✅ Concise, relevant information with no filler
- ✅ Free for personal use
- ✅ Integration with your MCP server and tools

##  Whats one the biggest Problem in AI programming until know?

- Hallucinated code examples that don't work
- With what data is the llm trained? Maybe with outdated documentation?

## What's required to add your own documentation?

f. ex. if you've written your own util packages.

- Requires good documentation for adding own documentation
- Specific structure

## How does it work? 

1. What library? -> Find by keyword like "Supabase", get id of that documentation
2. Whats the "question", get documentation of library and add the question

## Playground & Example

https://context7.com

1. Pick library `Material UI`
2. Search term `Custom theme in typescript`
3. Output:

```
TITLE: TypeScript Theme Augmentation for Material UI
DESCRIPTION: Demonstrates how to extend Material UI theme types using TypeScript module augmentation to add custom variables.
SOURCE: https://github.com/mui/material-ui/blob/master/docs/data/material/customization/theming/theming.md#2025-04-22_snippet_1

LANGUAGE: tsx
CODE:
declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string;
        };
    }
    
    // allow configuration using `createTheme()`
    interface ThemeOptions {
        status?: {
        danger?: string;
    };
}
```
https://context7.com/mui/material-ui/llms.txt?topic=Custom+theme+in+typescript

This is f. ex. a small snippet from the context which is given to the LLM to have latest information about documentation.

## Downsides

- Requires latest version? What if you are 2 major versions behind?

## Blackboxes

- What about code without libraries? Like documentation just for plain `javascript` or `java`? f. ex. is this relevant for which ECMA Script version should be used?

## What could make this even better?

- Adding the local files as context in order to give information about **required library versions**.
