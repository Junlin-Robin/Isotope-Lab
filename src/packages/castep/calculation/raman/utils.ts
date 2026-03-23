import { RAMAN_NORMALIZATION_FACTOR, RAMAN_EXCITATION_WAVELENGTH } from './constants';
import decimal from 'decimal.js';

import type {
    RamanParams,
    RamanMinimizationImplParamsType,
} from './models';

/**
 * 校验拉曼光谱的入参是否合法，防止意外数据造成计算错误和崩溃
 * @param inputParams 调用 calculateRamanSpectrum 方法的入参
 * @returns 抛出异常
 */
export function validateRamanInputParams(inputParams: RamanParams) {
    const { raman, ramanActive } = inputParams || {};

    // 校验输入数据格式，防止可能的计算问题
    if (raman?.length !== ramanActive?.length) throw new Error('拉曼强度数据与活性标记数组长度不一致！');

    if (!raman || raman.length === 0) throw new Error('拉曼强度数据不能为空！');

    // 校验所有强度值都是有效的数字
    raman.forEach((intensity, index) => {
        if (!intensity || isNaN(Number(intensity))) {
            throw new Error(`第 ${index} 个拉曼强度值无效: ${intensity}`);
        }
    });
}

/**
 * 拉曼光谱的最小粒度底层计算实现
 * @param params raman-拉曼强度数据；ramanActive-拉曼活性标记
 * @returns 包含强度、活性、归一化强度等信息
 */
export function calculateRamanSpectrum_MinimizationImpl(params: RamanMinimizationImplParamsType) {
    const { raman, ramanActive } = params || {};

    // 找出最大强度用于归一化
    const maxIntensity = raman.reduce((max, current) => {
        const currentVal = new decimal(current);
        const maxVal = new decimal(max);
        return currentVal.greaterThan(maxVal) ? current : max;
    });

    const maxIntensityDecimal = new decimal(maxIntensity);

    // 计算每条谱线的信息
    const spectrum = raman.map((intensity, index) => {
        const intensityDecimal = new decimal(intensity);
        
        // 计算归一化强度（0-100）
        let normalizedIntensity: string;
        if (maxIntensityDecimal.lessThanOrEqualTo(0)) {
            normalizedIntensity = '0';
        } else {
            normalizedIntensity = intensityDecimal
                .mul(RAMAN_NORMALIZATION_FACTOR)
                .div(maxIntensityDecimal)
                .toString();
        }

        return {
            index,
            intensity,
            active: ramanActive[index],
            normalizedIntensity,
        };
    });

    return spectrum;
}

/**
 * 过滤出具有拉曼活性的谱线
 * @param spectrum 原始光谱数据
 * @returns 过滤后的光谱数据
 */
export function filterActiveRamanLines(spectrum: ReturnType<typeof calculateRamanSpectrum_MinimizationImpl>) {
    return spectrum.filter((item) => item.active);
}

/**
 * 获取强度最强的 N 条谱线
 * @param spectrum 原始光谱数据
 * @param topN 需要获取的谱线数量
 * @returns 强度最强的 N 条谱线
 */
export function getTopNRamanLines(
    spectrum: ReturnType<typeof calculateRamanSpectrum_MinimizationImpl>,
    topN: number = 10,
) {
    return spectrum
        .sort((a, b) => new decimal(b.intensity).sub(a.intensity).toNumber())
        .slice(0, topN);
}

/**
 * 计算 Stokes 和 Anti-Stokes 频率偏移
 * @param frequency 分子振动频率（cm^-1）
 * @param excitationWavelength 激发波长（nm），默认使用常量中的值
 * @returns Stokes 和 Anti-Stokes 的波数
 */
export function calculateStokesAntiStokes(
    frequency: string,
    excitationWavelength: string = RAMAN_EXCITATION_WAVELENGTH,
) {
    const excitationWavenumber = new decimal(1e7).div(excitationWavelength); // 1/λ in cm^-1
    const frequencyDecimal = new decimal(frequency);

    const stokesWavenumber = excitationWavenumber.sub(frequencyDecimal).toString();
    const antiStokesWavenumber = excitationWavenumber.add(frequencyDecimal).toString();

    return {
        stokes: stokesWavenumber,
        antiStokes: antiStokesWavenumber,
    };
}
