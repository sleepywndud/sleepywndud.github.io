#L3CALC 

---

Parametric functions are just ways to represent multiple values that don't depend on each other, but both depend on the same independent variable. They often are used as a way of describing a curve using a third variable called a parameter (often '$t$'). \
Instead of writing $y$ directly as a function of $x$ like $y=f(x)$, we write BOTH as a function of $t$:

$$
x(t)=\space???, \space y(t)=\space???
$$

$t$ is the parameter, controlling the motion along the curve.\
As $t$, changes the point $(X(t), Y(t))$ will change, and draw a curve.

---

Most of the times, there will be two equations using the same independent variable $t$.\
For example:
$
x=2t^2, \space y=6t$

To derive this, we first must differentiate each function separately:

$$
\frac{dx}{dt}=4t
$$


$$
\frac{dy}{dt}=6
$$

When differentiating, what we are looking for is still $\frac{dy}{dx}$, and a way to get it is:

$$
\frac{dy}{dx}=\frac{dy}{dt}\times \frac{dt}{dx}
$$

$dt$ 'cancels out', so we can let them be 1.

$$
\frac{dy}{dx}=\frac{6}{1}\times \frac{1}{4t}
$$


$$
\frac{dy}{dx}=\frac{6}{4t}
$$


$$
\frac{dy}{dx}=\frac{3}{2t}
$$


---

Way to plot the parametric equation on Desmos is:

$$
X(t)=2t^2
$$


$$
Y(t)=6t
$$


$$
(X(t), Y(t))
$$
