#L3CALC 

---

Product rule is used to differentiate functions that are products of two functions.\
For example, when we have:
$$
y=(2x^2+1)(e^{9x})
$$
We can see that the function $y$ is a product of two separate functions of $(2x^{2}+1)$, and $(e^{9x})$.\
To differentiate this function quickly, we can first:
$$
let \space u=(2x^{2}+1)
$$
$$
let \space v=(e^{9x})
$$

Then we differentiate these two functions individually:
$$
u'=4x
$$
$$
v'=9e^{9x}
$$

Now we can apply the product rule of:
$$
\text{if} \space y=uv
$$
$$
\text{then} \space \frac{dy}{dx}=u'v+uv'
$$

$$
\frac{dy}{dx}=4x(e^{9x})+(2x^{2}+1)(9e^{9x})
$$
$$
\frac{dy}{dx}=4xe^{9x}+9e^{9x}(2x^{2}+1)
$$

---

This rule can be applied basically anywhere that $y$ is a product of two functions.