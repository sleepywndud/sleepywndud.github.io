#SCH_CALC #L3CALC 

---

$$
y=\sin^{-1}(x) \iff x=\sin y
$$

Now differentiate implicitly:

$$
1=\cos y \cdot \frac{dy}{dx}
$$


$$
\frac{dy}{dx}=\frac{1}{\cos y}
$$


$$
x=\sin y \iff x^{2}=\sin ^{2}y \iff x^{2}=1-\cos ^{2}y \iff \cos y= \pm \sqrt{ 1-x^{2} }
$$


$$
\frac{dy}{dx}=\frac{1}{\pm \sqrt{ 1-x^{2} }}
$$

However, $\sin^{-1}x$ is defined within $-\frac{\pi}{2}\leq y\leq \frac{\pi}{2}$, and since $\cos y$ from $-\frac{\pi}{2}\leq y\leq \frac{\pi}{2}$ is always positive, use the positive root!

Hence

$$
\frac{dy}{dx}=\frac{1}{\sqrt{ 1-x^{2} }}  \ {∎} 
$$

---

For minimum, $g'(x)=0$.

$$
g'(x)=\frac{d}{dx}(\sin^{-1}2x)+\frac{d}{dx}\left( \sin^{-1}\left( \frac{\pi}{4}-2x \right) \right)
$$


$$
g'(x)=\frac{1}{\sqrt{ 1-(2x)^{2} }}\cdot(2)+\frac{1}{\sqrt{ 1-\left( \frac{\pi}{4}-2x \right)^{2} }}\cdot(-2)
$$


$$
g'(x)=\frac{2}{\sqrt{ 1-(2x)^{2} }}-\frac{2}{\sqrt{ 1-\left( \frac{\pi}{4}-2x \right)^{2} }}=0 = \frac{2}{0}
$$


$$
\implies \sqrt{ 1-(2x)^{2} }-\sqrt{ 1-\left( \frac{\pi}{4}-2x \right)^{2} }=0
$$


$$
\sqrt{ 1-(2x)^{2} }=\sqrt{ 1-\left( \frac{\pi}{4}-2x \right)^{2} }
$$


$$
1-(2x)^{2}=1-\left( \frac{\pi}{4}-2x \right)^{2}
$$


$$
(2x)^{2}=\left( \frac{\pi}{4}-2x \right)^{2}
$$


$$
\pm 2x=\frac{\pi}{4}-2x
$$


$$
2x\pm 2x=\frac{\pi}{4}
$$


$$
4x=\frac{\pi}{4} \ or \ 0=\frac{\pi}{4}
$$


$$
0\neq \frac{\pi}{4}\implies 4x = \frac{\pi}{4}
$$


Hence

$$
\boxed{x=\frac{\pi}{16}}
$$

