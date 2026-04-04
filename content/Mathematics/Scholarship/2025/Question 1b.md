#SCH_CALC 

---

(1점)
$$
z=2-\frac{2+i}{iz}
$$
위 공식의 모든 복소수 해를 찾으면 되는 문제다.
일단 분모 $iz$를 없애기 위해, 모든 항을 $iz$로 곱해주자:
$$
iz^{2}=2iz-(2+i)
$$
$$
iz^{2}-2iz+(2+i)
$$
이차방정식이 나왔으니 근의 공식을 사용해서 $z$를 구해보자:
$$
a=i, \space b=-2i, \space c=2+i
$$
$$
z=\frac{2i\pm \sqrt{ (-2i)^{2}-4i(2+i) }}{2i}
$$
$$
z=\frac{2i\pm \sqrt{ -4-8i+4 }}{2i}
$$
$$
z=\frac{2i\pm \sqrt{ -8i }}{2i}
$$
$$
z=\frac{2i\pm(2-2i)}{2i}
$$
따라서, $z$의 복소수 해는:
$$
z=\frac{2i+2-2i}{2i} \implies \frac{1}{i}
$$
$$
z=\frac{2i-2+2i}{2i} \implies \frac{4i-2}{2i}\implies \frac{2i-1}{i}
$$
보통 허수가 분모에 있으면 유리화를 해주기 때문에, 유리화를 하도록 하자:
$$
z=\frac{1}{i}\implies-i
$$
$$
z= \frac{-i(2i-1)}{-i^{2}} \implies2+i
$$
그러므로, $z$의 복소수 해는, $-i$와 $2+i$랑 같다.
