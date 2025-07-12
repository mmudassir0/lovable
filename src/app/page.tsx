"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Heart,
  Plus,
  Code,
  Sparkles,
  Search,
  Settings,
  User,
  Home as HomeIcon,
  FileText,
  Zap,
  Crown,
} from "lucide-react";

const projects = [
  {
    id: 1,
    title: "E-commerce Dashboard",
    description: "A modern dashboard for managing online stores",
    tech: ["React", "TypeScript", "Tailwind"],
    likes: 24,
    isLiked: false,
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management with real-time updates",
    tech: ["Next.js", "Prisma", "PostgreSQL"],
    likes: 18,
    isLiked: true,
  },
  {
    id: 3,
    title: "Weather App",
    description: "Beautiful weather app with location-based forecasts",
    tech: ["React", "OpenWeather API", "CSS"],
    likes: 32,
    isLiked: false,
  },
];

const sidebarItems = [
  { icon: HomeIcon, label: "Home", active: true },
  { icon: Sparkles, label: "Discover" },
  { icon: FileText, label: "My Projects" },
  { icon: Heart, label: "Liked" },
  { icon: User, label: "Profile" },
  { icon: Settings, label: "Settings" },
];

export default function Home() {
  const [projectList, setProjectList] = useState(projects);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    tech: "",
  });
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleLike = (projectId: number) => {
    setProjectList((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              isLiked: !project.isLiked,
              likes: project.isLiked ? project.likes - 1 : project.likes + 1,
            }
          : project
      )
    );
  };

  const handleCreateProject = () => {
    if (newProject.title && newProject.description) {
      const project = {
        id: projectList.length + 1,
        title: newProject.title,
        description: newProject.description,
        tech: newProject.tech
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        likes: 0,
        isLiked: false,
      };
      setProjectList([project, ...projectList]);
      setNewProject({ title: "", description: "", tech: "" });
      setShowCreateForm(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <Sidebar className="w-64 border-r">
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Lovable
              </h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    className={`w-full justify-start gap-3 px-3 py-2 ${
                      item.active
                        ? "bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <button>
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <Separator className="my-4" />
            <div className="px-4">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">Upgrade to Pro</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                  Unlock unlimited projects and premium features
                </p>
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Upgrade Now
                </Button>
              </div>
            </div>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="border-b px-6 py-4 bg-white dark:bg-gray-950">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden" />
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search projects..."
                    className="pl-10 w-64"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  New Project
                </Button>
                <Button size="sm" className="gap-2">
                  <Zap className="w-4 h-4" />
                  Generate with AI
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-auto p-6">
            {/* Create Project Form */}
            {showCreateForm && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Create New Project
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Project Title
                    </label>
                    <Input
                      value={newProject.title}
                      onChange={(e) =>
                        setNewProject({ ...newProject, title: e.target.value })
                      }
                      placeholder="Enter project title"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Description
                    </label>
                    <Textarea
                      value={newProject.description}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe your project"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Technologies (comma-separated)
                    </label>
                    <Input
                      value={newProject.tech}
                      onChange={(e) =>
                        setNewProject({ ...newProject, tech: e.target.value })
                      }
                      placeholder="React, TypeScript, Tailwind"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleCreateProject} className="gap-2">
                      <Plus className="w-4 h-4" />
                      Create Project
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowCreateForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectList.map((project) => (
                <Card
                  key={project.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg">{project.title}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(project.id)}
                        className={`p-2 ${
                          project.isLiked
                            ? "text-red-500 hover:text-red-600"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            project.isLiked ? "fill-current" : ""
                          }`}
                        />
                        <span className="ml-1 text-sm">{project.likes}</span>
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, index) => (
                        <Badge key={index} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="gap-2">
                        <Code className="w-4 h-4" />
                        View Code
                      </Button>
                      <Button size="sm" className="gap-2">
                        <Sparkles className="w-4 h-4" />
                        Live Demo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Welcome Message */}
            {projectList.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Welcome to Lovable!</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Start by creating your first project or exploring the
                  community.
                </p>
                <Button
                  onClick={() => setShowCreateForm(true)}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create Your First Project
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
