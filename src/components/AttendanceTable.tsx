
import { AttendanceRecord } from "@/lib/data";
import { Check, X, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface AttendanceTableProps {
  records: AttendanceRecord[];
  courseId: string;
  onMarkAttendance?: (date: string, status: 'present' | 'absent' | 'late') => void;
  editable?: boolean;
}

const AttendanceTable = ({ 
  records, 
  courseId, 
  onMarkAttendance,
  editable = false
}: AttendanceTableProps) => {
  // Calculate attendance percentage
  const totalDays = records.length;
  const presentDays = records.filter(r => r.status === 'present').length;
  const lateDays = records.filter(r => r.status === 'late').length;
  const absentDays = records.filter(r => r.status === 'absent').length;
  
  const attendancePercentage = totalDays > 0 
    ? Math.round(((presentDays + (lateDays * 0.5)) / totalDays) * 100) 
    : 0;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'present':
        return 'text-lms-success bg-lms-success/10';
      case 'absent':
        return 'text-lms-error bg-lms-error/10';
      case 'late':
        return 'text-lms-warning bg-lms-warning/10';
      default:
        return '';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'present':
        return <Check className="h-4 w-4" />;
      case 'absent':
        return <X className="h-4 w-4" />;
      case 'late':
        return <Clock className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const handleStatusChange = (date: string, status: 'present' | 'absent' | 'late') => {
    if (onMarkAttendance && editable) {
      onMarkAttendance(date, status);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Attendance Record</h3>
          <div className="text-sm font-medium">
            Overall: <span className={cn(
              attendancePercentage >= 80 ? 'text-lms-success' : 
              attendancePercentage >= 60 ? 'text-lms-warning' : 
              'text-lms-error'
            )}>{attendancePercentage}%</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-lms-success rounded-full mr-2"></div>
            <span>Present: {presentDays}</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-lms-warning rounded-full mr-2"></div>
            <span>Late: {lateDays}</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-lms-error rounded-full mr-2"></div>
            <span>Absent: {absentDays}</span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              {editable && (
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.length > 0 ? (
              records.map((record, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      getStatusColor(record.status)
                    )}>
                      {getStatusIcon(record.status)}
                      <span className="ml-1 capitalize">{record.status}</span>
                    </span>
                  </td>
                  {editable && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => handleStatusChange(record.date, 'present')}
                          className={cn(
                            "p-1 rounded-full",
                            record.status === 'present' ? 'bg-lms-success/20 text-lms-success' : 'text-gray-400 hover:text-lms-success'
                          )}
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleStatusChange(record.date, 'late')}
                          className={cn(
                            "p-1 rounded-full",
                            record.status === 'late' ? 'bg-lms-warning/20 text-lms-warning' : 'text-gray-400 hover:text-lms-warning'
                          )}
                        >
                          <Clock className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleStatusChange(record.date, 'absent')}
                          className={cn(
                            "p-1 rounded-full",
                            record.status === 'absent' ? 'bg-lms-error/20 text-lms-error' : 'text-gray-400 hover:text-lms-error'
                          )}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={editable ? 3 : 2} className="px-6 py-4 text-center text-sm text-gray-500">
                  No attendance records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
