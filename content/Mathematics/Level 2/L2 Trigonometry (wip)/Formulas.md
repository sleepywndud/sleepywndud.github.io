#L2MAEL 

---

Please note that this is only a proportion of L2 Trigonometry

| <u>Rule</u>            | <u>Formula</u>                                         |
| ---------------------- | ------------------------------------------------------ |
| Sine rule (sides)      | $$\frac{a}{\sin A}=\frac{b}{\sin B}=\frac{c}{\sin C}$$ |
| Sine rule (angles)<br> | $$\frac{\sin A}{a}=\frac{\sin B}{b}=\frac{\sin C}{c}$$ |
| Cosine rule (sides)    | $$a=\sqrt{ b^2+c^2-2(b)(c)\cos A }$$                   |
| Cosine rule (angles)   | $$A=\cos^{-1}\frac{b^2+c^2-a^2}{2(b)(c)}$$             |
| Area of triangle       | $$\frac{1}{2}bc\sin A$$                                |
| Length of arc          | $$2\pi (r)(\frac{\theta}{360})$$                       |
| Area of a sector       | $$\pi(r)^2(\frac{\theta}{360})$$                       |
Capital abc's such as $A$, stand for the angles, while the lowercases stand for the sides.
Note that, all $A$, or $a$ used in this note are angles/sides that are unknown. $B,b$, and $C,c$ are random depending on context.

---

## 1. <u>Sine Rules</u>

### 1-1: <U>Finding Sides</U>

We use the [Sine rule], when there are 2+ opposites involved:

<img src="/images/3734ac176a58e348dfbf5b2d8576ede9.png" style='width: 400px;' />

'Opposites' are opposites just like in trig's SOH CAH TOA. 

The opposite of $58^o$ = $x$, while the opposite of $61^o$ = $12cm$ (they are marked using colors for easier understanding).

When applying equations, we only need to use two sides with opposing angles:

$$\frac{a}{\sin A}=\frac{b}{\sin B}$$

$$\frac{x}{\sin 58}=\frac{12}{\sin 61}$$

Rearrange:

$$x=\frac{12\sin 58}{\sin 61}$$

$$x=11.64cm \text{ (2dp)}$$

### 1-2: <U>Finding Angles</U>

We use the same [Sine rule], as there are 2+ opposites involved:

<img src="/images/df095e00a89278b66ec6fa1956464f24.png" style='width: 400px;' />

Solve:

$$\frac{\sin x}{12}=\frac{\sin 58}{11.64}$$

Rearrange:

$${\sin x}=\frac{12\sin 58}{11.64}$$

$${x}=\sin^{-1} \space (\frac{12\sin 58}{11.64})$$

$$x = 61 \text{ (rounded)}$$

---

## 2. <u>Cosine Rules</u>

### 2-1: <u>Finding Sides</u>

We use the [Cosine rule], when there are **no** opposites involved:

<img src="/images/2278309f3ac9fe1170b3a9357a673810.png" style="width:600px;">

As you can see from the image above, there are only 1 opposite, meaning we cannot use the sine rule.

So, we have to use the side cosine rule, with the formula being: $$a=\sqrt{ b^2+c^2-2(b)(c)\cos A }$$

$a$, is the side that we're looking for, and in this case, $a$ would be $x$ on the diagram. $b$ and $c$ can be **any adjacent** sides within the angle you were given, and in the diagram above, it is $9cm$ and $10cm$, marked by a pink highlighter.

And lastly, $A$, is the angle you were given.

Substituting values:

$$x=\sqrt{ 9^2+10^2-2(9)(10)\cos 27}$$

Solving (use calculator):

$$4.54cm \text{ (2dp)}$$

### 2-2: <u>Finding Angles</u>

We use the same [Cosine rule], but as there are 2+ opposites involved, we use the angle cosine rule:

$$A=\cos^{-1}(\frac{b^2+c^2-a^2}{2(b)(c)})$$

<img src="/images/ae815d323f02edaca366a6dd747faeac.png" style="width:600px;">

Solve:

$$x = \cos^{-1}(\frac{9^2+10^2-4.54^2}{2(9)(10)})$$

$$x = 27 \text{ (rounded)}$$

---

## 3. <u>Area of Triangles</u>

When finding the area of triangles, we use the triangle area formula:

$$\frac{1}{2}(b)(c)\sin A$$

Before the sin rules and other stuffs, you would be doing this:

<img src="/images/05710f3678e7c525732cac8a609c4f16.png" style='width: 500px;' />

..calculating the height of the right angled triangle using $\sin$, multiplying it by the base, then halfing it. ($\frac{1}{2}bh$)

However, this might be the easier way:

<img src="/images/62615d0e85e094562f1b380348241c59.png" style='width: 500px;' />

$$\frac{1}{2}(8.2)(10.5)\sin 47$$

$$31.48cm^2$$

..with just one line, you can solve it. So I think this may be the easier way in most cases.

---

## 4. <u>Length of arcs</u>

First of all, this is an arc:

<img src="/images/eca9c1694429c8b893c891231fb77a17.png" style='width: 300px;' />

When finding the length of an arc, we use the formula:

$$2\pi (r)(\frac{\theta}{360})$$

..where $r$ is the radius, and where $\theta$ is the inner angle of the sector (in the example, it's $72^o$)

<img src="/images/4aa3f220c5323a36bf6f110d565c6a7d.png" style='width: 400px;' />

Use formula:

$$2\pi (r)(\frac{\theta}{360})$$

$r$ = $4.4$

$\theta$ = $104$

Substitute:

$$2\pi(4.4)\left( \frac{104}{360} \right)$$

$$7.99m$$

---

## 5. <u>Area of a Sector</u>

This is a sector:

<img src="/images/163bab147666c0602ea69271d01b7341.png" style='width: 500px;' />

The whole thing. AKA the proportion of the circle, or a pizza slice. 

To find the area of a sector, we use the circle area formula, but multiplied by $\frac{\theta}{360}$.

$\theta$ is the inner angle of the sector, and in that example it's $72^o$.

Formula:

$$\pi(r)^2(\frac{\theta}{360})$$

<img src="/images/d6e8a17de18c6651bda7598903cf17f3.png" style='width: 400px;' />

$r$ = $632$

$\theta$ = $135$

Substitute:

$$\pi(632)^2(\frac{135}{360})$$

$$369,479.99mm^2$$