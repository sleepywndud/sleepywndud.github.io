---
title: Ni Brain Too Sht
---

<img src="/images/banner-n.png" alt="" class="footer-banner" />

Ni Brain Too Sht (NBTS) is an archive of all the notes, questions, and tutorials I made for myself, my juniors, my mentees, or my friends for NCEA Level 2 and 3 Calculus, Mathematics and Statistics.


> [!info] This website also has *some* notes for Science-subjects (Chemistry and Physics). Chemistry is being added, and Physics will later be added in the future. However, this page is mainly for Mathematics and Calculus, so don't expect a lot of Science stuffs on this website!

**DISCLAIMER:**
- Some notes may be old and be considered as outdated.
- Internal standards are differently assessed per-school.
- Some notes aren't fully finished, and isn't planned for completion.
- External past papers for L2 and L3, from 2013~2025 (except Probability Methods) can be found [here](Past-Papers.md), with schedules, too.
- Scholarship past-papers can also be found [here](Past-Papers.md).
- Scholarship Calculus is explained in Korean. Use a translator if you need.
- Some (school) mentoring resources may be added to this page.

> *This page may contain mistakes. If you spot one, feel free to shoot me an email to: `22222w@duck.com`, or feel free to fix it yourself.*

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

