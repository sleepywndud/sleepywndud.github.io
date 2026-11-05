#L2MAEL 

---

Sequences & Series in L2 touches the two series: arithmetic series and geometric series.
This note covers both series, as well as the $\sum$ notation (which isn't part of L2).

This note is written for the preparation of the 2026 Scholarship Calculus examination.

---
# Series
'Series' is the sum of terms in a sequence. 
A sequence may refer to something like this:

$$
1+2+3+\dots+10
$$

The series above can be written quite easily. You just have to write from 1 to 10.
However, for a series like:

$$
1+2+4+8+16+\dots + 4096
$$

Writing all the numbers is a waste of time, and hence mathematicians decided to write these using a mathematical notation $\sum$. $\sum$ is the capital greek letter 'S', sigma (NOT the sigma in sigma boi). In mathematics, this sigma means 'sum'.

Integrals $\int$ means sum, and $\sum$ also means sum. The difference comes from *what you're summing*.
Integrals sum ALL the $\mathbb{R}$, whereas the summation only sums numbers in a pattern. Integrals are like hills, whereas the summation is like stairs (if you know what I mean!).

Inside the $\sum$, there are also things that can go under, and on the symbol like this:

$$
\sum_{n=1}^{10} (n)
$$

On the bottom, we have $n=1$, and on the top we have 10. The bottom, we call it the 'lower limit'. This defines the start of the summation. The 10 at the top, we call it the upper limit. This defines the end of the summation. Finally, the term $n$ inside the bracket, is what is being summed. 

The above summation means the following:

$$
1+2+3+4+5+6+7+8+9+10
$$

Basically meaning, *sum all the (integer) values of $n$ from 1 to 10*.

Another instance, consider the following summation:

$$
\sum_{k=1}^{5} \left(\frac{k^{2}}{2}\right)
$$

This can be evaluated by:

$$
\sum_{k=1}^{5} \left( \frac{k^{2}}{2} \right)=\frac{1^{2}}{2}+\frac{2^{2}}{2}+\frac{3^{2}}{2}+\frac{4^{2}}{2}+\frac{5^{2}}{2}=\boxed{\frac{55}{2}}
$$


# Forming a Series
Consider the following sequence:

$$
5+9+13+17+21+\dots
$$

To form a series, we can either use common sense, or find a pattern.
Our goal is to find a formula for $n$ that describes that sequence above (called general term).
The pattern in the above sequence is you *add 4* every time the number increases.

First, since we're adding 4 every time the number increases, let's start by having our general term as

$$
4n
$$

Does that number describe the above sequence? Probably not. When $n=1$, the term is 4. We don't even have 4 in the sequence. But let's try adding 1 to the general term, and we get:

$$
4n+1
$$

Substitute $n=1,2,3,4,5\dots$, and all values of $n$ describe the formula above. We call that the general term.
Now, when we have a series, we use the sigma symbol like this:

$$
\sum_{n=1}^{\infty} (4n+1)
$$

We put the first $n$ term on the bottom, and the upper limit on the top. In this sequence, we didn't have a finishing number, and hence the series' upper limit is $\infty$.

Let's look at a couple more sequences and turn them into a series using the sigma notation.

$$
\boxed{1} \\ 1+4+9+16+\dots+121
$$


$$
\boxed{2} \\ x^{2}-x^4+x^6-x^8+x^{10}-x^{12}
$$

Start with sequence $\boxed{1}$.
Let's start by finding the differences:
+3, +5, +7, ...
Then the second difference
+2, +2, +2, ...

Since the second difference is a constant sum, we know that's going to be a quadratic.
Form the general term with a quadratic like this:

$$
n^{2}
$$

That fits all terms in the sequence. Now put it in the sigma notation:

$$
\sum_{n=1}^{11} (n^{2})=506
$$

Consider sequence $\boxed{2}$ now.
For these, we can observe that the sign alternates as the value of $n$ changes.
Similarly, this can be seen in the $\sin$ general formula as $(-1)^n$, which produces general solutions with opposite signs.

We're going to use that. Start by putting the sign as the general term:

$$
(-1)^{n}
$$

The first term needs to have a positive sign, but using above power of $n$ produces $-1$ when $n=1$, so we're going to add one to the power:

$$
(-1)^{n+1}
$$

Now that fits all the signs. Move onto the number now. Looks like the power doubles whenever $n$ increases. That's relatively simple, so we put that as:

$$
(-1)^{n+1} \cdot x^{2n}
$$

Now put that in sigma:

$$
\sum_{n=1}^{6} \left[ (-1)^{n+1} \cdot x^{2n} \right]
$$

Done!
