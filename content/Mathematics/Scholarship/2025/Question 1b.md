#SCH_CALC 

---

이번 문제는 아래 식의 complex solution을 찾는 문제입니다.
$$
z=2-\frac{2+i}{iz}
$$
일단 방정식을 푸는것처럼 해봅시다.\
분모 $iz$를 없애주죠:
$$
iz^{2}=2iz-(2+i) \iff iz^{2}-2iz+(2+i)
$$
보니 이것은 $z$의 이차방정식입니다.\
$z=\dots$으로 만들어보죠.\
근의 공식을 사용할겁니다. 
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
따라서, $z$의 complex solution은:
$$
z=\frac{2i+2-2i}{2i} \implies \frac{1}{i}
$$
$$
z=\frac{2i-2+2i}{2i} \implies \frac{4i-2}{2i}\implies \frac{2i-1}{i}
$$
물론 이것만으로도 충분할텐데.. 혹시 모르니? 유리화를 하면:
$$
z=\frac{1}{i}\implies-i
$$
$$
z= \frac{-i(2i-1)}{-i^{2}} \implies2+i
$$
$$z=-i, 2+i$$
