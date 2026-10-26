#SCH_CALC 

---

This is a long and painful question, but solving it gives you 4S marks.

Start by differentiating $x$ and $y$ with respect to $t$:

$$
\frac{dx}{dt}=2t+2
$$



$$
\frac{dy}{dt}=3at^{2}+2bt+c
$$


$$
\implies \frac{dy}{dx}=\frac{3at^{2}+2bt+c}{2t+2}
$$


$$
\frac{d^2y}{dx^2}= \frac{d\left( \frac{dy}{dx} \right)}{dt}\cdot \frac{dt}{dx}
$$

Using quotient rule:

$$
\frac{d^2y}{dx^2}=\frac{(6at+2b)(2t+2)-2(3at^{2}+2bt+c)}{(2t+2)^{2}}\cdot \frac{1}{2t+2}
$$


$$
\frac{d^2y}{dx^2}=\frac{(6at+2b)(2t+2)-2(3at^{2}+2bt+c)}{(2t+2)^{3}}
$$

...which is equal to $\frac{3}{4(1+t)}$

$$
\frac{d^2y}{dx^2}=\frac{(6at+2b)(2t+2)-2(3at^{2}+2bt+c)}{(2t+2)^{3}}=\frac{3}{4(1+t)}
$$

Cross multiplying gives

$$
4(1+t)\left[ (6at^{2}+2b)(2t+2)-2(3at^{2}+2bt+c) \right]=3(2t+2)^{3}
$$


$$
2(2+2t)\left[ (6at^{2}+2b)(2t+2)-2(3at^{2}+2bt+c) \right]=3(2t+2)^{3}
$$


$$
2\left[ (6at^{2}+2b)(2t+2)-2(3at^{2}+2bt+c) \right]=3(2t+2)^{2}
$$


$$
2\left[ 12at^{2}+12at\cancel{ +4bt }+4b-6at^{2}\cancel{ -4bt }-2c \right]=12(t^{2}+2t+1)
$$


$$
6at^{2}+12at+4b-2c=6t^{2}+12t+6
$$

Comparing the coefficients, we get the following:

$$
\boxed{1}: a=1
$$


$$
\boxed{2}:4b-2c=6 \iff 2b-c=3 \iff c=-3+2b
$$

Using the second information from the question, which is $3a+2b+c=6$, we can get $b$:

$$
3+2b-3+2b=6
$$


$$
b=\frac{3}{2}
$$


$$
c=0
$$


$$
d=0
$$

Using the values of $a,b,c,d$ we can get the final answer:

$$
8a+4b+2c+d = 8+4\left( \frac{3}{2} \right)+0+0=\boxed{14}
$$


$$
\boxed{p(2)=14}
$$

