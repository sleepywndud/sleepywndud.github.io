#L3CALC 

---

Quotient rule is used to differentiate functions that are expressed in a fraction form like this:
$$
y=\frac{(2x^2+1)}{(e^{9x})}
$$
We can see that there are two functions -- one on the numerator $(2x^{2}+1)$, and one in the denominator $(e^{9x})$.\
To differentiate this function quickly, we can first:
$$
let \space u=(2x^{2}+1)
$$
$$
let \space v=(e^{9x})
$$

Then we can differentiate these two functions individually:
$$
u'=4x
$$
$$
v'=9e^{9x}
$$

Now we can apply the product rule of:
$$
\text{if } y=\frac{u}{v}
$$
$$
\text{then }\frac{dy}{dx}= \frac{u'v-uv'}{v^{2}}
$$

$$
\frac{dy}{dx}=\frac{\left[4xe^{9x}-9e^{9x}(2x^{2}+1)\right]}{[e^{9x}]^{2}}
$$
$$
\frac{dy}{dx}=\frac{\left[4xe^{9x}-9e^{9x}(2x^{2}+1)\right]}{e^{18x}}
$$
---

This rule can be applied basically anywhere that $y$ is expressed as a function over function.