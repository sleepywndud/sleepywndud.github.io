#SCH_CALC #L3CALC 

---

$$
f(x)= \left( \frac{1}{r^r} \right)^{\frac{1}{r+1}} \cdot x^r
$$

where $r>0, r \in \mathbb{R}$

$$
f'(x)=f^{-1}(x)
$$


$$
f(f^{-1}(x))=x
$$


Start with finding $f'(x)$

$$
f'(x)= \left( \frac{1}{r^r} \right)^{\frac{1}{r+1}}\cdot r \cdot x^{r-1}
$$


$$
f'(x)=(r^{-r})^{\frac{1}{r+1}}\cdot r \cdot x^{r-1}
$$


$$
f'(x)=r^{\frac{-r}{r+1}}\cdot r^1\cdot x^{r-1}
$$


$$
f'(x)=r^{\frac{-r}{r+1}+1}\cdot x^{r-1}
$$


$$
f'(x)=r^{ \frac{ -r }{ r+1 }+\frac{r+1}{r+1} }\cdot x^{r-1}
$$


$$
f'(x)=r^{ \frac{1}{r+1} }\cdot x^{r-1}
$$

Since $f(f^{-1}x)=x \iff f(f'(x))=x$ substitute in $f'(x)$ into $f(x)$:

$$
f(f'(x))=\left( \frac{1}{r^r} \right)^{\frac{1}{r+1}} \cdot \left( r^{ \frac{1}{r+1} }\cdot x^{r-1} \right)^r=x
$$


$$
r^{\frac{-r}{r+1}} \cdot r^{\frac{r}{r+1}}\cdot x^{r(r-1)}=x
$$


$$
r^{ \frac{-r}{r+1} + \frac{r}{r+1}}\cdot x^{r(r-1)}=x
$$


$$
x^{r(r-1)}=x^1
$$


$$
r(r-1)=1
$$


$$
r^{2}-r-1=0
$$


$$
r= \frac{1\pm \sqrt{ 5 }}{2}
$$

But since $r>0$:

$$
\boxed{r=\frac{1+{\sqrt{ 5 }}}{2}}
$$

