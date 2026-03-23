#L2MAEL 

---

(c) Juyoung Park 2025.  
This Note is Licensed under the CC-BY-NC-ND 4.0 License.

---
### 1. <u>Introduction to Discriminants</u>

"Discriminants" can be used to figure out how many times a quadratic equation (in the form of $ax^{2}+bx+c=0$) intersects the $x$-axis.\
The discriminant is derived from the quadratic formula (which is derived from the generic quadratic $ax^{2}+bx+c=0$):

$$x=\frac{-b\pm \sqrt{ b^{2}-4ac }}{2a}$$

In the formula, the discriminant is the $b^{2}-4ac$ part.\
Depending on the value of the discriminant ($b^{2}-4ac$), the number of intersections along the $x$-axis changes

---
### 2. <u>Finding the Discriminant and Why</u>

##### **MUST REMEMBER:**
1. If $b^{2}-4ac<0$, there are *no real solutions/roots*.
2. If $b^{2}-4ac=0$, there is *one real solution/root*.
3. If $b^2-4ac>0$, there are *two real solutions/roots*.

The intercepts along the $x$-axis represents how many *roots*, or *solutions* (they mean the same thing), that the parabola will have. For example, for the equation:

$$x^{2}+3x+4=0$$

the values of $a$, $b$, $c$, are the following: $a=1$, $b=3$, $c=4$.\
$\implies$ Value of discriminant ($b^{2}-4ac$) is = $3^{2}-4(1)(4)$... Which is $-7$.\
If you plot the graph, you can see that the graph has *no intersections* along the $x$-axis.\
This is because the value of the discriminant in that equation is $-7$. And $-7$ is $<0$.\
If you actually try to factorise this quadratic equation, it will not work. 

For another instance, if you have a graph:
$$x^{2}+3x-4=0$$
the values of $a$, $b$, $c$, are the following: $a=1$, $b=3$, $c=-4$.\
$\implies$ Value of discriminant ($b^{2}-4ac$) is = $3^{2}-4(1)(-4)$... Which is $25$.

Because $25$ is greater than $0$, the graph will have two real solutions (AKA two roots/solutions).\
If you graph the equation, the graph will *intersect the $x$-axis twice*.

> [! hint ] You MUST remember that when you solve a quadratic equation of $ax^{2}+bx+c=0$, you are 'finding the values of where this equation intersects the $x$-axis'. This determines the number of roots/solutions.

---

### 3. <u>Discriminant with an Unknown Variable</u>

Sometimes, you can be given an equation like:

$$x^{2}+mx+1$$

..where you are asked to find the "suitable range for the values of $m$, for the equation to have *one real solution.*"\

As explained before, "*one real solution*" means the discriminant is equal to zero.

> 2. If $b^{2}-4ac=0$, there is *one real solution/root*.

First, we are going to find the discriminant. We can figure out the values for $a$, $b$, $c$, using the formula above. \
$a$, will be 1, since $1x$ is equal to $x$, \
$b$ will be $m$, but as of now, we do not know $m$, so we will skip that for now,\
$c$ will be 1 (pretty straightforward)

With these, we can find the discriminant ($b^{2}-4ac$):

$$m^2-4(1)(1)=0$$

*Discriminant is equal to zero, for the equation to have one real solution.*

$m^{2}-4=0$ is our discriminant. The discriminant forms another (but separate) quadratic equation in terms of $m$, and we can factorize that:

$$m=2 \space or -2$$

$m=2$, or $-2$, if you solve the quadratic equation of $m$ above. 

Summing all these up, now we know that $m$ must be either $2$, or $-2$ for the equation of $x^{2}+mx+1$ to have 1 real solution.\
This means that the graph will only intersect the $x$-axis *once* when $m$ is equal to $2$, or $-2$.

Graph these yourself in https://desmos.com/calculator, and you'll see that the graph will *only* intersect the $x$-axis when the value of $m$ is $2$, or $-2$.

Sometimes, you can be given an equation like: $x^{2}+(m+2)x+1$.\
In that case, $a=1$, $b=(m+2)$, and $c=1$. **ALL** the coefficient of $x$ or $x^{2}$ becomes the value for $a/b/c$.

