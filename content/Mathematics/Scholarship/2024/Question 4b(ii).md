#SCH_CALC 

---


$$
\boxed{\text{Given that }  z=\cos \theta+i\sin \theta, \text{prove that: }2\text{arg}(z+1)=\text{arg}(z)}
$$


$$
\text{arg}\left[\cos \theta+i\sin \theta\right]=\tan^{-1}\left[ \frac{\sin \theta}{\cos \theta} \right]
$$


$$
=\tan^{-1}\tan \theta=\theta
$$


$$
RHS=\theta
$$


$$
LHS=2\text{arg}(z+1)
$$


$$
LHS=2 \left[\tan^{-1} \left(\frac{\sin \theta}{\cos \theta+1} \right)\right] 
$$

Maybe if the argument of the inverse tan be $\tan \frac{1}{2}\theta$ then it will cancel LHS to be $\theta$, then expression could be QED'ed?\
Goal: re-write $\frac{\sin \theta}{\cos \theta+1}$ into a $\tan \theta$... form!

Multiplying by denominator's conjugate:

$$
LHS=2\tan ^{-1}\left( \frac{\sin \theta (\cos \theta-1)}{\cos ^{2}\theta+1} \right)
$$


$$
=2\tan ^{-1}\left( \frac{\sin \theta(\cos \theta-1)}{1-\sin ^{2}\theta+1} \right)
$$


$$
=2\tan ^{-1}\left( \frac{\sin \theta(\cos \theta-1)}{-\sin ^{2} \theta} \right)
$$


$$
=2\tan ^{-1}\left( \frac{-\cos \theta+1}{\sin \theta} \right)
$$


$$
=2\tan ^{-1}\left( \frac{1-\cos \theta}{\sin \theta} \right)
$$

Using the half angle identity of $\tan \frac{\theta}{2}=\frac{1-\cos \theta}{\sin \theta}$,

$$
\implies LHS=2\tan ^{-1}\left( \tan\left( \frac{\theta}{2} \right) \right)
$$


$$
=2\cdot \frac{\theta}{2}
$$


$$
=\theta=RHS  \ {∎} 
$$

