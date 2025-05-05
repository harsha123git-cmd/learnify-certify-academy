
import { Certificate } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";

interface CertificateCardProps {
  certificate: Certificate;
  onView?: (certificateId: string) => void;
}

const CertificateCard = ({ certificate, onView }: CertificateCardProps) => {
  const handleView = () => {
    if (onView) {
      onView(certificate.id);
    }
  };

  return (
    <div className="certificate-card rounded-lg shadow-sm p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24">
        <div className="absolute transform rotate-45 bg-lms-primary/20 text-white font-semibold py-1 right-[-35px] top-[32px] w-[170px] text-center">
          Certified
        </div>
      </div>
      
      <div className="flex items-start">
        <div className="mr-4 p-2 bg-lms-primary/10 rounded-full">
          <Award className="h-8 w-8 text-lms-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">{certificate.courseName}</h3>
          <p className="text-sm text-gray-600 mb-2">Issued on {certificate.issueDate}</p>
          
          {certificate.achievements && certificate.achievements.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 mb-1">Achievements:</p>
              <div className="flex flex-wrap gap-1">
                {certificate.achievements.map((achievement, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-lms-secondary/10 text-lms-secondary"
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <Button 
            variant="outline" 
            className="mt-2 border-lms-primary text-lms-primary hover:bg-lms-primary/10"
            onClick={handleView}
          >
            View Certificate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
