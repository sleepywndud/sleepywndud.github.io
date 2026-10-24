#SCH_CALC 

---

The rate of spread of a rumour at a particular school is proportional to both the number of students who know a rumour, $S$, and the number of students who do not. If $N$ is the total number of students in the school, then

$$
\frac{dS}{dt}=kS(N-S)
$$

Initially two students knew the rumour.

Show that the number of students who know the rumour at time $t$ is

$$
S(t)=\frac{N}{1+\frac{1}{2}e^{-kNt}(N-2)}
$$

---

We need to make $S$ the subject of this equation. Since we have $\frac{dS}{dt}$ we could probably separate the variables and then apply the integral:

$$
\int1dt=\int \frac{1}{kS(N-S)}dS
$$


$$
t+C=\int \frac{1}{kS(N-S)}dS
$$

Using partial fractions, we can split the fraction on the RHS

$$
RHS=\int \frac{A}{kS}+\frac{B}{N-S}dS
$$


$$
A(N-S)+BkS=1
$$


$$
AN-AS+BkS=1
$$


$$
\implies-A+Bk=0
$$


$$
\implies AN=1 \iff A=\frac{1}{N}
$$


$$
\implies-\frac{1}{N}+Bk=0 \iff B=\frac{1}{kN}
$$


$$
\implies RHS=\int\frac{1}{NkS}+\frac{1}{kN(N-S)}dS
$$


$$
\implies RHS=\frac{1}{Nk} \int \frac{1}{S}+\frac{1}{N-S}dS
$$


$$
t+C=\frac{1}{Nk}\left[ \ln S-\ln(N-S) \right]\iff t+C=\frac{1}{Nk}\left[ \ln \frac{S}{N-S} \right]
$$

Substitute in $t=0,S=2$

$$
C=\frac{1}{Nk}\left[ \ln \frac{2}{N-2} \right]
$$


$$
\implies t+\frac{1}{Nk}\left[ \ln \frac{2}{N-2} \right]=\frac{1}{Nk}\left[ \ln \frac{S}{N-S} \right]
$$

Multiply both sides by $Nk$:

$$
Nkt + \ln \frac{2}{N-2}=\ln \frac{S}{N-S}
$$


$$
\frac{S}{N-S}=e^{ Nkt+\ln \frac{2}{N-2} } \iff \frac{S}{N-S}= e^{Nkt} \cdot \frac{2}{N-2}
$$


$$
S=(N-s) \cdot \frac{2e^{Nkt}}{N-2}
$$


$$
S=N\left( \frac{2e^{Nkt}}{N-2} \right)-S\left( \frac{2e^{Nkt}}{N-2} \right)
$$


$$
S+S\left( \frac{2e^{Nkt}}{N-2} \right)=N\left( \frac{2e^{Nkt}}{N-2} \right)
$$


$$
S\left( 1+\frac{2e^{Nkt}}{N-2} \right)=N\left( \frac{2e^{Nkt}}{N-2} \right)
$$


$$
\implies S=\frac{N\left( \frac{2e^{Nkt}}{N-2} \right)}{1+\left( \frac{2e^{Nkt}}{N-2} \right)}
$$

Convert 1 to $\frac{2e^{Nkt}}{N-2}\cdot \frac{N-2}{\epsilon^{Nkt}}$ so that the $\frac{2e^{Nkt}}{N-2}$ in the numerator cancels out:

$$
S=\frac{N\left( \frac{2e^{Nkt}}{N-2} \right)}{\frac{2e^{Nkt}}{N-2}\cdot \frac{N-2}{2e^{Nkt}}+\frac{2e^{Nkt}}{N-2}}
$$


$$
S=\frac{N\cancel{ \left( \frac{2e^{Nkt}}{N-2} \right) }}{\cancel{ \frac{2e^{Nkt}}{N-2} } \cdot\left( \frac{N-2}{2e^{Nkt}}+1 \right)}
$$


$$
S=\frac{N}{1+\frac{N-2}{2e^{Nkt}}}
$$


$$
\therefore S=\frac{N}{1+\frac{1}{2}e^{-Nkt}(N-2)}   \ \# 
$$

