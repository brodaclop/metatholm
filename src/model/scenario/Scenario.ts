export interface Scenario {
    title: string;
    background: string;
    participants: Array<string>;
    start: ScenarioStep;
}

export interface ScenarioStep {
    player: number;
    text: string;
    next: null | ScenarioStep | { options: Record<string, ScenarioStep> };
}

