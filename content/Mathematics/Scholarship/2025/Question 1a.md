#SCH_CALC #L3CALC 

---
$$
\sqrt[3]{ 125^{x^{3}-5x^{2}+11x-3 }}=\sqrt[4]{ 5^{4x^{2}+12} }
$$
Change the $125 \to 5^3$:
$$
\sqrt[3]{ 5^{3(x^{3}-5x^{2}+11x-3 )}}=\sqrt[4]{ 5^{4x^{2}+12} }
$$
Change the $\sqrt{  }$ to index form:
$$
\left(5^{3(x^{3}-5x^{2}+11x-3 )}\right)^{\frac{1}{3}}=\left(5^{4x^{2}+12 }\right)^{\frac{1}{4}} \iff 5^{x^{3}-5x^{2}+11x-3}=5^{x^{2}+3}
$$
After simplification, and after using the index rule:
$$
x^{3}-5x^{2}+11x-3=x^{2}+3 \iff x^{3}-6x^{2}+11x-6=0
$$
We get a cubic equation. 

Solving synthetically with 1 (guess):
$$
\begin{array}{r|rrrr}
   & 1 & -6 & 11 & -6 \\
1  &   & 1  & -5 & 6  \\
\hline
  & 1 & -5 & 6  & \boxed{0}
\end{array}
$$
$1$ is a solution, and hence the other solutions are $2$ and $3$!
$$
\implies \boxed{x=1, 2, 3}
$$
