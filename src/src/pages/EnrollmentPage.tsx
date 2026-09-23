import { useMemo, useState } from "react";
import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import {
  courses,
  currentStudent,
  enrollments as initialEnrollments,
} from "@/lib/mock-data";
import type { Enrollment } from "@/lib/types";

function toLocalISOString(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
}

export default function EnrollmentPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>(() =>
    initialEnrollments.filter(
      (e) => e.studentId === currentStudent.studentId,
    ),
  );

  const enrolledMap = useMemo(() => {
    const map = new Map<string, string | undefined>();
    enrollments.forEach((e) => map.set(e.courseId, e.enrolledAt));
    return map;
  }, [enrollments]);

  const availableCourses = courses.filter(
    (course) => !enrolledMap.has(course.courseId),
  );

  function handleEnroll(courseId: string, time: string) {
    const [hours, minutes] = time.split(":").map(Number);
    const enrolledAt = new Date();
    enrolledAt.setHours(hours, minutes, 0, 0);

    setEnrollments((prev) => [
      ...prev,
      {
        studentId: currentStudent.studentId,
        courseId,
        enrolledAt: toLocalISOString(enrolledAt),
      },
    ]);
  }

  function handleUnenroll(courseId: string) {
    setEnrollments((prev) => prev.filter((e) => e.courseId !== courseId));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">รายวิชาทั้งหมด</h1>
          <p className="text-sm text-muted-foreground">
            {currentStudent.firstName} {currentStudent.lastName} (
            {currentStudent.studentId})
          </p>
        </div>

        <RegisterDialog
          student={currentStudent}
          availableCourses={availableCourses}
          onEnroll={handleEnroll}
        />
      </div>

      <div className="flex flex-col gap-4">
        {courses.map((course) => (
          <CourseCard
            key={course.courseId}
            course={course}
            student={currentStudent}
            isEnrolled={enrolledMap.has(course.courseId)}
            enrolledAt={enrolledMap.get(course.courseId)}
            onUnenroll={() => handleUnenroll(course.courseId)}
          />
        ))}
      </div>
    </div>
  );
}
