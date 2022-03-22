export interface RuleData{
    parentIndices: number[],
    ruleIndex: number,
    parentText: string[],
    ruleSource: string,
    subRules: RuleData[],
    text: string,
    previousIndex: number,
    nextIndex: number,
    citations: Citation[]
}

export interface Citation {
    citationText: string,
    ruleIndex: number
}