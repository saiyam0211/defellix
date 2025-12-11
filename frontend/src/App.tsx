import {
  AlertTriangle,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  DollarSign,
  Download,
  FileText,
  MessageSquare,
  Moon,
  Plus,
  Send,
  Sun,
  Upload,
  X,
  ExternalLink,
  ChevronUp,
  Eye,
} from "lucide-react";
import React from "react";
import "./index.css";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Progress } from "./components/ui/progress";
import { Select } from "./components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Textarea } from "./components/ui/textarea";
import { cn } from "./lib/utils";

type Status = "active" | "completed" | "draft";

type Milestone = {
  title: string;
  amount: string;
  dueDate: string;
  deliverables: string;
  status: "pending" | "in-progress" | "done";
};

type ClientDetails = {
  name: string;
  email: string;
  phone: string;
  domain?: string;
  company: string;
  address: string;
  businessEmail: string;
  instagram?: string;
  linkedin?: string;
  gst?: string;
  verified: Record<string, boolean>;
};

type PaymentVerification =
  | { status: "verified" }
  | { status: "needs_review"; utr: string; transactionId: string; screenshot: string }
  | { status: "not_verified" };

type Project = {
  id: string;
  name: string;
  clientName: string;
  clientCompany: string;
  startDate: string;
  deadline: string;
  progress: number;
  rating: number;
  status: Status;
  category: string;
  description: string;
  proposedAmount: string;
  milestones: Milestone[];
  clientDetails: ClientDetails;
  terms: string;
  pastSubmissions: string[];
  pastFeedback: string[];
  pastPayments: string[];
  paymentVerification: PaymentVerification;
  score?: number;
};

const projects: Project[] = [
  {
    id: "p-101",
    name: "Smart Contract for Escrow Services",
    clientName: "Aria Patel",
    clientCompany: "TrustBridge Labs",
    startDate: "2025-11-02",
    deadline: "2026-01-15",
    progress: 65,
    rating: 4.6,
    status: "active",
    category: "Blockchain",
    description:
      "Implement an on-chain escrow contract with milestone-based release, dispute resolution hooks, and reporting APIs.",
    proposedAmount: "$42,000",
    milestones: [
      {
        title: "Architecture & Specs",
        amount: "$8,000",
        dueDate: "2025-11-15",
        deliverables: "Technical architecture, sequence diagrams, schema",
        status: "done",
      },
      {
        title: "Contract Development",
        amount: "$18,000",
        dueDate: "2025-12-05",
        deliverables: "Solidity contracts, unit tests, gas reports",
        status: "in-progress",
      },
      {
        title: "Audit & Handoff",
        amount: "$16,000",
        dueDate: "2026-01-10",
        deliverables: "Audit fixes, deployment scripts, docs",
        status: "pending",
      },
    ],
    clientDetails: {
      name: "Aria Patel",
      email: "aria@trustbridge.io",
      phone: "+91 99877 22334",
      domain: "trustbridge.io",
      company: "TrustBridge Labs Pvt Ltd",
      address: "91 Springboard, Bangalore",
      businessEmail: "legal@trustbridge.io",
      instagram: "@trustbridge",
      linkedin: "linkedin.com/company/trustbridge",
      gst: "29ABCDE1234F1Z5",
      verified: {
        name: true,
        email: true,
        phone: true,
        domain: true,
        company: true,
        address: false,
        businessEmail: true,
        instagram: false,
        linkedin: true,
        gst: true,
      },
    },
    terms: "Funds locked in escrow; release per milestone on approval; 7-day dispute window.",
    pastSubmissions: ["System design deck", "Contract drafts v1-v2"],
    pastFeedback: ["Need more granular event logs", "Add multisig signer fallback"],
    pastPayments: ["Advance $5,000 verified", "Milestone 1 $3,000 verified"],
    paymentVerification: {
      status: "needs_review",
      utr: "UTR-9823476",
      transactionId: "TX-44UJ12",
      screenshot: "https://placehold.co/300x160",
    },
  },
  {
    id: "p-202",
    name: "Marketplace Compliance Layer",
    clientName: "ZeroOne Commerce",
    clientCompany: "ZeroOne Commerce",
    startDate: "2025-08-10",
    deadline: "2025-10-01",
    progress: 100,
    rating: 4.9,
    status: "completed",
    category: "Platform",
    description: "Compliance workflows for onboarding, KYC, GST validation, and invoice automation.",
    proposedAmount: "$58,400",
    milestones: [
      {
        title: "Discovery",
        amount: "$6,000",
        dueDate: "2025-08-18",
        deliverables: "Process mapping, risk register",
        status: "done",
      },
      {
        title: "Build",
        amount: "$34,400",
        dueDate: "2025-09-05",
        deliverables: "Service layer, connectors, dashboard",
        status: "done",
      },
      {
        title: "Rollout",
        amount: "$18,000",
        dueDate: "2025-09-28",
        deliverables: "Go-live, training, SOPs",
        status: "done",
      },
    ],
    clientDetails: {
      name: "Rehan K",
      email: "ops@zeroone.com",
      phone: "+91 99221 33445",
      domain: "zeroone.com",
      company: "ZeroOne Commerce",
      address: "DLF Cybercity, Gurgaon",
      businessEmail: "finance@zeroone.com",
      instagram: "@zeroone",
      linkedin: "linkedin.com/company/zeroone",
      gst: "06PQRSB1234H1Z8",
      verified: {
        name: true,
        email: true,
        phone: true,
        domain: true,
        company: true,
        address: true,
        businessEmail: true,
        instagram: true,
        linkedin: true,
        gst: true,
      },
    },
    terms: "All payments reconciled; warranties valid for 90 days.",
    pastSubmissions: ["Runbooks", "Integration guide", "Training videos"],
    pastFeedback: ["Excellent cadence", "Great documentation quality"],
    pastPayments: ["All milestones cleared"],
    paymentVerification: { status: "verified" },
    score: 92,
  },
  {
    id: "p-303",
    name: "BRD: AI Contract Analyzer",
    clientName: "Nova Legaltech",
    clientCompany: "Nova Legaltech",
    startDate: "2025-12-01",
    deadline: "2026-02-01",
    progress: 12,
    rating: 4.2,
    status: "draft",
    category: "AI",
    description: "Business requirement draft for AI-driven contract clause analysis.",
    proposedAmount: "$24,000",
    milestones: [
      {
        title: "Research",
        amount: "$6,000",
        dueDate: "2025-12-20",
        deliverables: "Use-case matrix, risk map",
        status: "pending",
      },
    ],
    clientDetails: {
      name: "Divya Rao",
      email: "divya@novalegal.com",
      phone: "+91 90123 11002",
      domain: "novalegal.com",
      company: "Nova Legaltech",
      address: "Mumbai BKC",
      businessEmail: "ops@novalegal.com",
      instagram: "@novalegal",
      linkedin: "linkedin.com/company/novalegal",
      gst: "27LMNOP1234G1Z4",
      verified: {
        name: false,
        email: true,
        phone: false,
        domain: true,
        company: true,
        address: false,
        businessEmail: true,
        instagram: false,
        linkedin: true,
        gst: false,
      },
    },
    terms: "Draft under review; subject to revisions after client inputs.",
    pastSubmissions: [],
    pastFeedback: [],
    pastPayments: [],
    paymentVerification: { status: "not_verified" },
  },
];

