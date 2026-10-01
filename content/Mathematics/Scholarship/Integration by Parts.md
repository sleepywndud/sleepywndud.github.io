#SCH_CALC #L3CALC 

Author: Sedecember\
`a3060100s@gmail.com`

---

When integrating, we might come across garbage integrals like

$$
\int x e^x \ dx
$$

Try u-sub; let $u=x$, $\frac{du}{dx}=1 \iff dx=du$

$$
\implies \int u \cdot e ^x \ du
$$

Doesn't work. Try let $u=e^x$, $\frac{du}{dx}=e^x \iff dx=\frac{du}{e^x}$

$$
\implies \int x \cdot u \ \frac{du}{e^x}
$$


$$
\implies \int x \ du
$$

still doesn't work.

So, are we cooked?

## Introduction
No, we are NOT cooked. We never are. To evaluate shitty integrals like this, mathematicians found a way called 'Integration by Parts'!

This method comes from the product rule. Note that Juyoung has already proved the product rule from first principles [here](??).\
The product rule says:

$$
[uv]'=u'v+v'u
$$

Where $u$ and $v$ are functions in terms of $x$.

But... we can manipulate the product rule further by adding integrals on both sides like this

$$
\int[uv]' \ dx=\int u'v \ dx + \int v'u \ dx
$$


$$
\implies uv=\int u'v \ dx + \int uv' \ dx
$$

Now, if we manipulate this further, we get

$$
\implies \boxed{ \int uv' \ dx = uv-\int u'v \ dx}
$$

That boxed expression is the formula for 'integration by parts'.

## Application (Indefinite Integrals)
The question is now, how do we use this?

This is used just like the product rule in differentiation. You just select which function serves as $u$, and which serves as $v$.

The method I use is labelling each individual $u$, $u'$, $v$, $v'$.

Lets start with the shitty integral from above

$$
\int x e^x \ dx
$$

For LHS, we need to have $u$ and $v'$. If we have those, then we can calculate $u'$ and $v$ for RHS.

Let's start with $u$ and $v'$:\
$u=x$\
$v'=e^x$\
...Now this implies:\
$u'=1$\
$v=e^x$

Now let's set up the integral

$$
\int xe^x \ dx = xe^x - \int 1 \cdot e^x \ dx
$$


$$
\int xe^x \ dx = xe^x - e^x + C = \boxed{e^x(x-1)+C}
$$

## Application (Definite Integrals)
Does it serve differently for definite integrals?

Yes, but not much.

All it changes is that we also apply the bounds to $uv$.

$$
\implies \boxed{\int _{a}^b uv' \ dx = [uv]_{a}^b - \int_{a}^b u'v \ dx}
$$

That's it. Just some simple integrations from then!