#SCH_CALC #L3CALC 

---


$$
z=r\text{cis}\theta, \ r>1, \ 0<\theta< \frac{\pi}{2}
$$

Convert $z$, $\overline{z}$, $\frac{1}{z}$, $iz$ in $x+yi$ form:

$$
z=x+yi
$$


$$
\overline{z}=x-yi
$$


$$
\frac{1}{z}=\frac{1}{x+yi} = \frac{1}{x+yi}\cdot\frac{x-yi}{x-yi}=\frac{x-yi}{x^{2}+y^{2}}
$$


$$
iz=i(x+yi)=-y+x i
$$

Plotting the coordinates on the Argand diagram, where $\angle ABC =60^o$ and $BC=1.5$:

<img src="/images/scholcalcq1d-diagram.png" width="400" />

To get the area of ABCD, looks like I can sum the area of ABO and ADO, then subtract that sum by $CDO$.

$$
A_{ABCD}=(A_{ABO}+A_{ADO})-A_{CDO}
$$

Get $A_{ABO}$:

$$
A=\frac{1}{2}ab\sin C
$$

Let $CO=x\implies OB=x+1.5$

$$
A=\frac{1}{2}(x+1.5)^2 \cdot \sin \frac{\pi}{3}
$$


$$
A_{ABO}=\frac{\sqrt{ 3 }}{4}(x+1.5)^{2}
$$

Now get $A_{ADO}$:

$$
A=\frac{1}{2}\left( x+1.5 \right)^{2} \cdot \sin \frac{\pi}{2}
$$


$$
A_{ADO}=\frac{1}{2}(x+1.5)^{2}
$$

Then, get $A_{CDO}$:

$$
A=\frac{1}{2}ab \cdot \sin C
$$


$$
A=\frac{1}{2}(1.5+x)(x) \cdot \sin C
$$

Looking at the diagram, I can see that $\angle C=90^o + 30^o + 30^o=150^o \equiv \frac{5\pi}{6}$

$$
\implies C=\frac{5\pi}{6}
$$

Hence

$$
A=\frac{x}{2}(x+1.5)\cdot \frac{1}{2}
$$


$$
A_{CDO}=\frac{x}{4}(x+1.5)
$$

Now obtaining a formula for $A_{ABCD}$:

$$
A_{ABCD}= \left[ \frac{\sqrt{ 3 }}{4}(x+1.5)^{2} + \frac{1}{2}(x+1.5)^{2} \right]-\left[ \frac{x}{4}(x+1.5) \right]
$$

After simplification:

$$
A=\frac{1+\sqrt{ 3 }}{4}x^{2}+ \frac{ 9+6\sqrt{ 3 }}{8}x+\frac{18+9\sqrt{ 3 }}{16}
$$

Now we need $x$.

Let $x+1.5=r$

$$
\implies r-\frac{1}{r}=1.5
$$


$$
\implies r^{2}-1.5r-1=0
$$


$$
\implies r=2, -\frac{1}{2}
$$

But $r>1$, so $r=2$

$$
r=2 \implies x+1.5=2\implies x=0.5
$$

Now substitute $x=0.5$ into the area formula:

$$
A=\frac{1+\sqrt{ 3 }}{4}(0.5)^{2}+\frac{9+6\sqrt{ 3 }}{8}x+\frac{18+9\sqrt{ 3 }}{16}
$$


$$
\boxed{A_{ABCD}=\frac{7+4\sqrt{ 3 }}{4}}
$$


<img src="/images/scholcalcq1d-answer.jpg" width="700" />