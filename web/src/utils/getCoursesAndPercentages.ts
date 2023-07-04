export function getCoursesAndPercentages(courses: Array<string>): Array<{
  course: string,
  quantity: number,
}> {
  const mp = new Map<string, number>();
  for (const course of courses) {
    const quantity = mp.get(course) ?? 0
    mp.set(course, quantity + 1);
  }

  const arr: Array<{
    course: string,
    quantity: number,
  }> = []

  for (const [text, frequency] of mp.entries()) {
    arr.push({
      course: text,
      quantity: frequency
    });
  }

  arr.sort((a, b) => {
    if (a.quantity === b.quantity) return a.course < b.course ? 1 : a.course === b.course ? 0 : -1;
    return b.quantity - a.quantity
  })

  return arr
}