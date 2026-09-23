import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currentStudent } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center gap-4 pt-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg">
            ระบบลงทะเบียนเรียน CPE & ISNE
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button render={<Link to="/enrollment" />}>
            ไปหน้าลงทะเบียนเรียน
          </Button>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground">
        จัดทำโดย {currentStudent.firstName} {currentStudent.lastName}{" "}
        รหัสนักศึกษา {currentStudent.studentId}
      </p>
    </div>
  );
}
