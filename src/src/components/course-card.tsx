import { Trash2 } from "lucide-react";
import type { Course, Student } from "@/lib/types";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type CourseCardProps = {
  course: Course;
  student: Student;
  isEnrolled: boolean;
  enrolledAt?: string;
  onUnenroll?: () => void;
};

function formatEnrolledAt(iso?: string) {
  if (!iso) return "-";
  return new Intl.DateTimeFormat("th-TH-u-ca-buddhist", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function CourseCard({
  course,
  student,
  isEnrolled,
  enrolledAt,
  onUnenroll,
}: CourseCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{course.courseTitle}</CardTitle>
        <CardDescription>
          รหัสวิชา: {course.courseId} · ผู้สอน: {course.instructors.join(", ")}
        </CardDescription>
        <CardAction>
          <Badge variant={isEnrolled ? "enrolled" : "open"}>
            {isEnrolled ? "ลงทะเบียนแล้ว" : "เปิดรับ"}
          </Badge>
        </CardAction>
      </CardHeader>

      {isEnrolled && (
        <CardContent className="flex items-end justify-between">
          <div className="text-xs text-muted-foreground">
            <p>
              ชื่อ นศ.: {student.firstName} {student.lastName}
            </p>
            <p>โปรแกรม: {student.program}</p>
            <p>ลงทะเบียนเมื่อ: {formatEnrolledAt(enrolledAt)}</p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            aria-label="ยกเลิกการลงทะเบียน"
            onClick={onUnenroll}
          >
            <Trash2 className="text-destructive" />
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
