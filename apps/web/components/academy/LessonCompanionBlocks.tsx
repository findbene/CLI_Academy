import type { AcademyExercise, AcademyQuiz, AcademyRubric } from "@/lib/academy-content";
import { ExerciseCard } from "@/components/academy/ExerciseCard";
import { QuizBlock } from "@/components/academy/QuizBlock";
import { RubricPanel } from "@/components/academy/RubricPanel";

interface LessonCompanionBlocksProps {
  exercise?: AcademyExercise | null;
  quiz?: AcademyQuiz | null;
  rubric?: AcademyRubric | null;
}

export function LessonCompanionBlocks({ quiz, exercise, rubric }: LessonCompanionBlocksProps) {
  if (!quiz && !exercise && !rubric) {
    return null;
  }

  return (
    <section className="grid gap-4">
      <div>
        <div className="eyebrow">Practice Layer</div>
        <h2 className="mt-3 text-2xl font-semibold">Reinforce the lesson with structured practice</h2>
      </div>
      <div className="grid gap-4">
        {quiz ? <QuizBlock quiz={quiz} /> : null}
        {exercise ? <ExerciseCard exercise={exercise} /> : null}
        {rubric ? <RubricPanel rubric={rubric} /> : null}
      </div>
    </section>
  );
}
