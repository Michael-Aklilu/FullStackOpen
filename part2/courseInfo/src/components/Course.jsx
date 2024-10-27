
export const Header = ({ course }) => <h2>{course.name}</h2>;

const Total = ({ total }) => (
  <p>
    <strong>Total of {total} exercises</strong>
  </p>
);

const Part = ({ name, exercises, index }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

export const Content = ({ course }) => {
  let total = course.parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);

  return (
    <>
      {course.parts.map((part) => (
        <Part name={part.name} exercises={part.exercises} key={part.id} />
      ))}
      <Total total={total} />
    </>
  );
};
const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
    </>
  );
};

export default Course;
