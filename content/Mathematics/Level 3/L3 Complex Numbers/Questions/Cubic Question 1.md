#L3CALC 

---

Given the cubic function

$$
2x^{3}+px-(3+5i)x+q=0
$$

with roots $i, \frac{1}{k}, -(1+k)$,

Find the value of $p$, $q$, $k$. But $k \in \mathbb{R}$.

---

$\boxed{正} \  \text{: Comparison of Coefficients}$

$$
2x^{3}+px-(3+5i)x+q=0
$$


$$
\equiv 2(x-i)\left( x-\frac{1}{k} \right)(x+(1+k))=0
$$


$$
\implies 2\left[ \left( x^{2}-\frac{x}{k}-ix+\frac{i}{k} \right)(x+(k+1)) \right]=0
$$


$$
\implies 2\left[ x^{3}+\left( k+1-\frac{1}{k}-i \right)x^{2}+\left( - \frac{k+1}{k}-i(k+1)+\frac{i}{k} \right)x+ \frac{k+1}{k}i \right]=0
$$


$$
\implies 2x^{3}+2\left(k+1-\frac{1}{k}-i \right)x^{2}+2\left(-\frac{k+1}{k}-i(k+1)+\frac{i}{k}\right)x+\frac{2(k+1)}{k}i=0
$$

Now comparing coefficients:

$$
p=2\left( k+1-\frac{1}{k}-i \right)
$$


$$
-3-5i=2\left( - \frac{k+1}{k}-i(k+1)+\frac{i}{k} \right)
$$


$$
q=\frac{2(k+1)}{k}i
$$

Using the second equation and by equating $\mathrm{Re}=\mathrm{Re}$, $\mathrm{Im}=\mathrm{Im}$:

$$
-3=-\frac{2(k+1)}{k}
$$


$$
3k=2k+2
$$


$$
\boxed{k=2}
$$

Now substitute into other equations:

$$
\boxed{p=5-2i}
$$


$$
\boxed{q=3i}
$$

---

$\boxed{\text{AS}}: \text{Vieta's Formulas}$
Vietas formulas of a cubic function states that for a cubic function

$$
ax^{3}+bx^{2}+cx+d=0
$$

with roots $\alpha, \beta, \gamma$, the following relationship can be formed:

$$
\alpha+\beta+\gamma=-\frac{b}{a}
$$


$$
\alpha\beta+\alpha\gamma+\beta\gamma=\frac{c}{a}
$$


$$
\alpha\beta\gamma=-\frac{d}{a}
$$

Using this, we can use the relationship between the roots and the coefficients of the cubic:

$$
i+\frac{1}{k}-(k+1)=-\frac{p}{2}
$$


$$
\frac{-3-5i}{2}=\frac{i}{k}-i(k+1)-\frac{k+1}{k}
$$


$$
-\frac{q}{2}=\frac{i(k+1)}{k}
$$

Using the second equation and by equating $\mathrm{Re}=\mathrm{Re}$, $\mathrm{Im}=\mathrm{Im}$:

$$
\mathrm{Re}: k=2
$$


$$
\mathrm{Im}: k=2 , k=-\frac{1}{2}
$$

but $-\frac{1}{2}$ subbed back to $\mathrm{Re}$ is false, so reject, and therefore $\boxed{k=2}$.
Substituting $k=2$ into first and third equations:

$$
\boxed{p=5-2i}
$$


$$
\boxed{q=3i}
$$

