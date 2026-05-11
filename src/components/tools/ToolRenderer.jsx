import JeePercentileTool from "./JeePercentileTool";
import NeetRankTool from "./NeetRankTool";
import CutoffCheckerTool from "./CutoffCheckerTool";
import EmiCalcTool from "./EmiCalcTool";
import CgpaCalcTool from "./CgpaCalcTool";
import CountdownTool from "./CountdownTool";
import CareerFinderTool from "./CareerFinderTool";

export default function ToolComponent({ toolId }) {
  const toolMap = {
    "jee-percentile": <JeePercentileTool />,
    "neet-rank": <NeetRankTool />,
    "cutoff-checker": <CutoffCheckerTool />,
    "emi-calc": <EmiCalcTool />,
    "cgpa-calc": <CgpaCalcTool />,
    "countdown": <CountdownTool />,
    "career-finder": <CareerFinderTool />,
  };
  
  return toolMap[toolId] || (
    <div className="text-center py-8 text-gray-400">
      <div className="text-4xl mb-3">🚧</div>
      <p className="font-medium text-gray-600">Coming Soon!</p>
      <p className="text-sm mt-1">This tool is under development.</p>
    </div>
  );
}
