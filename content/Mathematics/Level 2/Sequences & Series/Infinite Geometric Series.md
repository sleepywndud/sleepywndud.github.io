#L2MAEL 

---

Consider the following geometric series:

$$
T_{1}+T_{1}r+T_{1}r^{2}+\dots+T_{1}r^{n-1}
$$

From the previous geometric sequence note, we know that the sum of the above geometric series is:

$$
S_{n}=\frac{T_{1}(1-r^n)}{1-r}
$$

Now, for an infinite geometric series, $n\to \infty$. 
Note: infinity is a concept of state of endlessness. It is NOT a number. So we use limits instead of writing $r^{\infty}$.

As $n\to \infty$, there are two cases.
## Case 1: $|r|\ge 1$
$r^n$ does not approach $0$, so $S_n$ does not settle on a value.
- $r>1$: $|S_n|$ grows infinitely without limit because $n\to \infty$.
- $r<-1$: $S_n$ grows in size and alternates in sign because $n\to \infty$ and the sign constantly changes as $n\to \infty$.
- $r=1$: $S_n=nT_{1}$, which grows without limit because $n\to \infty$.
- $r=-1$: $S_n$ alternates between $T_{1}$ and $0$ since the sign constantly changes between an odd number and even number as $n\to \infty$.

In every case, $S_{\infty}$ does not exist, and hence we wouldn't need to care about this case pretty much.

## Case 2: $|r|<1$
As $n\to \infty$, $r^n\to 0$.
This implies the following:

$$
S_{\infty}=\lim_{n\to\infty}\frac{T_{1}(1-r^n)}{1-r}=\frac{T_{1}(1-0)}{1-r}=\boxed{\frac{T_{1}}{1-r}}
$$

This converges to a fixed value.

Hence, the sum to infinity of a geometric progression is:

$$
S_{\infty}=\frac{T_{1}}{1-r} \\ \\ \text{given that } |r|<1.
$$

---

This can be used in an interesting way.

For the number $0.\overline{3}$, we can express that in the following infinite geometric series with a common ratio of 0.1:

$$
0.\overline{3}=0.3+0.03+0.003+\dots
$$


Since this is a infinite geometric series, we can set up $S_{\infty}$.

$$
S_{\infty}=\frac{0.3}{1-0.1}=\frac{0.3}{0.9}=\frac{1}{3}
$$

Hence

$$
0.\overline{3}=\frac{1}{3}
$$

