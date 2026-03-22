#L2MAEL 

---

<img src="/images/7d8a7718dd348cae20ff6c81d4655368.png" alt="gradient geometry" />

Equation for finding the gradient of the pink line between the points $( x_{1} , y_{1} )$, and $(x_{2},y_{2})$ is:

$$m=\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$$

When $x_{1}$ is changed to $x$, and $y_{1}$ to $y$, the graph turns into:

<img src="/images/320bccb3aae6efcf28c843c918521d00.png" alt="graph increment" />

This implies that $x_{2}$ is basically $x+h$, as $h$ is the distance between the two points.

The $y$ turns into $f(x)$ in differentiation, which makes:
<img src="/images/ab747e603fee5c4e8052779f76f95587.png" alt="f(x+h) and f(x)" />

The graph can be found here: https://www.desmos.com/calculator/ebvi4kqrta
	**-> Make sure to turn on 'Reverse Contrast' for clarity.**

---

### <u>Forming a Formula for Differentiating</u>:

Using the graph from above, the equation for the gradient of the pink line would be:

$$m=\frac{f(x+h)-f(x)}{x+h-x}$$

$$m=\frac{f(x+h)-f(x)}{h}$$

This '$m$' in differentiation is called $f'(x)$ (pronounced "eff prime ex"). Therefore:

$$f'(x)=\frac{f(x+h)-f(x)}{h}$$

Differentiation is about getting the gradient of the line when the line is *tangent* to the function, and for that, $h$ in the graph would need to be close to $0$, but not $0$.

To represent this, $\lim$ (limit) would need to be used:

$$\lim_{ h \to 0 } $$

The limit above means when $h$ goes down to as close as possible to zero, but not exactly zero -- just like the asymptote in an exponential.

Therefore, the differentiation formula is: 

$$f'(x)=\lim_{ h \to 0 } \frac{f(x+h)-f(x)}{h}$$

$f'(x)$ is called as the 'derivative', or 'gradient' (first derivative to be more specific), and is also written as:

$$\frac{dy}{dx}, \frac{\Delta y}{\Delta x}$$

$d$ and $\Delta$ meaning 'Change', which means:

$$\frac{\text{Change of y}}{\text{Change of x}}$$
