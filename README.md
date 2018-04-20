# bidmas-solver
A simple and easy to extend BIDMAS calculator for JavaScript

# How to use

After somehow importing the code, you can (**NB**: I haven't fully tested everything) do stuff like

```javascript
separate("1 + 2 * 3")
```

The return value of which is

```
{type: "number", value: "1"},
{type: "op", precedence: 1, value: "+"},
{type: "number", value: "2"},
{type: "op", precedence: 0, value: "*"},
{type: "number", value: "3"}
```

You can then fiddle with this before passing it to `calculate`.

```
calculate(separate("1 + 2 * 3"))
```

Which will of course output `7`.

There is a shortcut if you don't want to modify anything before calculating the result. This is the `solve(str)` function, which will pass the argument to `seperate` *and* the return value of that to `calculate` before returning the final answer.

```
solve("1 + 2 * 3")
```

Is therefore equivilent.

# How to modify precedences/matched lexemes

I'll write this section later :)
