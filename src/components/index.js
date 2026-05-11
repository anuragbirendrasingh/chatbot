// Central export file for all components
// This follows industry best practices for cleaner imports

// Tools Components
export { default as ToolsPageHeader } from './tools/ToolsPageHeader';
export { default as ToolsFilter } from './tools/ToolsFilter';
export { default as ToolsGrid } from './tools/ToolsGrid';
export { default as ToolModal } from './tools/ToolModal';
export { default as ToolRenderer } from './tools/ToolRenderer';
export { tools, categories } from './tools/toolsData';

// Individual Tool Components
export { default as JeePercentileTool } from './tools/JeePercentileTool';
export { default as NeetRankTool } from './tools/NeetRankTool';
export { default as CutoffCheckerTool } from './tools/CutoffCheckerTool';
export { default as EmiCalcTool } from './tools/EmiCalcTool';
export { default as CgpaCalcTool } from './tools/CgpaCalcTool';
export { default as CountdownTool } from './tools/CountdownTool';
export { default as CareerFinderTool } from './tools/CareerFinderTool';

// Universities Components
export { default as GovernmentUniversityCard } from './universities/GovernmentUniversityCard';
export { default as GovernmentUniversityFilter } from './universities/GovernmentUniversityFilter';
export { default as GovernmentUniversityModal } from './universities/GovernmentUniversityModal';
export { governmentUniversities, types as governmentTypes, courseFilters as governmentCourseFilters } from './universities/governmentUniversitiesData';

export { default as PrivateUniversityCard } from './universities/PrivateUniversityCard';
export { default as PrivateUniversityFilter } from './universities/PrivateUniversityFilter';
export { default as PrivateUniversityModal } from './universities/PrivateUniversityModal';
export { privateUniversities, allCourseTypes } from './universities/privateUniversitiesData';

// Exams Components
export { default as ExamCard } from './exams/ExamCard';
export { default as ExamFilter } from './exams/ExamFilter';
export { default as ExamModal } from './exams/ExamModal';
export { exams, categories as examCategories, difficulties as examDifficulties } from './exams/examsData';

// Existing Components
export { default as AuthGate } from './AuthGate';
export { default as AuthModal } from './AuthModal';
export { default as ChatMessage } from './ChatMessage';
export { default as ChatWidget } from './ChatWidget';
export { default as EduBot } from './EduBot';
export { default as HomePage } from './HomePage';
export { default as Profile } from './Profile';
export { default as QuickReplies } from './QuickReplies';
export { default as Tagline } from './Tagline';
