import { users, type User, type InsertUser, 
  presentations, type Presentation, type InsertPresentation,
  slides, type Slide, type InsertSlide,
  visualElements, type VisualElement, type InsertVisualElement,
  workshopRegistrations, type WorkshopRegistration, type InsertWorkshopRegistration
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// The storage interface for our application
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Presentation operations
  getPresentation(id: number): Promise<Presentation | undefined>;
  getPresentations(options?: { createdBy?: number, isPublic?: boolean }): Promise<Presentation[]>;
  createPresentation(presentation: InsertPresentation): Promise<Presentation>;
  
  // Slide operations
  getSlide(id: number): Promise<Slide | undefined>;
  getSlidesByPresentation(presentationId: number): Promise<Slide[]>;
  createSlide(slide: InsertSlide): Promise<Slide>;
  
  // Visual Element operations
  getVisualElement(id: number): Promise<VisualElement | undefined>;
  getVisualElementsBySlide(slideId: number): Promise<VisualElement[]>;
  createVisualElement(element: InsertVisualElement): Promise<VisualElement>;
  
  // Workshop Registration operations
  createWorkshopRegistration(registration: InsertWorkshopRegistration): Promise<WorkshopRegistration>;
  getWorkshopRegistrations(): Promise<WorkshopRegistration[]>;
}

// Database implementation of the storage interface
export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Presentation operations
  async getPresentation(id: number): Promise<Presentation | undefined> {
    const [presentation] = await db.select().from(presentations).where(eq(presentations.id, id));
    return presentation;
  }
  
  async getPresentations(options: { createdBy?: number, isPublic?: boolean } = {}): Promise<Presentation[]> {
    let query = db.select().from(presentations);
    
    if (options.createdBy !== undefined) {
      query = query.where(eq(presentations.createdBy, options.createdBy));
    }
    
    if (options.isPublic !== undefined) {
      query = query.where(eq(presentations.isPublic, options.isPublic));
    }
    
    return await query;
  }
  
  async createPresentation(presentation: InsertPresentation): Promise<Presentation> {
    const [newPresentation] = await db
      .insert(presentations)
      .values(presentation)
      .returning();
    return newPresentation;
  }
  
  // Slide operations
  async getSlide(id: number): Promise<Slide | undefined> {
    const [slide] = await db.select().from(slides).where(eq(slides.id, id));
    return slide;
  }
  
  async getSlidesByPresentation(presentationId: number): Promise<Slide[]> {
    return await db.select()
      .from(slides)
      .where(eq(slides.presentationId, presentationId))
      .orderBy(slides.orderIndex);
  }
  
  async createSlide(slide: InsertSlide): Promise<Slide> {
    const [newSlide] = await db
      .insert(slides)
      .values(slide)
      .returning();
    return newSlide;
  }
  
  // Visual Element operations
  async getVisualElement(id: number): Promise<VisualElement | undefined> {
    const [element] = await db.select().from(visualElements).where(eq(visualElements.id, id));
    return element;
  }
  
  async getVisualElementsBySlide(slideId: number): Promise<VisualElement[]> {
    return await db.select()
      .from(visualElements)
      .where(eq(visualElements.slideId, slideId))
      .orderBy(visualElements.orderIndex);
  }
  
  async createVisualElement(element: InsertVisualElement): Promise<VisualElement> {
    const [newElement] = await db
      .insert(visualElements)
      .values(element)
      .returning();
    return newElement;
  }
  
  // Workshop Registration operations
  async createWorkshopRegistration(registration: InsertWorkshopRegistration): Promise<WorkshopRegistration> {
    const [newRegistration] = await db
      .insert(workshopRegistrations)
      .values(registration)
      .returning();
    return newRegistration;
  }
  
  async getWorkshopRegistrations(): Promise<WorkshopRegistration[]> {
    return await db.select().from(workshopRegistrations);
  }
}

// Export an instance of the DatabaseStorage
export const storage = new DatabaseStorage();