Another example is this: $(m-5)x^{2}+2x+6$.\
In this case, $a=(m-5)$. (b & c is self explanatory)

Last example is this: $x^{2}+2x+(k^{2}+2kx+5)$\
In that case, ALL the constants WITHOUT $x$ would be the value of $c$ (or $b$).\
First, we expand the bracket, since I can see $x$ inside the bracket:
$$x^{2}+2x+k^{2}+2kx+5$$
Then, we group all the coefficients together. From the equation, we can see the common coefficient of $x$ -- in $2x$, and $2kx$, and we can group them:
$$x^{2}+(2+2k)x+k^{2}+5$$
Now, as we can see, the equation has $a$, $b$, and $c$ in the correct positions.\
We can get the discriminant now:
$a=1$,
$b=(2+2kx)$,
$c=k^{2}+5$

---

### 4. <u>Exam Style Questions:</u>

I would like you to try ALL these equations by the end of this summer holiday. Some questions are made up by me, and some questions are from past papers of the Standard 91261.\
	Next to the questions, there will be an indicator of what you'd get in the exam if you solve that. \
	If you have any questions, please message me (James), and I will help you out.\
Please note that you won't get any translators, or translations in the exam -- try these questions WITHOUT a translator.

1. Find the value of the discriminant of $x^2+4x+50$. => *Achieved*
2. Find the value of the discriminant of $\frac{1}{2}x^2+25x+69$. => *Achieved* 
3. Find the value of the discriminant of $x^2+5x+1$, **AND** state how many root(s) the graph has. => *Achieved/Low Merit*
4. Find the value of the discriminant $x^{2}+10x+9$, **AND** state what the value of the discriminant means graphically. => *Achieved/Low Merit*
5. Find the suitable range of value(s) for the variable $k$ (where $k\neq 0$), for the equation $2x^{2}+kx+2$ to have **one real solution**. => *Merit/Low Excellence*
6. Find the suitable range of value(s) for the variable $p$ (where $p\neq 0$), for the equation $px^{2}+x+1$ to have **two real solutions** => *Merit/Low Excellence*

7. (Derived from 2025 EOT Examination Paper)\
For what values of $m$ does the equation $5x^{2}+3m=2mx$ have **no real solutions**? \
=> *Low Excellence*

8. (Derived from 2015 91261 Paper)\
The quadratic equation $mx^{2}-(m+2)x+2=0$ has **two positive real roots**.\
Find the possible value(s) for $m$, AND the roots of the equation

9. (Derived from 2013 91261 Paper):\
The equation $(x+2)-3\sqrt{ (x+2) }-4=0$, has only **one real solution**.\
Find the value of $x$.\
Hint: Let $a=\sqrt{ x+2 }$ \
=> *Excellence*

10. (Derived from 2025 EOT Examination Paper)\
There is **only one real solution** for the equation $(x+3)-4\sqrt{(x+3)} -5=0$.\
Find that solution.\
=> *Excellence*

11. (Derived from 2013 91261 Paper)\
Explain why the equation $(3x+1)^{2}=-7$ does **not have any real solutions**, and explain what that means graphically.\
=> *Excellence*

12. (Derived from 2017 91261 Paper)\
Find the value(s) of $m$ for which the equation $2^{mx-3}=8^{x^{2}}$ has **exactly one solution**.\
($\log$ not required in this question)\
=> *Excellence*

13. (Derived from 2012 91261 Paper) \
Find the possible values of $d$ if **real solutions exist** for $x^{2}+5x-1-d(x^{2}+1)=0$.\
=> *Excellence/High Excellence*

14. (Derived from 2019 91261 Paper)\
Use algebra to show that the graph of the function $y=(x-a)(x-b)-c^{2}$, where $c\neq 0$, crosses the $x$-axis at **two distinct points**.\
=> *High Excellence*

15. (Derived from 2016 91261 Paper)\
Find positive integer value(s) for $k$ so that the quadratic equation $2x^{2}+4kx+(2k^{2}+3k-11)=0$ has **real rational** solutions.\
Justify your answer.\
=> *Highest Excellence*
