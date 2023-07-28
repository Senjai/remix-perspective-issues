This is a wip reproduction of an issue with getting perspective working within remix. This repo attempts to recreate https://codesandbox.io/s/react-elcg7i?file=/src/Perspective.js in Remix.

Related issues: https://github.com/finos/perspective/discussions/2181, https://github.com/finos/perspective/issues/2183. I've looked at the NextJS example as well.

This seems challenging since Remix explicitly doesn't want to open up its compiler so far that I can tell, but importing the perspective library without the fully qualified path (e.g. import "@finos/perspective") seems to attempt to load the node-specific code, which errors out on not being able to find the stoppable module. Either adding stoppable as a dependency, setting the build target to neutral, or loading the fully qualified url "@finos/perspective/dist/esm/perspective.js" triggers errors related to using import/export outside of a module.

I'm a bit stuck. As a last resort of course we could probably pull these files in via CDN or the like instead of using the bunlder, but that seems off.

To reproduce the errors:
```shell
yarn install && yarn dev
```

Error using the qualified path:

```
SyntaxError: Cannot use import statement outside a module
    at internalCompileFunction (node:internal/vm:73:18)
    at wrapSafe (node:internal/modules/cjs/loader:1195:20)
    at Module._compile (node:internal/modules/cjs/loader:1239:27)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1329:10)
    at Module.load (node:internal/modules/cjs/loader:1133:32)
    at Function.Module._load (node:internal/modules/cjs/loader:972:12)
    at Module.require (node:internal/modules/cjs/loader:1157:19)
    at require (node:internal/modules/helpers:119:18)
    at Object.<anonymous> (/Users/richard/src/remix-perspective/app/components/Perspective.tsx:3:25)
    at Module._compile (node:internal/modules/cjs/loader:1275:14)
```

Error using the regular import yields the stoppable module not found issue
