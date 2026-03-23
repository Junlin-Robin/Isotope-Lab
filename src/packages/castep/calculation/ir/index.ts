import {
    validateIRInputParams,
    calculateIRSpectrum_MinimizationImpl,
    filterActiveIRLines,
    getTopNIRLines,
} from './utils';

import type { IRParams, IRReturn } from './models';

/**
 * 计算红外光谱
 */
export function calculateIRSpectrumFromFrequencyByCASTEP(params: IRParams): Promise<IRReturn>;
export function calculateIRSpectrumFromFrequencyByCASTEP(params: IRParams[]): Promise<IRReturn[]>;
export function calculateIRSpectrumFromFrequencyByCASTEP(params: IRParams | IRParams[]): Promise<IRReturn | IRReturn[]> {
    if (Array.isArray(params)) return Promise.all(params.map((param) => calculateIRSpectrumFromFrequencyByCASTEP(param)));

    return new Promise((res) => {
        // 校验入参是否合法
        validateIRInputParams(params);

        const { ir, irActive } = params;

        // 计算光谱
        const spectrum = calculateIRSpectrum_MinimizationImpl({
            ir,
            irActive,
        });

        res(spectrum);
    });
}

/**
 * 获取有红外活性的谱线
 */
export function getActiveIRLines(params: IRParams): Promise<IRReturn>;
export function getActiveIRLines(params: IRParams[]): Promise<IRReturn[]>;
export function getActiveIRLines(params: IRParams | IRParams[]): Promise<IRReturn | IRReturn[]> {
    if (Array.isArray(params)) return Promise.all(params.map((param) => getActiveIRLines(param)));

    return new Promise((res) => {
        // 校验入参是否合法
        validateIRInputParams(params);

        const { ir, irActive } = params;

        // 计算光谱
        const spectrum = calculateIRSpectrum_MinimizationImpl({
            ir,
            irActive,
        });

        // 过滤出活性谱线
        const activeLines = filterActiveIRLines(spectrum);

        res(activeLines);
    });
}

/**
 * 获取强度最强的 N 条红外谱线
 */
export function getTopNIntenseIRLines(
    params: IRParams,
    topN?: number,
): Promise<IRReturn>;
export function getTopNIntenseIRLines(
    params: IRParams[],
    topN?: number,
): Promise<IRReturn[]>;
export function getTopNIntenseIRLines(
    params: IRParams | IRParams[],
    topN: number = 10,
): Promise<IRReturn | IRReturn[]> {
    if (Array.isArray(params)) return Promise.all(params.map((param) => getTopNIntenseIRLines(param, topN)));

    return new Promise((res) => {
        // 校验入参是否合法
        validateIRInputParams(params);

        const { ir, irActive } = params;

        // 计算光谱
        const spectrum = calculateIRSpectrum_MinimizationImpl({
            ir,
            irActive,
        });

        // 获取强度最强的 N 条谱线
        const topLines = getTopNIRLines(spectrum, topN);

        res(topLines);
    });
}
