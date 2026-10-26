#SCH_CALC 

---

A function that satisfies $f(1-x)=f(1+x)$ for all $x$ where $x \in \mathbb{R}$.

$$
f(1)=2025
$$

The best way to solve these questions is substituting them and to see if you can form a cancellation/simplification.

Let's start by substituting a couple of numbers starting from zero.

| $x$     | $f(x)$                     |
| ------- | -------------------------- |
| $$x=0$$ | $$f(1)=f(1)=2025$$         |
| $$x=1$$ | $$f(2)=f(0)=0$$            |
| $$x=2$$ | $$f(3)=f(-1)=-f(1)=-2025$$ |
| $$x=3$$ | $$f(4)=f(-2)=-f(2)=0$$     |
| $$x=4$$ | $$f(5)=f(-3)=-f(3)=2025$$  |
| $$x=5$$ | $$f(6)=f(-4)=-f(4)=0$$     |
| $$x=6$$ | $$f(7)=f(-5)=-f(5)=-2025$$ |
| $$x=7$$ | $$f(8)=f(-6)=-f(6)=0$$     |
| $$x=8$$ | $$f(9)=f(-7)=-f(7)=2025$$  |

Looks like there are repeating terms which can be cancelled.
$x=1$ to $x=4$ cancels each other out, as well as $x=5$ to $x=8$.
This means that this will cancel all the way out to until $x=2024$, which will mean that:

$$
f(1)+f(2)+f(3)+\dots+f(2025)=\boxed{2025}
$$
