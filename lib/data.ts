// All claims sourced from:
// Anthropic Institute: https://www.anthropic.com/institute/recursive-self-improvement
// Anthropic Research Agenda: https://www.anthropic.com/research/anthropic-institute-agenda
// METR Time Horizons: https://metr.org/time-horizons/
// METR RE-Bench: https://metr.org/blog/2024-11-22-evaluating-r-d-capabilities-of-llms/

export type StageId = 'assisted' | 'rd' | 'closed'
export type BottleneckId = 'judgment' | 'surprise' | 'autonomy' | 'taste' | 'verification'
export type FailureSeverity = 'observed' | 'structural' | 'open'

export interface TimelineEvent {
  date: string
  label: string
  detail: string
  source: string
  category: 'task-horizon' | 'benchmark' | 'judgment' | 'policy'
}

export interface LoopStage {
  id: StageId
  n: number
  title: string
  subtitle: string
  description: string
  humanRole: string
  aiRole: string
  color: string
  currentState: 'active' | 'emerging' | 'speculative'
}

export interface Bottleneck {
  id: BottleneckId
  title: string
  description: string
  evidence: string
  source: string
  severity: 1 | 2 | 3
}

export interface FailureMode {
  id: string
  title: string
  family: string
  severity: FailureSeverity
  description: string
  example: string
  source: string
}

export interface EvidenceItem {
  metric: string
  value: string
  subvalue: string
  trend: 'up' | 'down' | 'mixed'
  interpretation: string
  source: string
}

export const TIMELINE: TimelineEvent[] = [
  {
    date: 'Mar 2024',
    label: 'Task horizon: 4 minutes',
    detail: 'Claude could complete software tasks that take a skilled human roughly 4 minutes. Measured at 50% success rate on well-specified tasks.',
    source: 'Anthropic Institute',
    category: 'task-horizon',
  },
  {
    date: 'Nov 2025',
    label: 'Research step selection: 51%',
    detail: 'When evaluated on selecting the next research step given a problem, Claude beat human choices 51% of the time. Slightly above chance.',
    source: 'Anthropic Institute',
    category: 'judgment',
  },
  {
    date: 'Mar 2025',
    label: 'Task horizon: 1.5 hours',
    detail: 'The task completion time horizon grew from minutes to 90 minutes in one year. METR exponential trend fit outperforms linear models.',
    source: 'Anthropic Institute / METR',
    category: 'task-horizon',
  },
  {
    date: 'Nov 2024',
    label: 'RE-Bench published',
    detail: 'METR releases RE-Bench across seven ML research engineering environments. AI agents outperform humans at 2-hour budgets; humans win at 32 hours.',
    source: 'METR RE-Bench',
    category: 'benchmark',
  },
  {
    date: 'Apr 2026',
    label: 'Research step selection: 64%',
    detail: 'In 5 months, Claude improved from 51% to 64% on selecting research steps. Humans still chose the problem and designed the scoring rubric.',
    source: 'Anthropic Institute',
    category: 'judgment',
  },
  {
    date: 'Apr 2026',
    label: '52x code speedup in optimization',
    detail: 'Claude achieved roughly 52x speedup on well-specified optimization tasks, compared to ~3x a year prior. Humans set the goal; AI executed.',
    source: 'Anthropic Institute',
    category: 'benchmark',
  },
  {
    date: 'Apr 2026',
    label: '97% performance recovery, AI safety problem',
    detail: 'Claude-powered agents recovered 97% of the performance gap on an AI safety research problem. Humans chose the problem and created the scoring rubric.',
    source: 'Anthropic Institute',
    category: 'benchmark',
  },
  {
    date: 'Mar 2026',
    label: 'Task horizon: 12 hours',
    detail: 'Task horizon reached 12 hours. SWE-bench went from single-digit scores to saturation in two years. CORE-Bench followed in 15 months.',
    source: 'Anthropic Institute / METR',
    category: 'task-horizon',
  },
  {
    date: 'May 2026',
    label: 'METR time horizons updated',
    detail: 'METR confirms exponential trend fit. Notes measurements above 16 hours are unreliable with current task suite. Day-length tasks may enter range in 2026.',
    source: 'METR Time Horizons',
    category: 'task-horizon',
  },
  {
    date: 'Jun 2026',
    label: 'Anthropic calls for coordinated pause option',
    detail: 'Anthropic proposes that AI labs explore whether a coordinated option to slow or pause frontier development should exist if risks rise. Verification challenges acknowledged.',
    source: 'Anthropic / Reuters',
    category: 'policy',
  },
]

