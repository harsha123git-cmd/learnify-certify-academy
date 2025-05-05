
import { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import AttendanceTable from "@/components/AttendanceTable";
import { currentStudent, getEnrolledCourses, recordAttendance } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Attendance = () => {
  const enrolledCourses = getEnrolledCourses(currentStudent.id);
  const [selectedCourseId, setSelectedCourseId] = useState(
    enrolledCourses.length > 0 ? enrolledCourses[0].id : ""
  );
  const [refreshAttendance, setRefreshAttendance] = useState(0);

  const attendanceRecords = selectedCourseId ? 
    currentStudent.attendance[selectedCourseId] || [] : [];

  const selectedCourse = enrolledCourses.find(course => course.id === selectedCourseId);

  // Calculate attendance stats
  const totalDays = attendanceRecords.length;
  const presentDays = attendanceRecords.filter(r => r.status === 'present').length;
  const lateDays = attendanceRecords.filter(r => r.status === 'late').length;
  const absentDays = attendanceRecords.filter(r => r.status === 'absent').length;

  const attendancePercentage = totalDays > 0 
    ? Math.round(((presentDays + (lateDays * 0.5)) / totalDays) * 100) 
    : 0;

  const handleMarkAttendance = (date: string, status: 'present' | 'absent' | 'late') => {
    if (selectedCourseId) {
      recordAttendance(currentStudent.id, selectedCourseId, date, status);
      setRefreshAttendance(prev => prev + 1);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
        
        <div className="w-full sm:w-72">
          <Select 
            value={selectedCourseId} 
            onValueChange={setSelectedCourseId}
            disabled={enrolledCourses.length === 0}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a course" />
            </SelectTrigger>
            <SelectContent>
              {enrolledCourses.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {enrolledCourses.length > 0 ? (
        <>
          {selectedCourse && (
            <div className="grid gap-6 md:grid-cols-3 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Present Days</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-end">
                    {presentDays}
                    <span className="text-sm text-muted-foreground ml-1">/ {totalDays}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0}% of total days
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Late Days</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-end">
                    {lateDays}
                    <span className="text-sm text-muted-foreground ml-1">/ {totalDays}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {totalDays > 0 ? Math.round((lateDays / totalDays) * 100) : 0}% of total days
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Absent Days</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-end">
                    {absentDays}
                    <span className="text-sm text-muted-foreground ml-1">/ {totalDays}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {totalDays > 0 ? Math.round((absentDays / totalDays) * 100) : 0}% of total days
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <AttendanceTable 
            records={attendanceRecords}
            courseId={selectedCourseId}
            onMarkAttendance={handleMarkAttendance}
            editable={false}
          />
        </>
      ) : (
        <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">No enrolled courses</h3>
          <p className="mt-1 text-gray-500">
            Enroll in courses to track your attendance
          </p>
        </div>
      )}
    </div>
  );
};

export default Attendance;
