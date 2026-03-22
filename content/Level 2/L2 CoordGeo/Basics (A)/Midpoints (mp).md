#L2MAEL 

---

Midpoints are point(s) that is in the middle of two points. To calculate the midpoint, the formula below must be used:
$$(\frac{x_{1}+x_{2}}{2}, \frac{y_{1}+y_{2}}{2})$$
To get a midpoint, 2 points are needed (for obvious reasons). The first point would be: $(x_{1}\space, y_{1})$, and the second would be $(x_{2}\space, y_{2})$. 

We don't use a comma in a math equation. A comma is there to show that this formula is actually in a form of a coordinate pair. 
<img src="../img/e645eb8e8aced4b80148fc4e16a68067.png" style='width: 300px;' />
The red section would be the $x$ coordinate for the midpoint, while the blue section would be the $y$ coordinate.
This is finding the average number between the two numbers provided.

---
## <u>Centroids:</u>
The same principle applies when calculating the centroid of a shape.
Depending on the number of the vertices, the equation varies. Below is an equation of a centroid of a triangle:
$$(\frac{x_{1}+x_{2}+x_{3}}{3}, \frac{y_{1}+y_{2}+y_{3}}{3})$$
If the question is about finding centroid of a square, then the numerator would be: $(x_{1}+x_{2}+x_{3}+x_{4})$, with the denominator being $4$.
Although centroids are rare in the exam, when it appears, the formula isn't recommended. 

This can be found by connecting the midpoint of a side to the opposite point three times, and getting the intersection of it.
*this only works if you're given the coordinates of each (or two) of the vertexes*

<img src="../img/8c09f2e416fe6184af0c43c9dfbf1c35.png" style='width: 400px;' />

For the example above, the centroid is located at the point where the two lines meet. The lines start at the midpoint of each corner, all the way to the other corner in a straight line.
Steps:
1. find the midpoint of a side
2. calculate the gradient from the midpoint to the opposite vertex
3. find the equation of the midpoint to the vertex (now that you have the gradient)
4. repeat the process for another side -> vertex
5. find the intersection point using simultaneous equation
