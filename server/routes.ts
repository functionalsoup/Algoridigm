import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWorkshopRegistrationSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoints
  app.get("/api/hello", (_req: Request, res: Response) => {
    res.json({ message: "Hello from the J-Tech Workshop API!" });
  });

  // Workshop registration endpoint
  app.post("/api/workshop-registration", async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the request body using the Zod schema
      const validatedData = insertWorkshopRegistrationSchema.parse(req.body);
      
      // Save the registration to the database
      const registration = await storage.createWorkshopRegistration(validatedData);
      
      // Return the created registration
      res.status(201).json({ 
        success: true, 
        message: "Registration submitted successfully",
        data: registration 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle validation errors
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: validationError.message
        });
      } else {
        // Pass other errors to the error handler
        next(error);
      }
    }
  });

  // Get workshop registrations (could be protected in a real app)
  app.get("/api/workshop-registrations", async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const registrations = await storage.getWorkshopRegistrations();
      res.json({ 
        success: true,
        data: registrations 
      });
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
