#L3CALC

---

Normally when we differentiate equations like this to get $\frac{dy}{dx}$:

$$y=(x+1)^2$$

..we expand the bracket, and then differentiate. 

Chain rule is a shortcut way of differentiating sh\*t equations like this to get $\frac{dy}{dx}$:

$$y=(5x+7)^9$$

We do NOT want to do this:

$$y=(5x+7)(5x+7)(5x+7)(5x+7)(5x+7)(5x+7)(5x+7)(5x+7)(5x+7)$$

..because that will take like 3 hours expanding and simplifying.

---

In chain rule, we change whatever's inside the bracket to another variable (that isn't $x$ or $y$), like this:

For this equation $y=(5x+7)^9$:

$$let \space w=5x+7$$

$$y=w^9$$

..we have 2 equations now, and we can differentiate the second equation ($y=w^9$):

$$\frac{dy}{dw}=9w^8$$
(simple differentiation)

And we can also differentiate the first equation ($5x+7$).

$$\frac{dw}{dx}=5$$
(also simple differentiation)

We are left with $\frac{dy}{dw}$, and $\frac{dw}{dx}$ in the end.

What we are trying to get is $\frac{dy}{dx}$.

To do this, we can write it like this:

$$\frac{dy}{dx}=\frac{dy}{dw}\times \frac{dw}{dx}$$

Since $dw$ is the same on both sides, we can cancel it out ***(Note: it isn't exactly the process of cancelling.)***$^1$.

$$\frac{dy}{dx}=9w^8\times 5$$

Now, we remove the $w$:

$$\frac{dy}{dx}=9(5x+7)^8\times 5$$

$$\frac{dy}{dx}=45(5x+7)^8$$

---

Through this, we have differentiated this sh\*t equation of $y=(5x+7)^9$ into $\frac{dy}{dx}=45(5x+7)^8$, using chain rule, instead of having to do this:

$$y=(5x+7)(5x+7)(5x+7)(5x+7)(5x+7)(5x+7)(5x+7)(5x+7)(5x+7)$$

Normally the L3 Differentiation exam don't require students to simplify the equation (because that will take more than 3 years), so leaving the answer as $\frac{dy}{dx}=45(5x+7)^8$ should be fine (unless told to otherwise).
