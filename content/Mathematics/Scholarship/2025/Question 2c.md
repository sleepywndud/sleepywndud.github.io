#SCH_CALC 

---

This question was, in my opinion, the HARDEST question in the 2025 Scholarship Calculus Examination. 

The main part about this question was using the hint at the bottom which says "Consider the function $g(x)=f(x)-x^{2}$ in factorized form".

In the diagram, we can see that the points $A,B,C$ given satisfy the condition $y=x^{2}$.


$$
g(x)=f(x)-x^{2}
$$

Substitute points $A,B,C$:

$$
g(2)=f(2)-4=0
$$


$$
g(3)=f(3)-9=0
$$


$$
g(4)=f(4)-16=0
$$

Since $g(x)$ is still a cubic, and has factors of $2,3,4$ we know that:

$$
g(x)=a(x-2)(x-3)(x-4)
$$


$$
\implies f(x)=a(x-2)(x-3)(x-4)+x^{2}
$$

Now get the equation of lines $\overline{AB}, \overline{BC}, \overline{AC}$:

$$
\overline{AB}=y=5x-6
$$


$$
\overline{BC}=y=7x-12
$$


$$
\overline{AC}=y=6x-8
$$

Now set the cubic equal to the line to find $D$:

$$
a(x-2)(x-3)(x-4)+x^{2}=5x-6
$$


$$
a(x-2)(x-3)(x-4)+x^{2}-5x+6=0
$$


$$
\implies a(x-2)(x-3)(x-4)+(x-2)(x-3)=0
$$


$$
\implies(x-2)(x-3) \cdot [a(x-4)+1]=0
$$

Since $(x-2)(x-3)$ are $A$ and $B$, $a(x-4)+1=0$ should give $D$:

$$
x_{D}=-\frac{1}{a}+4
$$

Using the same way, $E$ and $F$ can be found.

$$
x_{E}=-\frac{1}{a}+3
$$


$$
x_{F}=-\frac{1}{a}+2
$$

Since $x_{D}+x_{E}+x_{F}=25$:

$$
\left( -\frac{1}{a}+4 \right)+ \left( -\frac{1}{a}+3 \right)+\left( -\frac{1}{a} +2 \right)=25
$$


$$
\implies a=-\frac{3}{16}
$$

We know that $f(0)=-24a$, which is the $y$-intercept.


$$
f(0)=-24 \left( -\frac{3}{16} \right)=\boxed{\frac{9}{2}}
$$

