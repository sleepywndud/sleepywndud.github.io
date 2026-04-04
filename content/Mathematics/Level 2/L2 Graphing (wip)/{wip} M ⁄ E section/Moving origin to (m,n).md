#L2MAEL 

---

Moving the origin to the point $(m,n)$ is also moving the graph, since moving the origin on Desmos is not possible, and the exam requires you to explain this.

## <u>Explaining:</u>

Imagine this:
"A U-shaped quadratic graph's vertex is on the center of the + shaped line representing the $x$ and $y$ axis. Now, imagine that the graph kept its position, but the + shaped line representing the $x$ and $y$ axis moved to the left. Is the graph now placed on the left, or right side of the $y$-axis?"

Visual example:

<img src="/images/266efb685286975cb58742401efbabaf.png" style='width: 300px;' />


<img src="/images/229e3caf2cba47b556f0741536222043.png" style='width: 300px;' />

*(normally that explains all the concept of this origin movement)*

The answer is 'right side'.

When you move the origin to the left by 2, the vertex of the graph appears at $(2, 0)$ in the new coordinate system, because moving the origin shifts the graph in the opposite direction of the origin's movement.

For example, to move the origin of the graph to $(m,n)$:

$$y=x^2$$

I would have to change $x$ to '$x+m$', and $y$ to '$y+n$'.

The equation would be: 

$$y+n=(x+m)^2$$

$$y=(x+m)^2-n$$

If a domain/range exists, you must replace the $x⁄y$ to the repacement as well. 

## <u>Applying:</u>

Here's our graph (visual can be found here: https://www.desmos.com/calculator/hwiengmumv)

$$y=0.01\left(x+5\right)\left(x+0\right)\left(x-5\right)\left\{-5\le x\le10\right\}$$

To move the origin to $(m,n)$, we can replace the $x$ and $y$:

$$y+n=0.01\left(x+m+5\right)\left(x+m+0\right)\left(x+m-5\right)\left\{-5\le x+m\le10\right\}$$

$$y=0.01\left(x+m+5\right)\left(x+m+0\right)\left(x+m-5\right)-n \left\{-5\le x+m\le10\right\}$$