export const LOOP_STAGES: LoopStage[] = [
  {
    id: 'assisted',
    n: 1,
    title: 'AI-Assisted Coding',
    subtitle: 'The current default',
    description:
      'Engineers use AI to write, review, and iterate on code. The AI accelerates execution but the human defines the goal, judges the output, and decides what ships. Over 80% of Anthropic\'s merged production code was AI-authored by May 2026.',
    humanRole: 'Sets goals, judges quality, merges code',
    aiRole: 'Generates, refactors, debugs, explains',
    color: '#4E8098',
    currentState: 'active',
  },
  {
    id: 'rd',
    n: 2,
    title: 'AI-Assisted AI R&D',
    subtitle: 'Measurably emerging',
    description:
      'AI participates in research decisions: selecting next experiments, proposing hypotheses, analyzing results. Humans retain authority over which problems matter and what counts as success. Claude improved from 51% to 64% on research step selection in five months.',
    humanRole: 'Chooses research questions, owns evaluation criteria',
    aiRole: 'Proposes experiments, selects next steps, executes runs',
    color: '#9B7EBD',
    currentState: 'emerging',
  },
  {
    id: 'closed',
    n: 3,
    title: 'Closed-Loop Development',
    subtitle: 'Not yet achieved',
    description:
      'AI autonomously sets research directions, runs experiments, evaluates results, and incorporates improvements into successor model training. No human in the loop for individual decisions. Anthropic states: "We are not there yet, and recursive self-improvement is not inevitable."',
    humanRole: 'Oversight, validation, rate control',
    aiRole: 'Problem selection, experimentation, self-modification',
    color: '#C47C5A',
    currentState: 'speculative',
  },
]

export const BOTTLENECKS: Bottleneck[] = [
  {
    id: 'judgment',
    title: 'Research Judgment',
    description:
      'Deciding which problems are worth working on at all. This is distinct from solving a given problem. Large performance gaps persist when AI must exercise autonomous judgment in choosing goals in both engineering and research contexts.',
    evidence: 'Claude improved from 51% to 64% on research step selection (Nov 2025 to Apr 2026), beating humans 36% of the time at the close of that window.',
    source: 'Anthropic Institute',
    severity: 3,
  },
  {
    id: 'surprise',
    title: 'Responding to Unexpected Evidence',
    description:
      'When experiments return surprising results that contradict the original plan, AI agents tend to continue executing the prior strategy rather than updating. This is one of the clearest observed failure patterns in METR\'s RE-Bench evaluation.',
    evidence: 'Models constrained to avoid division and exponentiation defaulted to transformer architectures despite that design being unsuitable for the constraint.',
    source: 'METR RE-Bench',
    severity: 3,
  },
  {
    id: 'autonomy',
    title: 'Extended Autonomous Operation',
    description:
      'AI agents show strong performance at short task horizons but humans improve at faster rates over longer time budgets. Median agent attempts on RE-Bench multi-hour tasks showed very little progress.',
    evidence: 'At 32-hour budgets, human experts achieved nearly double the average AI agent scores. At 2-hour budgets, AI outperformed humans.',
    source: 'METR RE-Bench',
    severity: 2,
  },
  {
    id: 'taste',
    title: 'Unconventional Exploration',
    description:
      'AI agents excel at applying known approaches to well-specified goals. They struggle to explore genuinely unconventional solution paths, particularly when standard methods are inappropriate. Research progress often depends on trying the thing no one has tried.',
    evidence: 'Models generated solutions more than ten times faster than humans at short budgets, but rarely explored approaches outside established methods.',
    source: 'METR RE-Bench',
    severity: 2,
  },
  {
    id: 'verification',
    title: 'Self-Evaluation',
    description:
      'A closed loop requires the AI to judge the quality of its own outputs and use that judgment to decide on the next action. The evaluator and the executor being the same system creates structural risks that do not exist when humans own evaluation.',
    evidence: 'The April 2026 AI safety experiment required humans to create the scoring rubric. The 97% performance recovery figure is conditional on that human-defined standard.',
    source: 'Anthropic Institute',
    severity: 3,
  },
]

