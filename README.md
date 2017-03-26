# Hexane

![Logo](https://raw.githubusercontent.com/sxyu/Hexane/master/favicon-32x32.png)	
[hexane.tk](http://hexane.tk)

![Screenshot](https://raw.githubusercontent.com/sxyu/Hexane/master/img/screenshot.png)	


Hexane is an online calculator supporting calculations with significant figures. It is designed for use by chemistry students and contains many additional features such as an equation balancer to facilitate learning. The basic design is very simple and intuitive. Features are outlined below.

## Basic Usage

- To use the calculator, open [hexane.tk](http://hexane.tk) on any computer or mobile device
- Type into the calculator textbox to evaluate any expression
- The result is displayed at the top both as a *full number* and in *scientific notation*
- On mobile devices and other devices with touch screens, the keyboard below may be more convenient to use.
- Most of the data in the calculator is stored in your browser. When you refresh the page the content in the textbox remains and variables and history persist. Note that if you clear your cookies/site data, this data may be deleted as well.

### Typing Math

Hexane uses MathQuill: [github.com/mathquill/mathquill](github.com/mathquill/mathquill) to accept mathematical input.

- Typing `+` `-` and `*` will give you the addition, subtraction, and multiplication operators, respectively. 
- Typing `/` allows you to insert a fraction
- Typing `^` creates an exponent
- Typing `_` creates a subscript
- Typing `log_` allows you to create a log expression
- `E` raises a number to a power-of-ten
- `%` is the percent operator
- `(` `)` `[` `]` `{` `}` are all valid brackets operators
- `<` `>` `=` `<=` `>=` are comparison operators

### Special Characters in the Hexane Calculator
- `#` Marks a number as infinitely precise: `#1 / 100. = 0.0100` 
- `"` Marks the start & end of chemical formulae: `"H2O"`

### Memory Module

Hexane allows you to store values in variables so you can use them again later. These are saved in your browser and persist between sessions. 
- Left click one of the memory tiles (below the keyboard) to enter the letter into the textbox. 
- Right click to save the current result in the calculator to the specific variable. 
- The `:=` operator Allows you to assign variables: `a := 3`

### History Module

Another way to reuse answers is to save them to history.
- Press `Enter` in the textbox to save the current result
- You may also press `Save` on the on-screen keyboard to save the current result.
- Press on of the history tiles (below the memory module) to enter the value into the textbox. Right click or press the delete button on any one of the tiles to delete it. 
- Press the `clear` button to delete all the tiles.

### Chemistry Functions

Hexane provides a number of built-in chemistry-related functions for convenience. To use them, enter the function name, type `("`, enter the chemical formula as appropriate, and then close off the formula with `")`. The brackets `()` enclose the function parameters and the quotes `""` mark the chemical formula. You may choose to use subscripts in the chemical formulae (H<sub>2</sub>O instead of H2O) but are not required to.

Usage Example: `Ka("CH3COOH")`

Here is a list of all the available functions:
- `Ka` `pKa` `Kb` `pKb` `Ksp`: Get the respective data value for a compound
- `elemmass`: Get the molar mass of an element (you may want to use `molmass` instead)
- `molmass`: Calculate the molar mass of a compound
- `balance`: Balance a chemical equation of the form A ... B = C ... D. 
Try: `K4[Fe(SCN)6]+K2Cr2O7+H2SO4=Fe2(SO4)3+Cr2(SO4)3+CO2+H2O+K2SO4+KNO3"`
- `charge`: Get the common charges associated with an elemental or polyatomic ion.
- `qdtcacid`: Takes a Ka and a concentration and outputs the correct [H3O+]

The following are not strictly chemical functions but are still often useful in chemical calculations:
- `sf`: Get (`sf(3.0)`) or set (`sf(300,2)`) the number of significant figures in a number.
- `qdtc`: Takes three parameters and outputs the solution(s) to a quadratic equation.
- `qdtcp` `qdtcn`: only return one of the possible two qdtc solutions so you can keep working with the answer.

### More Documentation Coming Soon

## License

This project is licensed under the Apache License 2.0 available here:
[http://www.apache.org/licenses/LICENSE-2.0]([http://www.apache.org/licenses/LICENSE-2.0)

For  details, please refer to the LICENSE.md file under the project root directory.