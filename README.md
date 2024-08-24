# wcag-lume

Functions for calculating colour and relative luminosity based on WCAG 2.2 formulae.

## colLume(hexColour)

This funnction returns the luminosity of the given `colour`, which is expected to be a hexidecimal code for the red, green and blue elements of the colour.
Accepted formats include: RGB, #RGB, RGBA, #RGBA, RRGGBB, #RRGGBB, RRGGBBAA, #RRGGBBAA

Where:

- \# is a literal hash character.
- R, G, B are hexidecminal characters in any case (0-9, a-f, A-F)
- A is a hexidecminal character representing the opacity (Alpha channel), which is ignored.

The returned value if the calculated luminosity of the colour between 0 and 21.

## relLume(foreground, background)

The relLume function expect to arguments representing the foreground and background colours in either hex code (as decscribed above) or the luminosity of a colour (product of a colLume function).

The result is an object containing the following two properties:

- relLum: The calculated relative luminosity between 0 and 21.
- wcag: The conformance level AAA, AA, A or X.
