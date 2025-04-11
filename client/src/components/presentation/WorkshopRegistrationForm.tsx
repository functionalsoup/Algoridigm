import { useState } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export function WorkshopRegistrationForm() {
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 bg-corp-bg rounded-lg border border-corp-cyan/40 text-center"
      >
        <h3 className="text-2xl font-display font-semibold text-corp-cyan mb-4">Thank You!</h3>
        <p className="mb-4">Your registration has been submitted successfully.</p>
        <p>We'll contact you soon with more details about the workshop.</p>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-corp-bg rounded-lg border border-corp-magenta/40"
    >
      <h3 className="text-xl font-display font-semibold mb-4 text-corp-magenta">Register for the Workshop</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 bg-transparent border border-corp-magenta/40 focus:border-corp-magenta rounded-md text-white"
              placeholder="Your name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 bg-transparent border border-corp-magenta/40 focus:border-corp-magenta rounded-md text-white"
              placeholder="Your email address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone (optional)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full p-2 bg-transparent border border-corp-magenta/40 focus:border-corp-magenta rounded-md text-white"
              placeholder="Your phone number"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="role" className="block text-sm font-medium mb-1">Primary Role</label>
            <select
              id="role"
              name="role"
              className="w-full p-2 bg-corp-bg border border-corp-magenta/40 focus:border-corp-magenta rounded-md text-white"
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
            className="w-full p-2 bg-corp-bg border border-corp-magenta/40 focus:border-corp-magenta rounded-md text-white"
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
            className="w-full p-2 bg-transparent border border-corp-magenta/40 focus:border-corp-magenta rounded-md text-white min-h-[80px]"
            placeholder="Briefly describe your relevant experience"
            value={formData.experience}
            onChange={handleInputChange}
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="availability" className="block text-sm font-medium mb-1">Summer Availability</label>
          <textarea
            id="availability"
            name="availability"
            className="w-full p-2 bg-transparent border border-corp-magenta/40 focus:border-corp-magenta rounded-md text-white min-h-[80px]"
            placeholder="Please describe your availability during summer"
            value={formData.availability}
            onChange={handleInputChange}
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="message" className="block text-sm font-medium mb-1">Additional Information (optional)</label>
          <textarea
            id="message"
            name="message"
            className="w-full p-2 bg-transparent border border-corp-magenta/40 focus:border-corp-magenta rounded-md text-white min-h-[80px]"
            placeholder="Anything else you'd like to share"
            value={formData.message}
            onChange={handleInputChange}
          ></textarea>
        </div>
        
        <div className="flex justify-center mt-6">
          <Button 
            type="submit" 
            disabled={isPending}
            className="bg-corp-cyan hover:bg-corp-cyan/80 text-black font-semibold py-2 px-6"
          >
            {isPending ? "Submitting..." : "Submit Registration"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}