export function getCoursesAndPercentages(courses: Array<string>): [string, number] {
  const mp = new Map<string, number>();
  for (const course of courses) {
    const quantity = mp.get(course) ?? 0
    mp.set(course, quantity + 1);
  }

  let mostFrequentString = '';
  let greaterFrequency = 0;

  for (const [text, frequency] of mp.entries()) {
    if (frequency > greaterFrequency) {
      greaterFrequency = frequency;
      mostFrequentString = text;
    }
  }

  return [mostFrequentString, greaterFrequency / courses.length];
}