export const FAILURE_MODES: FailureMode[] = [
  {
    id: 'specification-tunnel',
    title: 'Specification Tunnel',
    family: 'Execution',
    severity: 'observed',
    description:
      'The agent optimizes intensely for a specified goal without recognizing that the specification has become invalid or that the real goal has shifted.',
    example:
      'In RE-Bench, models told to avoid division and exponentiation continued submitting transformer-based architectures, which require those operations, for multiple iterations.',
    source: 'METR RE-Bench',
  },
  {
    id: 'progress-plateau',
    title: 'Progress Plateau',
    family: 'Autonomy',
    severity: 'observed',
    description:
      'Performance gains per unit of additional time invested collapse after early progress. The agent cannot compound its own gains the way a human researcher does.',
    example:
      'At 32-hour task budgets, median AI agents showed very little progress relative to their 2-hour performance. Humans improved their scores at faster rates with longer time allocations.',
    source: 'METR RE-Bench',
  },
  {
    id: 'problem-blindness',
    title: 'Problem Blindness',
    family: 'Judgment',
    severity: 'structural',
    description:
      'The ability to execute research steps is not the same as knowing which research steps are worth taking. Frontier models currently beat human choices 64% of the time on next-step selection, but cannot autonomously set the research agenda.',
    example:
      'In April 2026 experiments, Claude-powered agents recovered 97% of performance on an AI safety task. The humans still chose which safety problem to work on and defined what "success" meant.',
    source: 'Anthropic Institute',
  },
  {
    id: 'evaluator-collapse',
    title: 'Evaluator Collapse',
    family: 'Verification',
    severity: 'structural',
    description:
      'In a closed loop, the model must evaluate whether its own outputs represent genuine progress. If the evaluator and the generator share the same failure modes, errors compound rather than cancel.',
    example:
      'This failure mode does not yet have a documented real-world instance at scale. It is structural: it follows from the architecture of any system where the same agent both produces and grades outputs.',
    source: 'Anthropic Institute (theoretical)',
  },
  {
    id: 'rate-invisibility',
    title: 'Rate Invisibility',
    family: 'Governance',
    severity: 'open',
    description:
      'If AI systems begin contributing to their own training improvements, the rate of capability gain may become difficult to observe or predict from the outside. Anthropic\'s research agenda identifies telemetry systems for measuring aggregate AI R&D speed as an open problem.',
    example:
      'There is currently no agreed-upon method for measuring whether an AI system is meaningfully accelerating the development of its successor. This is one of the Anthropic Institute\'s stated open research questions.',
    source: 'Anthropic Research Agenda',
  },
  {
    id: 'verification-overhead',
    title: 'Verification Overhead',
    family: 'Governance',
    severity: 'open',
    description:
      'As AI systems produce more outputs at higher rates, the human cost of reviewing and verifying those outputs may grow faster than the benefit. Humans shift from doing work to approving work, but approving at scale is its own unsolved problem.',
    example:
      'At 80% AI code authorship, engineers shipping 8x more code per quarter, the marginal cost of careful human review per PR increases. The question is whether review quality degrades as volume scales.',
    source: 'Anthropic Institute',
  },
]

export interface LoopNode {
  id: string
  label: string
  index: number
  color: string
  what: string
  automated: string
  humanDependent: string
  danger: string
  warnings: string[]
}

