#L2MAEL 

---
# Geometric Sequences
If arithmetic sequences were sequences with a common difference, geometric progression is a sequence with a common ratio (or products) like:

$$
\boxed{1} : \  3,6,12,24, \dots \\ \boxed{2} : \ 1,r,r^{2},r^{3},\dots
$$

They have a common ratio of 2 and $r$, respectively.

The $n$th term of a geometric series can be written as the following:

$$
\boxed{T_{n}=T_{1} \cdot r^{n-1}}
$$

It can be proved using common sense, for this one. 

Now, what about the sum of a geometric sequence?

Consider a sum of the geometric series:

$$
S_{n}=T_{1}+T_{1}r+T_{1}r^{2}+\dots+T_{1}r^{n-1}
$$

When we multiply both sides by $r$, we get another equation:

$$
rS_{n}=T_{1}r+T_{1}r^{2}+T_{1}r^{3} + \dots + T_{1}r^n
$$

Now, subtract the two lines:

$$
\begin{array}{rcl}
S_n &=& T_1 + T_1r + T_1r^2 + \dots + T_1r^{n-1} \\
-\; rS_n &=& \phantom{T_1 +\ } T_1r + T_1r^2 + \dots + T_1r^{n-1} + T_1r^{n} \\
\hline
S_n - rS_n &=& T_1 - T_1r^n
\end{array}
$$

Hence

$$
S_{n}-rS_{n}=T_{1}-T_{1}r^n
$$


$$
\iff S_{n}(1-r)=T_{1}(1-r^n)
$$


$$
\iff \boxed{S_{n}=\frac{T_{1}(1-r^n)}{(1-r)}}
$$

However, note that $r\neq 1$, as $S_{n}$ is undefined when $r=1$.
