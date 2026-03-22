#L2MAEL 

---

Translating the graph by $p$, and $q$ is to move a graph to the left/right, or up/down, by the value of $p$ and $q$.

## <u>Explaining:</u>
The exam requires you to explain why this works for a MRT/EXC. 
You should come up with your own statement on explaining this, since if you fully understand what's being said below, you should have no problem explaining this in the exam.

For example, to move a graph to the left by 2:
$$y=x^2$$
we have to change $x$ to '$x+2$', since signs are written in the opposite direction you're wanting to go (grid paper-wise).
Then, the translated (left by 2) graph would be: 
$$y=(x+2)^2$$
Using this same logic, to translate a graph horizontally by the value of $p$, then $x$ would have to replaced by '$x+p$'. 
If a domain exists, the $x$ in the domain must be replaced as well, or the graph would disappear once the value of $p$ passes the domain for the original function.
To represent this on Desmos, the slider for the $p$ value must be added. 

Using the exact same logic from above, to translate a grah vertically by the value of $q$, $y$ would have to be replaced by '$y+q$'.
If a range exists, the $y$ in the range must be replaced as well, or the graph would disappear once the value of $q$ passes the range for the original function.
To represent this on Desmos, the slider for the $q$ value must be added.

## <u>Applying:</u>
Here's our graph (visual can be found here: https://www.desmos.com/calculator/hwiengmumv)
$$y=0.01\left(x+5\right)\left(x+0\right)\left(x-5\right)\left\{-5\le x\le10\right\}$$
To translate this graph by the value of $p$, and $q$, we can replace the $x$ and $y$:
$$y-q=0.01\left(x-p+5\right)\left(x-p+0\right)\left(x-p-5\right)\left\{-5\le x-p\le10\right\}$$
$$y=0.01\left(x-p+5\right)\left(x-p+0\right)\left(x-p-5\right)\left\{-5\le x-p\le10\right\}+q$$