type SubmitFormState = {
  link: string;
  screenshots: string;
  video: string;
  documents: string;
  note: string;
  milestoneAchieved: string;
  milestoneSelected?: string;
};

type ContractWizard = {
  step: number;
  category: string;
  name: string;
  details: string;
  brdFile?: File | null;
  client: {
    name: string;
    phone: string;
    email: string;
    domain: string;
    company: string;
  };
  project: {
    deadline: string;
    amount: string;
    milestones: Milestone[];
    submissionCriteria: string;
  };
  terms: string;
};

const navItems = [
  "My Projects",
  "Pipeline",
  "Clients",
  "Contracts",
  "Payments",
  "Settings",
];

function App() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [activeTab, setActiveTab] = React.useState<Status>("active");
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [submitOpen, setSubmitOpen] = React.useState(false);
  const [createOpen, setCreateOpen] = React.useState(false);
  const [submissionsOpen, setSubmissionsOpen] = React.useState(false);
  const [feedbackOpen, setFeedbackOpen] = React.useState(false);
  const [submitForm, setSubmitForm] = React.useState<SubmitFormState>({
    link: "",
    screenshots: "",
    video: "",
    documents: "",
    note: "",
    milestoneAchieved: "no",
    milestoneSelected: undefined,
  });
  const [wizard, setWizard] = React.useState<ContractWizard>({
    step: 1,
    category: "",
    name: "",
    details: "",
    brdFile: null,
    client: { name: "", phone: "", email: "", domain: "", company: "" },
    project: {
      deadline: "",
      amount: "",
      milestones: [
        {
          title: "Milestone 1",
          amount: "",
          dueDate: "",
          deliverables: "",
          status: "pending",
        },
      ],
      submissionCriteria: "",
    },
    terms: "",
  });

  const filteredProjects = projects.filter((p) => p.status === activeTab);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setDetailsOpen(true);
  };

  const handleSubmit = () => {
    // Placeholder for submit action
    setSubmitOpen(false);
    setDetailsOpen(false);
  };

  const handleWizardSave = () => {
    setCreateOpen(false);
  };

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <div className={cn(theme === "dark" && "dark")}>
      <div className="flex min-h-screen bg-background text-foreground">
        <aside className="flex w-72 flex-col border-r border-border bg-surface/90 backdrop-blur">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="text-lg font-semibold text-foreground">Contract Desk</div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle theme"
                onClick={toggleTheme}
              >
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <nav className="flex-1 px-4 py-2">
            {navItems.map((item) => {
              const active = item === "My Projects";
              return (
                <div
                  key={item}
                  className={cn(
                    "mb-1 flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-primary/90 text-foreground font-semibold"
                      : "text-muted hover:bg-secondary/40"
                  )}
                >
                  <span>{item}</span>
                  {active && <ChevronRight className="h-4 w-4" />}
                </div>
              );
            })}
          </nav>
          <div className="border-t border-border px-4 py-4">
            <Card className="border-border bg-primary/10">
              <CardHeader className="pb-2">
                <div className="text-sm font-semibold text-foreground">Account Health</div>
                <p className="text-xs text-muted">All systems nominal</p>
              </CardHeader>
              <CardContent className="pt-0">
                <Progress value={82} />
              </CardContent>
            </Card>
          </div>
        </aside>

        <main className="flex-1 p-6">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold">My Projects</h1>
              <p className="text-sm text-muted">Contracts, submissions, and payments in one view.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" onClick={toggleTheme}>
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
              <Button
                onClick={() => setCreateOpen(true)}
                className="gap-2"
                aria-label="Create Contract"
              >
                <Plus className="h-4 w-4" />
                Create Contract
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as Status)}>
            <TabsList>
              <TabsTrigger value="active">Active Projects</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab}>
              <ProjectTable
                projects={filteredProjects}
                onProjectClick={handleProjectClick}
                onSubmitClick={(project) => {
                  setSelectedProject(project);
                  setSubmitOpen(true);
                }}
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>

      <ProjectDetailsModal
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        project={selectedProject}
        onSubmit={() => setSubmitOpen(true)}
        onSubmissionsClick={() => setSubmissionsOpen(true)}
        onFeedbackClick={() => setFeedbackOpen(true)}
        hasNestedModal={submissionsOpen || feedbackOpen || submitOpen}
      />

      <SubmitModal
        open={submitOpen}
        onOpenChange={setSubmitOpen}
        form={submitForm}
        milestones={selectedProject?.milestones ?? []}
        onChange={setSubmitForm}
        onSubmit={handleSubmit}
        hasNestedModal={false}
      />

      <CreateContractModal
        open={createOpen}
        onOpenChange={setCreateOpen}
        wizard={wizard}
        setWizard={setWizard}
        onSave={handleWizardSave}
        hasNestedModal={false}
      />

      <SubmissionsModal
        open={submissionsOpen}
        onOpenChange={setSubmissionsOpen}
        submissions={selectedProject?.pastSubmissions ?? []}
        projectName={selectedProject?.name ?? ""}
        hasNestedModal={false}
      />

      <FeedbackModal
        open={feedbackOpen}
        onOpenChange={setFeedbackOpen}
        feedback={selectedProject?.pastFeedback ?? []}
        projectName={selectedProject?.name ?? ""}
        hasNestedModal={false}
      />
    </div>
  );
}

