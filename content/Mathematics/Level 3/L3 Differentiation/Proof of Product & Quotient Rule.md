#L3CALC 

---

### Product Rule:
if $h(x)=f(x)g(x)$, then $h'(x)=f'(x)g(x)+g'(x)f(x)$

Using first principles:
$$
h'(x)=\lim_{ h \to 0 } \frac{f(x+h)g(x+h)-f(x)g(x)}{h}
$$
To evaluate $f(x+h)$ and $g(x+h)$, use first principles of $f'(x)$ and $g'(x)$:
$$
f'(x)=\lim_{ h \to 0 } \frac{f(x+h)-f(x)}{h}
$$
Then,
$$
f(x+h)=hf'(x)+f(x)
$$
$$
g(x+h)=hg'(x)+g(x)
$$
Hence,
$$
h'(x)=\lim_{ h \to 0 } \frac{[hf'(x)+f(x)][hg'(x)+g(x)]-f(x)g(x)}{h}
$$
$$
h'(x)=\lim_{ h \to 0 } \frac{h^{2}f'(x)g'(x)+hf'(x)g(x)+hg'(x)f(x)+f(x)g(x)-f(x)g(x)}{h}
$$
$$
h'(x)=\lim_{ h \to 0 } \frac{h(hf'(x)g'(x)+f'(x)g(x)+g'(x)f(x))}{h}
$$
$$
h'(x)=\lim_{ h \to 0 } hf'(x)g'(x)+f'(x)g(x)+g'(x)f(x)
$$
$$
\boxed{h'(x)=f'(x)g(x)+g'(x)f(x)}
$$
---

### Quotient Rule:
if $h(x)=\frac{f(x)}{g(x)}$, then $h'(x)=\frac{f'(x)g(x)-g'(x)f(x)}{g^{2}}$
$$
h'(x)=\lim_{ h \to 0 } \frac{\left[ \frac{f(x+h)}{g(x+h)} - \frac{f(x)}{g(x)} \right]}{h}
$$
Using $f(x+h)$ and $g(x+h)$ from first principles:
$$
h'(x)=\lim_{ h \to 0 } \frac{\left[ \frac{hf'(x)+f(x)}{hg'(x)+g(x)} - \frac{f(x)}{g(x)}\right]}{h}
$$
$$
h'(x)=\lim_{ h \to 0 } \frac{ \left[ \frac{g(x)[hf'(x)+f(x)]-f(x)[hg'(x)+g(x)]}{g(x)[hg'(x)+g(x)]} \right] }{h}
$$
$$
h'(x)=\lim_{ h \to 0 } \frac{ \left[ \frac{hf'(x)f(x)+f(x)g(x)-hf(x)g'(x)-f(x)g(x)}{hg(x)g'(x)+(g(x))^{2}} \right] }{h}
$$
$$
h'(x)=\lim_{ h \to 0 } \frac{ \left[ \frac{hf'(x)f(x)-hf(x)g'(x)}{hg(x)g'(x)+(g(x))^{2}} \right] }{h}
$$
$$
h'(x)=\lim_{ h \to 0 } \frac{h[f'(x)g(x)-f(x)g'(x)]}{h[hg(x)g'(x)+(g(x))^{2}]}
$$
$$
h'(x)=\lim_{ h \to 0 } \frac{f'(x)g(x)-f(x)g'(x)}{hg(x)g'(x)+(g(x))^{2}}
$$
$$
\boxed{h'(x)=\frac{f'(x)g(x)-g'(x)f(x)}{(g(x))^{2}}}
$$

