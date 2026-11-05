#L2MAEL 

---
# Arithmetic Sequences
An arithmetic sequence is a sequence that has a common difference between each term like the following:

$$
\boxed{1} : \ 1,4,7,10,13,16,\dots \\ \boxed{2} : \ 11,7,4,-1,\dots
$$

They have a common difference of $+3$ and $-4$, respectively. 

The $n$th term of an arithmetic sequence can be written as the following:

$$
\boxed{T_{n}=T_{1}+(n-1)d}
$$

where $T_{n}$ is the $n$th term in a sequence, $T_{1}$ is the first term in a sequence, and $d$ is the common difference.

*Proof:*
Using the definition of a common difference, we start with the first term $T_{1}$.

$$
T_{1}=T_{1} + 0d \\ T_{2}=T_{1} + 1d \\ T_{3}=T_{1} + 2d \\ T_{4}=T_{1} + 3d \\ T_{5}=T_{1}+ 4d \\ \dots
$$

Hence $T_{n}=T_{1} + (n-1)d  \ {∎}$.

Now, what about when we *sum* an arithmetic sequence?

Consider the following arithmetic sum:

$$
S_{n}=T_{1}+(T_{1}+d)+(T_{1}+2d) + \dots + T_{n}
$$

Now write the *same sum* in reverse order:

$$
S_{n}=T_{n} + (T_{n}-d) + (T_{n}-2d)+ \dots + T_{1}
$$

If we sum those two sums, we get:

$$
\begin{array}{rcl}
S_n &=& T_1 + (T_1+d) + (T_{1}+2d) + \dots + T_n \\
+\; S_n &=& T_n + (T_n-d) + (T_{n}-2d) + \dots + T_1 \\
\hline
2S_n &=& (T_1+T_n) + (T_{1}+T_{n}) + (T_{1}+T_{n}) +\dots
\end{array}
$$

There exists a $n$ number of $(T_{1}+T_{n})$, and hence the sum of the sum of the arithmetic sequence is:

$$
2S_{n}=n(T_{1}+T_{n})
$$


$$
\iff \boxed{S_{n}=\frac{n(T_{1}+T_{n})}{2}}
$$

