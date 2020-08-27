# Wiki Shortest Path

Find the fewest number of links between wikipedia articles.

## How to setup and run

Prerequisites: `node`, `npm`, `git`

**Clone Repo**

In a terminal run:

```zsh
git clone https://github.com/JesseHGerard/wiki-shortest-path.git
cd ./wiki-shortest-path
```

**Install Modules**

```zsh
npm install
```

**Run**

```zsh
npm run start START-ARTICLE-NAME] [END-ARTICLE-NAME]
```

**Example**

If you want to find the links between https://en.wikipedia.org/wiki/Santa_Barbara,_California and https://en.wikipedia.org/wiki/Santa_Barbara,_California, use the portion of the urls after "/wiki/" as your "start" as the first and second arguments to `npm run start`

```zsh
npm run start Santa_Barbara,_California Amazon_Alexa
```

When a path has been found, the console output will look something like this:

```
SOLVED in 2 links:
 / Santa_Barbara,_California / NPR / Amazon_Alexa
```

## Development

Open 2 terminal windows

Set the compiler to run on file changes (in the first terminal window)

```zsh
npm run watch
```

Set the runtime to restart on file changes (in the second terminal window)

```zsh
npm run dev
```