type ProjectTableProps = {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  onSubmitClick: (project: Project) => void;
};

const ProjectTable: React.FC<ProjectTableProps> = ({ projects, onProjectClick, onSubmitClick }) => (
  <Card className="border border-border bg-surface">
    <Table>
      <TableHeader>
        <TableRow className="cursor-default hover:bg-transparent">
          <TableHead>Project Name</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>Deadline</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead>Our Rating</TableHead>
          <TableHead>Action</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id} onClick={() => onProjectClick(project)}>
            <TableCell className="font-semibold">{project.name}</TableCell>
            <TableCell>
              <div className="text-sm font-medium">{project.clientName}</div>
              <div className="text-xs text-muted">{project.clientCompany}</div>
            </TableCell>
            <TableCell>{project.startDate}</TableCell>
            <TableCell>{project.deadline}</TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <Progress value={project.progress} className="w-32" />
                <span className="text-sm text-muted">{project.progress}%</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Badge variant="success">{project.rating.toFixed(1)}</Badge>
                <span className="text-xs text-muted">/5</span>
              </div>
            </TableCell>
            <TableCell onClick={(e) => e.stopPropagation()}>
              {project.status === "active" ? (
                <Button size="sm" onClick={() => onSubmitClick(project)}>
                  Submit
                </Button>
              ) : (
                <Button variant="outline" size="sm">
                  View
                </Button>
              )}
            </TableCell>
            <TableCell className="w-8 text-right">
              <ChevronDown className="h-4 w-4 text-muted" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>
);

type DetailsProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
  onSubmit: () => void;
  onSubmissionsClick: () => void;
  onFeedbackClick: () => void;
  hasNestedModal?: boolean;
};

const ProjectDetailsModal: React.FC<DetailsProps> = ({
  open,
  onOpenChange,
  project,
  onSubmit,
  onSubmissionsClick,
  onFeedbackClick,
  hasNestedModal = false,
}) => {
  const [termsExpanded, setTermsExpanded] = React.useState(false);
  const TERMS_PREVIEW_LENGTH = 150;

  if (!project) return null;

  const verificationIcon = (value?: boolean) => {
    if (value) return <Check className="h-4 w-4 text-success" />;
    return <X className="h-4 w-4 text-danger" />;
  };

  const paymentStatusIcon = () => {
    if (project.paymentVerification.status === "verified") {
      return (
        <Badge variant="success" className="gap-1">
          <Check className="h-3 w-3" />
          Verified
        </Badge>
      );
    }
    if (project.paymentVerification.status === "needs_review") {
      return (
        <Badge variant="warning" className="gap-1">
          <AlertTriangle className="h-3 w-3" />
          Needs review
        </Badge>
      );
    }
    return (
      <Badge variant="danger" className="gap-1">
        <X className="h-3 w-3" />
        Not verified
      </Badge>
    );
  };

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case "done":
        return "bg-success/10 border-success/30 text-success";
      case "in-progress":
        return "bg-warning/10 border-warning/30 text-warning";
      default:
        return "bg-surface border-border text-muted";
    }
  };

  const getMilestoneProgress = (status: string) => {
    switch (status) {
      case "done":
        return 100;
      case "in-progress":
        return 50;
      default:
        return 0;
    }
  };

  const shouldTruncateTerms = project.terms.length > TERMS_PREVIEW_LENGTH;
  const displayTerms = termsExpanded
    ? project.terms
    : project.terms.slice(0, TERMS_PREVIEW_LENGTH) + (shouldTruncateTerms ? "..." : "");

  const handleDownloadScreenshot = () => {
    if (project.paymentVerification.status === "needs_review") {
      const link = document.createElement("a");
      link.href = project.paymentVerification.screenshot;
      link.download = `payment-proof-${project.paymentVerification.transactionId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto max-w-6xl"
        blurIntensity={hasNestedModal ? "lg" : "sm"}
      >
        <DialogHeader className="flex-row items-start justify-between border-b border-border pb-4">
          <div className="flex-1">
            <DialogTitle className="text-2xl mb-2">{project.name}</DialogTitle>
            <p className="text-sm text-muted leading-relaxed">{project.description}</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {project.status === "completed" && project.score !== undefined && (
              <Badge variant="success" className="text-base px-3 py-1.5">
                Score: {project.score}
              </Badge>
            )}
            {paymentStatusIcon()}
          </div>
        </DialogHeader>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card className="border-2 border-border">
            <CardHeader className="pb-3 border-b border-border">
              <div className="flex items-center gap-2 text-base font-semibold">
                <Calendar className="h-4 w-4 text-primary" />
                Key Dates & Amount
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <EnhancedRow label="Start Date" value={project.startDate} icon={<Calendar className="h-4 w-4" />} />
              <EnhancedRow label="Due Date" value={project.deadline} icon={<Clock className="h-4 w-4" />} />
              <EnhancedRow
                label="Proposed Amount"
                value={project.proposedAmount}
                icon={<DollarSign className="h-4 w-4" />}
              />
              <EnhancedRow label="Category" value={project.category} />
            </CardContent>
          </Card>

          <Card className="border-2 border-border">
            <CardHeader className="pb-3 border-b border-border">
              <div className="flex items-center gap-2 text-base font-semibold">
                <FileText className="h-4 w-4 text-primary" />
                Client Details
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 pt-4 text-sm">
              {Object.entries(project.clientDetails).map(([key, value]) => {
                if (key === "verified") return null;
                const verified = project.clientDetails.verified[key] ?? false;
                return (
                  <div key={key} className="flex items-start justify-between gap-2 p-2 rounded-md hover:bg-secondary/20 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs uppercase text-muted font-semibold mb-1">{key}</div>
                      <div className="font-medium text-foreground truncate">{String(value || "-")}</div>
                    </div>
                    <div className="flex-shrink-0">{verificationIcon(verified)}</div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 border-2 border-border">
          <CardHeader className="pb-3 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-base font-semibold">
                <FileText className="h-4 w-4 text-primary" />
                Milestones
              </div>
              <Badge variant="outline" className="text-sm px-3 py-1">
                {project.milestones.length} {project.milestones.length === 1 ? "milestone" : "milestones"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {project.milestones.map((m, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "rounded-xl border-2 p-4 transition-all hover:shadow-lg",
                    getMilestoneStatusColor(m.status)
                  )}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                          {idx + 1}
                        </div>
                        <div className="font-semibold text-base">{m.title}</div>
                      </div>
                    </div>
                    <Badge
                      variant={
                        m.status === "done"
                          ? "success"
                          : m.status === "in-progress"
                          ? "warning"
                          : "outline"
                      }
                      className="text-xs"
                    >
                      {m.status.replace("-", " ")}
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-muted mb-2">Progress</div>
                    <Progress value={getMilestoneProgress(m.status)} className="h-2 mb-2" />
                    <div className="text-xs text-muted">{getMilestoneProgress(m.status)}% complete</div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="text-sm text-muted leading-relaxed">{m.deliverables}</div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <div className="flex items-center gap-1 text-xs text-muted">
                      <Calendar className="h-3 w-3" />
                      <span>{m.dueDate}</span>
                    </div>
                    <div className="font-semibold text-sm">{m.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card className="border-2 border-border cursor-pointer hover:border-primary/50 transition-colors"
                onClick={onSubmissionsClick}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <FileText className="h-4 w-4 text-primary" />
                  Past Submissions
                </div>
                <ExternalLink className="h-4 w-4 text-muted" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-foreground">
              {project.pastSubmissions.length ? (
                <>
                  {project.pastSubmissions.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="rounded-md bg-background px-3 py-2 border border-border hover:bg-secondary/20 transition-colors">
                      {item}
                    </div>
                  ))}
                  {project.pastSubmissions.length > 2 && (
                    <div className="text-xs text-muted text-center pt-1">
                      +{project.pastSubmissions.length - 2} more
                    </div>
                  )}
                </>
              ) : (
                <div className="text-muted text-center py-2">No submissions yet.</div>
              )}
            </CardContent>
          </Card>

          <Card className="border-2 border-border cursor-pointer hover:border-primary/50 transition-colors"
                onClick={onFeedbackClick}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  Past Feedback
                </div>
                <ExternalLink className="h-4 w-4 text-muted" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-foreground">
              {project.pastFeedback.length ? (
                <>
                  {project.pastFeedback.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="rounded-md bg-background px-3 py-2 border border-border hover:bg-secondary/20 transition-colors">
                      {item}
                    </div>
                  ))}
                  {project.pastFeedback.length > 2 && (
                    <div className="text-xs text-muted text-center pt-1">
                      +{project.pastFeedback.length - 2} more
                    </div>
                  )}
                </>
              ) : (
                <div className="text-muted text-center py-2">No feedback yet.</div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 space-y-4">
          {project.paymentVerification.status === "verified" && (
            <Card className="border-2 border-success/30 bg-success/5">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-success">
                  <Check className="h-4 w-4" />
                  Payment Verification
                </div>
              </CardHeader>
              <CardContent className="text-sm text-foreground">
                <div className="flex items-center gap-2">
                  <Badge variant="success">All payments verified</Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {project.paymentVerification.status === "needs_review" && (
            <Card className="border-2 border-warning/30 bg-warning/5">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-warning">
                  <AlertTriangle className="h-4 w-4" />
                  Payment Verification - Needs Review
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="grid gap-3 md:grid-cols-2">
                  <EnhancedRow label="UTR" value={project.paymentVerification.utr} />
                  <EnhancedRow
                    label="Transaction ID"
                    value={project.paymentVerification.transactionId}
                  />
                </div>
                <div>
                  <div className="text-xs uppercase text-muted mb-2">Payment Screenshot</div>
                  <Button
                    variant="outline"
                    onClick={handleDownloadScreenshot}
                    className="gap-2 w-full sm:w-auto"
                  >
                    <Download className="h-4 w-4" />
                    Download Payment Screenshot
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {project.paymentVerification.status === "not_verified" && (
            <Card className="border-2 border-danger/30 bg-danger/5">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-danger">
                  <X className="h-4 w-4" />
                  Payment Verification
                </div>
              </CardHeader>
              <CardContent className="text-sm text-foreground">
                <Badge variant="danger">Payment not verified</Badge>
              </CardContent>
            </Card>
          )}

          <Card className="border-2 border-border">
            <CardHeader className="pb-3 border-b border-border">
              <div className="flex items-center gap-2 text-base font-semibold">
                <FileText className="h-4 w-4 text-primary" />
                Terms & Conditions
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {displayTerms}
              </div>
              {shouldTruncateTerms && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTermsExpanded(!termsExpanded)}
                  className="mt-3 gap-1"
                >
                  {termsExpanded ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      Read More
                    </>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-border">
          {project.status === "active" && (
            <Button onClick={onSubmit} className="gap-2" size="lg">
              <Send className="h-4 w-4" />
              Submit Delivery
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-muted">{label}</span>
    <span className="font-semibold text-foreground">{value}</span>
  </div>
);

const EnhancedRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center gap-2">
      {icon && <div className="text-muted">{icon}</div>}
      <span className="text-sm text-muted font-medium">{label}</span>
    </div>
    <span className="text-sm font-semibold text-foreground">{value}</span>
  </div>
);

type SubmissionsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  submissions: string[];
  projectName: string;
  hasNestedModal?: boolean;
};

const SubmissionsModal: React.FC<SubmissionsModalProps> = ({
  open,
  onOpenChange,
  submissions,
  projectName,
  hasNestedModal = false,
}) => {
  const [viewingSubmission, setViewingSubmission] = React.useState<string | null>(null);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl" blurIntensity={hasNestedModal ? "lg" : "sm"}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Past Submissions
            </DialogTitle>
            <p className="text-sm text-muted">{projectName}</p>
          </DialogHeader>
          <div className="mt-4 space-y-3">
            {submissions.length ? (
              submissions.map((submission, idx) => (
                <Card
                  key={idx}
                  className="border-2 border-border hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => setViewingSubmission(submission)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{submission}</div>
                        <div className="mt-1 text-xs text-muted">
                          Submitted on {new Date().toLocaleDateString()}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          setViewingSubmission(submission);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-muted">
                <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No submissions yet.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <SubmissionDetailModal
        open={viewingSubmission !== null}
        onOpenChange={(open) => !open && setViewingSubmission(null)}
        submission={viewingSubmission || ""}
        projectName={projectName}
      />
    </>
  );
};

type SubmissionDetailModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  submission: string;
  projectName: string;
};

const SubmissionDetailModal: React.FC<SubmissionDetailModalProps> = ({
  open,
  onOpenChange,
  submission,
  projectName,
}) => {
  // Mock submission details - in real app, this would come from API
  const submissionDetails = {
    title: submission,
    submittedDate: new Date().toLocaleDateString(),
    description: `Detailed information about ${submission}. This includes all the deliverables, documentation, and related files associated with this submission.`,
    files: [
      { name: "design-document.pdf", size: "2.4 MB", type: "PDF" },
      { name: "implementation-notes.docx", size: "1.2 MB", type: "DOCX" },
    ],
    links: [
      { label: "View on Drive", url: "https://drive.google.com/example" },
      { label: "GitHub Repository", url: "https://github.com/example" },
    ],
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl" blurIntensity="lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Submission Details
          </DialogTitle>
          <p className="text-sm text-muted">{projectName}</p>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <Card className="border-2 border-border">
            <CardHeader>
              <div className="text-lg font-semibold">{submissionDetails.title}</div>
              <div className="text-sm text-muted">Submitted on {submissionDetails.submittedDate}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground leading-relaxed">{submissionDetails.description}</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-border">
            <CardHeader>
              <div className="text-sm font-semibold">Attached Files</div>
            </CardHeader>
            <CardContent className="space-y-2">
              {submissionDetails.files.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-md border border-border bg-background"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium text-sm">{file.name}</div>
                      <div className="text-xs text-muted">{file.size} • {file.type}</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-2 border-border">
            <CardHeader>
              <div className="text-sm font-semibold">Related Links</div>
            </CardHeader>
            <CardContent className="space-y-2">
              {submissionDetails.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-md border border-border bg-background hover:bg-secondary/20 transition-colors"
                >
                  <ExternalLink className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{link.label}</span>
                </a>
              ))}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

type FeedbackModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feedback: string[];
  projectName: string;
  hasNestedModal?: boolean;
};

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  open,
  onOpenChange,
  feedback,
  projectName,
  hasNestedModal = false,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-3xl" blurIntensity={hasNestedModal ? "lg" : "sm"}>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Past Feedback
        </DialogTitle>
        <p className="text-sm text-muted">{projectName}</p>
      </DialogHeader>
      <div className="mt-4 space-y-3">
        {feedback.length ? (
          feedback.map((item, idx) => (
            <Card key={idx} className="border-2 border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground leading-relaxed">{item}</div>
                    <div className="mt-2 text-xs text-muted">Received on {new Date().toLocaleDateString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 text-muted">
            <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No feedback yet.</p>
          </div>
        )}
      </div>
    </DialogContent>
  </Dialog>
);

type SubmitModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: SubmitFormState;
  onChange: (form: SubmitFormState) => void;
  onSubmit: () => void;
  milestones: Milestone[];
  hasNestedModal?: boolean;
};

const SubmitModal: React.FC<SubmitModalProps> = ({
  open,
  onOpenChange,
  form,
  onChange,
  onSubmit,
  milestones,
  hasNestedModal = false,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-3xl" blurIntensity={hasNestedModal ? "lg" : "sm"}>
      <DialogHeader>
        <DialogTitle>Submit Delivery</DialogTitle>
        <p className="text-sm text-muted">Attach proof and declare milestone completion.</p>
      </DialogHeader>

      <div className="grid gap-3">
        <LabeledInput
          label="Submission link"
          placeholder="https://..."
          value={form.link}
          onChange={(e) => onChange({ ...form, link: e.target.value })}
        />
        <LabeledInput
          label="Screenshots"
          placeholder="Drive/Notion links"
          value={form.screenshots}
          onChange={(e) => onChange({ ...form, screenshots: e.target.value })}
        />
        <LabeledInput
          label="Video"
          placeholder="Loom / demo URL"
          value={form.video}
          onChange={(e) => onChange({ ...form, video: e.target.value })}
        />
        <LabeledInput
          label="Documents"
          placeholder="Attach documentation or reports"
          value={form.documents}
          onChange={(e) => onChange({ ...form, documents: e.target.value })}
        />
        <div className="grid gap-2">
          <Label>Short note</Label>
          <Textarea
            placeholder="What changed, blockers, highlights"
            value={form.note}
            onChange={(e) => onChange({ ...form, note: e.target.value })}
          />
        </div>
        <div className="grid gap-2 md:grid-cols-2">
          <div className="grid gap-2">
            <Label>Is milestone achieved?</Label>
            <Select
              value={form.milestoneAchieved}
              onChange={(e) => onChange({ ...form, milestoneAchieved: e.target.value })}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </Select>
          </div>
          {form.milestoneAchieved === "yes" && (
            <div className="grid gap-2">
              <Label>Select milestone</Label>
              <Select
                value={form.milestoneSelected}
                onChange={(e) => onChange({ ...form, milestoneSelected: e.target.value })}
              >
                <option value="">Choose</option>
                {milestones.map((m, idx) => (
                  <option key={idx} value={m.title}>
                    {m.title}
                  </option>
                ))}
              </Select>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button onClick={onSubmit} className="gap-2">
          <Send className="h-4 w-4" />
          Submit & Close
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);

const LabeledInput = ({
  label,
  ...props
}: React.ComponentProps<typeof Input> & { label: string }) => (
  <div className="grid gap-2">
    <Label>{label}</Label>
    <Input {...props} />
  </div>
);

type CreateContractProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  wizard: ContractWizard;
  setWizard: (wizard: ContractWizard) => void;
  onSave: () => void;
  hasNestedModal?: boolean;
};

const CreateContractModal: React.FC<CreateContractProps> = ({
  open,
  onOpenChange,
  wizard,
  setWizard,
  onSave,
  hasNestedModal = false,
}) => {
  const steps = [
    { id: 1, title: "Category" },
    { id: 2, title: "Project Details" },
    { id: 3, title: "Client Details" },
    { id: 4, title: "Milestones & Criteria" },
    { id: 5, title: "Terms" },
  ];

  const next = () => setWizard({ ...wizard, step: Math.min(wizard.step + 1, steps.length) });
  const prev = () => setWizard({ ...wizard, step: Math.max(wizard.step - 1, 1) });

  const updateMilestone = (index: number, key: keyof Milestone, value: string) => {
    const updated = [...wizard.project.milestones];
    // @ts-expect-error allow string assignment for status during edit
    updated[index][key] = value;
    setWizard({ ...wizard, project: { ...wizard.project, milestones: updated } });
  };

  const addMilestone = () =>
    setWizard({
      ...wizard,
      project: {
        ...wizard.project,
        milestones: [
          ...wizard.project.milestones,
          { title: `Milestone ${wizard.project.milestones.length + 1}`, amount: "", dueDate: "", deliverables: "", status: "pending" },
        ],
      },
    });

  const removeMilestone = (idx: number) =>
    setWizard({
      ...wizard,
      project: {
        ...wizard.project,
        milestones: wizard.project.milestones.filter((_, i) => i !== idx),
      },
    });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl" blurIntensity={hasNestedModal ? "lg" : "sm"}>
        <DialogHeader>
          <DialogTitle>Create Contract</DialogTitle>
          <p className="text-sm text-muted">Wizard to capture project and client details.</p>
        </DialogHeader>

        <div className="flex flex-wrap gap-2 text-sm">
          {steps.map((step) => (
            <Badge
              key={step.id}
              variant={wizard.step === step.id ? "success" : "outline"}
              className="gap-2"
            >
              <span>{step.id}</span>
              <span>{step.title}</span>
            </Badge>
          ))}
        </div>

        <div className="mt-4 space-y-3">
          {wizard.step === 1 && (
            <div className="grid gap-3">
              <Label>Project Category (drives dynamic questions)</Label>
              <Select
                value={wizard.category}
                onChange={(e) => setWizard({ ...wizard, category: e.target.value })}
              >
                <option value="">Select a category</option>
                <option value="Blockchain">Blockchain</option>
                <option value="AI">AI</option>
                <option value="Platform">Platform</option>
                <option value="Design">Design</option>
              </Select>
            </div>
          )}

          {wizard.step === 2 && (
            <div className="grid gap-3">
              <LabeledInput
                label="Project name"
                value={wizard.name}
                onChange={(e) => setWizard({ ...wizard, name: e.target.value })}
              />
              <div className="grid gap-2">
                <Label>Project details</Label>
                <Textarea
                  placeholder="Describe scope or paste BRD notes"
                  value={wizard.details}
                  onChange={(e) => setWizard({ ...wizard, details: e.target.value })}
                />
                <Button variant="outline" className="w-fit gap-2">
                  <Upload className="h-4 w-4" />
                  Upload BRD
                </Button>
              </div>
            </div>
          )}

          {wizard.step === 3 && (
            <div className="grid gap-3 md:grid-cols-2">
              <LabeledInput
                label="Client name"
                value={wizard.client.name}
                onChange={(e) => setWizard({ ...wizard, client: { ...wizard.client, name: e.target.value } })}
              />
              <LabeledInput
                label="Phone"
                value={wizard.client.phone}
                onChange={(e) => setWizard({ ...wizard, client: { ...wizard.client, phone: e.target.value } })}
              />
              <LabeledInput
                label="Email"
                value={wizard.client.email}
                onChange={(e) => setWizard({ ...wizard, client: { ...wizard.client, email: e.target.value } })}
              />
              <LabeledInput
                label="Domain (optional)"
                value={wizard.client.domain}
                onChange={(e) => setWizard({ ...wizard, client: { ...wizard.client, domain: e.target.value } })}
              />
              <LabeledInput
                label="Company"
                value={wizard.client.company}
                onChange={(e) => setWizard({ ...wizard, client: { ...wizard.client, company: e.target.value } })}
              />
            </div>
          )}

          {wizard.step === 4 && (
            <div className="space-y-3">
              <div className="grid gap-3 md:grid-cols-2">
                <LabeledInput
                  label="Deadline"
                  type="date"
                  value={wizard.project.deadline}
                  onChange={(e) =>
                    setWizard({ ...wizard, project: { ...wizard.project, deadline: e.target.value } })
                  }
                />
                <LabeledInput
                  label="Proposed amount"
                  placeholder="$"
                  value={wizard.project.amount}
                  onChange={(e) =>
                    setWizard({ ...wizard, project: { ...wizard.project, amount: e.target.value } })
                  }
                />
              </div>
              <Label>Milestones</Label>
              <div className="space-y-2">
                {wizard.project.milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="rounded-md border border-border bg-background p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <Input
                        value={m.title}
                        onChange={(e) => updateMilestone(idx, "title", e.target.value)}
                      />
                      {wizard.project.milestones.length > 1 && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeMilestone(idx)}
                          aria-label="Remove milestone"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="mt-2 grid gap-2 md:grid-cols-3">
                      <Input
                        placeholder="Amount"
                        value={m.amount}
                        onChange={(e) => updateMilestone(idx, "amount", e.target.value)}
                      />
                      <Input
                        type="date"
                        value={m.dueDate}
                        onChange={(e) => updateMilestone(idx, "dueDate", e.target.value)}
                      />
                      <Input
                        placeholder="Deliverables"
                        value={m.deliverables}
                        onChange={(e) => updateMilestone(idx, "deliverables", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
                {wizard.project.milestones.length < 5 && (
                  <Button variant="outline" size="sm" onClick={addMilestone} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add milestone
                  </Button>
                )}
              </div>
              <div className="grid gap-2">
                <Label>Submission criteria</Label>
                <Textarea
                  placeholder="Define acceptance criteria and artifacts"
                  value={wizard.project.submissionCriteria}
                  onChange={(e) =>
                    setWizard({
                      ...wizard,
                      project: { ...wizard.project, submissionCriteria: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          )}

          {wizard.step === 5 && (
            <div className="grid gap-2">
              <Label>Terms & Conditions</Label>
              <Textarea
                placeholder="Payment schedules, IP, revisions, dispute handling"
                value={wizard.terms}
                onChange={(e) => setWizard({ ...wizard, terms: e.target.value })}
              />
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={prev} disabled={wizard.step === 1}>
              Back
            </Button>
            {wizard.step < steps.length && (
              <Button variant="outline" onClick={next}>
                Next
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onSave}>
              Save as Draft
            </Button>
            <Button onClick={onSave} className="gap-2">
              <Send className="h-4 w-4" />
              Send to Client
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default App;
