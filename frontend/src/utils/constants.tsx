import { ImageOutlined, InsertDriveFileOutlined } from "@mui/icons-material";
import file1 from "../assets/OnboardingDocs/Broker Addendum_1 .pdf";
import file2 from "../assets/OnboardingDocs/DotLoop Workflow.pdf";
import file3 from "../assets/OnboardingDocs/HB Auto Insurance.pdf";
import file4 from "../assets/OnboardingDocs/HB Non-Compete (version 1).pdf";
import file5 from "../assets/OnboardingDocs/HB Onboarding Fee Sheet (version 1).pdf";
import file6 from "../assets/OnboardingDocs/HudsonBurnhamMarchManual.pdf";
import file7 from "../assets/OnboardingDocs/Office Policy Addendum 2023 Hudson Burnham.pdf";
import file8 from "../assets/OnboardingDocs/SponsorBrokerAGREEMENT.pdf";
import profileImage from "../assets/profileImg.png";
export const resourcesData = [
  {
    url: "https://drive.google.com/file/d/121YKBzF5pwT_JoqjzYtN78fNFh6EgCzz/preview",
    title: "Introduction to SPARK APT",
    author: "anonymous",
    category: "random",
  },
  {
    url: "https://drive.google.com/file/d/1Lu97g2ra6zEZNU8rFNkjhke-wyCrLcns/preview",
    title: "Introduction to Hubspot",
    author: "anonymous",
    category: "random",
  },
  {
    url: "https://drive.google.com/file/d/1P0urKdNHM9SWiS1oLC3NEJf60lR9mJFx/preview",
    title: "How to Qualify a Lead",
    author: "",
    category: "",
  },
  {
    url: "https://drive.google.com/file/d/1CagBdWCC2o6YyOvb979RgCU8dDXNRXmw/preview",
    title: "How We Provide Value",
    author: "",
    category: "",
  },
  {
    url: "https://drive.google.com/file/d/1wEloDGCeCWGapuf3GI69yo709zXJzxeN/preview",
    title: "Condos vs Apartments",
    author: "",
    category: "",
  },
  {
    url: "https://drive.google.com/file/d/1_JuN0MtEZVx8ggEQrp4FYau3KpgRM5Ex/preview",
    title: "Providing Value on Tour",
    author: "",
    category: "",
  },
  {
    url: "https://drive.google.com/file/d/1GHDnD-28Z_lTrIqduZ8KgMp8ygzQ0MAT/preview",
    title: "Dotloop training with Caroline",
    author: "",
    category: "",
  },
];
export const categoryData = [
  "ALL",
  "MARKETING TRENDS",
  "CONTENT STRATEGY",
  "SOCIAL MEDIA",
  "SEO",
  "EMAIL MARKETING",
  "BRANDING",
  "CASE STUDIES",
];

export const actionsList = [
  {
    id: "1",
    text: "Photo/Video",
    image: <ImageOutlined style={{ color: "#9FA1A2" }} />,
    accept: "image/*",
  },
  {
    id: "2",
    text: "File",
    image: <InsertDriveFileOutlined style={{ color: "#9FA1A2" }} />,
    accept: ".pdf,.doc,.txt,application/msword,application/pdf,text/plain",
  },
];

export const onboardingDocs = [
  {
    id: 0,
    filePath: file1,
    acknowledged: false,
    numPages: 1,
  },
  {
    id: 1,
    filePath: file2,
    acknowledged: false,
    numPages: 1,
  },
  {
    id: 2,
    filePath: file3,
    acknowledged: false,
    numPages: 1,
  },
  {
    id: 3,
    filePath: file4,
    acknowledged: false,
    numPages: 2,
  },
  {
    id: 4,
    filePath: file5,
    acknowledged: false,
    numPages: 1,
  },
  {
    id: 5,
    filePath: file6,
    acknowledged: false,
    numPages: 82,
  },
  {
    id: 6,
    filePath: file7,
    acknowledged: false,
    numPages: 1,
  },
  {
    id: 7,
    filePath: file8,
    acknowledged: false,
    numPages: 3,
  },
];

export const week = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const mockChats = [
  {
    id: "1",
    isGroup: true,
    conversationName: "Channel#1",
    profileImg: profileImage,
    lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,...",
    updatedAt: "12.00 pm",
  },
];

export const dealsInfo = [
  {
    id: "1",
    value: "22",
    month: "Month",
  },
  {
    id: "2",
    value: "18",
    month: "July's",
  },
  {
    id: "3",
    value: "20",
    month: "June's",
  },
];
