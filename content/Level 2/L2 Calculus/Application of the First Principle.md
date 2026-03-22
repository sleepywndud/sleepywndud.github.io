#L2MAEL 

---
### <u>Application of the Differentiation Formula</u>:
Using that exact formula, $f(x)=x^2$ will be differentiated below:
$$f'(x)=\lim_{ h \to 0 } \frac{(x+h)^2-x^2}{h}$$

$$f'(x)=\lim_{ h \to 0 } \frac{x^2+2xh+h^2-x^2}{h}$$

$$f'(x)=\lim_{ h \to 0 } \frac{2xh+h^2}{h}$$

$$f'(x)=\lim_{ h \to 0 } \frac{h(2x+h)}{h}$$

$$f'(x)=\lim_{ h \to 0 } 2x+h$$

and since $h$ is so close to zero, we can basically 'treat' $h$ as zero here:

$$f'(x)=2x$$
---
### Differentiating $f(x)=x^3$:

$$f'(x)=\lim_{ h \to 0 } \frac{(x+h)^3-x^3}{h}$$

$$f'(x)=\lim_{ h \to 0 } \frac{x^3 + 3hx^2 + 3xh^2+h^3}{h}$$

$$f'(x)=\lim_{ h \to 0 } \frac{x^3 + 3hx^2 + 3xh^2+h^3-x^3}{h}$$

$$f'(x)=\lim_{ h \to 0 } \frac{3hx^2 + 3xh^2+h^3}{h}$$

$$f'(x)=\lim_{ h \to 0 } \frac{h(3x^2+3xh+h^2)}{h}$$

$$f'(x)=\lim_{ h \to 0 } 3x^2+3xh+h^2$$

treating $h$ as zero:

$$f'(x)=3x^2$$
---
### Differentiating $f(x)=3x^2+2x-1$:

$$f'(x)=\lim_{ h \to 0 } \frac{ 3(x+h)^2 + 2(x+h) - 1 -(3x^2+2x-1) }{ h }$$

$$f'(x)=\lim_{ h \to 0 } \frac{ 3(x^2 + 2hx + h^2) + 2x+2h - 1 -3x^2-2x+1 }{ h }$$

$$f'(x)=\lim_{ h \to 0 } \frac{ 6xh+3h^2+2h }{ h }$$

$$f'(x)=\lim_{ h \to 0 } \frac{ h(6x+3h+2) }{ h }$$

$$f'(x)=\lim_{ h \to 0 } 6x+3h+2$$

treating $h$ as zero:

$$f'(x)=6x+2$$

---

### Differentiating $f(x)=\frac{5}{x}$:

$$f'(x)=\lim_{ h \to 0 } \frac{\frac{5}{(x+h)}-\frac{5}{x}}{h}$$

$$f'(x)=\lim_{ h \to 0 } \frac{ \frac{5x-5x-5h}{x^2+hx} }{\frac{h}{1}}$$

$$f'(x)=\lim_{ h \to 0 } \frac{ \frac{-5h}{x^2+hx} }{\frac{h}{1}}$$

fraction over fraction calculation:

$$f'(x)=\frac{-5h}{hx^2+h^2x}$$

$$f'(x)=\frac{-5h}{h(x^2+hx)}$$

$$f'(x)=\frac{-5}{(x^2+hx)}$$

treating $h$ as zero:

$$f'(x)=\frac{-5}{x^2}$$

Comparing: 

$f(x)$ was $5^{-1}$

$f'(x)$ is $-5x^{-2}$

---

### <u>Pattern in the Formula</u>:

Using the formula above for long equations, for example:

$$f(x)=5x^4+3x-5+x^{-3}+4 \sqrt[3]{ x }+\frac{5}{x^2}-\frac{1}{\sqrt[4]{ x^3 }}$$

Therefore, using the pattern defined below to differentiate is a much faster way, and would reduce mistakes.

<img src="/images/04f77e556f943967e56ca8f0d2b53d02.png" alt="power rule diagram" />

The exponent comes down, and **multiplies** with the coefficient (in this case, it's 1, so nothing happens), then the exponent  **decreases** by one.

Since $2\times 1=2$, and $2-1=1$, the coefficient turns into 2, and the exponent turns into 1. Therefore, the differentiated form  would be: $2x$

This same principle applies with all other functions. 

