#SCH_CALC #L3CALC 

---

$$
I=\int_{a}^{a+1}\sin(e^x) \ dx
$$

Let the antiderivative of $\sin e^x=F(x)$ because $\int \sin e^x \ dx \neq -\frac{\cos e^x}{e^x}+C$

$$
I=F(a+1)-F(a)
$$


$$
\frac{dI}{da}=F'(a+1)-F'(a)
$$


$$
\frac{dI}{da}=\sin(e^{a+1})-\sin(e^a)=0
$$


$$
\sin(e^{a+1})=\sin e^a
$$


$$
\implies e^{a+1}=e^a
$$

but the above equation is false -- there are no values for $a$ that satisfies the above equation!

Use general solution of $\sin x$!

$$
\alpha=\sin^{-1}(\sin(e^a))\equiv e^a
$$


$$
e^{a+1}=n\pi+(-1)^n\cdot e^a
$$


$$
e^a \cdot e^1-(-1)^n \cdot e^a = n\pi
$$


$$
e^a ( e-(-1)^n )=n\pi
$$


$$
e^a=\frac{n\pi}{e-(-1)^n}
$$


$$
a=\ln\left( \frac{n\pi}{e-(-1)^n} \right)
$$

if $n=0$:

$$
\implies a=\ln\left( \frac{0}{e-(-1)^0} \right)\equiv 0
$$

if $n=1$:

$$
\implies a=\ln\left( \frac{\pi}{e+1} \right) \approx -0.1685
$$

if $n=2$:

$$
\implies a=\ln\left( \frac{2\pi}{e-(-1)^2} \right) \approx 1.2966
$$

if $n=3$:

$$
\implies a= \ln\left( \frac{3\pi}{e-(-1)^3} \right) \approx 0.9301
$$

if $n=4$:

$$
\implies a=\ln\left( \frac{4\pi}{e-(-1)^4} \right)\approx 1.9897
$$

Looking at the graph, the maximum area is generated when $n=1, a=-0.1685$, since when $n=2,3,4\dots$ the area gets smaller..

In exact form $a=\ln\left( \frac{\pi}{e+1} \right)$!