export const LOOP_NODES: LoopNode[] = [
  {
    id: 'model',
    label: 'Model',
    index: 0,
    color: '#4E8098',
    what: 'The current frontier model. It generates text, writes code, proposes hypotheses, and acts as the substrate for all downstream agent behavior. Every capability of every agent in the loop is bounded by what this model can do.',
    automated: 'Inference, context management, token generation, tool calling, multi-turn memory within a context window.',
    humanDependent: 'Architecture choices, training objective design, safety evaluations before release, decisions about what the model is allowed to do by default.',
    danger: 'If a model with subtly misaligned values or miscalibrated confidence is used as the base, every downstream agent action inherits that flaw. Problems at this node propagate through every other stage.',
    warnings: [
      'Rapid capability jumps between versions with no corresponding safety re-evaluation',
      'Reduced interpretability as model scale increases',
      'Model self-reports of confidence that do not match actual reliability on held-out tasks',
    ],
  },
  {
    id: 'agent-scaffold',
    label: 'Agent Scaffold',
    index: 1,
    color: '#6B8A6B',
    what: 'The harness that wraps the base model into an agent: tool calling, memory systems, planning loops, and task decomposition. The scaffold defines what the model can reach in the world and how it persists state between actions.',
    automated: 'Tool dispatch, context compression, subagent spawning, error recovery loops, code execution, file system access.',
    humanDependent: 'Tool set design, permission boundary decisions, what the agent is allowed to call and with what scope.',
    danger: 'Scaffold design determines blast radius. An agent with write access to training pipelines and broad tool permissions is categorically different from a coding assistant. The scaffold is where access control either lives or does not.',
    warnings: [
      'Scaffold granting persistent memory across independent sessions without audit logging',
      'Agents spawning child agents with equal or higher permissions than the parent',
      'Toolchains that include write access to model weights, training configs, or evaluation code',
    ],
  },
  {
    id: 'experiment',
    label: 'Code / Experiment',
    index: 2,
    color: '#9B7EBD',
    what: 'The agent writes and runs code, designs experiments, implements architectural changes, and generates the artifacts that constitute an R&D work product. This is where the model\'s capability translates into research output.',
    automated: 'Code generation, execution, basic debugging, implementing specified designs, running parameterized experiment sweeps.',
    humanDependent: 'Deciding what experiment to run. Recognizing when results are invalid. Choosing what constitutes a useful research artifact versus a plausible-looking but misleading one.',
    danger: 'An agent running ML experiments without human oversight can execute thousands of iterations of a misspecified objective before anyone notices. Each iteration reinforces the wrong direction.',
    warnings: [
      'Agents running experiments with no human-readable logging of intermediate decisions',
      'Experiments that modify their own evaluation code during execution',
      'Objective functions that were not explicitly specified by a human at the start of the run',
    ],
  },
  {
    id: 'evaluation',
    label: 'Evaluation',
    index: 3,
    color: '#D4A853',
    what: 'Experimental outputs are scored against a metric. This is what separates progress from noise. The quality of the evaluation function determines the quality of everything downstream. A bad eval poisons the entire loop.',
    automated: 'Benchmark scoring, unit tests, automated evals on held-out test sets, regression checks.',
    humanDependent: 'Defining what counts as success. Detecting when a metric is being gamed. Auditing surprising results. Deciding whether a score increase reflects genuine capability gain.',
    danger: 'If the evaluation function can be influenced by the agent, Goodhart\'s law applies immediately: the metric stops measuring what it was intended to measure, and the agent optimizes for the metric instead of the underlying goal.',
    warnings: [
      'Eval metrics defined or modified by the AI system being evaluated',
      'No out-of-distribution test sets separate from the training distribution',
      'Rising benchmark scores while downstream task quality or safety properties degrade',
    ],
  },
  {
    id: 'research-decision',
    label: 'Research Decision',
    index: 4,
    color: '#C2411C',
    what: 'Based on evaluation results, a decision is made: what to try next, whether to scale the current approach, whether to abandon a direction. This is the highest-leverage point in the loop. What gets decided here shapes every subsequent iteration.',
    automated: 'Claude improved from 51% to 64% on research step selection in 5 months (Anthropic Institute, Apr 2026). Still well below the threshold for reliable autonomous direction-setting.',
    humanDependent: 'Choosing which problems are worth working on. Deciding when results are surprising enough to require investigation rather than iteration. Setting the research agenda.',
    danger: 'Autonomous research direction-setting is the node that closes the loop. Once an AI system can choose what to work on and how to measure it, human oversight becomes reactive. By the time a problem is visible, the loop has already run many iterations in the wrong direction.',
    warnings: [
      'AI system choosing its own next research objective without explicit human approval',
      'Evaluation criteria that drift from the original research intent over successive runs',
      'Human review cycles compressed to keep pace with AI output volume',
    ],
  },
  {
    id: 'training-run',
    label: 'Training Run',
    index: 5,
    color: '#7B4B44',
    what: 'Findings from experiments are incorporated into a new training run: updated data, changed objectives, modified architecture. The training run is what makes insights persistent. What went into the run defines what comes out.',
    automated: 'Distributed training infrastructure, hyperparameter search, checkpoint management, loss curve monitoring.',
    humanDependent: 'Deciding what data to include. Reviewing the training objective before the run begins. Safety evaluations before the run produces a candidate model. The final go/no-go decision.',
    danger: 'A training run that incorporates AI-selected data with AI-defined objectives, without human review of either, is the operational definition of recursive self-improvement. This is where the loop either closes under human control or closes without it.',
    warnings: [
      'Training data sourced from agent-generated outputs without human curation or review',
      'Objective function modified between runs without a documented human decision',
      'Training run initiated without a mandatory safety evaluation gate',
    ],
  },
  {
    id: 'new-model',
    label: 'New Model',
    index: 6,
    color: '#4E8098',
    what: 'The successor model. It inherits the capabilities and value structure of its training process. If that process was sound, it may be more capable and well-aligned. If not, it inherits whatever errors were introduced, possibly amplified.',
    automated: 'Capability benchmarking, automated red-teaming, regression testing against predecessor model on standard evals.',
    humanDependent: 'Deployment decisions. Interpreting evaluation results. Making the call on whether the model is safe to release and at what capability level. Understanding whether capability gains are accompanied by corresponding alignment gains.',
    danger: 'A successor model that is more capable but less interpretable than its predecessor, deployed without adequate evaluation, starts the next iteration of the loop from a worse epistemic position. Each cycle compounds.',
    warnings: [
      'Deployment of successor model before evaluation of predecessor model is fully complete',
      'Capability gains that outpace available interpretability and evaluation tools',
      'Model that behaves differently in evaluation environments versus actual deployment conditions',
    ],
  },
]

