import {
    validateRamanInputParams,
    calculateRamanSpectrum_MinimizationImpl,
    filterActiveRamanLines,
    getTopNRamanLines,
    calculateStokesAntiStokes,
} from './utils';

import type { RamanParams, RamanReturn } from './models';

/**
 * 计算拉曼光谱
 */
export function calculateRamanSpectrumFromFrequencyByCASTEP(params: RamanParams): Promise<RamanReturn>;
export function calculateRamanSpectrumFromFrequencyByCASTEP(params: RamanParams[]): Promise<RamanReturn[]>;
export function calculateRamanSpectrumFromFrequencyByCASTEP(params: RamanParams | RamanParams[]): Promise<RamanReturn | RamanReturn[]> {
    if (Array.isArray(params)) return Promise.all(params.map((param) => calculateRamanSpectrumFromFrequencyByCASTEP(param)));

    return new Promise((res) => {
        // 校验入参是否合法
        validateRamanInputParams(params);

        const { raman, ramanActive } = params;

        // 计算光谱
        const spectrum = calculateRamanSpectrum_MinimizationImpl({
            raman,
            ramanActive,
        });

        res(spectrum);
    });
}

/**
 * 获取有拉曼活性的谱线
 */
export function getActiveRamanLines(params: RamanParams): Promise<RamanReturn>;
export function getActiveRamanLines(params: RamanParams[]): Promise<RamanReturn[]>;
export function getActiveRamanLines(params: RamanParams | RamanParams[]): Promise<RamanReturn | RamanReturn[]> {
    if (Array.isArray(params)) return Promise.all(params.map((param) => getActiveRamanLines(param)));

    return new Promise((res) => {
        // 校验入参是否合法
        validateRamanInputParams(params);

        const { raman, ramanActive } = params;

        // 计算光谱
        const spectrum = calculateRamanSpectrum_MinimizationImpl({
            raman,
            ramanActive,
        });

        // 过滤出活性谱线
        const activeLines = filterActiveRamanLines(spectrum);

        res(activeLines);
    });
}

/**
 * 获取强度最强的 N 条拉曼谱线
 */
export function getTopNIntenseRamanLines(
    params: RamanParams,
    topN?: number,
): Promise<RamanReturn>;
export function getTopNIntenseRamanLines(
    params: RamanParams[],
    topN?: number,
): Promise<RamanReturn[]>;
export function getTopNIntenseRamanLines(
    params: RamanParams | RamanParams[],
    topN: number = 10,
): Promise<RamanReturn | RamanReturn[]> {
    if (Array.isArray(params)) return Promise.all(params.map((param) => getTopNIntenseRamanLines(param, topN)));

    return new Promise((res) => {
        // 校验入参是否合法
        validateRamanInputParams(params);

        const { raman, ramanActive } = params;

        // 计算光谱
        const spectrum = calculateRamanSpectrum_MinimizationImpl({
            raman,
            ramanActive,
        });

        // 获取强度最强的 N 条谱线
        const topLines = getTopNRamanLines(spectrum, topN);

        res(topLines);
    });
}

/**
 * 计算 Stokes 和 Anti-Stokes 频率偏移
 * 用于拉曼光谱分析中的 Stokes 和 Anti-Stokes 线的计算
 */
export function calculateRamanStokesAntiStokes(
    params: RamanParams,
    frequency: string[],
    excitationWavelength?: string,
): Promise<Array<{ frequency: string; stokes: string; antiStokes: string }>>;
export function calculateRamanStokesAntiStokes(
    params: RamanParams[],
    frequency: string[][],
    excitationWavelength?: string,
): Promise<Array<Array<{ frequency: string; stokes: string; antiStokes: string }>>>;
export function calculateRamanStokesAntiStokes(
    params: RamanParams | RamanParams[],
    frequency: string[] | string[][],
    excitationWavelength?: string,
): Promise<Array<{ frequency: string; stokes: string; antiStokes: string }> | Array<Array<{ frequency: string; stokes: string; antiStokes: string }>>> {
    if (Array.isArray(params) && Array.isArray(frequency) && frequency.length > 0 && Array.isArray(frequency[0])) {
        return Promise.all(
            params.map((param, index) =>
                calculateRamanStokesAntiStokes(param, (frequency as string[][])[index], excitationWavelength),
            ),
        );
    }

    if (Array.isArray(params) || Array.isArray(frequency)) {
        throw new Error('params 和 frequency 的类型必须同时为数组或同时为非数组！');
    }

    return new Promise((res) => {
        // 校验入参是否合法
        validateRamanInputParams(params as RamanParams);

        // 校验频率数据
        const freqArray = frequency as string[];
        if (!freqArray || freqArray.length === 0) {
            throw new Error('频率数据不能为空！');
        }

        // 计算 Stokes 和 Anti-Stokes
        const result = freqArray.map((freq) => ({
            frequency: freq,
            ...calculateStokesAntiStokes(freq, excitationWavelength),
        }));

        res(result);
    });
}
