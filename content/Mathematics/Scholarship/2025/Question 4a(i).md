#SCH_CALC #L3CALC 

---


$$
\int_{0}^1\sin^{-1}x \ dx \equiv \int_{0}^1\sin^{-1}x \cdot 1 \ dx
$$

Using integration by parts:
$u=\sin^{-1}x$
$u'= \ ?$
$v=x$
$v'=1$

To get $u'$:

$$
y=\sin^{-1}x \iff x=\sin y
$$

Differentiate implicitly:

$$
1=\cos y \cdot \frac{dy}{dx} \iff \frac{dy}{dx}=\frac{1}{\cos y}
$$

Since $x=\sin y \iff x^{2}=\sin ^{2} y \iff -x^{2}=-1+\cos ^{2}y$

$$
\cos ^{2}y=1-x^{2}
$$

We only use the positive root of $\cos y=\sqrt{ 1-x^{2} }$ because $\sin^{-1}x$ is defined within $-\frac{\pi}{2}\leq y\leq \frac{\pi}{2}$, and because $\cos y$ between the interval $-\frac{\pi}{2}\leq y\leq \frac{\pi}{2}$ is always positive (in the 1st and 4th quadrant)!

Hence

$$
\frac{dy}{dx}=\frac{1}{\sqrt{ 1-x^{2} }} \equiv u'
$$

Back to integration by parts:

$$
\int uv' \ dx=uv-\int u'v \ dx
$$


$$
\int \sin^{-1}x \cdot 1 \ dx=x\sin^{-1}x - \int \frac{x}{\sqrt{ 1-x^{2} }} \ dx
$$

Calculate the integral on RHS ($\int \frac{x}{\sqrt{ 1-x^{2} }} \ dx$) using u-substitution:

$$
=\int \frac{x}{\sqrt{ u }}\cdot \frac{du}{-2x}
$$


$$
=\int \frac{1}{-2\sqrt{ u }} \ du
$$


$$
=-\frac{1}{2} \int \frac{1}{\sqrt{ u }} \ du
$$

Back to integration by parts:

$$
\int \sin^{-1}x \cdot 1 \ dx = x\sin^{-1}x+\frac{1}{2}\int \frac{1}{\sqrt{ u }} \ du
$$


$$
 \int \sin^{-1}x \cdot 1 \ dx =x\sin^{-1}x+\frac{1}{2} \int u^{-1/2} \ du
$$


$$
\int \sin^{-1}x \cdot 1 \ dx=x\sin^{-1}x+\frac{1}{2} \left[ 2u^{\frac{1}{2}} \right]
$$

Substitute $u=1-x^{2}$ back:

$$
\int \sin^{-1}x \cdot 1 \ dx = x\sin^{-1}x + \frac{1}{2} \left[ 2(1-x^{2})^{\frac{1}{2}} \right]
$$

Apply bounds from 0 to 1:
NOTE:

$$
\int _{a}^b uv' \ dx = \left[ uv \right]_{a}^b -\int_{a}^b u'v \ dx
$$


$$
\int_{0}^1 \sin^{-1}x \cdot 1 \ dx = \left[x\sin^{-1}x\right]_{0}^1 + \frac{1}{2} \left[ 2(1-x^{2})^{\frac{1}{2}} \right]_{0}^1
$$


$$
\int_{0}^1\sin^{-1}x \cdot 1 \ dx= \boxed{\frac{\pi}{2} -1}
$$

---

Or alternatively what we can do is rotate the screen by 90 degrees, which will give us a $\sin x$ graph, and apply bounds from $-\frac{\pi}{2}$ and $\frac{\pi}{2}$!

