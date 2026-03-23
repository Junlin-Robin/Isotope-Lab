import { IR_NORMALIZATION_FACTOR } from './constants';
import decimal from 'decimal.js';

import type {
    IRParams,
    IRMinimizationImplParamsType,
} from './models';

/**
 * 校验红外光谱的入参是否合法，防止意外数据造成计算错误和崩溃
 * @param inputParams 调用 calculateIRSpectrum 方法的入参
 * @returns 抛出异常
 */
export function validateIRInputParams(inputParams: IRParams) {
    const { ir, irActive } = inputParams || {};

    // 校验输入数据格式，防止可能的计算问题
    if (ir?.length !== irActive?.length) throw new Error('红外强度数据与活性标记数组长度不一致！');

    if (!ir || ir.length === 0) throw new Error('红外强度数据不能为空！');

    // 校验所有强度值都是有效的数字
    ir.forEach((intensity, index) => {
        if (!intensity || isNaN(Number(intensity))) {
            throw new Error(`第 ${index} 个红外强度值无效: ${intensity}`);
        }
    });
}

/**
 * 红外光谱的最小粒度底层计算实现
 * @param params ir-红外强度数据；irActive-红外活性标记
 * @returns 包含强度、活性、归一化强度等信息
 */
export function calculateIRSpectrum_MinimizationImpl(params: IRMinimizationImplParamsType) {
    const { ir, irActive } = params || {};

    // 找出最大强度用于归一化
    const maxIntensity = ir.reduce((max, current) => {
        const currentVal = new decimal(current);
        const maxVal = new decimal(max);
        return currentVal.greaterThan(maxVal) ? current : max;
    });

    const maxIntensityDecimal = new decimal(maxIntensity);

    // 计算每条谱线的信息
    const spectrum = ir.map((intensity, index) => {
        const intensityDecimal = new decimal(intensity);
        
        // 计算归一化强度（0-100）
        let normalizedIntensity: string;
        if (maxIntensityDecimal.lessThanOrEqualTo(0)) {
            normalizedIntensity = '0';
        } else {
            normalizedIntensity = intensityDecimal
                .mul(IR_NORMALIZATION_FACTOR)
                .div(maxIntensityDecimal)
                .toString();
        }

        return {
            index,
            intensity,
            active: irActive[index],
            normalizedIntensity,
        };
    });

    return spectrum;
}

/**
 * 过滤出具有红外活性的谱线
 * @param spectrum 原始光谱数据
 * @returns 过滤后的光谱数据
 */
export function filterActiveIRLines(spectrum: ReturnType<typeof calculateIRSpectrum_MinimizationImpl>) {
    return spectrum.filter((item) => item.active);
}

/**
 * 获取强度最强的 N 条谱线
 * @param spectrum 原始光谱数据
 * @param topN 需要获取的谱线数量
 * @returns 强度最强的 N 条谱线
 */
export function getTopNIRLines(
    spectrum: ReturnType<typeof calculateIRSpectrum_MinimizationImpl>,
    topN: number = 10,
) {
    return spectrum
        .sort((a, b) => new decimal(b.intensity).sub(a.intensity).toNumber())
        .slice(0, topN);
}