export const EVIDENCE_ITEMS: EvidenceItem[] = [
  {
    metric: 'AI Code Authorship at Anthropic',
    value: '80%+',
    subvalue: 'of merged production code, May 2026',
    trend: 'up',
    interpretation:
      'AI-assisted coding is not a future scenario. It is the current operating mode at one of the leading frontier labs. The question is what happens as this percentage approaches 100% and the AI begins contributing to model development itself.',
    source: 'Anthropic Institute',
  },
  {
    metric: 'Engineering Output Multiplier',
    value: '8x',
    subvalue: 'more code shipped per quarter vs 2021-2025 baseline',
    trend: 'up',
    interpretation:
      'The productivity multiplier from AI-assisted coding is large and real. Anthropic describes the possibility of 100-person teams achieving 10,000-person output as a plausible near-term scenario if trends continue.',
    source: 'Anthropic Institute',
  },
  {
    metric: 'Task Horizon Growth',
    value: '180x',
    subvalue: 'from 4 minutes (Mar 2024) to 12 hours (Mar 2026)',
    trend: 'up',
    interpretation:
      'METR finds that exponential trend fits outperform linear and logistic models. If the trend continues, day-length tasks enter range in 2026. Multi-day tasks follow after that. The ceiling is not yet visible in the data.',
    source: 'Anthropic Institute / METR',
  },
  {
    metric: 'Research Step Selection',
    value: '64%',
    subvalue: 'Claude beats human choices, April 2026',
    trend: 'up',
    interpretation:
      'Up from 51% in November 2025. This is a judgment task, not an execution task. The improvement is meaningful but the gap to autonomous research direction-setting is large: 64% is still well below the threshold needed for reliable unsupervised research.',
    source: 'Anthropic Institute',
  },
  {
    metric: 'RE-Bench: 2-hour vs 32-hour',
    value: 'Inverted',
    subvalue: 'AI leads at 2hr; humans lead at 32hr',
    trend: 'mixed',
    interpretation:
      'AI outperforms humans at short task budgets, often completing tasks more than ten times faster. But humans improve at faster rates as time extends. The crossover point reveals something real about the limits of sustained autonomous research work.',
    source: 'METR RE-Bench',
  },
  {
    metric: 'Code Speedup in Optimization',
    value: '52x',
    subvalue: 'vs ~3x a year prior, April 2026',
    trend: 'up',
    interpretation:
      'On well-specified optimization tasks with superhuman performance, the speedup is dramatic. This is the strongest evidence in the record that AI is becoming a genuine R&D accelerant on clearly defined problems. The bottleneck is still problem definition.',
    source: 'Anthropic Institute',
  },
]
