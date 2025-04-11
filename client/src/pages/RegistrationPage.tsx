import { useState } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export default function RegistrationPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "actor",
    secondaryRole: "",
    experience: "",
    availability: "",
    message: ""
  });
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    
    try {
      await apiRequest("POST", "/api/workshop-registration", formData);
      toast({
        title: "Registration Successful!",
        description: "Thank you for registering for our workshop. We'll be in touch soon!",
        variant: "default",
      });
      setIsSubmitted(true);
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was a problem submitting your registration. Please try again.",
        variant: "destructive",
      });
      console.error("Registration error:", error);
    } finally {
      setIsPending(false);
    }
  };
  
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-corp-bg flex items-center justify-center px-3 py-8 sm:p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4 sm:p-6 bg-corp-bg rounded-lg border border-corp-cyan/40 text-center max-w-lg w-full"
        >
          <h3 className="text-xl sm:text-2xl font-display font-semibold text-corp-cyan mb-3 sm:mb-4">Thank You!</h3>
          <p className="mb-3 sm:mb-4">Your registration has been submitted successfully.</p>
          <p>We'll contact you soon with more details about the workshop.</p>
          <div className="mt-6 sm:mt-8">
            <Button 
              onClick={() => window.location.href = "/"}
              className="bg-corp-magenta hover:bg-corp-magenta/90 text-white w-full sm:w-auto px-8 py-3 touch-manipulation"
            >
              Return to Presentation
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-corp-bg flex items-center justify-center px-3 py-8 sm:p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 sm:p-6 bg-corp-bg rounded-lg border border-corp-magenta/40 max-w-2xl w-full"
      >
        <h3 className="text-xl sm:text-2xl font-display font-bold mb-6 sm:mb-8 text-center text-corp-magenta">Register for ALGORIDIGM Workshop</h3>
        
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="form-group">
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-3 bg-corp-bg border border-corp-magenta/70 focus:border-corp-magenta focus:outline-none rounded-md text-white text-base"
                placeholder="Your name"
                value={formData.name}
                onChange={handleInputChange}
                autoComplete="name"
                inputMode="text"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 bg-corp-bg border border-corp-magenta/70 focus:border-corp-magenta focus:outline-none rounded-md text-white text-base"
                placeholder="Your email address"
                value={formData.email}
                onChange={handleInputChange}
                autoComplete="email"
                inputMode="email"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="form-group">
              <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone (optional)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full p-3 bg-corp-bg border border-corp-magenta/70 focus:border-corp-magenta focus:outline-none rounded-md text-white text-base"
                placeholder="Your phone number"
                value={formData.phone}
                onChange={handleInputChange}
                autoComplete="tel"
                inputMode="tel"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="role" className="block text-sm font-medium mb-1">Primary Role</label>
              <select
                id="role"
                name="role"
                className="w-full p-3 bg-corp-bg border border-corp-magenta/70 focus:border-corp-magenta focus:outline-none rounded-md text-white text-base"
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                <option value="actor">Actor/Performer</option>
                <option value="designer">Designer</option>
                <option value="tech">Technical Crew</option>
                <option value="artist">Visual Artist</option>
                <option value="writer">Writer/Dramaturg</option>
                <option value="director">Director</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="secondaryRole" className="block text-sm font-medium mb-1">Secondary Role (optional)</label>
            <select
              id="secondaryRole"
              name="secondaryRole"
              className="w-full p-3 bg-corp-bg border border-corp-magenta/70 focus:border-corp-magenta focus:outline-none rounded-md text-white text-base"
              value={formData.secondaryRole}
              onChange={handleInputChange}
            >
              <option value="">Select secondary role (optional)</option>
              <option value="actor">Actor/Performer</option>
              <option value="designer">Designer</option>
              <option value="tech">Technical Crew</option>
              <option value="artist">Visual Artist</option>
              <option value="writer">Writer/Dramaturg</option>
              <option value="director">Director</option>
              <option value="production">Production Manager</option>
              <option value="stage">Stage Manager</option>
              <option value="none">None - Just Primary Role</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="experience" className="block text-sm font-medium mb-1">Experience</label>
            <textarea
              id="experience"
              name="experience"
              className="w-full p-3 bg-corp-bg border border-corp-magenta/70 focus:border-corp-magenta focus:outline-none rounded-md text-white text-base min-h-[80px] sm:min-h-[100px]"
              placeholder="Briefly describe your relevant experience"
              value={formData.experience}
              onChange={handleInputChange}
              rows={3}
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="availability" className="block text-sm font-medium mb-1">Summer Availability</label>
            <textarea
              id="availability"
              name="availability"
              className="w-full p-3 bg-corp-bg border border-corp-magenta/70 focus:border-corp-magenta focus:outline-none rounded-md text-white text-base min-h-[80px] sm:min-h-[100px]"
              placeholder="Please describe your availability during summer"
              value={formData.availability}
              onChange={handleInputChange}
              rows={3}
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="message" className="block text-sm font-medium mb-1">Additional Information (optional)</label>
            <textarea
              id="message"
              name="message"
              className="w-full p-3 bg-corp-bg border border-corp-magenta/70 focus:border-corp-magenta focus:outline-none rounded-md text-white text-base min-h-[80px] sm:min-h-[100px]"
              placeholder="Anything else you'd like to share"
              value={formData.message}
              onChange={handleInputChange}
              rows={3}
            ></textarea>
          </div>
          
          <div className="flex flex-col space-y-4 items-center mt-6 sm:mt-8">
            <Button 
              type="submit" 
              disabled={isPending}
              className="bg-gradient-to-r from-corp-burnt-orange to-corp-magenta hover:opacity-90 text-white font-bold py-3 px-8 text-base sm:text-lg tracking-wide rounded-md shadow-lg w-full md:w-auto md:px-12 touch-manipulation"
            >
              {isPending ? "Submitting..." : "Submit Registration"}
            </Button>
            
            <button
              type="button"
              onClick={() => window.location.href = "/"}
              className="text-corp-magenta hover:text-corp-burnt-orange underline text-sm py-2 px-4 touch-manipulation"
            >
              Return to Presentation
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}